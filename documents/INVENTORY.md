# 📦 Quản lý Tồn kho (Inventory Management)

## Tổng quan

Module quản lý tồn kho giúp theo dõi, kiểm soát và tối ưu hóa lượng hàng tồn kho, đảm bảo cửa hàng
luôn có đủ hàng để phục vụ khách hàng mà không bị thừa hoặc thiếu hàng.

## Tính năng Chính

### 1. Quản lý Sản phẩm

#### Thông tin Sản phẩm

```typescript
interface Product {
  id: string;
  sku: string; // Mã SKU
  barcode?: string; // Mã vạch
  name: string; // Tên sản phẩm
  description: string; // Mô tả
  category: ProductCategory; // Danh mục
  unit: string; // Đơn vị (kg, lít, cái, phần)
  images: string[]; // Hình ảnh

  // Pricing
  costPrice: number; // Giá nhập
  sellingPrice: number; // Giá bán
  profitMargin: number; // % Lãi

  // Inventory
  currentStock: number; // Tồn kho hiện tại
  minStock: number; // Tồn kho tối thiểu
  maxStock: number; // Tồn kho tối đa
  reorderPoint: number; // Điểm đặt hàng lại

  // Attributes
  expiryDate?: string; // Hạn sử dụng
  batchNumber?: string; // Số lô
  location?: string; // Vị trí trong kho

  // Status
  status: ProductStatus; // Còn hàng/Hết hàng/Ngừng kinh doanh
  isActive: boolean; // Đang kinh doanh

  // Metadata
  supplierId?: string; // Nhà cung cấp
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

enum ProductStatus {
  IN_STOCK = 'in_stock',
  LOW_STOCK = 'low_stock',
  OUT_OF_STOCK = 'out_of_stock',
  DISCONTINUED = 'discontinued',
}

enum ProductCategory {
  FOOD = 'food',
  BEVERAGE = 'beverage',
  RAW_MATERIAL = 'raw_material',
  PACKAGING = 'packaging',
  SUPPLIES = 'supplies',
  OTHER = 'other',
}
```

### 2. Nhập kho (Stock In)

#### Phiếu Nhập kho

```typescript
interface StockInReceipt {
  id: string;
  receiptNumber: string; // Mã phiếu nhập
  supplierId: string; // Nhà cung cấp
  supplierInvoice?: string; // Hóa đơn nhà cung cấp
  items: StockInItem[]; // Danh sách hàng nhập
  totalAmount: number; // Tổng tiền
  paymentStatus: PaymentStatus; // Trạng thái thanh toán
  notes?: string; // Ghi chú
  warehouseId?: string; // Kho nhập
  receivedBy: string; // Người nhận hàng
  approvedBy?: string; // Người duyệt
  createdAt: string;
  receivedAt?: string; // Thời gian nhận hàng
}

interface StockInItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number; // Giá nhập
  subtotal: number;
  batchNumber?: string; // Số lô
  expiryDate?: string; // HSD
  notes?: string;
}
```

#### Quy trình Nhập kho

1. Tạo phiếu nhập kho
2. Thêm sản phẩm và số lượng
3. Xác nhận nhận hàng
4. Kiểm tra chất lượng
5. Duyệt phiếu nhập (Manager/Admin)
6. Cập nhật tồn kho
7. Xử lý thanh toán nhà cung cấp

```typescript
// Create stock in receipt
const receipt = await InventoryService.createStockIn({
  supplierId: 'supplier_123',
  items: [
    {
      productId: 'product_1',
      quantity: 100,
      unitPrice: 50000,
    },
    {
      productId: 'product_2',
      quantity: 50,
      unitPrice: 80000,
    },
  ],
  receivedBy: 'staff_123',
});

// Approve and update stock
await InventoryService.approveStockIn(receipt.id, 'manager_123');
```

### 3. Xuất kho (Stock Out)

#### Phiếu Xuất kho

```typescript
interface StockOutReceipt {
  id: string;
  receiptNumber: string; // Mã phiếu xuất
  type: StockOutType; // Loại xuất kho
  orderId?: string; // ID đơn hàng (nếu xuất cho order)
  items: StockOutItem[]; // Danh sách hàng xuất
  reason?: string; // Lý do xuất
  notes?: string; // Ghi chú
  issuedBy: string; // Người xuất
  approvedBy?: string; // Người duyệt
  createdAt: string;
  issuedAt?: string; // Thời gian xuất
}

enum StockOutType {
  SALES = 'sales', // Bán hàng
  DAMAGED = 'damaged', // Hư hỏng
  EXPIRED = 'expired', // Hết hạn
  TRANSFER = 'transfer', // Chuyển kho
  RETURN = 'return', // Trả hàng nhà cung cấp
  OTHER = 'other', // Khác
}
```

