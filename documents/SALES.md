# 💰 Quản lý Bán hàng (Sales Management)

## Tổng quan

Module quản lý bán hàng cung cấp giao diện POS (Point of Sale) hiện đại, giúp nhân viên thu ngân xử
lý đơn hàng nhanh chóng, chính xác và nâng cao trải nghiệm khách hàng.

## Tính năng Chính

### 1. POS Interface

#### Màn hình POS

```
┌─────────────────────────────────────┐
│ 🏪 MiniRestaurantPro    🔍 [Search] │
├─────────┬───────────────────────────┤
│ MENU    │ ĐƠN HÀNG                 │
│         │                           │
│ [All]   │ Bàn: 5  Khách: 4         │
│ [Khai]  │ ┌─────────────────────┐  │
│ [Món]   │ │ Phở bò      x2  ↑↓ │  │
│ [Tráng] │ │ 85,000đ    170,000đ│  │
│ [Đồ]    │ └─────────────────────┘  │
│         │ ┌─────────────────────┐  │
│ Phở bò  │ │ Cà phê sữa  x1  ↑↓ │  │
│ 85,000đ │ │ 35,000đ     35,000đ│  │
│         │ └─────────────────────┘  │
│ Bún chả │ ────────────────────────  │
│ 75,000đ │ Tạm tính:     205,000đ   │
│         │ Giảm giá:           0đ   │
│ Cơm tấm │ ────────────────────────  │
│ 70,000đ │ TỔNG:         205,000đ   │
│         │                           │
│ [Grid]  │ [Ghi chú] [Giảm giá]    │
│ [List]  │ [Thanh toán]             │
└─────────┴───────────────────────────┘
```

#### Tính năng POS

- ✅ Tìm kiếm sản phẩm nhanh (tên, mã, barcode)
- ✅ Quét mã vạch
- ✅ Lọc theo danh mục
- ✅ Hiển thị hình ảnh sản phẩm
- ✅ Thêm/bớt số lượng nhanh
- ✅ Ghi chú cho từng món
- ✅ Tính tổng tiền tự động
- ✅ Áp dụng giảm giá
- ✅ Nhiều phương thức thanh toán
- ✅ In hóa đơn nhanh
- ✅ Lưu đơn hàng tạm

### 2. Quản lý Đơn hàng

#### Thông tin Đơn hàng

```typescript
interface Order {
  id: string;
  orderNumber: string; // Mã đơn hàng
  type: OrderType; // Loại đơn
  status: OrderStatus; // Trạng thái

  // Customer
  customerId?: string; // ID khách hàng
  customerInfo?: {
    name?: string;
    phone?: string;
    email?: string;
  };

  // Table/Delivery
  tableNumber?: string; // Số bàn (dine-in)
  deliveryAddress?: string; // Địa chỉ giao hàng (delivery)

  // Items
  items: OrderItem[]; // Danh sách sản phẩm

  // Pricing
  subtotal: number; // Tạm tính
  discount: number; // Giảm giá
  deliveryFee: number; // Phí giao hàng
  tax: number; // Thuế
  total: number; // Tổng cộng

  // Payment
  paymentMethod?: PaymentMethod; // PT thanh toán
  paymentStatus: PaymentStatus; // TT thanh toán
  paidAmount: number; // Số tiền đã trả
  changeAmount: number; // Tiền thừa

  // Metadata
  notes?: string; // Ghi chú
  staffId: string; // NV tạo đơn
  completedBy?: string; // NV hoàn thành
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

enum OrderType {
  DINE_IN = 'dine_in', // Tại chỗ
  TAKEAWAY = 'takeaway', // Mang đi
  DELIVERY = 'delivery', // Giao hàng
}

enum OrderStatus {
  DRAFT = 'draft', // Nháp
  PENDING = 'pending', // Chờ xử lý
  CONFIRMED = 'confirmed', // Đã xác nhận
  PREPARING = 'preparing', // Đang chuẩn bị
  READY = 'ready', // Sẵn sàng
  SERVED = 'served', // Đã phục vụ
  COMPLETED = 'completed', // Hoàn thành
  CANCELLED = 'cancelled', // Đã hủy
}
```

#### Quy trình Đơn hàng

**Dine-in (Tại chỗ):**

```
Tạo đơn → Xác nhận → Chuẩn bị → Phục vụ → Thanh toán → Hoàn thành
```

**Takeaway (Mang đi):**

```
Tạo đơn → Thanh toán → Chuẩn bị → Sẵn sàng → Giao khách → Hoàn thành
```

**Delivery (Giao hàng):**

```
Tạo đơn → Xác nhận → Chuẩn bị → Giao hàng → Thanh toán → Hoàn thành
```

### 3. Quản lý Bàn (Table Management)

#### Thông tin Bàn

