"""Exercise the exported portfolio using actual Chrome, images and browser storage."""
import asyncio
import json
import os
from pathlib import Path
from playwright.async_api import async_playwright

ROOT = Path(__file__).resolve().parents[1]
PROJECTS = json.loads((ROOT / 'src/data/projects.json').read_text())
DESIGNS = json.loads((ROOT / 'src/data/designs.json').read_text())
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

        shots = Path(os.environ.get('PORTFOLIO_SCREENSHOTS', '/tmp/portfolio-audit-screenshots'))
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
        assert await page.locator('main .grid .card').count() == len(PROJECTS)
        assert await page.get_by_role('button', name='Websites', exact=True).count() == 0
        await page.get_by_role('button', name='Featured', exact=True).click()
        assert await page.locator('main .grid .card').count() == sum(bool(p['featured']) for p in PROJECTS)
        await page.get_by_role('button', name='Client work', exact=True).click()
        assert await page.locator('main .grid .card').count() == sum(p['group'] == 'Client work' for p in PROJECTS)
        await page.get_by_role('button', name='All work').click()
        await page.get_by_role('searchbox', name='Search projects').fill('Kotlin')
        assert await page.locator('main .grid .card').count() == 1
        await page.get_by_role('searchbox', name='Search projects').fill('no-such-technology')
        assert await page.locator('main .grid .card').count() == 0
        await page.get_by_role('button', name='Reset filters').click()
        assert await page.locator('main .grid .card').count() == len(PROJECTS)
        await page.screenshot(path=str(shots / 'projects-desktop.png'))

        projects = PROJECTS
        galleries = json.loads((ROOT / 'src/data/galleries.json').read_text())
        for project in projects:
            slug = project['slug']
            await visit('/projects/' + slug + '/')
            assert await page.locator('h1').inner_text() == project['title']
            assert await page.locator('.detail-links a').count() == len(project['repositories']) + (1 if project['liveUrl'] else 0)
            for repo in project['repositories']:
                assert await page.locator('.detail-links a').filter(has_text=repo['label']).get_attribute('href') == repo['url']
            assert await page.locator('.story-lead').inner_text() == project['overview']
            assert await page.locator('.story-body').inner_text() == project['engineering']
            count = len(galleries[slug]['images'])
            assert await page.locator('.gallery:visible .gallery-zoom').count() == count, slug
            assert await page.locator('.gallery figcaption').count() == 0
            assert await page.locator('.gallery:visible .gallery-zoom img').evaluate_all(
                '(images)=>images.map(i=>new URL(i.src).pathname).sort()'
            ) == sorted(image['src'] for image in galleries[slug]['images']), slug

        for design in DESIGNS:
            await visit('/design/' + design['slug'] + '/')
            assert await page.locator('h1').inner_text() == design['title']
            assert await page.locator('.gallery:visible .gallery-zoom').count() == len(design['images'])

        for label, href in [('GitHub', 'https://github.com/sujoy-kr'), ('LinkedIn', 'https://www.linkedin.com/in/sujoykarmakar')]:
            assert await page.locator('footer').get_by_role('link', name=label, exact=True).get_attribute('href') == href

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
        await page.locator('.lightbox-canvas img').dblclick()
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
        assert await page.locator('.gallery:visible .gallery-zoom').count() == len(galleries['instagram-clone']['images'])

        await page.set_viewport_size({'width': 390, 'height': 844})
        await visit('/projects/')
        await page.get_by_role('button', name='Open menu', exact=True).click()
        await page.locator('#site-nav').get_by_role('link', name='Work', exact=True).click()
        assert await page.locator('.menu-button').get_attribute('aria-expanded') == 'false'
        await page.get_by_role('button', name='Open menu', exact=True).click()
        await page.locator('#site-nav').get_by_role('link', name='Contact', exact=True).click()
        await page.wait_for_url('**/contact/')
        assert await page.locator('.menu-button').get_attribute('aria-expanded') == 'false'
        for mode in ['dark', 'light']:
            if mode == 'light':
                await page.get_by_role('button', name='Switch to light mode').click()
            for route in ['/', '/projects/', '/design/', '/about/', '/contact/', '/projects/nextset/', '/projects/safoyana/']:
                await visit(route)
                await theme(mode)
                assert await page.evaluate('document.documentElement.scrollWidth <= window.innerWidth'), (mode, route)
                if route == '/':
                    await page.screenshot(path=str(shots / f'home-{mode}-mobile.png'), full_page=True)
                if route == '/projects/':
                    await page.get_by_role('button', name='Mobile', exact=True).click()
                    assert await page.locator('main .grid .card').count() == 2
                    await page.screenshot(path=str(shots / f'projects-{mode}-mobile.png'))
        await page.set_viewport_size({'width': 320, 'height': 760})
        await visit('/')
        assert await page.evaluate('document.documentElement.scrollWidth <= window.innerWidth'), '320px home'

        await page.get_by_role('button', name='Change language', exact=True).click()
        await page.get_by_role('option', name='বাংলা', exact=True).click()
        assert await page.locator('html').get_attribute('lang') == 'bn'
        await page.reload(wait_until='networkidle')
        assert await page.locator('html').get_attribute('lang') == 'bn'
        await visit('/projects/')
        await page.get_by_role('searchbox', name='প্রকল্প খুঁজুন').fill('Kotlin')
        assert await page.locator('main .grid .card').count() == 1
        await page.get_by_role('button', name='ভাষা পরিবর্তন করুন', exact=True).click()
        await page.get_by_role('option', name='English', exact=True).click()
        assert await page.locator('html').get_attribute('lang') == 'en'

        # Narrow phones, tablets, both languages, and short landscape navigation.
        for width in [320, 375, 600, 820]:
            await page.set_viewport_size({'width': width, 'height': 740})
            for lang in ['en', 'bn']:
                for route in ['/', '/contact/', '/projects/', '/about/', '/projects/nextset/']:
                    await visit(route + '?lang=' + lang)
                    assert await page.evaluate('document.documentElement.scrollWidth <= innerWidth'), (width, lang, route)
                    if width <= 600:
                        for selector in ['.menu-button', '.theme-toggle', '.lang-button']:
                            box = await page.locator(selector).bounding_box()
                            assert box['width'] >= 44 and box['height'] >= 44, (width, selector, box)

        await page.set_viewport_size({'width': 568, 'height': 280})
        await visit('/?lang=en')
        await page.get_by_role('button', name='Open menu', exact=True).click()
        await page.keyboard.press('Tab')
        assert await page.locator('#site-nav a').first.evaluate('(el) => el === document.activeElement')
        await page.keyboard.press('Escape')
        assert await page.locator('.menu-button').evaluate('(el) => el === document.activeElement')
        await page.get_by_role('button', name='Open menu', exact=True).click()
        await page.locator('#site-nav').get_by_role('link', name='Contact', exact=True).click()
        await page.wait_for_url('**/contact/')
        assert await page.locator('.menu-button').get_attribute('aria-expanded') == 'false'

        await page.set_viewport_size({'width': 320, 'height': 740})
        await visit('/projects/nextset/')
        await page.get_by_role('button', name='Enlarge', exact=False).first.click()
        assert await page.locator('.lightbox').evaluate('(el) => el.scrollWidth <= innerWidth')
        await page.get_by_role('button', name='Zoom in', exact=True).click()
        assert await page.get_by_role('button', name='Reset zoom', exact=True).inner_text() == '150%'
        await page.get_by_role('button', name='Close enlarged image', exact=True).click()

        response = await page.goto(BASE + '/projects/nonexistent-project/', wait_until='networkidle')
        assert response.status == 404, response.status
        assert not errors, errors
        await browser.close()
    print(f'PASS: {len(PROJECTS)} project and {len(DESIGNS)} design pages; images, source links, footer links, theme/language persistence, gallery controls, search/filter, mobile navigation/layouts, and 404 responses. No browser exceptions.')

if __name__ == '__main__':
    asyncio.run(main())
