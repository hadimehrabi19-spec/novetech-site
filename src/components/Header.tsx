import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES } from '../data/categories';
import { ProductCategory } from '../types';
import { toPersianDigits } from '../utils/formatters';

export const Header: React.FC = () => {
  const {
    activePage,
    navigateTo,
    cartTotalItems,
    wishlist,
    filterState,
    setSearchQuery,
    setCategoryFilter,
    openModal,
    isLoggedIn,
    userProfile,
  } = useStore();

  const [searchInput, setSearchInput] = useState(filterState.searchQuery);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showCategoriesMenu, setShowCategoriesMenu] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close search popover on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchInput);
    setIsSearchFocused(false);
    navigateTo('shop');
  };

  const handleCategoryClick = (catId: ProductCategory) => {
    setCategoryFilter(catId);
    setShowCategoriesMenu(false);
  };

  const popularSearches = [
    'لپ‌تاپ گیمینگ ROG',
    'آیفون ۱۷ پرو',
    'مک‌بوک ایر M3',
    'ماوس لاجیتک G502',
    'SSD سامسونگ 990 پرو',
    'هدفون سونی XM5',
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] transition-all">
      {/* Top micro announcement bar */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-700 text-white text-xs py-1.5 px-4 font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-white/20 text-white px-2 py-0.5 rounded text-[10px] font-bold">پیشنهاد ویژه</span>
            <span>ارسال رایگان سفارش‌های بالای ۵ میلیون تومان + ۷ روز ضمانت بازگشت بی‌قید و شرط</span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-[11px] text-blue-100">
            <button onClick={() => openModal('warranty')} className="hover:text-white transition-colors">
              گارانتی نواتک پلاس
            </button>
            <span>·</span>
            <button onClick={() => openModal('contact')} className="hover:text-white transition-colors">
              پشتیبانی: ۰۲۱-۸۸۸۸۴۳۲۱
            </button>
          </div>
        </div>
      </div>

      {/* Main Header Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Brand Zone */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('home')}
            className="flex items-center gap-2.5 text-right focus:outline-none group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <span className="font-extrabold text-xl tracking-tighter">N</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-blue-600 leading-none group-hover:text-blue-700 transition-colors">
                نواتک
              </span>
              <span className="text-[11px] font-bold tracking-widest text-slate-500 uppercase mt-0.5">
                NOVATECH
              </span>
            </div>
          </button>
        </div>

        {/* Search Bar with live preview */}
        <div ref={searchRef} className="flex-1 max-w-xl relative hidden md:block">
          <form onSubmit={handleSearchSubmit} className="relative">
            <div className="relative flex items-center bg-slate-50 hover:bg-slate-100/80 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500 rounded-xl border border-slate-200/80 transition-all">
              <span className="material-symbols-outlined text-slate-400 ms-3 text-[22px]">search</span>
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                placeholder="جستجو میان بیش از ۵۰,۰۰۰ کالای دیجیتال (لپ‌تاپ، آیفون، کنسول...)"
                className="w-full bg-transparent py-2.5 px-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none"
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchInput('');
                    setSearchQuery('');
                  }}
                  className="me-2 text-slate-400 hover:text-slate-600 p-1"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              )}
              <button
                type="submit"
                className="me-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors"
              >
                جستجو
              </button>
            </div>
          </form>

          {/* Search Dropdown Modal */}
          {isSearchFocused && (
            <div className="absolute top-full start-0 end-0 mt-2 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-700">بیشترین جستجوهای کاربران</span>
                <span className="text-[11px] text-slate-400">داغ‌ترین‌ها</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setSearchInput(item);
                      setSearchQuery(item);
                      setIsSearchFocused(false);
                      navigateTo('shop');
                    }}
                    className="text-xs bg-slate-50 hover:bg-blue-50 hover:text-blue-700 text-slate-700 px-3 py-1.5 rounded-lg border border-slate-200/60 transition-colors flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[14px] text-blue-500">trending_up</span>
                    <span>{item}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Actions Zone: Notifications, Wishlist, Cart, Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              aria-label="اعلان‌ها"
              className="w-10 h-10 relative flex items-center justify-center rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 transition-colors"
            >
              <span className="material-symbols-outlined text-[22px]">notifications</span>
              <span className="absolute top-2 end-2 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white"></span>
            </button>

            {showNotifications && (
              <div className="absolute end-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-100 p-3 z-50">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-800">پیام‌ها و اعلانات نواتک</span>
                  <span className="text-[10px] text-blue-600 font-bold bg-blue-50 px-1.5 py-0.5 rounded">۲ پیام جدید</span>
                </div>
                <div className="mt-2 space-y-2 text-xs">
                  <div className="p-2 rounded-lg bg-blue-50/50 border border-blue-100/50">
                    <p className="font-semibold text-blue-900">سفارش NV-89410 تایید شد</p>
                    <p className="text-slate-500 text-[11px] mt-0.5">بسته‌بندی شما در انبار نواتک تکمیل شد و تحویل پیک گردید.</p>
                  </div>
                  <div className="p-2 rounded-lg hover:bg-slate-50 border border-slate-100">
                    <p className="font-semibold text-slate-800">کد تخفیف اختصاصی ۳۰۰,۰۰۰ تومانی</p>
                    <p className="text-slate-500 text-[11px] mt-0.5">کد NOVAFIRST برای اولین خرید شما فعال است.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={() => navigateTo('favorites')}
            className={`w-10 h-10 relative hidden sm:flex items-center justify-center rounded-xl transition-colors ${
              activePage === 'favorites'
                ? 'bg-red-50 text-red-600'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
            }`}
            title="علاقه‌مندی‌ها"
          >
            <span className="material-symbols-outlined text-[22px]">favorite</span>
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -end-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {toPersianDigits(wishlist.length)}
              </span>
            )}
          </button>

          {/* Cart Bag Button */}
          <button
            onClick={() => navigateTo('cart')}
            className="flex items-center gap-2 h-10 px-3.5 rounded-xl bg-blue-50 hover:bg-blue-100/80 text-blue-700 font-semibold transition-all relative"
            title="سبد خرید"
          >
            <div className="relative flex items-center">
              <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
              {cartTotalItems > 0 && (
                <span className="absolute -top-1.5 -end-2 bg-blue-600 text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-white">
                  {toPersianDigits(cartTotalItems)}
                </span>
              )}
            </div>
            <span className="hidden lg:inline text-xs font-bold">سبد خرید</span>
          </button>

          {/* User Profile / Login */}
          {isLoggedIn ? (
            <button
              onClick={() => navigateTo('profile')}
              className="flex items-center gap-2 p-1 pe-2 sm:pe-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/60 transition-colors"
            >
              <img
                src={userProfile.avatar}
                alt={userProfile.name}
                className="w-8 h-8 rounded-lg object-cover"
              />
              <div className="hidden sm:flex flex-col text-right leading-tight">
                <span className="text-xs font-bold text-slate-800">{userProfile.name}</span>
                <span className="text-[10px] text-slate-400">حساب کاربری</span>
              </div>
            </button>
          ) : (
            <button
              onClick={() => openModal('auth')}
              className="h-10 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm shadow-blue-500/20 transition-all flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[18px]">person</span>
              <span>ورود / ثبت‌نام</span>
            </button>
          )}
        </div>
      </div>

      {/* Mobile Search Bar (Only shown on small screens) */}
      <div className="px-4 pb-2 md:hidden">
        <form onSubmit={handleSearchSubmit} className="relative">
          <div className="relative flex items-center bg-slate-100 rounded-xl px-3 py-2">
            <span className="material-symbols-outlined text-slate-400 text-[20px] ms-1">search</span>
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="جستجو در بیش از ۵۰,۰۰۰ کالای دیجیتال..."
              className="w-full bg-transparent px-2 text-xs text-slate-800 placeholder:text-slate-400 outline-none"
            />
          </div>
        </form>
      </div>

      {/* Category Chips Carousel - matching reference design */}
      <div className="border-t border-slate-100 bg-slate-50/70">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {/* Mega menu trigger on desktop */}
          <div className="relative shrink-0">
            <button
              onClick={() => setShowCategoriesMenu(!showCategoriesMenu)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200/80 text-slate-800 font-bold text-xs transition-colors shadow-xs"
            >
              <span className="material-symbols-outlined text-blue-600 text-[18px]">menu</span>
              <span>دسته‌بندی‌ها</span>
              <span className="material-symbols-outlined text-slate-400 text-[16px]">expand_more</span>
            </button>

            {showCategoriesMenu && (
              <div className="absolute top-full start-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryClick(cat.id)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-blue-50 text-right text-xs text-slate-700 hover:text-blue-700 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px] text-slate-400">
                        {cat.icon}
                      </span>
                      <span>{cat.nameFa}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium">
                      {toPersianDigits(cat.count)}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="h-4 w-px bg-slate-200 shrink-0"></div>

          {/* Quick Category Chips */}
          {CATEGORIES.map((cat) => {
            const isActive = filterState.category === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all shrink-0 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200/60'
                }`}
              >
                {cat.nameFa}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
