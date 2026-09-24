# HƯỚNG DẪN BUILD FILE .IPA (iOS) VÀ CÀI ĐẶT LÊN IPHONE / IPAD

Hệ thống đã cấu hình sẵn quy trình tự động hóa **GitHub Actions** chạy trên máy chủ Apple macOS đám mây để biên dịch ứng dụng thành file **`RioLanguages.ipa`**.

---

## BƯỚC 1: Đưa dự án lên GitHub

1. Truy cập [github.com](https://github.com/) và đăng nhập (hoặc tạo tài khoản miễn phí).
2. Tạo một kho lưu trữ mới (**New repository**):
   - Đặt tên Repository, ví dụ: `rio-languages`
   - Chọn chế độ **Public** hoặc **Private** tùy bạn.
3. Tải toàn bộ mã nguồn trong thư mục `g:\English app` lên GitHub:
   - Bạn có thể dùng phần mềm **GitHub Desktop**, hoặc kéo thả trực tiếp các thư mục và tệp tin lên trang web GitHub.
   - **Lưu ý quan trọng**: Đảm bảo có thư mục `.github/workflows/build-ios.yml` được tải lên.

---

## BƯỚC 2: Chạy Build và tải file .ipa về máy

1. Vào repository của bạn trên GitHub, bấm vào tab **Actions** ở menu phía trên.
2. Ở danh sách bên trái, chọn workflow: **Build iOS App (.ipa)**.
3. Bấm vào nút **Run workflow** -> Chọn nhánh `main` (hoặc `master`) -> Bấm **Run workflow**.
4. GitHub Actions sẽ tự động kích hoạt máy chủ macOS của Apple để:
   - Cài đặt môi trường Capacitor iOS.
   - Đồng bộ hóa toàn bộ giao diện và dữ liệu từ vựng.
   - Cấp quyền Microphone và Nhận diện giọng nói.
   - Dùng **Xcode** biên dịch dự án và đóng gói thành file **`RioLanguages.ipa`**.
5. Khi quy trình hiển thị dấu tích xanh lá cây (hoàn tất sau ~3 đến 5 phút):
   - Bấm vào lượt chạy đó.
   - Kéo xuống mục **Artifacts** ở dưới cùng.
   - Bấm tải file **`RioLanguages-iOS-IPA`** về máy tính của bạn (bên trong chính là file `RioLanguages.ipa`).

---

## BƯỚC 3: Cách cài đặt file .ipa lên iPhone / iPad

Do tệp `.ipa` này không tải qua App Store, bạn có thể cài trực tiếp lên iPhone cực kỳ đơn giản qua các công cụ Sideload phổ biến nhất hiện nay:

### Cách 1: Dùng Sideloadly (Khuyên dùng - Đơn giản nhất trên máy tính)
1. Tải công cụ miễn phí **Sideloadly** trên máy tính (hỗ trợ cả Windows & Mac): [sideloadly.io](https://sideloadly.io/).
2. Cắm iPhone/iPad vào máy tính qua dây cáp USB.
3. Mở Sideloadly, kéo thả file `RioLanguages.ipa` vào khung của phần mềm.
4. Nhập tài khoản Apple ID của bạn (chỉ dùng để ký chứng chỉ nhà phát triển cá nhân miễn phí của Apple) và bấm **Start**.
5. Khi cài xong: Trên iPhone vào **Cài đặt (Settings)** -> **Cài đặt chung (General)** -> **Quản lý VPN & Thiết bị (VPN & Device Management)** -> Chọn Apple ID của bạn và bấm **Tin cậy (Trust)**.
6. Mở app **Rio Languages** trên màn hình chính và trải nghiệm đầy đủ tính năng!

### Cách 2: Dùng AltStore hoặc TrollStore / Scarlet / Esign
- Nếu bạn đã có sẵn AltStore, TrollStore hoặc Scarlet trên iPhone, chỉ cần gửi file `RioLanguages.ipa` qua AirDrop / Telegram / Google Drive rồi chọn "Mở bằng AltStore/TrollStore" để cài đặt trực tiếp.
