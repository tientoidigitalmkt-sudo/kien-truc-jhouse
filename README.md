# Kiến Trúc Jhouse — Luxury Interior Design Website

Phiên bản **React + TypeScript + Vite** được thiết kế và code lại theo mockup giao diện nội thất cao cấp Kiến Trúc Jhouse. Dùng layout warm minimalism, font editorial, màu champagne, giao diện desktop/mobile và đường dẫn thật.

## Xem giao diện ngay không cần cài đặt

Mở **`XEM_TRUOC.html`** trực tiếp bằng Chrome để xem **bản demo tĩnh** của Trang chủ (có responsive) và Portfolio (có bộ lọc). Đây chỉ là bản xem nhanh offline; mã nguồn React là bản website đầy đủ trong thư mục `src/`.

## Khởi chạy

Yêu cầu **Node.js 20+** và npm.

```bash
npm install
npm run dev
```

Mở địa chỉ được in trong terminal (thường là http://localhost:5173).

Đóng gói production:

```bash
npm run build
npm run preview
```

## Những trang đã code

- `/` — Trang chủ (hero 3 ảnh có điều khiển, thông tin, dịch vụ, dự án, triết lý, quy trình, blog, CTA).
- `/gioi-thieu` — Giới thiệu.
- `/dich-vu` — Dịch vụ, gồm ba trang chi tiết dưới `/dich-vu/:slug`.
- `/du-an` — Bộ sưu tập có bộ lọc theo loại hình và tìm kiếm.
- `/du-an/:slug` — Chi tiết dự án, gallery phóng to, phím mũi tên và ESC để điều khiển.
- `/quy-trinh` — Timeline 6 bước.
- `/blog` và `/blog/:slug` — Danh sách và bài viết mẫu.
- `/lien-he` — Form nhập và xác thực trường bắt buộc; tạo yêu cầu tư vấn và nút sao chép.
- Trang 404 và điều hướng history giúp back/forward hoạt động bình thường.

## QUAN TRỌNG trước khi xuất bản

Đây là **bản demo thiết kế**, đã cập nhật thương hiệu và thông tin liên hệ thực do người dùng cung cấp:

1. Thương hiệu đã cấu hình: **Kiến Trúc Jhouse**, địa chỉ **Phường Từ Sơn, TP.Bắc Ninh**, hotline **0986873126**, Gmail **kientrucjhouse@gmail.com**. Toàn bộ dữ liệu có trong `src/data/premium.ts`; nút gọi điện và đường dẫn email đã kích hoạt. Zalo chưa được thêm vì chưa có đường dẫn xác nhận.
2. **Ảnh dự án, tiêu đề dự án, diện tích, địa điểm, năm, số liệu 10+/350+/98% đều là NỘI DUNG MINH HỌA**, không phải thành tích/doanh nghiệp/công trình đã xác thực. Thay tất cả bằng tài sản, hồ sơ và số liệu chính thức. Trang demo có ghi chú để tránh hiểu nhầm.
3. Ảnh nội thất tải từ Unsplash (cần mạng) với ảnh dự phòng cắt từ mockup trong `public/images/fallback-*.jpg`. Nên thay hoàn toàn bằng hình ảnh đã được cấp phép của doanh nghiệp khi ra mắt.
4. Biểu mẫu liên hệ **chưa có backend hoặc lưu dữ liệu lên server**. Nút submit mở ứng dụng email với nội dung soạn sẵn gửi đến **kientrucjhouse@gmail.com**. Người dùng cần xác nhận gửi email trong ứng dụng; nếu thiết bị không có ứng dụng, có thể sao chép nội dung. Không có thông báo sai rằng yêu cầu đã được gửi thành công.
5. Để nhận lead trực tiếp qua backend, tích hợp Formspree, Supabase Edge Function, hệ thống CRM hoặc API có chống spam và thông báo quyền riêng tư.
6. Đây là SPA dùng Vite, có meta title/description phía client. Nếu cần SEO chuyên sâu (Google indexing nhất quán, rich snippets, sitemap tĩnh, SSR), nên prerender hoặc chuyển trang sang Next.js/Astro khi nội dung đã được chốt.

## Thiết kế / công nghệ

- Không phụ thuộc thư viện giao diện nặng, chỉ dùng React và `lucide-react`.
- CSS thiết kế thủ công trong `src/styles.css`, có breakpoint tablet/phone và `prefers-reduced-motion`.
- Cấu hình dự án, dịch vụ, bài viết và image fallback tại `src/data/premium.ts`.
- Deploy Vercel/Netlify có file rewrite SPA sẵn.
- Khi cần đổi font, chỉnh Google Fonts import trong `src/styles.css`; khi offline có font fallback.
