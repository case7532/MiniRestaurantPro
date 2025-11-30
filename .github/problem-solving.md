# Problem-Solving Skill Guide

## 1) Hiểu ngữ cảnh

- Thu thập thông tin: mục tiêu kinh doanh, phạm vi tính năng, kiến trúc hiện có, ràng buộc kỹ thuật.
- Đọc tài liệu nội bộ: ARCHITECTURE.md, THEME_GUIDE.md, PROJECT_OVERVIEW.md, DEVELOPMENT_ROADMAP.md.
- Kiểm tra cấu hình và quy ước: path aliases, theme, i18n, navigation types, Firebase
  (react-native-firebase).

## 2) Làm rõ vấn đề

- Xác định mô tả vấn đề: triệu chứng, màn hình/flow bị ảnh hưởng, môi trường (iOS/Android), phiên
  bản.
- Đặt câu hỏi cụ thể: khi nào xảy ra, bước tái hiện, log/error, kỳ vọng vs thực tế.
- Chuẩn hóa đầu ra mong muốn: KPI/tiêu chí chấp nhận, tác động đến người dùng.

## 3) Phân tích và tìm nguyên nhân

- Reproduce: tạo kịch bản tái hiện tối thiểu.
- Kiểm tra lớp liên quan: UI (screens/components), hooks, services, navigation, i18n, theme,
  Firebase.
- Dùng công cụ: Metro logs, React Native Debugger, console tracing, Jest unit tests, TypeScript
  strict.
- Phân loại nguyên nhân:
  - Cấu hình (aliases, babel, pods).
  - Dữ liệu/i18n keys thiếu hoặc sai.
  - Styles không tuân theme.
  - Navigation types/params sai.
  - Firebase modular import hoặc quyền/collection.
  - State/context không đồng bộ.

## 4) Đưa ra giải pháp (có thể nhiều hơn 1)

- Giải pháp nhanh (hotfix):
  - Sửa import theo aliases.
  - Bổ sung i18n keys cả en/vi.
  - Cập nhật types cho navigation, props.
  - Điều chỉnh styles dùng theme tokens.
- Giải pháp bền vững:
  - Viết unit tests cho case lỗi.
  - Trích xuất logic vào services + hooks.
  - Thêm guard, fallback i18n, error boundaries.
  - Document hóa flow và cập nhật ROADMAP.
- Đánh giá trade-offs: thời gian, rủi ro, phạm vi ảnh hưởng, khả năng mở rộng.

## 5) Không thể giải quyết

- Nếu thiếu dữ liệu, không tái hiện được, hoặc ràng buộc kỹ thuật không cho phép:
  - Trả lời “không” kèm lý do rõ ràng.
  - Đề xuất thông tin cần bổ sung hoặc hướng thay thế.

## 6) Tổng kết và tóm tắt

- Mô tả ngắn: vấn đề, nguyên nhân, giải pháp đã chọn.
- Danh sách thay đổi cụ thể (files, commits).
- Kiểm thử: test cases, kết quả build/CI.
- Bài học/rủi ro còn lại và bước tiếp theo.

## Checklist nhanh

- [ ] Tuân path aliases
- [ ] Không hardcode — dùng theme tokens
- [ ] Text dùng i18n (keys có ở en + vi)
- [ ] Navigation có types đúng
- [ ] Firebase dùng @react-native-firebase, collections chuẩn
- [ ] Thêm/ cập nhật unit tests
- [ ] Chạy npm run validate trước commit
