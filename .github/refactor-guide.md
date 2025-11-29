# Hướng dẫn Refactor (Quy trình và Tiêu chí)

## 1) Xác định rõ đối tượng
- Mô tả đối tượng cần refactor: module/screen/component/hook/service.
- Liệt kê file liên quan bằng path aliases (ví dụ: `@screens/home`, `@hooks/useTheme`).
- Nêu lý do refactor: nợ kỹ thuật, trùng lặp, khó bảo trì, vi phạm pattern (theme/i18n/navigation).

## 2) Xác định phạm vi ảnh hưởng
- Phạm vi code: màn hình, components, hooks, services, navigation.
- Ảnh hưởng đến:
  - UI/UX (theme tokens, i18n keys).
  - Luồng điều hướng (typed navigation).
  - Dịch vụ Firebase (auth/firestore).
  - Kiểm thử (Jest + RTL).
- Rủi ro: thay đổi API, types, behavior, cấu hình (babel/tsconfig), performance.

## 3) Đánh giá tính khả thi
- Tiêu chí:
  - Tuân thủ kiến trúc đã thiết lập (modular screen, theme, i18n, typed navigation).
  - Không dùng đường dẫn tương đối, chỉ dùng path aliases.
  - Không phá vỡ TypeScript strict (không dùng `any`).
  - Có thể viết unit tests tái hiện behavior cũ.
  - Thời gian thực hiện và độ rủi ro chấp nhận được.
- Kết luận: Khả thi / Không khả thi + lý do.

## 4) Xác nhận người dùng
- Trình bày phương án (tối thiểu 2 lựa chọn nếu có):
  - Phương án A: Hotfix cục bộ, thay đổi nhỏ.
  - Phương án B: Tái cấu trúc bền vững, tách module/hook/service.
- Người dùng đồng ý với phương án nào thì mới tiến hành refactor.

## 5) Quy tắc an toàn khi refactor
- Không thay đổi giá trị ngoài phạm vi đối tượng đã xác định.
- Không chạm vào dữ liệu/logic không có trong phương án được người dùng đồng ý.
- Bảo toàn:
  - Theme tokens, spacing, typography.
  - i18n keys và ngữ nghĩa (có ở `en.json` và `vi.json`).
  - Typed navigation và param lists.
  - Hợp đồng API services (nếu không nằm trong đối tượng).

## 6) Quy trình thực hiện
1. Tạo nhánh theo task: `refactor/<module-name>-<short-desc>`.
2. Viết kế hoạch ngắn gọn (files, thay đổi dự kiến, rủi ro).
3. Viết/ cập nhật tests mô tả behavior hiện tại.
4. Thực hiện refactor theo phương án đã duyệt.
5. Chạy kiểm tra:
   - `npm run validate` (type-check + lint + format:check)
   - `npm test` (bao gồm các case liên quan)
6. Tự review phạm vi ảnh hưởng, kiểm tra UI trên iOS/Android.
7. Tạo PR kèm:
   - Mô tả đối tượng, phạm vi, tính khả thi, phương án đã chọn.
   - Danh sách files thay đổi bằng path aliases.
   - Kết quả test và ảnh chụp màn hình nếu UI thay đổi.

## 7) Ghi chú rõ ràng (Logging & Docs)
- Ghi commit theo chuẩn:
  - `refactor(screen/home): tách styles, bổ sung types, giữ nguyên behavior`
- Cập nhật tài liệu nếu pattern thay đổi:
  - `ARCHITECTURE.md`, `THEME_GUIDE.md`, hoặc `documents/DEVELOPMENT_ROADMAP.md`.

## 8) Không thể refactor
- Nếu không đủ thông tin, rủi ro quá lớn, hoặc vi phạm các bắt buộc (theme/i18n/types/Firebase), trả lời: “không” và nêu rõ lý do + thông tin cần bổ sung.

## Checklist trước khi merge
- [ ] Đối tượng refactor rõ ràng
- [ ] Phạm vi ảnh hưởng đã phân tích
- [ ] Tính khả thi đã đánh giá và được người dùng đồng ý
- [ ] Không thay đổi dữ liệu/giá trị ngoài phạm vi
- [ ] Tuân thủ path aliases, theme, i18n, typed navigation
- [ ] Tests đầy đủ và pass `npm run validate` + `npm test`