# Car Shop Management System

The case study uses the unmodified [Java application](https://github.com/sujoy-kr/Car-shop-management-system-GUI), downloaded to `.local-projects/Car-shop-management-system-GUI` at commit `71ddc4f7775a71face7902d12bf6497d68734a7f`.

Eight captures document profile creation, the customer showroom, inventory administration, sports-car entry, the sports showroom, a performance estimate, purchase confirmation and the updated customer log. Alex Rahman, Demo Avenue, DEMO-0001 and the added BMW are fictional demonstration data entered through the application's controls. Existing seed vehicles come from its source.

The capture driver runs the actual Swing UI on an isolated X display, triggers its action listeners, and exports Swing's rendered components at 2× resolution. Window-manager decorations and the desktop are excluded. No application source is changed and no interface is reconstructed. The eight lossless WebP captures in `public/images/car-shop-management-system/` are the retained originals and also supply the cover renderer. Pixel-identical intermediate PNG copies were removed.

## Reproduce

Requires Java 17+, an X display (Xvfb is suitable), and the downloaded repository. Build into a temporary directory; the application's JUnit files are excluded from this UI build:

```sh
mkdir -p .local-projects
git clone https://github.com/sujoy-kr/Car-shop-management-system-GUI.git .local-projects/Car-shop-management-system-GUI
git -C .local-projects/Car-shop-management-system-GUI checkout 71ddc4f7775a71face7902d12bf6497d68734a7f
mkdir -p /tmp/car-shop-classes
javac -d /tmp/car-shop-classes \
  $(rg --files .local-projects/Car-shop-management-system-GUI/src -g '*.java' -g '!**/*Test.java') \
  scripts/capture-car-shop/CaptureCarShop.java
DISPLAY=:97 java -Dawt.useSystemAAFontSettings=on -Dswing.aatext=true \
  -cp /tmp/car-shop-classes CaptureCarShop \
  /tmp/car-shop-screenshots
```

Convert the eight PNGs in numeric order to `public/images/car-shop-management-system/image1.webp` through `image8.webp`, preserving their dimensions with lossless encoding. The existing cover renderer reproduces the thumbnail:

```sh
node scripts/render-covers.mjs --playwright-dir /path/to/node_modules --slug car-shop-management-system
npm run images
```

The cover follows Plaidea's asymmetric screenshot mosaic, with square edges, black gutters and a single 30% black veil. It uses original screenshot crops, the existing CSS renderer and a 3200 × 1800 lossless export. Its editable layout and crops live in `scripts/cover-specs.json`; the HTML and PNG master live in `docs/design/covers/`. It has no generated art-direction image.

## Verification

The repository's tests were compiled with the JUnit Platform Console Standalone 1.10.0 dependency and run against the unmodified source: **31 tests passed**. This runner supplies the parameterized-test dependency used by the source. The capture driver also exercises signup, sports-car addition and purchasing through the UI.

This is an academic, in-memory desktop application. Profiles are local session records; the administration toggle is not an authentication boundary, and purchases do not process payments.
