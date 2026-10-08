# Engifto

Storefront tiếng Anh cho **phụ kiện bàn làm việc, giấy viết và đèn**, xây bằng Astro + TypeScript + CSS. Giữ nền kem, Newsreader / DM Sans và màu đất nung lấy cảm hứng từ Claude. Thiết kế áp dụng UI/UX Pro Max với override để giữ nhận diện hiện tại.

## Chạy local

Node 24 LTS được đề xuất (`.nvmrc`); tối thiểu 22.12. Cần Google Chrome cho kiểm tra trình duyệt.

```bash
npm ci
npm run dev
```

Mở `http://localhost:4321`.

```bash
npm run test:unit
npm run check
npm run build
npm test
```

Chạy check và build lần lượt. Playwright khởi chạy bản production preview riêng ở port **4322**, không dùng lại dev server 4321.

## Có trong bản hiện tại

- Home, shop với search/category/sort và URL filters.
- 32 trang sản phẩm, chọn số lượng, giới hạn 10 mỗi sản phẩm.
- Giỏ hàng lưu trên trình duyệt, chỉnh số lượng, xóa sản phẩm, đồng bộ nhiều tab.
- Checkout có validation, shipping standard/express, tính tiền bằng integer cents.
- Xác nhận đơn **demo**; không thu tiền, gửi email hay tạo đơn thật.
- Our story, Help & contact, shipping/returns/privacy/terms, credits ảnh và 404.
- Responsive, keyboard navigation, no-JS browsing, font và ảnh tự host.

## Thay nội dung nhanh

| Nội dung | File |
| --- | --- |
| Hero, SEO, FAQ, email thật, indexability | `src/content/site.ts` |
| Sản phẩm, giá cents, danh mục, ảnh, mô tả | `src/content/catalog.ts` |
| Thông tin shipping/returns/privacy/terms | `src/content/policies.ts` |
| Phí giao hàng demo và giới hạn số lượng | `src/lib/cart.ts` |
| Bảng màu / font | `src/styles/global.css` |
| Layout storefront | `src/styles/store.css` |
| Domain canonical | `astro.config.mjs` |

Giá hiển thị USD. Standard $6.95, miễn phí từ subtotal $100; express $12.95. Đây là giá/phí mẫu, không phải chính sách bán hàng thật.

## Ảnh

34 ảnh đã crawl từ **Burst by Shopify**, đọc metadata nguồn, kiểm tra host CDN và chuyển thành WebP thật. File local ở `public/images/`; nguồn và license của từng ảnh ở `public/images/sources.json` và trang `/photography`. Không hotlink hoặc dùng ảnh sản phẩm từ Goldfish Commerce. Đây là ảnh minh họa cho catalog mẫu, chưa đối chiếu inventory.

Để crawl lại, cần Python + Pillow, curl và mạng:

```bash
python3 scripts/crawl-images.py
```

Tạo lại social image từ hero, khi local server 4321 đang chạy:

```bash
node scripts/generate-og.mjs
npm run build
```

Giao diện dùng nhãn **cart**, chữ nhỏ 13–16px, giá sản phẩm 22px và badge số lượng ở góc icon. Nút Add to cart dùng capsule charcoal và icon, hover màu đất nung. Các ghi chú demo/preview đã bỏ khỏi giao diện theo yêu cầu; backend thanh toán và fulfillment vẫn chưa tích hợp.

## Dữ liệu và checkout

`localStorage['engifto:bag:v1']` chỉ chứa product IDs và quantities. `sessionStorage['engifto:demo-order:v1']` chỉ chứa sản phẩm, số lượng, shipping option, mã demo và timestamp. Dữ liệu storage được kiểm tra; giá luôn lấy lại từ catalog. Không lưu hoặc truyền email/địa chỉ đã điền, không có trường thẻ, analytics, API thanh toán hay backend đặt hàng.

Nếu browser chặn lưu giỏ hàng, hiện cảnh báo và giữ tạm trên trang hiện tại; không thể giữ giữa các trang. Nếu không lưu được xác nhận demo, hiện xác nhận ngay tại checkout.

## Deploy Vercel

Astro static không cần adapter hoặc database cho bản demo.

1. Import repo **dev3-tienlv/gems-engifto** vào Vercel; production branch **main**.
2. Framework **Astro**, build `npm run build`, output **dist**, Node **24.x**.
3. Deploy lấy URL `.vercel.app` để kiểm tra.
4. Khi domain kích hoạt, thêm `engifto.com` và cấu hình DNS theo giá trị Vercel cung cấp. Kiểm tra HTTPS.
5. Thêm `www.engifto.com` nếu cần, redirect về domain chính.

`vercel.json` thiết lập CSP và các security headers. CSP hiện chặn gửi form và third-party scripts; phải điều chỉnh có chủ đích nếu thêm thanh toán/API thật. Kiểm tra header thực tế sau deploy.

`indexable: false` giữ bản nháp ngoài search bằng meta robots; không phải bảo vệ truy cập. `robots.txt` cho phép crawler đọc các trang công khai và chỉ chặn các route cart/checkout/confirmation; `/sitemap.xml` liệt kê 41 trang nội dung và sản phẩm. Chỉ bật sau khi nội dung thật được xác nhận. Vercel Preview có thể thêm noindex; dùng production deployment cho website chính thức. Domain không tự tạo mailbox.

## Trước khi bán hàng hoặc nộp Claude Startups

Thay catalog/ảnh mẫu bằng sản phẩm và quyền sử dụng thật; bổ sung pháp nhân và support contact; chốt giá, tồn kho, thuế và shipping/returns. Tích hợp nền tảng commerce, backend xác minh giá, thanh toán, webhook và fulfillment trước khi bật mua thật. Cập nhật privacy/terms theo hệ thống thực tế.

Xem [Claude Startups](docs/claude-startups.md). Website là phần trình bày hoạt động, không đảm bảo hồ sơ được duyệt. Repo chưa deploy hoặc submit hồ sơ.

Trang About nêu rõ sản phẩm, đối tượng phục vụ và mục tiêu của storefront; WebSite structured data không chứa pháp nhân hay lịch sử chưa xác nhận. Email giữ trống theo yêu cầu; bổ sung mailbox hoạt động ở `site.contactEmail` trước khi nộp Claude Startups.
