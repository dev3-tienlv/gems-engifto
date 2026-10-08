# Claude Startups — thông tin để hoàn thiện Engifto

Đọc nguồn chính thức ngày **08/10/2026**. Điều kiện và quyền lợi có thể thay đổi; kiểm tra lại trước khi submit.

## Điều kiện chính thức được công bố

Từ [FAQ Claude Startups](https://claude.com/fr/programs/startups):

- Startup thành lập trong **5 năm gần đây**, **hoặc** được cấp vốn trong **2 năm gần đây**.
- Có tài khoản **Claude Console**.
- Có **email công việc trùng domain website**. Ví dụ mailbox thật thuộc `engifto.com` nếu website dùng domain đó.
- Có mô tả ngắn về thứ đang xây dựng; tuân thủ chính sách hỗ trợ của Anthropic.
- Không bắt buộc vốn VC: có thể bootstrapped, pre-seed hoặc đã được đầu tư.
- Tất cả hồ sơ được xét. FAQ nêu phần lớn xử lý trong vài phút, hồ sơ thủ công thường **2–3 ngày làm việc**; đây không phải cam kết SLA.

[Điều khoản chương trình](https://www.anthropic.com/startup-program-official-terms) (trang ghi cập nhật 22/05/2025) cho biết Anthropic có thể xét **business traction, investment/funding, Claude integration and usage**. Quyết định thuộc Anthropic. Website đẹp hoặc dùng phong cách Claude không bảo đảm được duyệt. Điều khoản còn có giới hạn pháp lý và khu vực; kiểm tra chính sách hỗ trợ hiện hành cho pháp nhân và thị trường thực tế.

Trang hiện công bố **$1,000 Claude API credits**, một năm Claude Team cho tối đa năm Premium seats nếu mới dùng Team, cùng ưu đãi đối tác. Không nên nhầm với mức credits bổ sung dành cho công ty được VC đối tác hỗ trợ. Credits gắn với Claude API qua Console, không dùng trên Bedrock/Vertex; FAQ nêu hạn credits là sáu tháng sau khi cấp.

## Nên có trên website — khuyến nghị, không phải tiêu chí bắt buộc được công bố

- Một mô tả cụ thể: sản phẩm giải quyết vấn đề gì, cho ai.
- Use case thực tế hoặc demo nếu đã có; ghi đúng stage nếu chưa launch.
- Thông tin nhận diện doanh nghiệp/đội ngũ đủ để đối chiếu, chỉ dùng thông tin đã xác nhận.
- Liên hệ hoạt động và domain truy cập công khai qua HTTPS.
- Nếu dùng Claude: phân biệt **đang sử dụng** với **dự kiến sử dụng**, nêu task thực tế thay vì khẩu hiệu AI chung chung.
- Privacy policy nếu sản phẩm bắt đầu thu thập dữ liệu cá nhân; bản landing hiện không có form hoặc analytics.

## Thông tin cần sếp xác nhận

- Engifto là sản phẩm/thương hiệu của pháp nhân nào? Quan hệ với GemsUnited là gì?
- Ngày thành lập của công ty nộp hồ sơ; tình trạng và ngày funding nếu có. Domain mới không chứng minh công ty mới thành lập.
- Tên sản phẩm, khách hàng mục tiêu, tính năng đã có, roadmap dự định làm.
- Claude sẽ hỗ trợ task nào? Đã tích hợp hay chỉ đang lên kế hoạch?
- Tên người đăng ký, email domain hoạt động, tài khoản Console và thông tin đội ngũ thật.
- Traction và funding chỉ ghi khi có dữ liệu thật.

Nếu hồ sơ thuộc GemsUnited, thông tin pháp nhân phải là của GemsUnited; không tạo một công ty mới trên giấy chỉ vì dùng domain Engifto.

## Nguồn nội dung tạm cho landing

[GemsUnited homepage](https://www.gemsunited.com/) và [About](https://www.gemsunited.com/about-us) mô tả hoạt động B2B POD, creative, fulfillment, growth, tools/data/automation. Từ đó bản Engifto tạm chọn ba hướng: **insights, creative workflows, operations**. Định hướng dùng AI là đề xuất cho khung, **không phải thông tin được xác nhận từ GemsUnited**.

Những dữ kiện **không chuyển sang Engifto**: năm thành lập 2025, hơn 20 quốc gia, mục tiêu top 5, SLA dispatch, địa chỉ Đà Nẵng, email HR, danh sách khách hàng hay thành tích. Sếp có thể thay hoàn toàn định hướng trong `src/content/site.ts`.

## Trước khi nộp

- [ ] Xác nhận eligibility của pháp nhân và đối chiếu thông tin trên website/hồ sơ.
- [ ] Hoàn thiện copy sản phẩm thật; giữ stage và kế hoạch AI chính xác.
- [ ] Kích hoạt domain, cấu hình HTTPS và mailbox `@engifto.com`.
- [ ] Deploy production, truy cập được không cần đăng nhập/Vercel protection.
- [ ] Chuyển `indexable` khi nội dung đã sẵn sàng; indexing không được trang chương trình nêu là điều kiện bắt buộc.
- [ ] Đăng nhập Claude Console, kiểm tra lại [form chính thức](https://platform.claude.com/offers/startups-application), điền thông tin thật và điều khoản hiện hành.

Form nằm sau đăng nhập và chưa được kiểm tra trường chi tiết trong phiên này. Không tự nộp hồ sơ.
