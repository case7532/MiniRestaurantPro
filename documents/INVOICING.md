# 📝 Quản lý Hóa đơn (Invoicing Management)

## Tổng quan

Module quản lý hóa đơn là một trong những tính năng cốt lõi của MiniRestaurantPro, giúp cửa hàng tạo, theo dõi và quản lý tất cả các hóa đơn bán hàng một cách hiệu quả và chính xác.

## Tính năng Chính

### 1. Tạo Hóa đơn

#### Quy trình
1. Chọn sản phẩm/món ăn từ menu
2. Thêm số lượng và ghi chú (nếu có)
3. Áp dụng khuyến mãi/giảm giá
4. Chọn phương thức thanh toán
5. Xác nhận và tạo hóa đơn

#### Thông tin Hóa đơn
```typescript
interface Invoice {
  id: string;
  invoiceNumber: string;        // Mã hóa đơn tự động
  orderNumber: string;           // Mã đơn hàng
  customerId?: string;           // ID khách hàng (optional)
  customerInfo?: {
    name: string;
    phone?: string;
    email?: string;
    address?: string;
  };
  items: InvoiceItem[];          // Danh sách sản phẩm
  subtotal: number;              // Tổng tiền trước thuế/giảm giá
  discount: number;              // Giảm giá
  tax: number;                   // Thuế VAT
  total: number;                 // Tổng cộng
  paymentMethod: PaymentMethod;  // Phương thức thanh toán
  paymentStatus: PaymentStatus;  // Trạng thái thanh toán
  notes?: string;                // Ghi chú
  tableNumber?: string;          // Số bàn (cho nhà hàng)
  staffId: string;               // ID nhân viên tạo hóa đơn
  createdAt: string;
  updatedAt: string;
  paidAt?: string;               // Thời gian thanh toán
}

interface InvoiceItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  notes?: string;
}

enum PaymentMethod {
  CASH = 'cash',
  CARD = 'card',
  BANK_TRANSFER = 'bank_transfer',
  QR_CODE = 'qr_code',
  E_WALLET = 'e_wallet',
}

enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
  PARTIAL = 'partial',
  REFUNDED = 'refunded',
  CANCELLED = 'cancelled',
}
```

### 2. Quản lý Hóa đơn

#### Danh sách Hóa đơn
- Hiển thị tất cả hóa đơn theo thứ tự thời gian
- Lọc theo:
  - Trạng thái thanh toán
  - Phương thức thanh toán
  - Khoảng thời gian
  - Nhân viên
  - Khách hàng
- Tìm kiếm theo:
  - Mã hóa đơn
  - Số điện thoại khách hàng
  - Tên sản phẩm

#### Chi tiết Hóa đơn
- Xem đầy đủ thông tin hóa đơn
- Lịch sử thay đổi
- Thông tin nhân viên xử lý
- Danh sách sản phẩm chi tiết

### 3. In và Xuất Hóa đơn

#### In Hóa đơn
- In hóa đơn nhiệt (thermal printer)
- In hóa đơn A4 (laser printer)
- Format chuẩn theo quy định pháp luật
- Tùy chỉnh template

#### Xuất Hóa đơn
- Export PDF
- Export Excel
- Gửi qua email
- Chia sẻ qua app khác

### 4. Thanh toán

#### Phương thức Thanh toán
1. **Tiền mặt (Cash)**
   - Nhập số tiền khách đưa
   - Tự động tính tiền thừa
   
2. **Thẻ (Card)**
   - Quẹt thẻ qua máy POS
   - Ghi nhận 4 số cuối thẻ
   
3. **Chuyển khoản (Bank Transfer)**
   - Hiển thị thông tin tài khoản
   - Xác nhận khi nhận được tiền
   
4. **QR Code**
   - Tạo QR code thanh toán
   - Tích hợp VNPay, MoMo, ZaloPay
   
5. **Ví điện tử (E-wallet)**
   - MoMo, ZaloPay, ViettelPay
   - Deep link vào app ví

#### Xử lý Thanh toán
```typescript
// Thanh toán đầy đủ
await InvoiceService.processPayment(invoiceId, {
  method: PaymentMethod.CASH,
  amount: total,
  receivedAmount: 500000,
  changeAmount: 50000,
});

// Thanh toán một phần
await InvoiceService.processPartialPayment(invoiceId, {
  method: PaymentMethod.CASH,
  amount: 200000,
  remainingAmount: 300000,
});
```

### 5. Hoàn tiền và Hủy

#### Hoàn tiền (Refund)
- Hoàn tiền toàn bộ
- Hoàn tiền một phần
- Lý do hoàn tiền
- Yêu cầu xác nhận từ Manager/Admin

