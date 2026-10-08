export type ProductCategory =
  | 'all'
  | 'laptops'
  | 'smartphones'
  | 'tablets'
  | 'monitors'
  | 'headphones'
  | 'earbuds'
  | 'keyboards'
  | 'mice'
  | 'storage'
  | 'gaming'
  | 'smartwatches'
  | 'accessories';

export interface ProductVariant {
  id: string;
  colorName: string;
  colorHex: string;
  storageOrRam?: string;
  priceDelta: number;
}

export interface ProductReview {
  id: string;
  userName: string;
  userCity: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
  pros?: string[];
  cons?: string[];
  likes: number;
}

export interface TechnicalSpec {
  category: string;
  items: { [key: string]: string };
}

export interface Product {
  id: string;
  titleFa: string;
  titleEn: string;
  brand: string;
  brandFa: string;
  category: ProductCategory;
  categoryFa: string;
  originalPrice: number;
  discountPercent: number;
  finalPrice: number;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  stockCount: number;
  images: string[];
  mainSpecs: string; // e.g. "Core i9 14900HX • RTX 4070 • 32GB"
  tags: string[]; // e.g. "گارانتی ۲۴ ماهه", "240Hz Nebula", "ارسال فوری"
  specialBadge?: string; // e.g. "پیشنهاد شگفت‌انگیز", "پرفروش‌ترین"
  warranty: string;
  colors: { name: string; hex: string }[];
  storageOptions?: string[];
  description: string;
  pros: string[];
  cons: string[];
  specs: TechnicalSpec[];
  reviews: ProductReview[];
  isFeatured?: boolean;
  isGaming?: boolean;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedStorage?: string;
  selectedWarranty: string;
  unitPrice: number;
}

export interface Address {
  id: string;
  title: string;
  receiverName: string;
  phone: string;
  province: string;
  city: string;
  fullAddress: string;
  postalCode: string;
  isDefault: boolean;
}

export interface OrderItem {
  productId: string;
  titleFa: string;
  image: string;
  quantity: number;
  price: number;
  color?: string;
  warranty: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  statusFa: string;
  items: OrderItem[];
  totalAmount: number;
  discountAmount: number;
  shippingFee: number;
  finalPaidAmount: number;
  shippingAddress: Address;
  shippingMethod: string;
  paymentMethod: string;
  trackingCode: string;
}

export interface FilterState {
  category: ProductCategory;
  brand: string;
  searchQuery: string;
  minPrice: number;
  maxPrice: number;
  inStockOnly: boolean;
  hasDiscountOnly: boolean;
  sortBy: 'featured' | 'bestselling' | 'newest' | 'price-asc' | 'price-desc' | 'rating';
  ram: string[];
  storage: string[];
  processor: string[];
}
