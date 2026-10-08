import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Address, Order, FilterState, ProductCategory } from '../types';
import { PRODUCTS } from '../data/products';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  message: string;
}

export type ModalType =
  | 'none'
  | 'auth'
  | 'quickview'
  | 'address-form'
  | 'about'
  | 'contact'
  | 'faq'
  | 'warranty'
  | 'return-policy'
  | 'privacy'
  | 'terms';

interface StoreContextType {
  // Navigation
  activeTab: 'home' | 'shop' | 'cart' | 'favorites' | 'profile';
  setActiveTab: (tab: 'home' | 'shop' | 'cart' | 'favorites' | 'profile') => void;
  activePage: 'home' | 'shop' | 'product-detail' | 'cart' | 'checkout' | 'order-success' | 'profile' | 'favorites';
  navigateTo: (page: 'home' | 'shop' | 'product-detail' | 'cart' | 'checkout' | 'order-success' | 'profile' | 'favorites', productId?: string) => void;
  selectedProductId: string | null;
  setSelectedProductId: (id: string | null) => void;

  // Products & Filter
  products: Product[];
  filterState: FilterState;
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  setCategoryFilter: (category: ProductCategory) => void;
  setBrandFilter: (brand: string) => void;
  setSearchQuery: (query: string) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, color?: string, storage?: string) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, newQuantity: number) => void;
  clearCart: () => void;
  cartTotalItems: number;
  cartSubtotal: number;
  cartDiscount: number;
  cartFinalTotal: number;

  // Checkout
  checkoutStep: 1 | 2 | 3;
  setCheckoutStep: (step: 1 | 2 | 3) => void;
  addresses: Address[];
  selectedAddressId: string;
  setSelectedAddressId: (id: string) => void;
  addAddress: (address: Omit<Address, 'id'>) => void;
  shippingMethod: 'express' | 'standard';
  setShippingMethod: (method: 'express' | 'standard') => void;
  shippingFee: number;
  couponCode: string;
  appliedCouponDiscount: number;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  paymentGateway: 'saman' | 'mellat' | 'snapppay';
  setPaymentGateway: (gateway: 'saman' | 'mellat' | 'snapppay') => void;
  submitOrder: () => Order;
  lastOrder: Order | null;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // User & Auth
  isLoggedIn: boolean;
  userProfile: {
    name: string;
    phone: string;
    email: string;
    avatar: string;
  };
  login: (phone: string) => void;
  logout: () => void;

  // Modals & Quickview
  activeModal: ModalType;
  openModal: (modal: ModalType, productId?: string) => void;
  closeModal: () => void;
  quickViewProduct: Product | null;

  // Toasts
  toasts: ToastMessage[];
  addToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
}