```typescript
await InvoiceService.refund(invoiceId, {
  amount: refundAmount,
  reason: 'Khách hàng không hài lòng',
  items: itemsToRefund,
  refundMethod: PaymentMethod.CASH,
});
```

#### Hủy Hóa đơn
- Chỉ hủy được hóa đơn chưa thanh toán
- Ghi rõ lý do hủy
- Cập nhật lại tồn kho

### 6. Thuế và Giảm giá

#### Tính Thuế VAT
```typescript
const calculateTax = (subtotal: number, taxRate: number = 0.1) => {
  return subtotal * taxRate;
};

// VAT 10%
invoice.tax = calculateTax(invoice.subtotal, 0.1);
invoice.total = invoice.subtotal + invoice.tax - invoice.discount;
```

#### Áp dụng Giảm giá
- Giảm giá theo phần trăm (%)
- Giảm giá theo số tiền cố định (VND)
- Giảm giá cho từng sản phẩm
- Giảm giá toàn hóa đơn
- Áp dụng mã khuyến mãi

```typescript
// Giảm giá 10%
const discountPercent = 10;
invoice.discount = (invoice.subtotal * discountPercent) / 100;

// Giảm giá 50,000 VND
invoice.discount = 50000;

// Áp dụng voucher
const voucher = await VoucherService.getVoucher(voucherCode);
if (voucher.type === 'percent') {
  invoice.discount = (invoice.subtotal * voucher.value) / 100;
} else {
  invoice.discount = voucher.value;
}
```

## UI/UX Design

### Màn hình Danh sách Hóa đơn
```
┌─────────────────────────────────────┐
│ 📝 Hóa đơn          🔍 [Search]    │
├─────────────────────────────────────┤
│ Filters: [Tất cả ▼] [Hôm nay ▼]   │
├─────────────────────────────────────┤
│ ┌─────────────────────────────────┐ │
│ │ #INV-001          💵 Đã thanh toán│
│ │ Bàn 5             500,000đ      │ │
│ │ 2 món • 10:30 AM               │ │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ #INV-002          ⏳ Chờ thanh toán│
│ │ Bàn 3             350,000đ      │ │
│ │ 3 món • 11:00 AM               │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

### Màn hình Chi tiết Hóa đơn
```
┌─────────────────────────────────────┐
│ ← Chi tiết hóa đơn     [⋮ Menu]    │
├─────────────────────────────────────┤
│ #INV-001                            │
│ Ngày: 23/11/2025 10:30 AM          │
│ Bàn: 5 | NV: Nguyễn Văn A         │
├─────────────────────────────────────┤
│ Phở Bò          x2      170,000đ   │
│ Cà phê sữa      x1       35,000đ   │
│ Nước ngọt       x3       45,000đ   │
├─────────────────────────────────────┤
│ Tạm tính:              250,000đ    │
│ Giảm giá (10%):        -25,000đ    │
│ VAT (10%):              22,500đ    │
│ ────────────────────────────────    │
│ TỔNG CỘNG:             247,500đ    │
├─────────────────────────────────────┤
│ [In hóa đơn]  [Thanh toán]        │
└─────────────────────────────────────┘
```

### Màn hình Thanh toán
```
┌─────────────────────────────────────┐
│ ← Thanh toán                        │
├─────────────────────────────────────┤
│ Tổng tiền: 247,500đ                │
├─────────────────────────────────────┤
│ Phương thức thanh toán:             │
│ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐  │
│ │ 💵  │ │ 💳  │ │ 🏦  │ │ 📱  │  │
│ │Tiền │ │ Thẻ │ │Chuyển│ │ QR  │  │
│ │mặt  │ │     │ │khoản │ │Code │  │
│ └─────┘ └─────┘ └─────┘ └─────┘  │
├─────────────────────────────────────┤
│ Khách đưa:         [500,000đ]      │
│ Tiền thừa:          252,500đ       │
├─────────────────────────────────────┤
│ [Xác nhận thanh toán]              │
└─────────────────────────────────────┘
```

## API Endpoints

### Invoice Service
```typescript
class InvoiceService {
  // Create
  static async createInvoice(data: CreateInvoiceData): Promise<Invoice>;
  
  // Read
  static async getInvoices(filters?: InvoiceFilters): Promise<Invoice[]>;
  static async getInvoiceById(id: string): Promise<Invoice>;
  static async getInvoiceByNumber(invoiceNumber: string): Promise<Invoice>;
  