```typescript
interface Table {
  id: string;
  number: string; // Số bàn
  capacity: number; // Sức chứa
  location: string; // Vị trí (Tầng 1, Tầng 2, VIP)
  status: TableStatus; // Trạng thái
  currentOrderId?: string; // Đơn hàng hiện tại
  reservedBy?: string; // Người đặt bàn
  reservedAt?: string; // Thời gian đặt
  isActive: boolean;
}

enum TableStatus {
  AVAILABLE = 'available', // Trống
  OCCUPIED = 'occupied', // Có khách
  RESERVED = 'reserved', // Đã đặt
  CLEANING = 'cleaning', // Đang dọn
  MAINTENANCE = 'maintenance', // Bảo trì
}
```

#### Sơ đồ Bàn

```
┌─────────────────────────────────────┐
│ 🪑 Quản lý bàn         Tầng: [1 ▼] │
├─────────────────────────────────────┤
│ ┌─────┐  ┌─────┐  ┌─────┐         │
│ │ T1  │  │ T2  │  │ T3  │         │
│ │ 🟢  │  │ 🔴  │  │ 🟡  │         │
│ │ 4   │  │ 4   │  │ 2   │         │
│ └─────┘  └─────┘  └─────┘         │
│                                     │
│ ┌─────┐  ┌─────┐  ┌───────┐       │
│ │ T4  │  │ T5  │  │  T6   │       │
│ │ 🟢  │  │ 🟢  │  │  🔴   │       │
│ │ 6   │  │ 4   │  │  8VIP │       │
│ └─────┘  └─────┘  └───────┘       │
├─────────────────────────────────────┤
│ 🟢 Trống: 3  🔴 Có khách: 2  🟡 Đặt: 1│
└─────────────────────────────────────┘
```

#### Tính năng

- Xem trạng thái bàn real-time
- Đặt bàn trước
- Ghép/tách bàn
- Chuyển bàn
- Gọi món cho bàn
- Tách/gộp hóa đơn

```typescript
// Reserve table
await TableService.reserveTable(tableId, {
  customerName: 'Nguyễn Văn A',
  phone: '0901234567',
  partySize: 4,
  reservedAt: '2025-11-23 18:00',
});

// Move order to another table
await OrderService.moveToTable(orderId, newTableId);

// Merge tables
await TableService.mergeTables([table1Id, table2Id]);

// Split bill
await OrderService.splitBill(orderId, {
  bill1: { items: [item1, item2], total: 200000 },
  bill2: { items: [item3, item4], total: 150000 },
});
```

### 4. Khuyến mãi và Giảm giá

#### Loại Khuyến mãi

```typescript
interface Promotion {
  id: string;
  code: string; // Mã khuyến mãi
  name: string; // Tên chương trình
  type: PromotionType; // Loại
  value: number; // Giá trị

  // Conditions
  minOrderValue?: number; // Giá trị đơn tối thiểu
  maxDiscountValue?: number; // Giảm tối đa
  applicableProducts?: string[]; // SP áp dụng
  applicableCategories?: string[]; // DM áp dụng

  // Usage
  usageLimit?: number; // Số lần sử dụng tối đa
  usageCount: number; // Đã sử dụng
  perUserLimit?: number; // Giới hạn/khách

  // Time
  startDate: string;
  endDate: string;

  // Status
  isActive: boolean;
  createdAt: string;
}

enum PromotionType {
  PERCENTAGE = 'percentage', // Giảm %
  FIXED_AMOUNT = 'fixed_amount', // Giảm số tiền cố định
  BUY_X_GET_Y = 'buy_x_get_y', // Mua X tặng Y
  COMBO = 'combo', // Combo
  FREE_SHIPPING = 'free_shipping', // Miễn phí ship
}
```

#### Áp dụng Khuyến mãi

```typescript
// Apply promotion code
const result = await PromotionService.applyPromotion(orderId, 'SALE20');
// Result: { discount: 50000, message: 'Giảm 20%' }

// Auto apply promotions
const promotions = await PromotionService.getApplicablePromotions(order);
const bestPromotion = promotions.sort((a, b) => b.discount - a.discount)[0];
```

### 5. Khách hàng Thân thiết (Loyalty Program)

#### Thông tin Khách hàng

```typescript
interface Customer {
  id: string;
  code: string; // Mã KH
  name: string;
  phone: string;
  email?: string;
  address?: string;
  birthday?: string;

  // Loyalty
  membershipTier: MembershipTier; // Hạng thành viên
  points: number; // Điểm tích lũy
  totalSpent: number; // Tổng chi tiêu
  visitCount: number; // Số lần đến
  lastVisit: string; // Lần cuối

  // Preferences
  favoriteProducts?: string[]; // SP yêu thích
  allergies?: string[]; // Dị ứng
  notes?: string; // Ghi chú

  createdAt: string;
  updatedAt: string;
}

enum MembershipTier {
  BRONZE = 'bronze', // Đồng (< 5M)
  SILVER = 'silver', // Bạc (5M - 10M)
  GOLD = 'gold', // Vàng (10M - 20M)
  PLATINUM = 'platinum', // Bạch kim (> 20M)
  DIAMOND = 'diamond', // Kim cương (> 50M)
}
```

#### Tích điểm

```typescript
// Calculate points
const pointsEarned = Math.floor(order.total / 10000); // 1 điểm/10k

// Add points
await CustomerService.addPoints(customerId, pointsEarned, {
  orderId: order.id,
  reason: 'Purchase',
});

// Redeem points
await CustomerService.redeemPoints(customerId, 100, {
  orderId: order.id,
  value: 100000, // 100 điểm = 100k
});
```

