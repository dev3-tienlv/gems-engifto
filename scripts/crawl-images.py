"""Download selected Burst photos locally and retain their source/license metadata."""
from concurrent.futures import ThreadPoolExecutor
from html.parser import HTMLParser
from pathlib import Path
import json
import subprocess
from urllib.parse import urlparse, urlunparse
from PIL import Image

PHOTOS = [
    ('hero', 'a-minimal-yet-cosy-workspace'),
    ('story', 'tidy-desk-in-window-light'),
    ('notebook', 'notebook-and-glasses'),
    ('journal', 'closed-notebook-with-a-pen-and-a-persimmon-on-top-of-it'),
    ('sketchbook', 'blank-notebook-on-creative-workspace'),
    ('pencils', 'writing-stationary'),
    ('notebook-set', 'three-notebooks-against-a-pink-background'),
    ('calligraphy', 'white-feather-quill-laid-next-to-an-ink-bottle'),
    ('pen-cup', 'pink-cup-full-of-pens'),
    ('silver-lamp', 'silver-lamp-on-a-white-table-next-to-books'),
    ('pipe-lamp', 'modern-light-with-pipe-base'),
    ('faux-plant', 'artificial-plant-in-white-pot'),
    ('bowl-planter', 'detailed-view-of-green-succulent-plant-in-a-white-pot'),
    ('ceramic-planter', 'green-potted-plant-in-the-middle-frame'),
    ('daily-planner', 'blank-notepad-on-a-desk'),
    ('floral-notebook', 'a-floral-notebook-on-a-green-table-with-bejewelled-pen'),
    ('blush-notebook', 'pink-notebook-and-pink-pen'),
    ('travel-journal', 'open-notebook-on-world-map'),
    ('fine-tip-pen', 'fine-tipped-pen-for-writing'),
    ('colored-pencils', 'newly-sharpened-colored-pencils'),
    ('marker-set', 'a-hand-holds-four-coloured-markers'),
    ('artist-brushes', 'a-paintbrush-trails-white-paint-on-purple-paper'),
    ('wood-calendar', 'wooden-calendar-sits-on-a-white-background'),
    ('white-clock', 'white-alarm-clock'),
    ('gold-clock', 'black-and-gold-clock-sits-on-a-white-table'),
    ('ceramic-mug', 'grey-coffee-mug'),
    ('enamel-mug', 'a-blue-kettle-and-tin-mug-against-a-blue-background'),
    ('woven-coaster', 'white-mug-coaster-sits-on-a-grey-blanket'),
    ('cedar-candle', 'cedarwood-and-moss-candle'),
    ('wood-wick-candle', 'wood-wick-jar-candle'),
    ('wood-frame', 'person-hanging-a-wooden-frame-on-a-white-wall'),
    ('studio-headphones', 'black-and-white-black-headphones'),
    ('compact-keyboard', 'minimal-workstation-with-keyboard'),
    ('vintage-lamp', 'vintage-lamp-and-house-plant'),
]
ROOT = Path(__file__).resolve().parents[1]
DEST = ROOT / 'public/images'
DEST.mkdir(parents=True, exist_ok=True)
existing = {item['file']: item for item in json.loads((DEST / 'sources.json').read_text())} if (DEST / 'sources.json').exists() else {}

class PhotoPage(HTMLParser):
    def __init__(self):
        super().__init__()
        self.license = None
        self.title = None
        self.image = None
    def handle_starttag(self, tag, attrs):
        data = dict(attrs)
        if tag == 'a' and '/licenses/' in data.get('href', ''):
            self.license = 'https://www.shopify.com' + data['href'] if data['href'].startswith('/') else data['href']
        if tag == 'meta' and data.get('property') == 'og:title':
            self.title = data.get('content')
        if tag == 'meta' and data.get('property') == 'og:image':
            self.image = data.get('content')

def download(item):
    key, slug = item
    page_url = f'https://www.shopify.com/stock-photos/photos/{slug}'
    cached = existing.get(f'/images/{key}.webp')
    if cached and cached['sourcePage'] == page_url and (DEST / f'{key}.webp').exists():
        with Image.open(DEST / f'{key}.webp') as image:
            image.verify()
        return cached
    page_path = Path('/tmp') / f'engifto-photo-{slug}.html'
    if not page_path.exists() or 'og:image' not in page_path.read_text():
        subprocess.run(['curl', '-L', '--fail', '--retry', '2', '--retry-all-errors', '--max-time', '30', '-s', page_url, '-o', str(page_path)], check=True)
    page = PhotoPage()
    page.feed(page_path.read_text())
    width = 1500 if key in ('hero', 'story') else 1000
    parsed = urlparse(page.image or '')
    if parsed.scheme != 'https' or parsed.hostname != 'burst.shopifycdn.com':
        raise ValueError(f'No approved Burst image on {page_url}')
    image_url = urlunparse(parsed._replace(query=f'width={width}&format=pjpg&exif=0&iptc=0'))
    image_path = DEST / f'{key}.webp'
    raw_path = Path('/tmp') / f'engifto-image-{slug}-{width}.jpg'
    raw_valid = False
    if raw_path.exists():
        try:
            with Image.open(raw_path) as cached_image:
                cached_image.verify()
            raw_valid = True
        except (OSError, SyntaxError):
            pass
    if not raw_valid:
        subprocess.run(['curl', '-L', '--fail', '--retry', '2', '--retry-all-errors', '--max-time', '30', '-s', image_url, '-o', str(raw_path)], check=True)
    with Image.open(raw_path) as image:
        image.convert('RGB').save(image_path, 'WEBP', quality=82, method=6)
    print(f'Ready: {key}', flush=True)
    return {'file': f'/images/{key}.webp', 'title': page.title or slug, 'sourcePage': page_url,
            'sourceImage': image_url, 'license': page.license or 'https://www.shopify.com/stock-photos/legal/terms',
            'downloaded': '2026-10-08', 'use': 'Representative sample-catalog photography; not verified inventory.'}

with ThreadPoolExecutor(max_workers=4) as pool:
    manifest = list(pool.map(download, PHOTOS))
(DEST / 'sources.json').write_text(json.dumps(manifest, indent=2) + '\n')
print(f'Downloaded {len(manifest)} local photos; credits written to public/images/sources.json.')
