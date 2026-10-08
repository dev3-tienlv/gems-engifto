# Engifto

Landing page tiếng Anh, lấy cảm hứng thị giác từ Claude, xây bằng **Astro + TypeScript + CSS**. Web tĩnh, font tự host, không cần backend. Nội dung tạm theo hướng công nghệ cho **personalized commerce / print-on-demand**, tham khảo GemsUnited.

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
| Kế hoạch ứng dụng AI | `ai` |
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

Đây là bản khung hoàn chỉnh về UI, **chưa phải hồ sơ công ty đã xác thực hay sản phẩm đang chạy**. Nội dung hiện tự nhận là early-stage concept, AI là proposed direction. GemsUnited là nguồn tham khảo ngành; không có tuyên bố Engifto là pháp nhân mới, công ty con hay thương hiệu của GemsUnited. Không dùng số liệu, năm thành lập, địa chỉ, email HR, SLA, ảnh nhân viên hay logo của GemsUnited.

Xem **[checklist Claude Startups](docs/claude-startups.md)** để chuẩn bị website và hồ sơ thật. Không có đăng ký chương trình, tích hợp Claude API hay deploy được thực hiện trong repo này.