#### Benefits by Tier

```typescript
const tierBenefits = {
  bronze: { discount: 0, pointsMultiplier: 1 },
  silver: { discount: 5, pointsMultiplier: 1.2 },
  gold: { discount: 10, pointsMultiplier: 1.5 },
  platinum: { discount: 15, pointsMultiplier: 2 },
  diamond: { discount: 20, pointsMultiplier: 3 },
};
```

### 6. Báo cáo Bán hàng

#### Các loại Báo cáo

1. **Báo cáo Doanh thu**

   - Doanh thu theo ngày/tuần/tháng/năm
   - So sánh với kỳ trước
   - Biểu đồ xu hướng

2. **Báo cáo Sản phẩm**

   - Top sản phẩm bán chạy
   - Sản phẩm ít bán
   - Phân tích theo danh mục

3. **Báo cáo Khách hàng**

   - Khách hàng mới/quay lại
   - Khách hàng VIP
   - Phân tích hành vi mua

4. **Báo cáo Hiệu suất**
   - Doanh thu theo nhân viên
   - Số đơn xử lý
   - Thời gian phục vụ trung bình

## UI/UX Design

### Màn hình Tạo đơn hàng

```
┌─────────────────────────────────────┐
│ ← Tạo đơn mới                       │
├─────────────────────────────────────┤
│ Loại đơn: [Tại chỗ ▼] Bàn: [5 ▼]  │
│ Khách hàng: [0901234567]  🔍       │
│ ┌─────────────────────────────────┐ │
│ │ Nguyễn Văn A - Bạc ⭐          │ │
│ │ Điểm: 150 | Chi tiêu: 5.2M     │ │
│ └─────────────────────────────────┘ │
├─────────────────────────────────────┤
│ Món đã chọn:                        │
│ ┌─────────────────────────────────┐ │
│ │ Phở bò          x2    170,000đ │ │
│ │ Ghi chú: Không hành            │ │
│ │ [✏️] [🗑️]                      │ │
│ └─────────────────────────────────┘ │
├─────────────────────────────────────┤
│ [+ Thêm món]  [🎟️ Khuyến mãi]     │
├─────────────────────────────────────┤
│ Tạm tính:              170,000đ    │
│ Giảm giá (Bạc 5%):      -8,500đ    │
│ ────────────────────────────────    │
│ TỔNG:                  161,500đ    │
├─────────────────────────────────────┤
│ [Lưu nháp]  [Xác nhận đơn]        │
└─────────────────────────────────────┘
```

## API Endpoints

### Sales Service

```typescript
class SalesService {
  // Orders
  static async createOrder(data: CreateOrderData): Promise<Order>;
  static async getOrders(filters?: OrderFilters): Promise<Order[]>;
  static async getOrderById(id: string): Promise<Order>;
  static async updateOrderStatus(id: string, status: OrderStatus): Promise<Order>;
  static async cancelOrder(id: string, reason: string): Promise<void>;

  // Tables
  static async getTables(): Promise<Table[]>;
  static async reserveTable(tableId: string, data: ReservationData): Promise<Table>;
  static async occupyTable(tableId: string, orderId: string): Promise<Table>;
  static async releaseTable(tableId: string): Promise<Table>;

  // Promotions
  static async getPromotions(active?: boolean): Promise<Promotion[]>;
  static async applyPromotion(orderId: string, code: string): Promise<DiscountResult>;

  // Customers
  static async getCustomers(): Promise<Customer[]>;
  static async getCustomerByPhone(phone: string): Promise<Customer>;
  static async createCustomer(data: CreateCustomerData): Promise<Customer>;
  static async addPoints(customerId: string, points: number): Promise<Customer>;
  static async redeemPoints(customerId: string, points: number): Promise<Customer>;
}
```

## Use Cases & Process Flows

### Use Case 1: Tạo Đơn hàng Tại chỗ (Dine-in)

**Actors:** Thu ngân, Khách hàng, Bếp

**Preconditions:**

- Thu ngân đã đăng nhập
- Có bàn trống hoặc khách đã chọn bàn
- Menu có sản phẩm

**Main Flow:**

```
1. Thu ngân mở màn hình POS
2. Chọn loại đơn "Dine-in"
3. Chọn số bàn
4. [Optional] Quét thẻ khách hàng thành viên hoặc nhập SĐT
   4.1. Hệ thống hiển thị thông tin KH (tên, hạng, điểm)
   4.2. Áp dụng tự động giảm giá theo hạng
5. Thêm món ăn vào đơn:
   5.1. Tìm kiếm hoặc chọn từ menu
   5.2. Chọn số lượng
   5.3. [Optional] Thêm ghi chú (không hành, ít cay...)
   5.4. Kiểm tra tồn kho
   5.5. Thêm vào đơn hàng
6. Lặp lại bước 5 cho các món khác
7. [Optional] Áp dụng mã khuyến mãi:
   7.1. Nhập mã voucher
   7.2. Hệ thống validate và tính giảm giá
8. Xem tổng cộng (tạm tính + thuế - giảm giá)
9. Xác nhận đơn hàng
10. Hệ thống:
    10.1. Tạo order (status: PENDING)
    10.2. Trừ tồn kho tạm thời (reserved)
    10.3. Gửi order đến bếp
    10.4. Cập nhật trạng thái bàn: OCCUPIED
11. In phiếu order cho bếp
12. Thu ngân thông báo khách "Đơn đã được gửi đến bếp"
```

