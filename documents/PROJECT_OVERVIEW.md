# 🏪 MiniRestaurantPro - Tổng quan Dự án

## 📋 Giới thiệu

**MiniRestaurantPro** là ứng dụng quản lý cửa hàng/nhà hàng toàn diện, được xây dựng bằng React Native với TypeScript và Firebase. Ứng dụng cung cấp giải pháp quản lý hoàn chỉnh cho các cửa hàng nhỏ và vừa, giúp tối ưu hóa quy trình vận hành và nâng cao hiệu suất kinh doanh.

## 🎯 Mục tiêu Dự án

- ✅ Số hóa quy trình quản lý cửa hàng/nhà hàng
- ✅ Giảm thiểu sai sót trong quản lý bán hàng và tồn kho
- ✅ Tăng cường khả năng theo dõi và báo cáo kinh doanh
- ✅ Tối ưu hóa quản lý nhân sự và phân quyền
- ✅ Cải thiện trải nghiệm khách hàng
- ✅ Hỗ trợ ra quyết định dựa trên dữ liệu thực tế

## 🌟 Tính năng Nổi bật

### 1. 📝 Quản lý Hóa đơn (Invoicing)
- Tạo hóa đơn bán hàng nhanh chóng
- Quản lý đơn hàng theo trạng thái (Pending, Confirmed, Completed, Cancelled)
- In hóa đơn và gửi qua email
- Lịch sử hóa đơn chi tiết
- Tìm kiếm và lọc hóa đơn theo nhiều tiêu chí
- Hỗ trợ nhiều hình thức thanh toán (Tiền mặt, Chuyển khoản, QR Code)
- Quản lý hóa đơn trả hàng/hoàn tiền

**Chi tiết:** [INVOICING.md](./INVOICING.md)

### 2. 📦 Quản lý Tồn kho (Inventory Management)
- Theo dõi số lượng hàng hóa real-time
- Cảnh báo hàng sắp hết/hết hàng
- Quản lý nhập/xuất kho
- Kiểm kê định kỳ
- Quản lý nhà cung cấp
- Theo dõi giá nhập, giá bán
- Quản lý hạn sử dụng sản phẩm
- Báo cáo tồn kho theo danh mục

**Chi tiết:** [INVENTORY.md](./INVENTORY.md)

### 3. 💰 Quản lý Bán hàng (Sales Management)
- POS (Point of Sale) interface thân thiện
- Quản lý menu/sản phẩm
- Tính năng tìm kiếm nhanh sản phẩm
- Áp dụng khuyến mãi/giảm giá
- Quản lý bàn (cho nhà hàng)
- Tách/gộp hóa đơn
- Quản lý khách hàng thân thiết
- Tích điểm và đổi quà

**Chi tiết:** [SALES.md](./SALES.md)

### 4. 👥 Quản lý Nhân sự (Staff Management)
- Quản lý thông tin nhân viên
- Phân quyền theo vai trò (Admin, Manager, Staff, Cashier)
- Chấm công và tính lương
- Quản lý ca làm việc
- Theo dõi hiệu suất nhân viên
- Quản lý nghỉ phép/tăng ca
- Lịch sử hoạt động nhân viên

**Chi tiết:** [STAFF_MANAGEMENT.md](./STAFF_MANAGEMENT.md)

### 5. 📊 Báo cáo và Thống kê (Reports & Analytics)
- Dashboard tổng quan kinh doanh
- Báo cáo doanh thu theo ngày/tháng/năm
- Thống kê sản phẩm bán chạy
- Phân tích xu hướng khách hàng
- Báo cáo lãi/lỗ
- Báo cáo hiệu suất nhân viên
- Export báo cáo (PDF, Excel)
- Biểu đồ trực quan

**Chi tiết:** [REPORTS.md](./REPORTS.md)

## 🏗️ Kiến trúc Hệ thống

### Tech Stack
- **Frontend:** React Native 0.82.1 + TypeScript 5.8.3
- **State Management:** Context API / Redux Toolkit
- **Navigation:** React Navigation v6
- **Backend:** Firebase (Authentication, Firestore, Storage)
- **Media Storage:** Google Drive
- **UI Framework:** Custom components với theme system
- **Internationalization:** i18next (English, Vietnamese)

### Kiến trúc
```
┌─────────────────────────────────────────────┐
│         Presentation Layer                  │
│    (Screens, Components, Hooks)             │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│           Business Logic Layer              │
│      (Services, Use Cases, Helpers)         │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│            Data Layer                       │
│   (Firebase, Local Storage, API)            │
└─────────────────────────────────────────────┘
```

