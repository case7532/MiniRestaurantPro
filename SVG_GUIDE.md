# 📐 Hướng dẫn sử dụng SVG trong React Native

## 🎯 Đã cài đặt

- ✅ `react-native-svg` - Library để render SVG
- ✅ `react-native-svg-transformer` - Transformer để import SVG như component
- ✅ Cấu hình Metro bundler
- ✅ TypeScript declaration cho SVG files

## 📦 Cách sử dụng

### 1. Import SVG như một component

**Cách 1: Import trực tiếp (không khuyến khích)**
```tsx
import HomeIcon from '@/assets/icons/home.svg';
import MenuIcon from '@/assets/icons/menu.svg';
```

**Cách 2: Import từ barrel export (Khuyên dùng ✅)**
```tsx
// Import một hoặc nhiều icons cùng lúc
import { HomeIcon, MenuIcon, OrdersIcon, SettingsIcon } from '@/assets/icons';
```

Barrel export giúp:
- ✅ Import ngắn gọn hơn
- ✅ Dễ quản lý và maintain
- ✅ Tự động complete trong IDE

### 2. Sử dụng SVG component

```tsx
// Cách cơ bản
<HomeIcon width={24} height={24} />

// Với màu sắc
<HomeIcon width={24} height={24} color="#FF0000" />

// Với fill và stroke
<HomeIcon
  width={32}
  height={32}
  fill="#FF0000"
  stroke="#000000"
  strokeWidth={2}
/>

// Sử dụng với theme
<HomeIcon
  width={24}
  height={24}
  color={theme.colors.primary}
/>
```

### 3. Các props có sẵn

SVG components hỗ trợ tất cả props của `react-native-svg`:

- `width` - Chiều rộng
- `height` - Chiều cao
- `color` - Màu (thay thế cho `currentColor` trong SVG)
- `fill` - Màu fill
- `stroke` - Màu stroke
- `strokeWidth` - Độ dày stroke
- `opacity` - Độ trong suốt
- `style` - Custom styles

## 📁 Cấu trúc thư mục

```
src/
  assets/
    icons/
      home.svg
      menu.svg
      orders.svg
      settings.svg
```

## 🎨 Tạo SVG files mới

### Bước 1: Thêm SVG file vào thư mục

1. Thêm file `.svg` vào `src/assets/icons/`
2. Export icon trong `src/assets/icons/index.ts`:
   ```tsx
   export { default as NewIcon } from './new-icon.svg';
   ```

### Bước 2: Yêu cầu cho SVG file

1. **Sử dụng `currentColor`**: Để SVG có thể thay đổi màu qua props
   ```svg
   <path stroke="currentColor" fill="currentColor" />
   ```

2. **Set viewBox**: Để SVG scale đúng
   ```svg
   <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
   ```

3. **Loại bỏ width/height cố định**: Để có thể điều chỉnh qua props
   ```svg
   <!-- ❌ Không nên -->
   <svg width="24" height="24">

   <!-- ✅ Nên -->
   <svg viewBox="0 0 24 24">
   ```

## 💡 Ví dụ thực tế

### Trong Tab Navigator (MainTabs.tsx)

```tsx
import { HomeIcon, MenuIcon, OrdersIcon, SettingsIcon } from '@/assets/icons';

<Tab.Screen
  name="HomeTab"
  component={HomeScreen}
  options={{
    tabBarLabel: 'Home',
    tabBarIcon: ({ color }) => (
      <HomeIcon width={24} height={24} color={color} />
    ),
  }}
/>
```

### Trong Component thông thường

```tsx
import { useTheme } from '@hooks/useTheme';
import { SettingsIcon } from '@/assets/icons';

const MyComponent = () => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity>
      <SettingsIcon
        width={24}
        height={24}
        color={theme.colors.primary}
      />
      <Text>Settings</Text>
    </TouchableOpacity>
  );
};
```

### Sử dụng nhiều icons

```tsx
import { HomeIcon, MenuIcon, OrdersIcon, SettingsIcon } from '@/assets/icons';

const IconGrid = () => {
  const { theme } = useTheme();

  return (
    <View style={styles.grid}>
      <HomeIcon width={32} height={32} color={theme.colors.primary} />
      <MenuIcon width={32} height={32} color={theme.colors.primary} />
      <OrdersIcon width={32} height={32} color={theme.colors.primary} />
      <SettingsIcon width={32} height={32} color={theme.colors.primary} />
    </View>
  );
};
```

## 🔧 Troubleshooting

### Lỗi: "Cannot find module '*.svg'"

**Giải pháp**: Đảm bảo file `src/types/svg.d.ts` tồn tại và restart TypeScript server.

### Lỗi: SVG không hiển thị

**Giải pháp**:
1. Restart Metro bundler: `yarn start --reset-cache`
2. Kiểm tra SVG file có đúng format không
3. Đảm bảo đã cấu hình `metro.config.js` đúng

### Lỗi: SVG không thay đổi màu

**Giải pháp**: Đảm bảo SVG file sử dụng `currentColor`:
```svg
<path stroke="currentColor" fill="currentColor" />
```

## 🌐 Resources

- [react-native-svg docs](https://github.com/software-mansion/react-native-svg)
- [react-native-svg-transformer](https://github.com/kristerkari/react-native-svg-transformer)
- [SVG Icons](https://heroicons.com/) - Free SVG icons
- [Feather Icons](https://feathericons.com/) - Beautiful SVG icons

## 🎨 Icon Libraries khuyên dùng

Các website để tìm SVG icons miễn phí:

1. **Heroicons** (https://heroicons.com) - Minimalist, đẹp
2. **Feather Icons** (https://feathericons.com) - Lightweight
3. **Lucide** (https://lucide.dev) - Fork của Feather Icons, nhiều hơn
4. **Iconoir** (https://iconoir.com) - Modern, clean
5. **Tabler Icons** (https://tabler-icons.io) - Rất nhiều icons

Tất cả đều miễn phí và support `currentColor`!