**Alternative Flows:**

**A1: Sản phẩm hết hàng (tại bước 5.4)**

```
A1.1. Hệ thống hiển thị "Sản phẩm tạm hết"
A1.2. Thu ngân thông báo khách
A1.3. Quay lại bước 5 để chọn món khác
```

**A2: Mã khuyến mãi không hợp lệ (tại bước 7.2)**

```
A2.1. Hệ thống hiển thị lỗi "Mã không hợp lệ hoặc đã hết hạn"
A2.2. Thu ngân có thể:
      - Nhập mã khác
      - Bỏ qua và tiếp tục
```

**A3: Khách đổi ý/bổ sung món (sau bước 11)**

```
A3.1. Thu ngân mở lại đơn hàng
A3.2. Thêm/bớt món
A3.3. Xác nhận thay đổi
A3.4. Gửi order bổ sung đến bếp
```

**Postconditions:**

- Đơn hàng được tạo với status PENDING
- Bàn được đánh dấu OCCUPIED
- Order được gửi đến màn hình bếp
- Tồn kho được reserve

**Business Rules:**

- Mỗi bàn chỉ có 1 đơn hàng active
- Phải có ít nhất 1 món trong đơn
- Không thể đặt món hết hàng
- Khuyến mãi không cộng dồn (chọn 1 tốt nhất)

---

### Use Case 2: Thanh Toán Đơn hàng

**Actors:** Thu ngân, Khách hàng

**Preconditions:**

- Đơn hàng đã hoàn thành (status: READY hoặc SERVED)
- Khách yêu cầu thanh toán

**Main Flow:**

```
1. Thu ngân mở đơn hàng cần thanh toán
2. Kiểm tra lại danh sách món và tổng tiền
3. [Optional] Khách yêu cầu tách bill:
   3.1. Thu ngân chọn "Tách bill"
   3.2. Phân chia món cho từng bill
   3.3. Hệ thống tạo các sub-bills
   3.4. Tiếp tục với từng bill riêng
4. Chọn phương thức thanh toán:

   CASE Tiền mặt:
   4.1. Nhập số tiền khách đưa
   4.2. Hệ thống tính tiền thừa
   4.3. Thu ngân đưa tiền thừa cho khách

   CASE Thẻ:
   4.4. Thu ngân quẹt thẻ qua máy POS
   4.5. Khách nhập PIN
   4.6. Chờ xác nhận từ ngân hàng
   4.7. In hóa đơn thẻ

   CASE Chuyển khoản:
   4.8. Hiển thị QR code hoặc STK
   4.9. Khách chuyển khoản
   4.10. Thu ngân kiểm tra banking app
   4.11. Xác nhận đã nhận tiền

   CASE QR Code (VNPay, MoMo...):
   4.12. Tạo QR code thanh toán
   4.13. Khách quét mã
   4.14. Hệ thống nhận webhook xác nhận
   4.15. Auto confirm payment

5. Xác nhận thanh toán
6. Hệ thống:
   6.1. Cập nhật order status: COMPLETED
   6.2. Cập nhật payment status: PAID
   6.3. Tạo invoice (hóa đơn)
   6.4. Xác nhận xuất kho (commit reserved stock)
   6.5. Cập nhật trạng thái bàn: CLEANING
   6.6. [If customer member] Cộng điểm tích lũy
   6.7. Ghi nhận vào báo cáo doanh thu
7. In hóa đơn cho khách
8. [Optional] Gửi hóa đơn qua email/SMS
9. Thu ngân cảm ơn và tiễn khách
```

**Alternative Flows:**

**A1: Thanh toán thẻ thất bại (tại bước 4.6)**

```
A1.1. Hệ thống hiển thị "Giao dịch thất bại"
A1.2. Thu ngân thông báo khách
A1.3. Quay lại bước 4 chọn PT thanh toán khác
```

**A2: Khách yêu cầu giảm giá (tại bước 2)**

```
A2.1. Thu ngân yêu cầu Manager phê duyệt
A2.2. Manager xem đơn và quyết định
A2.3. [If approved] Nhập % hoặc số tiền giảm + lý do
A2.4. Hệ thống cập nhật tổng tiền
A2.5. Tiếp tục bước 4
```

**A3: Thanh toán một phần (tại bước 4)**

```
A3.1. Thu ngân chọn "Thanh toán một phần"
A3.2. Nhập số tiền thanh toán
A3.3. Hệ thống cập nhật:
      - Payment status: PARTIAL
      - Remaining amount
A3.4. Có thể thanh toán phần còn lại sau
```

**Postconditions:**