#### Tự động Xuất kho

- Khi tạo đơn hàng → tự động xuất kho
- Khi thanh toán đơn hàng → confirm xuất kho
- Khi hủy đơn hàng → hoàn lại kho

### 4. Kiểm kê Tồn kho

#### Phiếu Kiểm kê

```typescript
interface StockTakeReceipt {
  id: string;
  receiptNumber: string; // Mã phiếu kiểm kê
  type: StockTakeType; // Loại kiểm kê
  items: StockTakeItem[]; // Danh sách kiểm kê
  status: StockTakeStatus; // Trạng thái
  notes?: string; // Ghi chú
  performedBy: string; // Người kiểm kê
  verifiedBy?: string; // Người xác nhận
  createdAt: string;
  completedAt?: string; // Thời gian hoàn thành
}

interface StockTakeItem {
  productId: string;
  productName: string;
  systemStock: number; // Tồn kho trên hệ thống
  actualStock: number; // Tồn kho thực tế
  difference: number; // Chênh lệch
  reason?: string; // Lý do chênh lệch
  value: number; // Giá trị chênh lệch
}

enum StockTakeType {
  FULL = 'full', // Kiểm kê toàn bộ
  PARTIAL = 'partial', // Kiểm kê một phần
  CYCLE = 'cycle', // Kiểm kê định kỳ
  SPOT = 'spot', // Kiểm kê đột xuất
}

enum StockTakeStatus {
  IN_PROGRESS = 'in_progress', // Đang kiểm kê
  COMPLETED = 'completed', // Hoàn thành
  VERIFIED = 'verified', // Đã xác nhận
  CANCELLED = 'cancelled', // Đã hủy
}
```

#### Quy trình Kiểm kê

1. Tạo phiếu kiểm kê
2. Chọn sản phẩm/danh mục cần kiểm
3. Đếm số lượng thực tế
4. So sánh với số liệu hệ thống
5. Ghi nhận chênh lệch và lý do
6. Xác nhận và cập nhật tồn kho
7. Tạo báo cáo kiểm kê

```typescript
// Create stock take
const stockTake = await InventoryService.createStockTake({
  type: StockTakeType.FULL,
  performedBy: 'staff_123',
});

// Record actual count
await InventoryService.recordStockCount(stockTake.id, [
  {
    productId: 'product_1',
    systemStock: 100,
    actualStock: 95,
    reason: 'Hư hỏng 5 sản phẩm',
  },
]);

// Complete and adjust stock
await InventoryService.completeStockTake(stockTake.id);
```

### 5. Cảnh báo Tồn kho

#### Loại Cảnh báo

```typescript
interface StockAlert {
  id: string;
  productId: string;
  productName: string;
  alertType: AlertType;
  currentStock: number;
  threshold: number;
  severity: AlertSeverity;
  message: string;
  isResolved: boolean;
  createdAt: string;
  resolvedAt?: string;
}

enum AlertType {
  LOW_STOCK = 'low_stock', // Hàng sắp hết
  OUT_OF_STOCK = 'out_of_stock', // Hết hàng
  OVERSTOCK = 'overstock', // Tồn kho quá nhiều
  EXPIRING_SOON = 'expiring_soon', // Sắp hết hạn
  EXPIRED = 'expired', // Đã hết hạn
}

enum AlertSeverity {
  INFO = 'info',
  WARNING = 'warning',
  CRITICAL = 'critical',
}
```

#### Thiết lập Cảnh báo

```typescript
// Set reorder point
await ProductService.updateProduct(productId, {
  minStock: 10,
  reorderPoint: 20,
});

// System automatically creates alerts when:
// - currentStock <= minStock (LOW_STOCK)
// - currentStock === 0 (OUT_OF_STOCK)
// - expiryDate - today <= 7 days (EXPIRING_SOON)
// - expiryDate < today (EXPIRED)
```

### 6. Quản lý Nhà cung cấp

#### Thông tin Nhà cung cấp

```typescript
interface Supplier {
  id: string;
  code: string; // Mã NCC
  name: string; // Tên NCC
  contactPerson: string; // Người liên hệ
  phone: string; // Số điện thoại
  email?: string; // Email
  address: string; // Địa chỉ
  taxCode?: string; // Mã số thuế

  // Payment
  paymentTerms?: string; // Điều khoản thanh toán
  bankAccount?: {
    bankName: string;
    accountNumber: string;
    accountName: string;
  };

  // Products
  products: string[]; // Danh sách sản phẩm cung cấp

  // Performance
  rating: number; // Đánh giá (1-5 sao)
  totalOrders: number; // Số đơn đã đặt
  totalValue: number; // Tổng giá trị

  // Status
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
```

