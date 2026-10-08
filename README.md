# Engifto

Website doanh nghiệp tiếng Anh cho **Engifto — workspace commerce**, kèm Collection chỉ để xem. Astro + TypeScript + CSS, UI/UX Pro Max, nền ivory, màu terracotta và font Newsreader / DM Sans.

## Chạy và kiểm tra

Node 24 LTS được đề xuất; tối thiểu 22.12. Cần Google Chrome cho Playwright.

```bash
npm ci
npm run dev
```

Local: `http://localhost:4321`.

```bash
npm run test:unit
npm run check
npm run build
npm test
```

Check/build chạy lần lượt. Playwright chạy production preview riêng ở port 4322.

## Website hiện tại

- Home, Company, Our approach và Contact mô tả mục tiêu, đối tượng, mô hình dự kiến và trải nghiệm đang xây.
- Our purpose có minh họa SVG gốc màu terracotta, responsive.
- Collection có 32 sản phẩm, search/category/sort và trạng thái URL.
- Ảnh hoặc tên sản phẩm dẫn tới detail; không có giá, ATC, số lượng, cart hay checkout trên giao diện.
- Các route cũ `/cart`, `/checkout`, `/order-confirmation` redirect tạm về `/shop`, ở Astro local và Vercel production.
- Không lưu selections, không đọc storage cũ, không thu thập email/địa chỉ, không gửi form, không analytics.
- Privacy/terms, credits ảnh và 404. Shipping/returns cũ giữ thông tin chưa triển khai thương mại.
- Cart/order utilities và dữ liệu giá trong catalog giữ nội bộ cho phát triển sau; không phải chức năng website hiện tại.

## Thay nội dung

| Nội dung | File |
| --- | --- |
| Hero, business copy, FAQ, email, indexability | `src/content/site.ts` |
| Sản phẩm, danh mục, ảnh, mô tả | `src/content/catalog.ts` |
| Privacy/terms và thông tin thương mại | `src/content/policies.ts` |
| Minh họa Our purpose | `src/components/PurposeArt.astro` |
| Màu và font | `src/styles/global.css` |
| Layout | `src/styles/store.css` |
| Domain canonical | `astro.config.mjs` |

Email giữ trống theo yêu cầu. Không tuyên bố pháp nhân, team, funding, traction hoặc tích hợp Claude chưa xác nhận.

## Ảnh

34 ảnh WebP local từ Burst by Shopify, nguồn/license ở `public/images/sources.json` và `/photography`. Ảnh minh họa chưa đối chiếu inventory; không lấy ảnh sản phẩm Goldfish.

```bash
python3 scripts/crawl-images.py
```

Tạo social image khi local server 4321 đang chạy:

```bash
node scripts/generate-og.mjs
npm run build
```

## Vercel

Import **dev3-tienlv/gems-engifto**, branch **main**, framework **Astro**, build `npm run build`, output `dist`, Node 24.x. Domain canonical `engifto.com`; DNS theo giá trị hiện tại Vercel cung cấp. Domain không tự tạo mailbox.

`vercel.json` giữ CSP và security headers, thêm redirects tạm cho route commerce cũ. `indexable: false` giữ bản nháp ngoài search; robots cho crawler đọc nội dung công khai và sitemap có 42 URL, không chứa route transactional.

Xem [định hướng website](docs/company-site.md) và [Claude Startups](docs/claude-startups.md). Xác nhận hướng doanh nghiệp, eligibility, pháp nhân và email domain thật trước khi nộp. Website không bảo đảm hồ sơ được duyệt.