- Đơn hàng hoàn thành
- Thanh toán thành công
- Hóa đơn được tạo
- Bàn được giải phóng
- Doanh thu được ghi nhận

---

### Use Case 3: Quản lý Bàn - Chuyển Bàn

**Actors:** Nhân viên phục vụ, Thu ngân

**Preconditions:**

- Có đơn hàng đang active trên bàn nguồn
- Bàn đích đang trống (status: AVAILABLE)

**Main Flow:**

```
1. Nhân viên nhận yêu cầu chuyển bàn từ khách
2. Kiểm tra bàn đích có trống không
3. Mở chức năng "Quản lý bàn"
4. Chọn bàn nguồn (bàn hiện tại)
5. Hệ thống hiển thị thông tin đơn hàng:
   - Số món
   - Tổng tiền
   - Thời gian ngồi
6. Chọn "Chuyển bàn"
7. Chọn bàn đích từ sơ đồ bàn
8. [Optional] Nhập lý do chuyển bàn
9. Xác nhận chuyển bàn
10. Hệ thống:
    10.1. Cập nhật order.tableNumber = bàn đích
    10.2. Cập nhật bàn nguồn: AVAILABLE
    10.3. Cập nhật bàn đích: OCCUPIED
    10.4. Ghi log lịch sử
11. Thông báo thành công
12. Nhân viên hướng dẫn khách đến bàn mới
```

**Alternative Flows:**

**A1: Bàn đích đang có khách (tại bước 2)**

```
A1.1. Hệ thống hiển thị "Bàn đang có khách"
A1.2. Nhân viên có thể:
      - Chọn bàn khác
      - Hủy thao tác
```

**A2: Gộp 2 đơn hàng (khách muốn ngồi chung)**

```
A2.1. Chọn "Gộp bàn" thay vì "Chuyển bàn"
A2.2. Chọn 2 bàn cần gộp
A2.3. Chọn bàn đích (có thể là 1 trong 2 hoặc bàn mới)
A2.4. Hệ thống:
      - Merge 2 orders thành 1
      - Cập nhật table status
A2.5. In lại order tổng hợp
```

**Postconditions:**

- Order được chuyển sang bàn mới
- Trạng thái các bàn được cập nhật
- Lịch sử được ghi nhận

---

### Use Case 4: Áp dụng Khuyến mãi

**Actors:** Thu ngân, Hệ thống

**Preconditions:**

- Đang có đơn hàng active
- Có chương trình khuyến mãi đang chạy

**Main Flow:**

**Scenario A: Auto-apply (Khuyến mãi tự động)**

```
1. Thu ngân tạo đơn hàng như bình thường
2. Sau mỗi lần thêm món, hệ thống:
   2.1. Kiểm tra các KM đang active
   2.2. Kiểm tra điều kiện áp dụng:
       - Giá trị đơn tối thiểu
       - Sản phẩm/danh mục áp dụng
       - Thời gian áp dụng
       - Số lần sử dụng
   2.3. Tính toán giảm giá cho các KM phù hợp
   2.4. Chọn KM có lợi nhất cho khách
   2.5. Tự động áp dụng
3. Hiển thị KM đang áp dụng trên màn hình
4. Thu ngân thông báo khách về ưu đãi
```

**Scenario B: Manual-apply (Nhập mã voucher)**

```
1. Khách cung cấp mã voucher
2. Thu ngân chọn "Áp dụng mã"
3. Nhập mã voucher
4. Hệ thống validate:
   4.1. Kiểm tra mã có tồn tại
   4.2. Kiểm tra còn hiệu lực (start/end date)
   4.3. Kiểm tra số lần sử dụng (usage limit)
   4.4. Kiểm tra điều kiện đơn hàng
   4.5. Kiểm tra user đã dùng chưa (per-user limit)
5. [If valid] Tính giảm giá:

   CASE Percentage:
   5.1. Discount = Subtotal × Percent
   5.2. [If has maxDiscount] Discount = min(Discount, maxDiscount)

   CASE Fixed Amount:
   5.3. Discount = Fixed Value

   CASE Buy X Get Y:
   5.4. Kiểm tra số lượng X trong đơn
   5.5. Tặng Y (giảm 100% cho Y items)

   CASE Combo:
   5.6. Kiểm tra có đủ món trong combo
   5.7. Áp dụng giá combo

6. Áp dụng giảm giá vào đơn
7. Cập nhật tổng tiền
8. Hiển thị thông tin KM đã áp dụng
9. Ghi nhận usage count
```

**Alternative Flows:**

**A1: Mã không hợp lệ (tại bước 4)**

```
A1.1. Hệ thống hiển thị lỗi cụ thể:
      - "Mã không tồn tại"
      - "Mã đã hết hạn"
      - "Đơn chưa đủ điều kiện (min: XXXđ)"
      - "Mã đã hết lượt sử dụng"
      - "Bạn đã sử dụng mã này rồi"
A1.2. Thu ngân thông báo khách
A1.3. Có thể thử mã khác hoặc bỏ qua
```

**A2: Có nhiều KM áp dụng được (tại bước 2.4)**

