import { SvgProps } from 'react-native-svg';

// Import SVG icons
import AddIcon from './icons/fi-rr-add.svg';
import AngleDownIcon from './icons/fi-rr-angle-down.svg';
import AngleLeftIcon from './icons/fi-rr-angle-left.svg';
import AngleRightIcon from './icons/fi-rr-angle-right.svg';
import AngleSmallDownIcon from './icons/fi-rr-angle-small-down.svg';
import AngleSmallLeftIcon from './icons/fi-rr-angle-small-left.svg';
import AngleSmallRightIcon from './icons/fi-rr-angle-small-right.svg';
import AngleSmallUpIcon from './icons/fi-rr-angle-small-up.svg';
import AngleUpIcon from './icons/fi-rr-angle-up.svg';
import ArrowLeftIcon from './icons/fi-rr-arrow-left.svg';
import ArrowSmallDownIcon from './icons/fi-rr-arrow-small-down.svg';
import ArrowSmallLeftIcon from './icons/fi-rr-arrow-small-left.svg';
import ArrowSmallRightIcon from './icons/fi-rr-arrow-small-right.svg';
import ArrowSmallUpIcon from './icons/fi-rr-arrow-small-up.svg';
import CaretDownIcon from './icons/fi-rr-caret-down.svg';
import CaretRightIcon from './icons/fi-rr-caret-right.svg';
import CaretUpIcon from './icons/fi-rr-caret-up.svg';
import CheckIcon from './icons/fi-rr-check.svg';
import ClipIcon from './icons/fi-rr-clip.svg';
import CopyIcon from './icons/fi-rr-copy.svg';
import CrossIcon from './icons/fi-rr-cross.svg';
import EyeCrossedIcon from './icons/fi-rr-eye-crossed.svg';
import EyeIcon from './icons/fi-rr-eye.svg';
import FileIcon from './icons/fi-rr-file.svg';
import FingerprintIcon from './icons/fi-rr-fingerprint.svg';
import KeyIcon from './icons/fi-rr-key.svg';
import LetterCaseIcon from './icons/fi-rr-letter-case.svg';
import LockIcon from './icons/fi-rr-lock.svg';
import MoonIcon from './icons/fi-rr-moon.svg';
import PlusIcon from './icons/fi-rr-plus.svg';
import PowerIcon from './icons/fi-rr-power.svg';
import RefreshIcon from './icons/fi-rr-refresh.svg';
import SearchIcon from './icons/fi-rr-search.svg';
import SettingsIcon from './icons/fi-rr-settings.svg';
import SunIcon from './icons/fi-rr-sun.svg';
import UndoAltIcon from './icons/fi-rr-undo-alt.svg';
import UserIcon from './icons/fi-rr-user.svg';
import MenuBurgerIcon from './icons/fi-rs-menu-burger.svg';
import ShopIcon from './icons/fi-rs-shop.svg';
import ShoppingBagAddIcon from './icons/fi-rs-shopping-bag-add.svg';
import ShoppingBagIcon from './icons/fi-rs-shopping-bag.svg';
import ShoppingCartAddIcon from './icons/fi-rs-shopping-cart-add.svg';
import ShoppingCartIcon from './icons/fi-rs-shopping-cart.svg';
import UnlockIcon from './icons/fi-rs-unlock.svg';

// Export icon map with consistent naming
export const icons = {
  add: AddIcon,
  angleDown: AngleDownIcon,
  angleLeft: AngleLeftIcon,
  angleRight: AngleRightIcon,
  angleSmallDown: AngleSmallDownIcon,
  angleSmallLeft: AngleSmallLeftIcon,
  angleSmallRight: AngleSmallRightIcon,
  angleSmallUp: AngleSmallUpIcon,
  angleUp: AngleUpIcon,
  arrowLeft: ArrowLeftIcon,
  arrowSmallDown: ArrowSmallDownIcon,
  arrowSmallLeft: ArrowSmallLeftIcon,
  arrowSmallRight: ArrowSmallRightIcon,
  arrowSmallUp: ArrowSmallUpIcon,
  caretDown: CaretDownIcon,
  caretRight: CaretRightIcon,
  caretUp: CaretUpIcon,
  check: CheckIcon,
  clip: ClipIcon,
  copy: CopyIcon,
  cross: CrossIcon,
  eyeCrossed: EyeCrossedIcon,
  eye: EyeIcon,
  file: FileIcon,
  fingerprint: FingerprintIcon,
  key: KeyIcon,
  letterCase: LetterCaseIcon,
  lock: LockIcon,
  moon: MoonIcon,
  plus: PlusIcon,
  power: PowerIcon,
  refresh: RefreshIcon,
  search: SearchIcon,
  settings: SettingsIcon,
  sun: SunIcon,
  undoAlt: UndoAltIcon,
  user: UserIcon,
  menuBurger: MenuBurgerIcon,
  shop: ShopIcon,
  shoppingBagAdd: ShoppingBagAddIcon,
  shoppingBag: ShoppingBagIcon,
  shoppingCartAdd: ShoppingCartAddIcon,
  shoppingCart: ShoppingCartIcon,
  unlock: UnlockIcon,
} as const;

// Export icon names for type safety
export type IconName = keyof typeof icons;

// Helper type for icon components
export type IconComponent = React.FC<SvgProps>;

// Export individual icons for direct import
export {
  AddIcon,
  AngleDownIcon,
  AngleLeftIcon,
  AngleRightIcon,
  AngleSmallDownIcon,
  AngleSmallLeftIcon,
  AngleSmallRightIcon,
  AngleSmallUpIcon,
  AngleUpIcon,
  ArrowLeftIcon,
  ArrowSmallDownIcon,
  ArrowSmallLeftIcon,
  ArrowSmallRightIcon,
  ArrowSmallUpIcon,
  CaretDownIcon,
  CaretRightIcon,
  CaretUpIcon,
  CheckIcon,
  ClipIcon,
  CopyIcon,
  CrossIcon,
  EyeCrossedIcon,
  EyeIcon,
  FileIcon,
  FingerprintIcon,
  KeyIcon,
  LetterCaseIcon,
  LockIcon,
  MoonIcon,
  PlusIcon,
  PowerIcon,
  RefreshIcon,
  SearchIcon,
  SettingsIcon,
  SunIcon,
  UndoAltIcon,
  UserIcon,
  MenuBurgerIcon,
  ShopIcon,
  ShoppingBagAddIcon,
  ShoppingBagIcon,
  ShoppingCartAddIcon,
  ShoppingCartIcon,
  UnlockIcon,
};