### 7. Báo cáo Tồn kho

#### Các loại Báo cáo

1. **Báo cáo Tồn kho Hiện tại**

   - Tổng số sản phẩm
   - Tổng giá trị tồn kho
   - Phân loại theo danh mục
   - Sản phẩm hết hàng/sắp hết

2. **Báo cáo Nhập/Xuất**

   - Lịch sử nhập/xuất kho
   - Tổng giá trị nhập/xuất
   - Top sản phẩm nhập/xuất nhiều nhất

3. **Báo cáo Chênh lệch Kiểm kê**

   - Danh sách sản phẩm có chênh lệch
   - Giá trị chênh lệch
   - Lý do chênh lệch

4. **Báo cáo Hàng Tồn kho Chậm**

   - Sản phẩm ít bán
   - Số ngày tồn kho
   - Giá trị hàng tồn

5. **Báo cáo Hết hạn/Sắp hết hạn**
   - Danh sách sản phẩm hết hạn
   - Sản phẩm sắp hết hạn (7, 15, 30 ngày)
   - Giá trị hàng hết hạn

## UI/UX Design

### Màn hình Dashboard Tồn kho

```
┌─────────────────────────────────────┐
│ 📦 Tồn kho        [+ Nhập] [Xuất]  │
├─────────────────────────────────────┤
│ Tổng quan                           │
│ ┌───────────┐ ┌───────────┐       │
│ │ 🏪 245    │ │ 💰 125M   │       │
│ │ Sản phẩm  │ │ Giá trị   │       │
│ └───────────┘ └───────────┘       │
│ ┌───────────┐ ┌───────────┐       │
│ │ ⚠️  12    │ │ 🔴 5      │       │
│ │ Sắp hết   │ │ Hết hàng  │       │
│ └───────────┘ └───────────┘       │
├─────────────────────────────────────┤
│ Cảnh báo                            │
│ ⚠️  Cafe đen sắp hết (còn 5kg)     │
│ 🔴 Nước ngọt hết hàng              │
│ ⏰  Sữa hết hạn sau 3 ngày         │
├─────────────────────────────────────┤
│ Danh sách sản phẩm  🔍 [Search]    │
│ ┌─────────────────────────────────┐ │
│ │ Phở bò           Còn: 50 phần  │ │
│ │ Kho: Nguyên liệu  50,000đ/phần │ │
│ │ ✅ Đang kinh doanh             │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

### Màn hình Nhập kho

```
┌─────────────────────────────────────┐
│ ← Phiếu nhập kho                    │
├─────────────────────────────────────┤
│ Nhà cung cấp: [Chọn NCC ▼]        │
│ Số hóa đơn: [....................]  │
│ Ngày nhập: [23/11/2025]            │
├─────────────────────────────────────┤
│ Danh sách hàng hóa  [+ Thêm]      │
│ ┌─────────────────────────────────┐ │
│ │ Cafe hạt           Số lượng: 10│ │
│ │ 200,000đ x 10kg    [✏️] [🗑️]  │ │
│ │ Tổng: 2,000,000đ   HSD: 1/2026 │ │
│ └─────────────────────────────────┘ │
├─────────────────────────────────────┤
│ Tổng tiền:            5,000,000đ   │
├─────────────────────────────────────┤
│ [Lưu nháp]  [Xác nhận nhập kho]   │
└─────────────────────────────────────┘
```

### Màn hình Kiểm kê

```
┌─────────────────────────────────────┐
│ ← Kiểm kê tồn kho                   │
├─────────────────────────────────────┤
│ Loại: [Toàn bộ ▼]  Ngày: 23/11    │
│ Người kiểm: Nguyễn Văn A           │
├─────────────────────────────────────┤
│ ┌─────────────────────────────────┐ │
│ │ Cafe đen                        │ │
│ │ HT: 100kg  TT: [95]kg          │ │
│ │ Chênh: -5kg  💰 -500,000đ      │ │
│ │ Lý do: [Hư hỏng...............]  │ │
│ └─────────────────────────────────┘ │
├─────────────────────────────────────┤
│ Tổng chênh lệch:     -1,200,000đ   │
├─────────────────────────────────────┤
│ [Lưu]  [Hoàn thành kiểm kê]       │
└─────────────────────────────────────┘
```

## API Endpoints

### Inventory Service

```typescript
class InventoryService {
  // Products
  static async getProducts(filters?: ProductFilters): Promise<Product[]>;
  static async getProductById(id: string): Promise<Product>;
  static async createProduct(data: CreateProductData): Promise<Product>;
  static async updateProduct(id: string, data: Partial<Product>): Promise<Product>;
  static async deleteProduct(id: string): Promise<void>;