```
A2.1. Hệ thống tính giảm giá cho tất cả KM
A2.2. Sắp xếp theo mức giảm giá giảm dần
A2.3. Chọn KM có giảm giá cao nhất
A2.4. [Optional] Hiển thị các KM khác để khách chọn
```

**Postconditions:**

- Khuyến mãi được áp dụng vào đơn
- Giảm giá được tính vào tổng tiền
- Usage count được cập nhật

---

### Use Case 5: Tích điểm Khách hàng Thành viên

**Actors:** Thu ngân, Khách hàng, Hệ thống

**Preconditions:**

- Khách hàng có tài khoản thành viên
- Đơn hàng được thanh toán thành công

**Main Flow:**

```
1. Tại bước thanh toán, hệ thống kiểm tra:
   1.1. Đơn có liên kết với customer ID?
   1.2. Customer có active membership?
2. Tính điểm tích lũy:
   2.1. Base points = floor(Total / PointsRate)
        Ví dụ: 10,000đ = 1 điểm
   2.2. Tier multiplier:
        - Bronze: 1x
        - Silver: 1.2x
        - Gold: 1.5x
        - Platinum: 2x
        - Diamond: 3x
   2.3. Final points = Base points × Multiplier

   Ví dụ:
   - Order: 500,000đ
   - Tier: Gold (1.5x)
   - Points = (500,000 / 10,000) × 1.5 = 75 điểm

3. Cộng điểm vào tài khoản:
   3.1. customer.points += Final points
   3.2. customer.totalSpent += Order.total
   3.3. customer.visitCount += 1
   3.4. customer.lastVisit = now

4. Kiểm tra nâng hạng:
   4.1. Tính totalSpent từ trước đến nay
   4.2. So sánh với ngưỡng nâng hạng:
       - Bronze: < 5M
       - Silver: 5M - 10M
       - Gold: 10M - 20M
       - Platinum: 20M - 50M
       - Diamond: > 50M
   4.3. [If qualified] Nâng hạng tự động
   4.4. [If upgraded] Gửi thông báo và ưu đãi

5. Ghi nhận transaction:
   5.1. Tạo PointsTransaction:
       - type: EARN
       - points: +75
       - orderId
       - reason: "Purchase"
       - timestamp

6. Hiển thị trên màn hình:
   "Cộng 75 điểm | Tổng: 825 điểm"
   [If upgraded] "Chúc mừng! Bạn đã lên hạng Gold"

7. [Optional] In thông tin điểm trên hóa đơn
```

**Alternative Flows:**

**A1: Đổi điểm lấy quà (trước thanh toán)**

```
A1.1. Khách yêu cầu đổi điểm
A1.2. Thu ngân chọn "Đổi điểm"
A1.3. Hiển thị danh sách rewards:
      - 100 điểm = Giảm 100,000đ
      - 50 điểm = Tặng món tráng miệng
      - 200 điểm = Voucher 200,000đ
A1.4. Khách chọn reward
A1.5. Kiểm tra điểm đủ không
A1.6. [If enough] Trừ điểm:
      - customer.points -= Required points
      - Áp dụng reward vào đơn
A1.7. Ghi nhận transaction:
      - type: REDEEM
      - points: -100
      - reward: "Discount 100k"
A1.8. Tiếp tục thanh toán với giá đã giảm
```

**A2: Khách chưa có tài khoản (tại bước 1)**

```
A2.1. Thu ngân hỏi: "Anh/chị có muốn đăng ký thẻ thành viên?"
A2.2. [If yes] Thu thập thông tin:
       - Họ tên
       - Số điện thoại
       - Email (optional)
       - Ngày sinh (optional)
A2.3. Tạo tài khoản thành viên:
       - membershipTier: BRONZE
       - points: 0
       - totalSpent: 0
A2.4. [Optional] Tặng điểm welcome bonus (vd: 50 điểm)
A2.5. Liên kết với đơn hàng hiện tại
A2.6. Tiếp tục flow chính từ bước 2
```

**Postconditions:**

- Điểm được cộng vào tài khoản
- Thông tin khách hàng được cập nhật
- Transaction được ghi nhận
- [If applicable] Hạng thành viên được nâng

---

### Use Case 6: Xử lý Đơn Takeaway (Mang đi)

**Actors:** Thu ngân, Khách hàng, Bếp

**Preconditions:**

- Thu ngân đã đăng nhập
- Menu có sản phẩm

**Main Flow:**

