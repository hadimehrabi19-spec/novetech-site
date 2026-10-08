import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { CATEGORIES } from '../data/categories';
import { ProductCategory } from '../types';
import { formatToman, toPersianDigits } from '../utils/formatters';

export const ShopPage: React.FC = () => {
  const {
    products,
    filterState,
    setFilterState,
    resetFilters,
    setBrandFilter,
    setCategoryFilter,
    navigateTo,
  } = useStore();

  const [showFilterDrawer, setShowFilterDrawer] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const brands = [
    { id: 'all', nameFa: 'همه برندها', nameEn: 'All' },
    { id: 'ASUS', nameFa: 'ایسوس (ASUS)', nameEn: 'ASUS' },
    { id: 'Apple', nameFa: 'اپل (Apple)', nameEn: 'Apple' },
    { id: 'Lenovo', nameFa: 'لنوو (Lenovo)', nameEn: 'Lenovo' },
    { id: 'Samsung', nameFa: 'سامسونگ (Samsung)', nameEn: 'Samsung' },
    { id: 'HP', nameFa: 'اچ‌پی (HP)', nameEn: 'HP' },
    { id: 'Sony', nameFa: 'سونی (Sony)', nameEn: 'Sony' },
    { id: 'Logitech', nameFa: 'لاجیتک (Logitech)', nameEn: 'Logitech' },
    { id: 'Cooler Master', nameFa: 'کولرمستر', nameEn: 'Cooler Master' },
    { id: 'Keychron', nameFa: 'کیکرون', nameEn: 'Keychron' },
  ];

  // Active filters count calculation
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filterState.category !== 'all') count++;
    if (filterState.brand !== 'all') count++;
    if (filterState.inStockOnly) count++;
    if (filterState.hasDiscountOnly) count++;
    if (filterState.ram.length > 0) count++;
    if (filterState.storage.length > 0) count++;
    if (filterState.processor.length > 0) count++;
    return count;
  }, [filterState]);

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Category
        if (filterState.category !== 'all' && product.category !== filterState.category) {
          return false;
        }

        // Brand
        if (filterState.brand !== 'all' && product.brand !== filterState.brand) {
          return false;
        }

        // Search query
        if (filterState.searchQuery) {
          const q = filterState.searchQuery.toLowerCase();
          const matchTitle = product.titleFa.toLowerCase().includes(q) || product.titleEn.toLowerCase().includes(q);
          const matchBrand = product.brand.toLowerCase().includes(q) || product.brandFa.includes(q);
          const matchSpecs = product.mainSpecs.toLowerCase().includes(q);
          if (!matchTitle && !matchBrand && !matchSpecs) return false;
        }

        // In Stock only
        if (filterState.inStockOnly && !product.inStock) {
          return false;
        }

        // Discount only
        if (filterState.hasDiscountOnly && product.discountPercent <= 0) {
          return false;
        }

        // RAM filter
        if (filterState.ram.length > 0) {
          const hasRam = filterState.ram.some((r) => product.mainSpecs.toLowerCase().includes(r.toLowerCase()));
          if (!hasRam) return false;
        }

        // Storage filter
        if (filterState.storage.length > 0) {
          const hasStorage = filterState.storage.some((s) => product.mainSpecs.toLowerCase().includes(s.toLowerCase()));
          if (!hasStorage) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (filterState.sortBy === 'price-asc') return a.finalPrice - b.finalPrice;
        if (filterState.sortBy === 'price-desc') return b.finalPrice - a.finalPrice;
        if (filterState.sortBy === 'rating') return b.rating - a.rating;
        if (filterState.sortBy === 'bestselling') return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
        if (filterState.sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
        return 0; // 'featured'
      });
  }, [products, filterState]);

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 4);
      setIsLoadingMore(false);
    }, 600);
  };

  const currentCategory = CATEGORIES.find((c) => c.id === filterState.category) || CATEGORIES[0];

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 w-full">
      {/* 1. Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-xs text-slate-500 py-1 overflow-x-auto no-scrollbar">
        <button onClick={() => navigateTo('home')} className="hover:text-blue-600 transition-colors">
          خانه
        </button>
        <span className="material-symbols-outlined text-[14px] text-slate-400">chevron_left</span>
        <span className="text-slate-500">کالای دیجیتال</span>
        <span className="material-symbols-outlined text-[14px] text-slate-400">chevron_left</span>
        <span className="text-slate-900 font-bold">{currentCategory.nameFa}</span>
        <span className="bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded-full text-[11px] me-auto">
          {toPersianDigits(filteredProducts.length)} کالا
        </span>
      </nav>

      {/* 2. Brand Filter Chips Carousel (matches Reference Image 1) */}
      <div className="flex items-center gap-2 overflow-x-auto py-3 no-scrollbar">
        {brands.map((b) => {
          const isActive = filterState.brand === b.id;
          return (
            <button
              key={b.id}
              onClick={() => setBrandFilter(b.id)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                isActive
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80'
              }`}
            >
              {isActive && <span className="w-1.5 h-1.5 rounded-full bg-blue-200"></span>}
              <span>{b.nameFa}</span>
            </button>
          );
        })}
      </div>

      {/* 3. Filter & Sort Control Bar */}
      <div className="flex items-center justify-between gap-2 py-2 mb-2">
        {/* Filter Trigger Button */}
        <button
          onClick={() => setShowFilterDrawer(true)}
          className="flex items-center gap-1.5 bg-white hover:bg-slate-50 border border-slate-200/80 px-3.5 py-2 rounded-xl text-slate-800 text-xs font-bold transition-colors shadow-xs"
        >
          <span className="material-symbols-outlined text-[18px] text-blue-600">tune</span>
          <span>فیلترها</span>
          {activeFiltersCount > 0 && (
            <span className="bg-blue-600 text-white w-4 h-4 rounded-full flex items-center justify-center text-[10px]">
              {toPersianDigits(activeFiltersCount)}
            </span>
          )}
        </button>

        {/* Sorting Chips */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          {[
            { id: 'featured', label: 'برگزیده', icon: 'sort' },
            { id: 'bestselling', label: 'پرفروش‌ترین' },
            { id: 'newest', label: 'جدیدترین' },
            { id: 'price-asc', label: 'ارزان‌ترین' },
            { id: 'price-desc', label: 'گران‌ترین' },
          ].map((sortItem) => {
            const isActive = filterState.sortBy === sortItem.id;
            return (
              <button
                key={sortItem.id}
                onClick={() => setFilterState((prev) => ({ ...prev, sortBy: sortItem.id as any }))}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-blue-100 text-blue-900 font-bold'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200/60'
                }`}
              >
                {sortItem.icon && (
                  <span className="material-symbols-outlined text-[16px]">{sortItem.icon}</span>
                )}
                <span>{sortItem.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Active Fast-Filter Tags Stream (as in Reference Image 1) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 no-scrollbar">
        {/* Toggle In Stock */}
        <button
          onClick={() =>
            setFilterState((prev) => ({ ...prev, inStockOnly: !prev.inStockOnly }))
          }
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-colors shrink-0 ${
            filterState.inStockOnly
              ? 'bg-blue-600 text-white'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <span className="material-symbols-outlined text-[14px]">
            {filterState.inStockOnly ? 'check' : 'inventory_2'}
          </span>
          <span>موجود در انبار نواتک</span>
        </button>

        {/* Toggle Discount */}
        <button
          onClick={() =>
            setFilterState((prev) => ({ ...prev, hasDiscountOnly: !prev.hasDiscountOnly }))
          }
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-colors shrink-0 ${
            filterState.hasDiscountOnly
              ? 'bg-rose-600 text-white'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <span className="material-symbols-outlined text-[14px]">local_offer</span>
          <span>تخفیف‌دار</span>
        </button>

        {/* Fast RAM Chip */}
        <button
          onClick={() => {
            const has16 = filterState.ram.includes('16GB');
            setFilterState((prev) => ({
              ...prev,
              ram: has16 ? [] : ['16GB', '32GB'],
            }));
          }}
          className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs shrink-0 transition-colors ${
            filterState.ram.length > 0
              ? 'bg-blue-600 text-white font-bold'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <span>رم: ۱۶ گیگابایت و بیشتر</span>
          <span className="material-symbols-outlined text-[14px]">arrow_drop_down</span>
        </button>

        {/* Fast Reset */}
        {activeFiltersCount > 0 && (
          <button
            onClick={resetFilters}
            className="text-xs text-rose-600 hover:underline px-2 shrink-0 font-bold"
          >
            پاک کردن فیلترها
          </button>
        )}
      </div>

      {/* 5. Main Product Grid: 2 columns on mobile (matching Image 1), 3 cols on tablet, 4 on desktop */}
      {filteredProducts.length === 0 ? (
        <div className="py-16 text-center bg-white rounded-3xl border border-slate-100 p-8">
          <span className="material-symbols-outlined text-[54px] text-slate-300">search_off</span>
          <h3 className="text-base font-bold text-slate-800 mt-3">کالایی با مشخصات انتخابی یافت نشد</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            لطفاً فیلترها را تغییر دهید یا عبارت دیگری را جستجو فرمایید.
          </p>
          <button
            onClick={resetFilters}
            className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors"
          >
            حذف تمام فیلترها
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4">
          {filteredProducts.slice(0, visibleCount).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* 6. Pagination & Load More */}
      {filteredProducts.length > 0 && (
        <div className="py-10 flex flex-col items-center gap-3">
          <div className="flex flex-col items-center gap-1.5 text-xs text-slate-500">
            <span>
              نمایش <strong className="text-slate-900 font-bold">{toPersianDigits(Math.min(visibleCount, filteredProducts.length))}</strong> از{' '}
              <strong className="text-blue-600 font-bold">{toPersianDigits(filteredProducts.length)}</strong> کالای موجود
            </span>
            <div className="w-48 h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="bg-blue-600 h-full rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min(100, (visibleCount / filteredProducts.length) * 100)}%`,
                }}
              ></div>
            </div>
          </div>

          {visibleCount < filteredProducts.length && (
            <button
              onClick={handleLoadMore}
              disabled={isLoadingMore}
              className="w-full max-w-sm flex items-center justify-center gap-2 py-3 px-6 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-900 font-bold text-xs shadow-xs transition-all active:scale-[0.98]"
            >
              {isLoadingMore ? (
                <>
                  <span className="material-symbols-outlined text-[18px] text-blue-600 animate-spin">
                    progress_activity
                  </span>
                  <span>در حال بارگذاری...</span>
                </>
              ) : (
                <>
                  <span>مشاهده کالاهای بیشتر</span>
                  <span className="material-symbols-outlined text-[18px] text-slate-400">
                    expand_more
                  </span>
                </>
              )}
            </button>
          )}
        </div>
      )}

      {/* 7. Bottom Institutional Trust Strip (Matching Reference Image 1) */}
      <div className="mt-4 pt-6 border-t border-slate-100">
        <div className="bg-white rounded-2xl p-4 border border-slate-100 flex items-center justify-around gap-2 text-center shadow-xs">
          <div className="flex flex-col items-center gap-1">
            <span className="material-symbols-outlined text-blue-600 text-[24px]">verified</span>
            <span className="text-[11px] text-slate-900 font-bold">ضمانت اصالت ۱۰۰٪</span>
            <span className="text-[10px] text-slate-400">تمامی کالاها پلمپ</span>
          </div>
          <div className="w-px h-8 bg-slate-200"></div>
          <div className="flex flex-col items-center gap-1">
            <span className="material-symbols-outlined text-indigo-600 text-[24px]">
              published_with_changes
            </span>
            <span className="text-[11px] text-slate-900 font-bold">۷ روز ضمانت بازگشت</span>
            <span className="text-[10px] text-slate-400">بی‌قید و شرط</span>
          </div>
          <div className="w-px h-8 bg-slate-200"></div>
          <div className="flex flex-col items-center gap-1">
            <span className="material-symbols-outlined text-blue-600 text-[24px]">headset_mic</span>
            <span className="text-[11px] text-slate-900 font-bold">مشاوره تخصصی</span>
            <span className="text-[10px] text-slate-400">قبل از خرید آنلاین</span>
          </div>
        </div>
      </div>

      {/* Filter Drawer / Sidebar Modal */}
      {showFilterDrawer && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-sm h-full bg-white shadow-2xl p-5 overflow-y-auto flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-blue-600 text-[22px]">tune</span>
                  <h3 className="font-bold text-sm text-slate-900">فیلترهای پیشرفته</h3>
                </div>
                <button
                  onClick={() => setShowFilterDrawer(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </div>

              {/* Category selector */}
              <div className="py-4 border-b border-slate-100">
                <label className="block text-xs font-bold text-slate-800 mb-2">دسته‌بندی</label>
                <div className="space-y-1 max-h-36 overflow-y-auto pe-1">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setCategoryFilter(cat.id)}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                        filterState.category === cat.id
                          ? 'bg-blue-50 text-blue-700 font-bold'
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span>{cat.nameFa}</span>
                      <span className="text-[10px] text-slate-400">{toPersianDigits(cat.count)}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Brand Selector */}
              <div className="py-4 border-b border-slate-100">
                <label className="block text-xs font-bold text-slate-800 mb-2">برند محصول</label>
                <div className="space-y-1.5 max-h-40 overflow-y-auto pe-1">
                  {brands.map((b) => (
                    <label
                      key={b.id}
                      className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="brandFilter"
                        checked={filterState.brand === b.id}
                        onChange={() => setBrandFilter(b.id)}
                        className="accent-blue-600"
                      />
                      <span>{b.nameFa}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Switches */}
              <div className="py-4 space-y-3 border-b border-slate-100">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-xs font-bold text-slate-800">فقط کالاهای موجود در انبار</span>
                  <input
                    type="checkbox"
                    checked={filterState.inStockOnly}
                    onChange={(e) =>
                      setFilterState((prev) => ({ ...prev, inStockOnly: e.target.checked }))
                    }
                    className="accent-blue-600 w-4 h-4"
                  />
                </label>

                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-xs font-bold text-slate-800">فقط کالاهای تخفیف‌دار</span>
                  <input
                    type="checkbox"
                    checked={filterState.hasDiscountOnly}
                    onChange={(e) =>
                      setFilterState((prev) => ({ ...prev, hasDiscountOnly: e.target.checked }))
                    }
                    className="accent-blue-600 w-4 h-4"
                  />
                </label>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-slate-100 flex items-center gap-2">
              <button
                onClick={() => setShowFilterDrawer(false)}
                className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
              >
                اعمال فیلترها ({toPersianDigits(filteredProducts.length)} کالا)
              </button>
              <button
                onClick={resetFilters}
                className="px-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors"
              >
                پاک کردن
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