**Chi tiết:** [ARCHITECTURE.md](../ARCHITECTURE.md)

## 👥 Người dùng Mục tiêu

### Vai trò trong Hệ thống

1. **👑 Admin (Quản trị viên)**
   - Toàn quyền quản lý hệ thống
   - Quản lý nhân viên và phân quyền
   - Xem tất cả báo cáo và thống kê
   - Cấu hình hệ thống

2. **👔 Manager (Quản lý)**
   - Quản lý vận hành cửa hàng
   - Quản lý tồn kho và menu
   - Xem báo cáo kinh doanh
   - Quản lý ca làm việc

3. **👤 Staff (Nhân viên)**
   - Nhận và xử lý đơn hàng
   - Cập nhật trạng thái đơn hàng
   - Xem menu và tồn kho

4. **💳 Cashier (Thu ngân)**
   - Tạo hóa đơn bán hàng
   - Xử lý thanh toán
   - In hóa đơn
   - Xem lịch sử giao dịch

## 📱 Nền tảng Hỗ trợ

- ✅ **iOS:** iPhone (iOS 13.0+)
- ✅ **Android:** Smartphone (Android 8.0+)
- 🔄 **Tablet:** iPad, Android Tablet (Coming soon)
- 🔄 **Web:** Web Portal (Coming soon)

## 🗺️ Roadmap

### Phase 1: MVP (Q4 2025) ✅ COMPLETED
- ✅ Authentication (Login/Register/Forgot Password)
- ✅ Home Dashboard
- ✅ Menu Management
- ✅ Firebase Integration
- ✅ Google Drive Media Storage
- ✅ Multi-language Support (EN/VI)

### Phase 2: Core Features (Q1 2026) 🚧 IN PROGRESS
- 🚧 Order Management
- 🚧 Invoice Generation
- 🚧 Basic Inventory Tracking
- 🚧 Staff Management
- 📅 Payment Integration

### Phase 3: Advanced Features (Q2 2026)
- 📅 Advanced Inventory Management
- 📅 Comprehensive Reports & Analytics
- 📅 Customer Management (CRM)
- 📅 Loyalty Program
- 📅 Multi-branch Support

### Phase 4: Optimization (Q3 2026)
- 📅 Performance Optimization
- 📅 Offline Mode
- 📅 Advanced Analytics & AI Insights
- 📅 Third-party Integrations (Accounting, Delivery)
- 📅 Web Portal

## 🔐 Bảo mật

- 🔒 Firebase Authentication với email/password
- 🔒 Role-based Access Control (RBAC)
- 🔒 Mã hóa dữ liệu nhạy cảm
- 🔒 Secure API endpoints
- 🔒 Audit logs cho tất cả thao tác quan trọng
- 🔒 Two-factor Authentication (2FA) - Coming soon

## 💰 Model Kinh doanh

### Freemium Model
- **Free Tier:**
  - 1 cửa hàng/chi nhánh
  - Tối đa 5 nhân viên
  - 100 sản phẩm
  - Báo cáo cơ bản
  - 1GB storage

- **Pro Tier** ($29/tháng):
  - 3 chi nhánh
  - Không giới hạn nhân viên
  - 1000 sản phẩm
  - Báo cáo nâng cao
  - 10GB storage
  - Priority support

- **Enterprise** (Custom):
  - Không giới hạn chi nhánh
  - Không giới hạn nhân viên và sản phẩm
  - Custom features
  - Dedicated support
  - On-premise option

## 📊 Metrics & KPIs

### Business Metrics
- Monthly Active Users (MAU)
- Daily Active Users (DAU)
- Customer Acquisition Cost (CAC)
- Customer Lifetime Value (CLV)
- Churn Rate
- Net Promoter Score (NPS)

### Technical Metrics
- App Performance (Load time, Response time)
- Crash-free Rate
- API Success Rate
- User Engagement Rate

## 🤝 Đóng góp

Dự án hiện đang trong giai đoạn phát triển. Mọi đóng góp và góp ý xin vui lòng liên hệ qua:
- Email: support@minirestaurantpro.com
- GitHub Issues: [MiniRestaurantPro/issues](https://github.com/case7532/MiniRestaurantPro/issues)

## 📄 License

Copyright © 2025 MiniRestaurantPro. All rights reserved.

## 📞 Liên hệ

- **Website:** https://minirestaurantpro.com (Coming soon)
- **Email:** support@minirestaurantpro.com
- **Phone:** +84 XXX XXX XXX

---

**Last Updated:** November 23, 2025  
**Version:** 0.0.1  
**Status:** In Development
