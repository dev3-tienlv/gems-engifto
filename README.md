# Engifto

Landing page tiếng Anh, lấy cảm hứng thị giác từ Claude, xây bằng **Astro + TypeScript + CSS**. Web tĩnh, font tự host, không cần backend. Nội dung theo hướng **xây dựng và vận hành website thương mại điện tử**, được sếp xác nhận qua người dùng, tham khảo mô hình storefront của Goldfish Commerce.

## Chạy local

Node.js 24 LTS được đề xuất (`.nvmrc`); tối thiểu 22.12.

```bash
npm ci
npm run dev
```

Mở địa chỉ Astro in ra, mặc định `http://localhost:4321`.

```bash
npm run check
npm run build
npm run preview
```

## Khi sếp chốt nội dung

Chỉnh **`src/content/site.ts`**:

| Phần | Nơi chỉnh |
| --- | --- |
| Tiêu đề, mô tả Google và social | `seo` |
| Hero và CTA | `hero` |
| Giới thiệu công ty/sản phẩm | `about` |
| Sản phẩm, dịch vụ hoặc use case | `focus.items` |
| Quy trình | `approach` |
| Phần AI tùy chọn, hiện đang ẩn | `ai`, `sections.ai` |
| Câu hỏi thường gặp | `faq.items` |
| Liên hệ thật | `contactEmail` |
| Bật/tắt từng section | `sections` |

Navigation tự bỏ section đã tắt. CTA tự dùng email khi `contactEmail` có giá trị; mặc định dùng điều hướng trong trang, không tạo email giả hay form giả. Nếu thay đối tượng sử dụng hoặc sản phẩm, cập nhật cả FAQ và metadata để nội dung nhất quán.

Đổi bảng màu và font tại `src/styles/global.css` (các biến trong `:root`). Đổi domain tại `astro.config.mjs`; canonical và URL social image lấy từ đó. Favicon ở `public/favicon.svg`.

`indexable: false` hiện tạo `noindex, nofollow` và robots chặn crawler cho bản nháp. **Đây không phải bảo vệ truy cập**: ai có URL vẫn xem được; không chứa thông tin bí mật trong bản preview. Khi domain hoạt động và nội dung được xác nhận, chuyển `indexable: true`, build và deploy lại. Vercel Preview có thể vẫn bị Vercel thêm `X-Robots-Tag: noindex`; dùng deployment production cho website chính thức.

Ảnh chia sẻ hiện ở `public/og.png`. Sau khi thay hero, có thể tạo lại ảnh từ chính giao diện (cần Google Chrome cài trên máy):

```bash
npm run build
npm run preview
node scripts/generate-og.mjs
npm run build
```

## Deploy Vercel

Theo [hướng dẫn Astro chính thức](https://docs.astro.build/en/guides/deploy/vercel/), web Astro tĩnh không cần adapter Vercel.

1. Đưa repo lên GitHub/GitLab và import vào Vercel.
2. Framework preset: **Astro**; build: `npm run build`; output: **dist**; Node: **24.x**.
3. Dùng production branch đang chứa code; nếu đang dùng branch `feature/landing-page`, chọn branch này hoặc tích hợp vào `main` trước.
4. Deploy để lấy URL `.vercel.app` kiểm tra trước.
5. Khi domain kích hoạt, thêm `engifto.com` trong Project → Settings → Domains. Cấu hình DNS đúng giá trị Vercel hiển thị; không đoán bản ghi.
6. Thêm `www.engifto.com` nếu cần và redirect về domain chính. Kiểm tra HTTPS, mobile, liên kết và ảnh social.

Không cần biến môi trường hay database cho bản hiện tại. Domain Vercel **không tự tạo mailbox**; email `@engifto.com` cần dịch vụ email riêng và bản ghi DNS của nhà cung cấp.

## Kiểm tra trình duyệt

```bash
npm run build
npm test
```

Playwright dùng Google Chrome local (`channel: 'chrome'`), không cần tác động browser profile đang mở. Test kiểm tra menu bằng bàn phím, Escape, FAQ, anchor links, no-JS, trang 404, noindex và overflow ở 375/768/1024/1440px. Không có script lint riêng; `npm run check` kiểm tra TypeScript và Astro.

## Lưu ý nội dung

Website giới thiệu Engifto theo định hướng đã chốt: **e-commerce website operations**, gồm quản lý storefront, catalog/content và vận hành hằng ngày. Nội dung không còn định vị là concept POD. Phần AI được ẩn mặc định vì cách dùng thực tế chưa được xác nhận; chỉ bật lại khi có thông tin phù hợp.

Goldfish Commerce là website tham khảo, không phải nguồn pháp nhân hay thông tin liên hệ của Engifto. Không chuyển danh mục đồ bếp, sản phẩm/giá, ratings, tên LLC, địa chỉ Mỹ, hotline, điều kiện shipping/returns hay testimonials của Goldfish sang Engifto. Email liên hệ và thông tin pháp nhân vẫn cần dữ liệu thật trước khi xuất bản hoặc nộp hồ sơ.

Xem **[checklist Claude Startups](docs/claude-startups.md)** để chuẩn bị website và hồ sơ thật. Không có đăng ký chương trình, tích hợp Claude API hay deploy được thực hiện trong repo này.