```
1. Khách đến quầy đặt món mang đi
2. Thu ngân mở POS, chọn "Takeaway"
3. [Optional] Lấy thông tin khách:
   3.1. Tên
   3.2. Số điện thoại
   3.3. [If member] Quét thẻ/nhập SĐT
4. Nhận order từ khách:
   4.1. Thêm món vào đơn
   4.2. Xác nhận số lượng
   4.3. Ghi chú đặc biệt
5. [Optional] Áp dụng khuyến mãi
6. Tính tổng tiền
7. Xác nhận với khách:
   "Tổng cộng XXXđ, anh/chị thanh toán luôn hay khi lấy hàng?"

   CASE A: Thanh toán ngay (Pre-paid)
   8A.1. Chọn phương thức thanh toán
   8A.2. Xử lý thanh toán (như UC2)
   8A.3. In hóa đơn
   8A.4. Order status: PAID

   CASE B: Thanh toán khi lấy (Pay on pickup)
   8B.1. Order status: PENDING
   8B.2. In phiếu order

9. Ước tính thời gian chuẩn bị:
   9.1. Hệ thống tính dựa trên:
       - Số lượng món
       - Độ phức tạp món
       - Số order đang xử lý
   9.2. Estimated time = SUM(item.prepTime) + Queue time
   9.3. Add 20% buffer

   Ví dụ:
   - 2 Phở (15 phút) + 1 Cơm (10 phút) = 25 phút
   - Queue: 5 phút
   - Buffer: 6 phút
   - Total: ~35 phút

10. Thông báo khách:
    "Đơn hàng sẽ sẵn sàng sau khoảng 35 phút"
    "Vui lòng quay lại lúc [time] để lấy"

11. Gửi order đến bếp với priority: TAKEAWAY

12. [Optional] Gửi SMS thông báo:
    "Đơn hàng #XXX đã được xác nhận. Dự kiến sẵn sàng lúc HH:MM"

13. Thu ngân đưa khách phiếu có mã order

--- Khi khách quay lại lấy hàng ---

14. Khách đến quầy với phiếu/mã order
15. Thu ngân tra cứu order bằng:
    - Mã order
    - Số điện thoại
16. Kiểm tra order status:

    IF status = READY:
    17.1. Bàn giao hàng cho khách
    17.2. [If unpaid] Xử lý thanh toán
    17.3. Cập nhật status: COMPLETED
    17.4. [If member] Cộng điểm

    IF status = PREPARING:
    17.5. Thông báo: "Đơn hàng đang chuẩn bị, vui lòng chờ X phút"
    17.6. [Optional] Mời khách ngồi chờ

18. Cảm ơn và tiễn khách
```

**Alternative Flows:**

**A1: Khách muốn thay đổi order (trước khi bếp bắt đầu)**

```
A1.1. Thu ngân tra order
A1.2. Kiểm tra status:
      IF status = PENDING (chưa bắt đầu nấu):
      A1.3. Cho phép sửa
      A1.4. Thêm/bớt/đổi món
      A1.5. Cập nhật giá
      A1.6. [If paid] Xử lý hoàn/thu thêm tiền
      A1.7. Gửi lại order đến bếp

      IF status = PREPARING (đang nấu):
      A1.8. Thông báo "Đơn đang chuẩn bị, không thể sửa"
```

**A2: Khách hủy order (trước khi lấy hàng)**

```
A2.1. Khách gọi điện hoặc đến quầy hủy
A2.2. Thu ngân tra order
A2.3. Kiểm tra status và payment:

      IF unpaid:
      A2.4. Hủy order ngay
      A2.5. Cập nhật status: CANCELLED
      A2.6. Hoàn lại tồn kho

      IF paid + chưa bắt đầu nấu:
      A2.7. Hủy order
      A2.8. Hoàn tiền 100%

      IF paid + đang nấu/đã nấu xong:
      A2.9. Thông báo: "Đơn đã chuẩn bị, không thể hoàn tiền"
      A2.10. [Optional] Hoàn 50% theo chính sách
```

**A3: Khách đến muộn, order đã lạnh**

```
A3.1. Thu ngân kiểm tra order time
A3.2. IF quá lâu (> 30 phút):
      A3.3. Xin lỗi khách
      A3.4. Hỏi: "Anh/chị có muốn làm lại không?"
      A3.5. [If yes] Gửi order mới đến bếp (ưu tiên)
      A3.6. [If no] Bàn giao hàng, giảm giá 10-20%
```

**Postconditions:**

- Order được tạo và xử lý
- Khách nhận hàng thành công
- [If paid] Thanh toán hoàn tất
- [If member] Điểm được cộng

---

### Use Case 7: Xử lý Order từ Delivery (Giao hàng)

**Actors:** Điện thoại viên/Online system, Khách hàng, Bếp, Shipper

**Preconditions:**

- Hệ thống delivery đang hoạt động
- Có shipper available

**Main Flow:**

