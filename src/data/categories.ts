import { ProductCategory } from '../types';

export interface CategoryInfo {
  id: ProductCategory;
  nameFa: string;
  nameEn: string;
  icon: string;
  count: number;
  description: string;
  badge?: string;
}

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'all',
    nameFa: 'همه محصولات',
    nameEn: 'All Products',
    icon: 'apps',
    count: 418,
    description: 'مشاهده کامل‌ترین آرشیو کالاهای دیجیتال روز دنیا',
  },
  {
    id: 'laptops',
    nameFa: 'لپ‌تاپ و اولترابوک',
    nameEn: 'Laptops',
    icon: 'laptop_mac',
    count: 142,
    description: 'مک‌بوک، لپ‌تاپ‌های گیمینگ، اداری و مهندسی',
    badge: 'پرفروش',
  },
  {
    id: 'smartphones',
    nameFa: 'گوشی موبایل',
    nameEn: 'Smartphones',
    icon: 'smartphone',
    count: 98,
    description: 'پرچمداران آیفون، سامسونگ، شیائومی با رجیستری',
    badge: 'داغ',
  },
  {
    id: 'tablets',
    nameFa: 'تبلت و کتابخوان',
    nameEn: 'Tablets',
    icon: 'tablet_mac',
    count: 36,
    description: 'آیپد اپل، تبلت‌های قلم‌دار سامسونگ و سرفیس',
  },
  {
    id: 'gaming',
    nameFa: 'تجهیزات گیمینگ',
    nameEn: 'Gaming Gear',
    icon: 'sports_esports',
    count: 64,
    description: 'کنسول بازی، هدست، دسته‌های حرفه‌ای و صندلی گیمینگ',
    badge: 'ویژه',
  },
  {
    id: 'monitors',
    nameFa: 'مانیتور تخصصی',
    nameEn: 'Monitors',
    icon: 'desktop_windows',
    count: 28,
    description: 'مانیتورهای OLED، منحنی و مناسب طراحی گرافیک و ادیت',
  },
  {
    id: 'headphones',
    nameFa: 'هدفون و هدست',
    nameEn: 'Headphones',
    icon: 'headphones',
    count: 45,
    description: 'هدفون‌های نویزکنسلینگ سونی، سنهایزر و اپل',
  },
  {
    id: 'earbuds',
    nameFa: 'هندزفری بلوتوث',
    nameEn: 'Earbuds',
    icon: 'graphic_eq',
    count: 52,
    description: 'ایرپاد اپل، گلکسی بادز و هندزفری‌های بیسیم',
  },
  {
    id: 'smartwatches',
    nameFa: 'ساعت هوشمند',
    nameEn: 'Smartwatches',
    icon: 'watch',
    count: 33,
    description: 'اپل واچ اولترا، گلکسی واچ، گارمین و امیزفیت',
  },
  {
    id: 'keyboards',
    nameFa: 'کیبورد مکانیکال',
    nameEn: 'Keyboards',
    icon: 'keyboard',
    count: 38,
    description: 'کیبوردهای مکانیکال لاجیتک، ریزر و کیکرون',
  },
  {
    id: 'mice',
    nameFa: 'ماوس و پد ماوس',
    nameEn: 'Mice',
    icon: 'mouse',
    count: 40,
    description: 'ماوس‌های ارگونومیک، بی‌سیم اداری و گیمینگ شتاب‌بالا',
  },
  {
    id: 'storage',
    nameFa: 'هارد و حافظه SSD',
    nameEn: 'Storage & SSD',
    icon: 'save',
    count: 47,
    description: 'حافظه‌های پرسرعت NVMe M.2، SSD اکسترنال و فلش مموری',
  },
  {
    id: 'accessories',
    nameFa: 'لوازم جانبی دیجیتال',
    nameEn: 'Accessories',
    icon: 'cable',
    count: 85,
    description: 'شارژرهای GaN، کابل‌های فست شارژ، پاوربانک و هاب',
  },
];
