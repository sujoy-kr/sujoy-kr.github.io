"""Exercise the exported portfolio using actual Chrome, images and browser storage."""
import asyncio
import json
import os
from pathlib import Path
from playwright.async_api import async_playwright

ROOT = Path(__file__).resolve().parents[1]
BASE = os.environ.get('PORTFOLIO_URL', 'http://127.0.0.1:3400').rstrip('/')

async def main():
    errors = []
    async with async_playwright() as p:
        browser = await p.chromium.launch(
            executable_path=os.environ.get('CHROME_PATH', '/usr/bin/google-chrome'),
            headless=True, args=['--no-sandbox'],
        )
        page = await browser.new_page(viewport={'width': 1440, 'height': 1050}, device_scale_factor=1)
        page.on('pageerror', lambda e: errors.append(str(e)))

        async def settle_images():
            # Decode offscreen lazy images too, without changing application behaviour.
            await page.locator('img').evaluate_all('(images)=>images.forEach(i=>i.loading="eager")')
            await page.locator('img').evaluate_all('(images)=>Promise.all(images.map(i=>i.decode().catch(()=>{})))')
            assert not await page.locator('img').evaluate_all('(images)=>images.filter(i=>!i.complete||i.naturalWidth===0).length')

        async def visit(route):
            response = await page.goto(BASE + route, wait_until='networkidle')
            assert response.status == 200, (route, response.status)
            await page.evaluate('document.fonts.ready')
            await settle_images()

        async def theme(expected):
            assert await page.locator('html').get_attribute('data-theme') == expected

        shots = ROOT / 'docs/screenshots'
        shots.mkdir(parents=True, exist_ok=True)
        # First visit follows the OS; an explicit choice persists through reload/navigation.
        await page.emulate_media(color_scheme='dark')
        await visit('/')
        await theme('dark')
        await page.screenshot(path=str(shots / 'home-dark-desktop.png'), full_page=True)
        await page.get_by_role('button', name='Switch to light mode').click()
        await theme('light')
        await page.reload(wait_until='networkidle')
        await theme('light')
        await page.emulate_media(color_scheme='light')
        await page.emulate_media(color_scheme='dark')
        await theme('light')  # The explicit choice wins over OS changes.
        await settle_images()
        await page.screenshot(path=str(shots / 'home-desktop.png'), full_page=True)

        await page.get_by_role('link', name='Explore my work').click()
        await page.wait_for_url('**/projects/')
        await theme('light')
        assert await page.locator('.project-card').count() == 40
        assert await page.get_by_role('button', name='Websites', exact=True).count() == 0
        await page.get_by_role('button', name='Featured', exact=True).click()
        assert await page.locator('.project-card').count() == 5
        await page.get_by_role('button', name='Client work', exact=True).click()
        assert await page.locator('.project-card').count() == 14
        await page.get_by_role('button', name='All work').click()
        await page.get_by_role('textbox', name='Search projects').fill('Kotlin')
        assert await page.locator('.project-card').count() == 1
        await page.get_by_role('textbox', name='Search projects').fill('no-such-technology')
        assert await page.locator('.project-card').count() == 0
        await page.get_by_role('button', name='Reset filters').click()
        assert await page.locator('.project-card').count() == 40
        await page.get_by_role('combobox', name='Sort by').select_option('az')
        titles = await page.locator('.project-card h3').all_text_contents()
        assert titles == sorted(titles, key=str.casefold)
        await page.get_by_role('combobox', name='Sort by').select_option('curated')
        await page.screenshot(path=str(shots / 'projects-desktop.png'))

        projects = json.loads((ROOT / 'src/data/projects.json').read_text())
        galleries = json.loads((ROOT / 'src/data/galleries.json').read_text())
        for project in projects:
            slug = project['slug']
            await visit('/projects/' + slug + '/')
            assert await page.locator('h1').inner_text() == project['title']
            assert await page.locator('.project-source-links a').count() == len(project['repositories']) + (1 if project['liveUrl'] else 0)
            for repo in project['repositories']:
                assert await page.locator('.project-source-links a').filter(has_text=repo['label']).get_attribute('href') == repo['url']
            assert await page.locator('#overview .story-lead').inner_text() == project['overview']
            assert await page.locator('#engineering .engineering-copy p').inner_text() == project['engineering']
            count = len(galleries[slug]['images'])
            assert await page.locator('.gallery figure').count() == count, slug
            assert await page.locator('.gallery figcaption').count() == 0
            if count:
                assert int(await page.locator('.gallery').evaluate("e=>getComputedStyle(e).columnCount")) in [2,3]
                previews = await page.locator('.gallery-zoom img').evaluate_all("imgs=>imgs.map(e=>({height:e.getBoundingClientRect().height,width:e.getBoundingClientRect().width,parent:e.closest('.gallery').getBoundingClientRect().width}))")
                assert all(image['height'] <= 561 and image['width'] < image['parent']*.75 for image in previews), slug
            facts = await page.locator('.detail-facts > div > span').all_text_contents()
            assert facts in [['DISCIPLINE'],['DISCIPLINE','BUILT WITH']], (slug,facts)
            public_copy = await page.locator('main').inner_text()
            assert 'Scope & limitations' not in public_copy
            assert 'EVIDENCE & CONTEXT' not in public_copy
            assert 'additional images to explore' not in public_copy
            assert 'unavailable during capture' not in public_copy
            assert await page.locator('.evidence-card, details').count() == 0
            if all(t.lower() in {'html','css','javascript','bootstrap'} for t in project['technologies']):
                assert await page.locator('.tech-tags').count() == 0
                assert 'BUILT WITH' not in await page.locator('.detail-facts').inner_text()
                assert 'Design & experience' in await page.locator('#engineering').inner_text()
                import re
                assert not re.search(r'\b(html|css|javascript|bootstrap)\b', await page.locator('main').inner_text(), re.I), slug

        await visit('/projects/nextset/')
        await page.get_by_role('button', name='Enlarge', exact=False).first.click()
        assert await page.locator('dialog').is_visible()
        first = await page.locator('.lightbox-canvas img').get_attribute('src')
        await page.get_by_role('button', name='Zoom in', exact=True).click()
        assert await page.get_by_role('button', name='Reset zoom').inner_text() == '150%'
        assert await page.locator('.lightbox-stage').evaluate('e=>e.scrollWidth > e.clientWidth && e.scrollHeight > e.clientHeight')
        viewport = await page.locator('.lightbox-stage').bounding_box()
        before_pan = await page.locator('.lightbox-stage').evaluate('e=>e.scrollLeft')
        x, y = viewport['x'] + viewport['width']/2, viewport['y'] + viewport['height']/2
        await page.mouse.move(x,y)
        await page.mouse.down()
        await page.mouse.move(x-60,y-30,steps=5)
        await page.mouse.up()
        assert await page.locator('.lightbox-stage').evaluate('e=>e.scrollLeft') > before_pan + 40
        await page.get_by_role('button', name='Reset zoom').click()
        assert await page.get_by_role('button', name='Reset zoom').inner_text() == '100%' 
        await page.locator('.lightbox-stage').dblclick()
        assert await page.get_by_role('button', name='Reset zoom').inner_text() == '200%'
        await page.get_by_role('button', name='Next image').click()
        assert await page.get_by_role('button', name='Reset zoom').inner_text() == '100%'
        assert await page.locator('.lightbox-canvas img').get_attribute('src') != first
        await page.keyboard.press('ArrowLeft')
        assert await page.locator('.lightbox-canvas img').get_attribute('src') == first
        await page.keyboard.press('Escape')
        assert not await page.locator('dialog').is_visible()
        await page.wait_for_function("document.body.style.overflow !== 'hidden'")

        await visit('/projects/safoyana/')
        await page.screenshot(path=str(shots / 'case-study-desktop.png'), full_page=True)
        await page.get_by_role('button', name='Switch to dark mode').click()
        await page.reload(wait_until='networkidle')
        await theme('dark')
        await settle_images()
        await page.screenshot(path=str(shots / 'case-study-dark-desktop.png'), full_page=True)
        await visit('/projects/instagram-clone/')
        assert await page.locator('.gallery figure').count() == len(galleries['instagram-clone']['images'])

        await page.set_viewport_size({'width': 390, 'height': 844})
        for mode in ['dark', 'light']:
            if mode == 'light':
                await page.get_by_role('button', name='Switch to light mode').click()
            for route in ['/', '/projects/', '/about/', '/contact/', '/projects/nextset/', '/projects/safoyana/']:
                await visit(route)
                await theme(mode)
                assert await page.evaluate('document.documentElement.scrollWidth <= window.innerWidth'), (mode, route)
                if route == '/':
                    await page.screenshot(path=str(shots / f'home-{mode}-mobile.png'), full_page=True)
                if route == '/projects/':
                    await page.get_by_role('button', name='Mobile', exact=True).click()
                    assert await page.locator('.project-card').count() == 2
                    await page.screenshot(path=str(shots / f'projects-{mode}-mobile.png'))
        await page.set_viewport_size({'width': 320, 'height': 760})
        await visit('/')
        assert await page.evaluate('document.documentElement.scrollWidth <= window.innerWidth'), '320px home'
        assert not errors, errors
        await browser.close()
    print('PASS: 40 case studies; every masonry gallery image, compact previews, project-focused copy and zoom controls; theme preference and persistence; gallery navigation; search/filter/sort; 12 mobile theme/layout checks and 320px home. No browser exceptions.')

if __name__ == '__main__':
    asyncio.run(main())