  // Update
  static async updateInvoice(id: string, data: Partial<Invoice>): Promise<Invoice>;
  static async addItemsToInvoice(id: string, items: InvoiceItem[]): Promise<Invoice>;
  static async removeItemsFromInvoice(id: string, itemIds: string[]): Promise<Invoice>;
  
  // Payment
  static async processPayment(id: string, payment: PaymentData): Promise<Invoice>;
  static async processPartialPayment(id: string, payment: PartialPaymentData): Promise<Invoice>;
  
  // Refund & Cancel
  static async refund(id: string, refundData: RefundData): Promise<Invoice>;
  static async cancelInvoice(id: string, reason: string): Promise<void>;
  
  // Print & Export
  static async generatePDF(id: string): Promise<string>;
  static async sendEmail(id: string, email: string): Promise<void>;
  
  // Statistics
  static async getTotalRevenue(dateRange: DateRange): Promise<number>;
  static async getInvoiceCount(dateRange: DateRange): Promise<number>;
  static async getAverageInvoiceValue(dateRange: DateRange): Promise<number>;
}
```

## Database Schema (Firestore)

### Collection: `invoices`
```typescript
{
  id: string,
  invoiceNumber: string,
  orderNumber: string,
  customerId: string | null,
  customerInfo: {
    name: string,
    phone: string,
    email: string,
  },
  items: [
    {
      id: string,
      productId: string,
      productName: string,
      quantity: number,
      unitPrice: number,
      subtotal: number,
    }
  ],
  subtotal: number,
  discount: number,
  tax: number,
  total: number,
  paymentMethod: string,
  paymentStatus: string,
  tableNumber: string,
  staffId: string,
  createdAt: Timestamp,
  updatedAt: Timestamp,
  paidAt: Timestamp | null,
}
```

### Indexes
```
- invoiceNumber (ASC)
- paymentStatus (ASC), createdAt (DESC)
- staffId (ASC), createdAt (DESC)
- customerId (ASC), createdAt (DESC)
```

## Business Rules

### Quy tắc Tạo Hóa đơn
1. Mã hóa đơn phải unique (auto-generate)
2. Phải có ít nhất 1 sản phẩm
3. Tổng tiền phải > 0
4. Phải xác định nhân viên tạo hóa đơn

### Quy tắc Thanh toán
1. Chỉ thanh toán hóa đơn có status = PENDING
2. Số tiền thanh toán phải = tổng tiền
3. Tiền thừa = Tiền khách đưa - Tổng tiền
4. Sau khi thanh toán, cập nhật status = PAID

### Quy tắc Hoàn tiền
1. Chỉ hoàn tiền hóa đơn đã thanh toán (status = PAID)
2. Số tiền hoàn <= Tổng tiền
3. Yêu cầu quyền Manager/Admin
4. Hoàn lại tồn kho nếu hoàn sản phẩm

### Quy tắc Hủy
1. Chỉ hủy hóa đơn chưa thanh toán (status = PENDING)
2. Phải ghi rõ lý do
3. Cập nhật lại tồn kho
4. Không thể khôi phục sau khi hủy

## Security & Permissions

### Phân quyền

| Action | Admin | Manager | Staff | Cashier |
|--------|-------|---------|-------|---------|
| Tạo hóa đơn | ✅ | ✅ | ✅ | ✅ |
| Xem hóa đơn | ✅ | ✅ | ✅ | ✅ |
| Sửa hóa đơn | ✅ | ✅ | ❌ | ❌ |
| Xóa hóa đơn | ✅ | ✅ | ❌ | ❌ |
| Thanh toán | ✅ | ✅ | ✅ | ✅ |
| Hoàn tiền | ✅ | ✅ | ❌ | ❌ |
| Hủy hóa đơn | ✅ | ✅ | ❌ | ❌ |
| Xem báo cáo | ✅ | ✅ | ❌ | ❌ |

## Testing

### Unit Tests
- Tính toán tổng tiền
- Tính thuế VAT
- Tính giảm giá
- Generate invoice number
- Validate payment amount

### Integration Tests
- Tạo hóa đơn end-to-end
- Thanh toán hóa đơn
- Hoàn tiền
- Hủy hóa đơn

### E2E Tests
- User flow: Tạo đơn → Thanh toán → In hóa đơn
- User flow: Tạo đơn → Hủy
- User flow: Thanh toán → Hoàn tiền

## Performance

### Optimization
- Lazy load danh sách hóa đơn (pagination)
- Cache frequently accessed invoices
- Index database queries
- Compress PDF exports

### Metrics
- Invoice creation time: < 1s
- Payment processing time: < 2s
- PDF generation time: < 3s
- List load time: < 1s

---

**Last Updated:** November 23, 2025  
**Version:** 1.0.0  
**Status:** Planned
