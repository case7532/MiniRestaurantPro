# Phân Tích Vấn Đề Phạm Vi Lớn (Ảnh hưởng nhiều components)

Mục đích: Chuẩn hóa cách đánh giá và xử lý các thay đổi/bug có “blast radius” lớn, ảnh hưởng nhiều
components/screens/services. Tài liệu này giúp ra quyết định Go/No-Go, giảm rủi ro và bảo toàn hành
vi hiện có.

## 1) Tiêu chí phân loại “phạm vi lớn”

- Ảnh hưởng ≥ 3 screens hoặc ≥ 5 components chung.
- Tác động đến các lớp nền tảng: theme, i18n, navigation, services (Firebase), hoặc cấu hình build.
- Yêu cầu cập nhật nhiều translation keys hoặc thay đổi API/types dùng rộng rãi.
- Nguy cơ phá vỡ TypeScript strict hoặc path aliases.

## 2) Bối cảnh & Mục tiêu

- Mô tả ngắn vấn đề:
- Mục tiêu kỳ vọng (KPI/tiêu chí chấp nhận):
- Giả định/ràng buộc (nền tảng, phiên bản, thời gian):

## 3) Đối tượng & Phạm vi ảnh hưởng

- Đối tượng chính: module/screen/component/hook/service
- Danh sách ảnh hưởng (dùng path aliases, không dùng relative):
  - Screens: @screens/...
  - Components: @components/...
  - Hooks: @hooks/...
  - Services (Firebase): @services/api/...
  - Styles/Theme: @styles/theme
  - i18n: @i18n/locales/{en,vi}.json
  - Navigation: @screens/RootNavigation
  - Utils/Types: @utils/_, @types/_
- Ngoài phạm vi (explicitly out-of-scope):

## 4) Đồ thị phụ thuộc (Dependency Mapping)

- Inbound: ai gọi/tiêu thụ đối tượng?
- Outbound: đối tượng phụ thuộc những gì? (theme tokens, i18n keys, navigation types, Firebase
  collections)
- Điểm tích hợp có rủi ro cao (breaking contract):

## 5) Phân tích tác động theo lớp

- UI/UX: thay đổi cấu trúc/props/behavior components?
- Theme: có thêm/sửa tokens không? (màu, spacing, typography, shadows)
- i18n: thêm/sửa/xóa keys nào? Bắt buộc cập nhật cả en + vi.
- Navigation: thay đổi param list, screen names, luồng?
- Services/Firebase: collection, security rules, modular import?
- Types/Contracts: thay đổi public types/props?
- Performance: render count, bundle size, network IO?
- Build/Config: tsconfig, babel, pods, Android/iOS setup?

## 6) Rủi ro & Giảm thiểu

- Rủi ro chính:
- Biện pháp:
  - Viết unit tests bao phủ behavior hiện tại.
  - Feature flag/kill switch nếu có thể.
  - Rollout theo giai đoạn, theo màn hình/tính năng.
  - Giữ API cũ trong thời gian chuyển tiếp (deprecate).

## 7) Phương án giải pháp & Tính khả thi

- Phương án A (thay đổi nhỏ/hotfix):
  - Ưu/nhược điểm, ước lượng thời gian, rủi ro.
- Phương án B (tái cấu trúc bền vững):
  - Ưu/nhược điểm, ước lượng thời gian, rủi ro.
- Tính khả thi (Feasibility):
  - Tuân thủ kiến trúc (theme/i18n/typed navigation/path aliases/TS strict).
  - Khả năng viết tests bảo toàn hành vi.
  - Tác động release và đội ngũ.
- Kết luận đề xuất (A/B), lý do.

## 8) Kế hoạch thực hiện (sau khi người dùng đồng ý)

1. Nhánh: refactor/fix/<scope>-<short>
2. Kế hoạch chi tiết (files/commits theo path aliases)
3. Tests:
   - Viết trước: use cases hiện tại (Jest + RTL)
   - Bổ sung tests cho edge cases
4. Thực thi thay đổi (giữ nguyên hành vi ngoài phạm vi đối tượng)
5. Chạy kiểm tra:
   - npm run validate
   - npm test
6. Kiểm tra thủ công iOS/Android
7. PR: mô tả phạm vi, rủi ro, kết quả test, screenshots nếu có

Lưu ý bắt buộc khi triển khai:

- Không thay đổi giá trị/logic ngoài đối tượng và phương án đã được người dùng đồng ý.
- Không hardcode — luôn dùng theme tokens.
- Mọi text dùng i18n (cập nhật en + vi).
- Chỉ dùng path aliases.
- Duy trì typed navigation.
- Dùng @react-native-firebase (không dùng web SDK).

## 9) Kế hoạch giám sát & Rollback

- Theo dõi: lỗi runtime, logs, chỉ số hiệu năng.
- Điểm kiểm soát: feature flag, version gate.
- Rollback plan: revert commit/PR, tắt flag, khôi phục API cũ.

## 10) Go / No-Go

- Điều kiện Go:
- Điều kiện No-Go:
- Quyết định cuối cùng: Go / No-Go (kèm người phê duyệt)

## Checklist nhanh

- [ ] Đối tượng và phạm vi ảnh hưởng rõ ràng
- [ ] Phân tích dependency và rủi ro hoàn tất
- [ ] Phương án A/B và đánh giá khả thi
- [ ] Người dùng đồng ý phương án
- [ ] Tests đầy đủ, pass npm run validate + npm test
- [ ] Tuân thủ theme, i18n, path aliases, typed navigation
- [ ] Kế hoạch rollback sẵn sàng

## Mẫu điền nhanh (Template)

- Tiêu đề: <Tên vấn đề lớn>
- Mục tiêu: <KPI/acceptance>
- Đối tượng: <module/screen/component>
- Ảnh hưởng: <@screens/.., @components/.., @services/..>
- Rủi ro: <...>
- Phương án chọn: <A/B>, thời gian: <...>
- Quyết định: <Go/No-Go>, Người duyệt: <...>