```
1. Khách đặt hàng qua:
   - Điện thoại
   - App/Website
   - Facebook/Zalo

2. Tiếp nhận order:

   CASE Điện thoại:
   2.1. Nhân viên nhận cuộc gọi
   2.2. Ghi nhận thông tin:
       - Họ tên
       - Số điện thoại
       - Địa chỉ giao hàng chi tiết
       - Order items
   2.3. Xác nhận lại với khách
   2.4. Nhập vào hệ thống

   CASE Online:
   2.5. Order tự động vào hệ thống
   2.6. Nhân viên nhận notification

3. Kiểm tra khả năng giao:
   3.1. Kiểm tra khoảng cách (< 5km)
   3.2. Kiểm tra giá trị đơn tối thiểu
   3.3. Kiểm tra tồn kho
   3.4. Kiểm tra shipper available

4. [If OK] Xác nhận với khách:
   4.1. Tính phí ship:
       - 0-2km: 15,000đ
       - 2-5km: 25,000đ
       - 5-10km: 35,000đ
   4.2. Tính tổng: Subtotal + Ship fee
   4.3. Estimate delivery time:
       Prep time + Travel time
       = 30 phút + (distance × 10 phút/km)
   4.4. Gọi lại khách xác nhận:
       "Tổng XXXđ, giao trong khoảng 45 phút, anh/chị đồng ý không?"

5. [If confirmed] Tạo order:
   5.1. Type: DELIVERY
   5.2. Status: CONFIRMED
   5.3. deliveryInfo:
       - address
       - phone
       - coordinates
       - deliveryFee
       - estimatedTime
   5.4. Payment method:
       - COD (Ship COD)
       - Pre-paid (Online payment)

6. Gửi order đến bếp với priority: DELIVERY

7. Assign shipper:
   7.1. Hệ thống chọn shipper:
       - Đang rảnh
       - Gần nhất
       - Rating cao
   7.2. Gửi notification đến shipper:
       "Order #XXX - Địa chỉ: [address] - COD: XXXđ"
   7.3. Shipper accept/reject
   7.4. [If reject] Assign shipper khác

8. Theo dõi order status:

   8.1. CONFIRMED → PREPARING (Bếp bắt đầu)
   8.2. PREPARING → READY (Món xong)
   8.3. Notification shipper: "Order ready for pickup"
   8.4. READY → OUT_FOR_DELIVERY (Shipper lấy hàng)
   8.5. OUT_FOR_DELIVERY → DELIVERED (Giao thành công)

9. Shipper giao hàng:
   9.1. Đến địa chỉ khách
   9.2. Gọi điện thông báo
   9.3. Bàn giao hàng
   9.4. [If COD] Thu tiền
   9.5. Update status: DELIVERED
   9.6. [Optional] Khách ký nhận/chụp ảnh

10. Hoàn tất:
    10.1. Cập nhật status: COMPLETED
    10.2. [If COD] Shipper nộp tiền về quầy
    10.3. [If member] Cộng điểm
    10.4. Ghi nhận doanh thu

11. [Optional] Gửi SMS cảm ơn + feedback link
```

**Alternative Flows:**

**A1: Ngoài khu vực giao hàng (tại bước 3.1)**

```
A1.1. Hệ thống hiển thị "Ngoài phạm vi giao hàng"
A1.2. Nhân viên thông báo khách:
      "Xin lỗi, hiện chúng tôi chỉ giao trong bán kính 5km"
A1.3. [Optional] Đề xuất:
      - Khách tự đến lấy (Takeaway)
      - Sử dụng dịch vụ ship khác
```

**A2: Không có shipper (tại bước 7.1)**

```
A2.1. Hệ thống thông báo "No shipper available"
A2.2. Nhân viên gọi khách:
      "Hiện shipper đang bận, có thể giao muộn 20-30 phút, anh/chị có đồng ý không?"
A2.3. [If yes] Giữ order, chờ shipper rảnh
A2.4. [If no] Hủy order, xin lỗi khách
```

**A3: Khách không nhận máy/không có nhà (tại bước 9.2)**

```
A3.1. Shipper gọi 3 lần không được
A3.2. Báo lại nhân viên
A3.3. Nhân viên gọi số dự phòng (nếu có)
A3.4. [If still không liên lạc được]:
      A3.5. Chờ 10 phút
      A3.6. Gọi lại 1 lần
A3.7. [If vẫn không được]:
      A3.8. Shipper mang hàng về
      A3.9. Order status: FAILED_DELIVERY
      A3.10. Gọi khách xác nhận có muốn ship lại không
```

**A4: Khách phàn nàn về món ăn (sau khi giao)**

```
A4.1. Khách gọi điện phản ánh:
       - Món sai
       - Món thiếu
       - Chất lượng không tốt
A4.2. Nhân viên ghi nhận chi tiết
A4.3. Xin lỗi khách
A4.4. Đưa giải pháp:

      IF món sai/thiếu:
      A4.5. Ship lại món đúng ngay (miễn phí)

      IF chất lượng kém:
      A4.6. Hoàn tiền 100%
      A4.7. Hoặc làm lại món và ship lại
      A4.8. Tặng voucher xin lỗi

A4.9. Ghi nhận incident, điều tra nguyên nhân
A4.10. Cải thiện quy trình
```

**Postconditions:**

- Order được giao thành công
- Khách nhận hàng và thanh toán
- Shipper hoàn thành nhiệm vụ
- Doanh thu được ghi nhận
- [If member] Điểm được cộng

---

## Business Rules

### Thanh Toán

- Chỉ thanh toán đơn có status = PENDING hoặc READY
- Số tiền thanh toán phải bằng tổng tiền
- Cập nhật tồn kho sau khi thanh toán thành công
- Tạo hóa đơn tự động

### Hủy Đơn

- Chỉ hủy đơn chưa chuẩn bị (status = PENDING)
- Hoàn lại tồn kho nếu đã trừ
- Ghi rõ lý do hủy
- Hoàn tiền nếu đã thanh toán

---

**Last Updated:** November 23, 2025  
**Version:** 1.0.0  
**Status:** Planned