  // Stock In
  static async createStockIn(data: CreateStockInData): Promise<StockInReceipt>;
  static async approveStockIn(id: string, approvedBy: string): Promise<StockInReceipt>;
  static async cancelStockIn(id: string, reason: string): Promise<void>;

  // Stock Out
  static async createStockOut(data: CreateStockOutData): Promise<StockOutReceipt>;
  static async approveStockOut(id: string, approvedBy: string): Promise<StockOutReceipt>;

  // Stock Take
  static async createStockTake(data: CreateStockTakeData): Promise<StockTakeReceipt>;
  static async recordStockCount(id: string, items: StockTakeItem[]): Promise<StockTakeReceipt>;
  static async completeStockTake(id: string): Promise<StockTakeReceipt>;

  // Alerts
  static async getStockAlerts(filters?: AlertFilters): Promise<StockAlert[]>;
  static async resolveAlert(id: string): Promise<void>;

  // Suppliers
  static async getSuppliers(): Promise<Supplier[]>;
  static async createSupplier(data: CreateSupplierData): Promise<Supplier>;
  static async updateSupplier(id: string, data: Partial<Supplier>): Promise<Supplier>;

  // Reports
  static async getCurrentStockReport(): Promise<StockReport>;
  static async getStockMovementReport(dateRange: DateRange): Promise<MovementReport>;
  static async getExpiringProductsReport(days: number): Promise<ExpiringReport>;
}
```

## Database Schema (Firestore)

### Collection: `products`

```typescript
{
  id: string,
  sku: string,
  name: string,
  category: string,
  costPrice: number,
  sellingPrice: number,
  currentStock: number,
  minStock: number,
  status: string,
  isActive: boolean,
  createdAt: Timestamp,
  updatedAt: Timestamp,
}
```

### Collection: `stock_movements`

```typescript
{
  id: string,
  type: 'in' | 'out' | 'adjustment',
  productId: string,
  quantity: number,
  beforeStock: number,
  afterStock: number,
  reason: string,
  performedBy: string,
  createdAt: Timestamp,
}
```

### Collection: `stock_alerts`

```typescript
{
  id: string,
  productId: string,
  alertType: string,
  severity: string,
  currentStock: number,
  threshold: number,
  isResolved: boolean,
  createdAt: Timestamp,
}
```

## Business Rules

### Tồn kho Tối thiểu

- minStock: Mức tồn kho tối thiểu cảnh báo
- reorderPoint: Điểm đặt hàng lại (thường = minStock + lead time stock)
- Ví dụ: minStock = 10, reorderPoint = 20

### Xuất kho

- Không được xuất kho số lượng > tồn kho hiện tại
- Tự động cảnh báo khi tồn kho sau xuất < minStock
- FIFO (First In First Out) cho hàng có HSD

### Kiểm kê

- Kiểm kê định kỳ: ít nhất 1 lần/tháng
- Kiểm kê đột xuất: khi phát hiện bất thường
- Chênh lệch > 5% cần điều tra và báo cáo

### Hết hạn

- Cảnh báo 30 ngày trước HSD
- Tự động đánh dấu hết hạn khi quá HSD
- Không được bán hàng hết hạn

## Security & Permissions

### Phân quyền

| Action      | Admin | Manager | Staff | Cashier |
| ----------- | ----- | ------- | ----- | ------- |
| Xem tồn kho | ✅    | ✅      | ✅    | ✅      |
| Nhập kho    | ✅    | ✅      | ❌    | ❌      |
| Xuất kho    | ✅    | ✅      | ✅    | ❌      |
| Kiểm kê     | ✅    | ✅      | ✅    | ❌      |
| Duyệt phiếu | ✅    | ✅      | ❌    | ❌      |
| Sửa/Xóa     | ✅    | ✅      | ❌    | ❌      |
| Xem báo cáo | ✅    | ✅      | ❌    | ❌      |

## Performance Optimization

### Database Indexes

```
- products: sku, category, status
- stock_movements: productId, createdAt DESC
- stock_alerts: productId, isResolved, createdAt DESC
```

### Caching

- Cache frequently accessed products
- Cache current stock levels
- Invalidate cache on stock updates

### Metrics

- Stock query time: < 500ms
- Stock update time: < 1s
- Report generation: < 3s

---

**Last Updated:** November 23, 2025  
**Version:** 1.0.0  
**Status:** Planned