const defaultFilterState: FilterState = {
  category: 'all',
  brand: 'all',
  searchQuery: '',
  minPrice: 0,
  maxPrice: 200000000,
  inStockOnly: false,
  hasDiscountOnly: false,
  sortBy: 'featured',
  ram: [],
  storage: [],
  processor: [],
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<'home' | 'shop' | 'cart' | 'favorites' | 'profile'>('home');
  const [activePage, setActivePage] = useState<'home' | 'shop' | 'product-detail' | 'cart' | 'checkout' | 'order-success' | 'profile' | 'favorites'>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>('asus-rog-strix-scar-16');

  // Initial cart seeded matching the user's reference mockup (Image 3.png)
  const [cart, setCart] = useState<CartItem[]>(() => {
    const item1 = PRODUCTS.find((p) => p.id === 'asus-rog-strix-scar-16')!;
    const item2 = PRODUCTS.find((p) => p.id === 'logitech-g502-x-plus')!;
    const item3 = PRODUCTS.find((p) => p.id === 'cooler-master-notepal-ergostand')!;
    return [
      {
        id: 'cart-init-1',
        product: item1,
        quantity: 1,
        selectedColor: 'مشکی متالیک',
        selectedWarranty: 'گارانتی نواتک پلاس (۲۴ ماهه)',
        unitPrice: 168500000,
      },
      {
        id: 'cart-init-2',
        product: item2,
        quantity: 1,
        selectedColor: 'سفید قطبی',
        selectedWarranty: 'ضمانت اصالت فیزیکی نواتک',
        unitPrice: 6400000,
      },
      {
        id: 'cart-init-3',
        product: item3,
        quantity: 1,
        selectedWarranty: 'گارانتی ۱۲ ماهه آواژنگ',
        unitPrice: 2100000,
      },
    ];
  });

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(['asus-rog-strix-g16-2024', 'apple-iphone-17-pro']);

  // Filters
  const [filterState, setFilterState] = useState<FilterState>(defaultFilterState);

  // Addresses seeded with the exact address from Image 3.png
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: 'addr-default',
      title: 'دفتر کار ونک (پیش‌فرض)',
      receiverName: 'علیرضا تهرانی',
      phone: '۰۹۱۲۳۴۵۶۷۸۹',
      province: 'تهران',
      city: 'تهران',
      fullAddress: 'تهران، خیابان ولیعصر، بالاتر از میدان ونک، برج فناوری نوین، طبقه ۶، واحد ۲۴',
      postalCode: '۱۹۶۸۸۳۴۵۲۱',
      isDefault: true,
    },
    {
      id: 'addr-home',
      title: 'منزل سعادت‌آباد',
      receiverName: 'علیرضا تهرانی',
      phone: '۰۹۱۲۳۴۵۶۷۸۹',
      province: 'تهران',
      city: 'تهران',
      fullAddress: 'تهران، سعادت‌آباد، میدان کاج، خیابان سرو غربی، پلاک ۴۲، واحد ۱',
      postalCode: '۱۹۹۸۷۱۲۳۴۵',
      isDefault: false,
    },
  ]);
  const [selectedAddressId, setSelectedAddressId] = useState<string>('addr-default');

  // Checkout states
  const [checkoutStep, setCheckoutStep] = useState<1 | 2 | 3>(2);
  const [shippingMethod, setShippingMethod] = useState<'express' | 'standard'>('express');
  const [couponCode, setCouponCode] = useState<string>('NOVAFIRST');
  const [appliedCouponDiscount, setAppliedCouponDiscount] = useState<number>(300000);
  const [paymentGateway, setPaymentGateway] = useState<'saman' | 'mellat' | 'snapppay'>('saman');
  const [lastOrder, setLastOrder] = useState<Order | null>(null);

  // User Profile
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const userProfile = {
    name: 'علیرضا تهرانی',
    phone: '۰۹۱۲۳۴۵۶۷۸۹',
    email: 'hadimehrabi19@gmail.com',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB-G22G3zHY7FhZXvr_faVkjKJ-c2FrFf2M1KyJzuZTZZ6dVqW4Gk-asOSu5LrGYfSirRHKCQg_NTqb_nNxoTeErPkhlfrQ9sfOJ3H1oIw1Oy8LYq0V8jGn4K5TfyEffPQyx9yMT35-alCdVuvqGaSDggzvlWOnjbCR_x8C9WGrnmPsY2lXsgMGcw7fcywcO93tGJpywRlkGQ5q9F8kccbhWCIYn7wiSGoROuorVF3-XMj06nZnoDDxtQ',
  };

  // Modals & QuickView
  const [activeModal, setActiveModal] = useState<ModalType>('none');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart calculations
  const cartTotalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const cartOriginalTotal = cart.reduce(
    (acc, item) => acc + item.product.originalPrice * item.quantity,
    0
  );

  const cartSubtotal = cart.reduce(
    (acc, item) => acc + item.unitPrice * item.quantity,
    0
  );

  const cartDiscount = cartOriginalTotal - cartSubtotal;

  const shippingFee = shippingMethod === 'express' ? 55000 : 0;

  const cartFinalTotal = Math.max(0, cartSubtotal + shippingFee - appliedCouponDiscount);

  // Cart methods
  const addToCart = (product: Product, quantity = 1, color?: string, storage?: string) => {
    const selectedColor = color || (product.colors.length > 0 ? product.colors[0].name : undefined);
    const selectedStorage = storage || (product.storageOptions ? product.storageOptions[0] : undefined);

    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor === selectedColor &&
          item.selectedStorage === selectedStorage
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }

      const newItem: CartItem = {
        id: `cart-${Date.now()}-${Math.random()}`,
        product,
        quantity,
        selectedColor,
        selectedStorage,
        selectedWarranty: product.warranty,
        unitPrice: product.finalPrice,
      };
      return [...prev, newItem];
    });

    addToast(`«${product.titleFa}» به سبد خرید افزوده شد`, 'success');
  };

  const removeFromCart = (cartItemId: string) => {
    const item = cart.find((i) => i.id === cartItemId);
    setCart((prev) => prev.filter((i) => i.id !== cartItemId));
    if (item) {
      addToast(`«${item.product.titleFa}» از سبد خرید حذف شد`, 'info');
    }
  };

  const updateQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity: newQuantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist methods
  const toggleWishlist = (productId: string) => {
    const exists = wishlist.includes(productId);
    if (exists) {
      setWishlist((prev) => prev.filter((id) => id !== productId));
      addToast('از لیست علاقه‌مندی‌ها حذف شد', 'info');
    } else {
      setWishlist((prev) => [...prev, productId]);
      addToast('به لیست علاقه‌مندی‌ها اضافه شد', 'success');
    }
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Address
  const addAddress = (newAddr: Omit<Address, 'id'>) => {
    const id = `addr-${Date.now()}`;
    const item: Address = { ...newAddr, id };
    if (item.isDefault) {
      setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: false })).concat(item));
      setSelectedAddressId(id);
    } else {
      setAddresses((prev) => [...prev, item]);
    }
    addToast('آدرس جدید با موفقیت ذخیره شد', 'success');
  };

  // Coupons
  const applyCoupon = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (clean === 'NOVAFIRST') {
      setCouponCode('NOVAFIRST');
      setAppliedCouponDiscount(300000);
      addToast('کد تخفیف سفارش اول با موفقیت اعمال شد', 'success');
      return true;
    } else if (clean === 'YALDA' || clean === 'TECH500') {
      setCouponCode(clean);
      setAppliedCouponDiscount(500000);
      addToast('کد تخفیف شگفت‌انگیز اعمال شد', 'success');
      return true;
    } else {
      addToast('کد تخفیف وارد شده معتبر نمی‌باشد', 'error');
      return false;
    }
  };

  const removeCoupon = () => {
    setCouponCode('');
    setAppliedCouponDiscount(0);
    addToast('کد تخفیف حذف گردید', 'info');
  };

  // Order submission
  const submitOrder = (): Order => {
    const targetAddress = addresses.find((a) => a.id === selectedAddressId) || addresses[0];
    const orderItems = cart.map((item) => ({
      productId: item.product.id,
      titleFa: item.product.titleFa,
      image: item.product.images[0],
      quantity: item.quantity,
      price: item.unitPrice,
      color: item.selectedColor,
      warranty: item.selectedWarranty,
    }));

    const orderNumber = `NV-${Math.floor(10000 + Math.random() * 90000)}`;
    const trackingCode = `POST-${Math.floor(100000000 + Math.random() * 900000000)}`;

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      date: 'امروز - ۱۴۰۵/۰۷/۱۴',
      status: 'processing',
      statusFa: 'در حال پردازش در انبار نواتک',
      items: orderItems,
      totalAmount: cartSubtotal,
      discountAmount: cartDiscount + appliedCouponDiscount,
      shippingFee,
      finalPaidAmount: cartFinalTotal,
      shippingAddress: targetAddress,
      shippingMethod: shippingMethod === 'express' ? 'ارسال اکسپرس ویژه نواتک' : 'ارسال بیمه‌شده پیشتاز',
      paymentMethod:
        paymentGateway === 'saman'
          ? 'درگاه بانک سامان'
          : paymentGateway === 'mellat'
          ? 'درگاه بانک ملت'
          : 'اقساطی ۴ ماهه اسنپ‌پی',
      trackingCode,
    };

    setLastOrder(newOrder);
    clearCart();
    setCheckoutStep(1);
    navigateTo('order-success');
    addToast('سفارش شما با موفقیت ثبت و پرداخت گردید!', 'success');
    return newOrder;
  };

  // Modals
  const openModal = (modal: ModalType, productId?: string) => {
    if (productId) {
      const prod = PRODUCTS.find((p) => p.id === productId);
      if (prod) setQuickViewProduct(prod);
    }
    setActiveModal(modal);
  };

  const closeModal = () => {
    setActiveModal('none');
    setQuickViewProduct(null);
  };

  const login = (phone: string) => {
    setIsLoggedIn(true);
    closeModal();
    addToast(`خوش‌آمدید ${userProfile.name}`, 'success');
  };

  const logout = () => {
    setIsLoggedIn(false);
    addToast('از حساب کاربری خارج شدید', 'info');
  };

  // Filter setters
  const resetFilters = () => {
    setFilterState(defaultFilterState);
  };

  const setCategoryFilter = (cat: ProductCategory) => {
    setFilterState((prev) => ({ ...prev, category: cat }));
    setActivePage('shop');
    setActiveTab('shop');
  };

  const setBrandFilter = (b: string) => {
    setFilterState((prev) => ({ ...prev, brand: b }));
  };

  const setSearchQuery = (q: string) => {
    setFilterState((prev) => ({ ...prev, searchQuery: q }));
  };

  const navigateTo = (
    page: 'home' | 'shop' | 'product-detail' | 'cart' | 'checkout' | 'order-success' | 'profile' | 'favorites',
    productId?: string
  ) => {
    if (productId) {
      setSelectedProductId(productId);
    }
    setActivePage(page);

    if (page === 'home') setActiveTab('home');
    else if (page === 'shop') setActiveTab('shop');
    else if (page === 'cart' || page === 'checkout') setActiveTab('cart');
    else if (page === 'favorites') setActiveTab('favorites');
    else if (page === 'profile') setActiveTab('profile');

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <StoreContext.Provider
      value={{
        activeTab,
        setActiveTab,
        activePage,
        navigateTo,
        selectedProductId,
        setSelectedProductId,
        products: PRODUCTS,
        filterState,
        setFilterState,
        resetFilters,
        setCategoryFilter,
        setBrandFilter,
        setSearchQuery,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotalItems,
        cartSubtotal,
        cartDiscount,
        cartFinalTotal,
        checkoutStep,
        setCheckoutStep,
        addresses,
        selectedAddressId,
        setSelectedAddressId,
        addAddress,
        shippingMethod,
        setShippingMethod,
        shippingFee,
        couponCode,
        appliedCouponDiscount,
        applyCoupon,
        removeCoupon,
        paymentGateway,
        setPaymentGateway,
        submitOrder,
        lastOrder,
        wishlist,
        toggleWishlist,
        isInWishlist,
        isLoggedIn,
        userProfile,
        login,
        logout,
        activeModal,
        openModal,
        closeModal,
        quickViewProduct,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
