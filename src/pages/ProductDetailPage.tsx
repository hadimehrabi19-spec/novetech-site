import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { formatToman, formatPercent, formatRating, toPersianDigits } from '../utils/formatters';

export const ProductDetailPage: React.FC = () => {
  const {
    products,
    selectedProductId,
    addToCart,
    toggleWishlist,
    isInWishlist,
    navigateTo,
    addToast,
  } = useStore();

  const product = products.find((p) => p.id === selectedProductId) || products[0];

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(
    product.colors.length > 0 ? product.colors[0].name : ''
  );
  const [selectedStorage, setSelectedStorage] = useState(
    product.storageOptions ? product.storageOptions[0] : ''
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'desc' | 'reviews'>('specs');

  // Review form state
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [reviewsList, setReviewsList] = useState(product.reviews);

  const isFavorite = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedStorage);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor, selectedStorage);
    navigateTo('cart');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      addToast('لینک اشتراک‌گذاری محصول در حافظه کپی شد', 'success');
    }
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor || !newReviewComment) {
      addToast('لطفاً نام و متن نظر خود را وارد فرمایید', 'error');
      return;
    }
    const newRev = {
      id: `rev-user-${Date.now()}`,
      userName: newReviewAuthor,
      userCity: 'تهران',
      rating: newReviewRating,
      date: 'لحظاتی پیش',
      comment: newReviewComment,
      verifiedPurchase: true,
      likes: 1,
    };
    setReviewsList([newRev, ...reviewsList]);
    setNewReviewAuthor('');
    setNewReviewComment('');
    addToast('نظر ارزشمند شما با موفقیت ثبت گردید', 'success');
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 w-full">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-slate-500 py-2 overflow-x-auto no-scrollbar">
        <button onClick={() => navigateTo('home')} className="hover:text-blue-600">
          خانه
        </button>
        <span className="material-symbols-outlined text-[14px]">chevron_left</span>
        <button onClick={() => navigateTo('shop')} className="hover:text-blue-600">
          {product.categoryFa}
        </button>
        <span className="material-symbols-outlined text-[14px]">chevron_left</span>
        <span className="text-slate-800 font-bold truncate max-w-xs">{product.titleFa}</span>
      </nav>

      {/* Main PDP Grid: Gallery (Left in RTL, Right in LTR) + Buy Box */}
      <div className="bg-white rounded-3xl p-4 sm:p-8 border border-slate-100 shadow-sm mt-2 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Gallery Column */}
        <div className="lg:col-span-5 flex flex-col items-center">
          {/* Main Large Image */}
          <div className="relative w-full aspect-square bg-[#f8f9fc] rounded-2xl flex items-center justify-center p-6 overflow-hidden">
            {product.discountPercent > 0 && (
              <span className="absolute top-4 start-4 bg-rose-600 text-white text-xs font-bold px-2.5 py-1 rounded-xl shadow-xs">
                {formatPercent(product.discountPercent)}
              </span>
            )}

            <button
              onClick={() => toggleWishlist(product.id)}
              className="absolute top-4 end-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-slate-400 hover:text-rose-600 shadow-xs transition-colors"
            >
              <span
                className={`material-symbols-outlined text-[22px] ${isFavorite ? 'text-rose-600' : ''}`}
                style={{ fontVariationSettings: isFavorite ? "'FILL' 1" : "'FILL' 0" }}
              >
                favorite
              </span>
            </button>

            <img
              src={product.images[selectedImage] || product.images[0]}
              alt={product.titleFa}
              className="w-full h-full object-contain mix-blend-multiply transition-all duration-300"
            />
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-3 mt-4">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-16 h-16 rounded-xl bg-slate-50 p-1.5 border-2 transition-all ${
                    selectedImage === idx ? 'border-blue-600 scale-105' : 'border-slate-200 opacity-70'
                  }`}
                >
                  <img src={img} alt="نمای کوچک" className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          )}

          {/* Share & Code bar */}
          <div className="w-full flex items-center justify-between text-xs text-slate-400 mt-4 pt-3 border-t border-slate-100">
            <span>کد کالا: {product.id}</span>
            <button
              onClick={handleShare}
              className="flex items-center gap-1 hover:text-blue-600 transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">share</span>
              <span>اشتراک‌گذاری</span>
            </button>
          </div>
        </div>

        {/* Product Details & Selection Column */}
        <div className="lg:col-span-7 flex flex-col">
          {/* Brand & Guarantee chips */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold bg-blue-50 text-blue-700 px-2.5 py-1 rounded-lg">
              برند: {product.brandFa} ({product.brand})
            </span>
            {product.specialBadge && (
              <span className="text-xs font-bold bg-purple-50 text-purple-700 px-2.5 py-1 rounded-lg">
                {product.specialBadge}
              </span>
            )}
          </div>

          {/* Persian & English Title */}
          <h1 className="text-lg sm:text-2xl font-black text-slate-900 leading-snug mb-1">
            {product.titleFa}
          </h1>
          <p className="text-xs font-mono text-slate-400 mb-4" dir="ltr">
            {product.titleEn}
          </p>

          {/* Ratings & Reviews summary */}
          <div className="flex items-center gap-2 text-xs text-slate-600 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-1 text-amber-500 font-bold">
              <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                star
              </span>
              <span>{formatRating(product.rating)}</span>
            </div>
            <span>·</span>
            <span>{toPersianDigits(reviewsList.length)} دیدگاه ثبت‌شده</span>
            <span>·</span>
            <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium">
              ۹۵٪ خریداران این کالا را پیشنهاد داده‌اند
            </span>
          </div>

          {/* Color Selection */}
          {product.colors.length > 0 && (
            <div className="py-4 border-b border-slate-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-800">انتخاب رنگ:</span>
                <span className="text-xs text-blue-600 font-semibold">{selectedColor}</span>
              </div>
              <div className="flex items-center gap-2.5">
                {product.colors.map((c) => {
                  const isSelected = selectedColor === c.name;
                  return (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/50 text-blue-900 shadow-xs'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/10 inline-block"
                        style={{ backgroundColor: c.hex }}
                      ></span>
                      <span>{c.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Storage / Configuration Selection */}
          {product.storageOptions && product.storageOptions.length > 0 && (
            <div className="py-4 border-b border-slate-100">
              <span className="block text-xs font-bold text-slate-800 mb-2">ظرفیت و کانفیگ سخت‌افزاری:</span>
              <div className="flex flex-wrap gap-2">
                {product.storageOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setSelectedStorage(opt)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                      selectedStorage === opt
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Warranty & Guarantee */}
          <div className="py-4 border-b border-slate-100 flex items-start gap-2.5">
            <span className="material-symbols-outlined text-blue-600 text-[22px]">verified</span>
            <div>
              <h4 className="text-xs font-bold text-slate-900">گارانتی و خدمات</h4>
              <p className="text-xs text-slate-600 mt-0.5">{product.warranty}</p>
            </div>
          </div>

          {/* Price & Quantity & CTA Module */}
          <div className="mt-6 p-4 sm:p-6 bg-slate-50 rounded-2xl border border-slate-200/80 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">قیمت برای شما:</span>
              <div className="flex items-baseline gap-1 text-slate-900">
                {product.discountPercent > 0 && (
                  <span className="text-xs text-slate-400 line-through me-2">
                    {formatToman(product.originalPrice)}
                  </span>
                )}
                <span className="text-2xl font-black text-blue-600">
                  {formatToman(product.finalPrice)}
                </span>
                <span className="text-xs text-slate-500 font-semibold">تومان</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              {/* Quantity Stepper */}
              <div className="flex items-center bg-white border border-slate-200 rounded-xl p-1 w-full sm:w-auto justify-between sm:justify-start">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(product.stockCount, q + 1))}
                  className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-700"
                >
                  <span className="material-symbols-outlined text-[18px]">add</span>
                </button>
                <span className="w-10 text-center font-bold text-sm text-slate-800">
                  {toPersianDigits(quantity)}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-700"
                >
                  <span className="material-symbols-outlined text-[18px]">remove</span>
                </button>
              </div>

              {/* Add to Cart CTA */}
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[20px]">add_shopping_cart</span>
                <span>افزودن به سبد خرید</span>
              </button>

              {/* Buy Now CTA */}
              <button
                type="button"
                onClick={handleBuyNow}
                className="w-full sm:w-auto py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-colors whitespace-nowrap"
              >
                خرید سریع
              </button>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-200/60">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-emerald-600 text-[16px]">local_shipping</span>
                <span>ارسال فوری امروز با ناوگان اختصاصی نواتک</span>
              </span>
              <span className="font-semibold text-slate-700">موجود در انبار ونک</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs: Specifications, Description, Pros/Cons, Reviews */}
      <div className="bg-white rounded-3xl p-4 sm:p-8 border border-slate-100 shadow-sm mt-8">
        <div className="flex items-center gap-4 border-b border-slate-200 pb-3 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('specs')}
            className={`flex items-center gap-1.5 pb-2 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'specs'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">list_alt</span>
            <span>مشخصات فنی کامل</span>
          </button>

          <button
            onClick={() => setActiveTab('desc')}
            className={`flex items-center gap-1.5 pb-2 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'desc'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">description</span>
            <span>نقد و بررسی و مزایا/معایب</span>
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`flex items-center gap-1.5 pb-2 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'reviews'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">rate_review</span>
            <span>نظرات کاربران ({toPersianDigits(reviewsList.length)})</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="py-6">
          {activeTab === 'specs' && (
            <div className="space-y-6">
              {product.specs.map((specCat, idx) => (
                <div key={idx} className="bg-slate-50/70 rounded-2xl p-4 border border-slate-100">
                  <h3 className="font-bold text-xs text-blue-700 mb-3">{specCat.category}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                    {Object.entries(specCat.items).map(([key, val]) => (
                      <div
                        key={key}
                        className="flex justify-between items-center bg-white p-2.5 rounded-xl border border-slate-100"
                      >
                        <span className="text-slate-500 font-medium">{key}:</span>
                        <span className="text-slate-800 font-bold text-left" dir="ltr">
                          {val}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'desc' && (
            <div className="space-y-6 text-xs text-slate-700 leading-relaxed">
              <p className="text-sm font-normal text-slate-800 leading-loose">{product.description}</p>

              {/* Pros & Cons box */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <div className="bg-emerald-50/70 border border-emerald-200/60 rounded-2xl p-4">
                  <h4 className="font-bold text-emerald-900 text-xs flex items-center gap-1.5 mb-2.5">
                    <span className="material-symbols-outlined text-[18px] text-emerald-600">thumb_up</span>
                    <span>نقاط قوت و مزایا</span>
                  </h4>
                  <ul className="space-y-1.5">
                    {product.pros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-emerald-800">
                        <span className="material-symbols-outlined text-[16px] text-emerald-600 shrink-0 mt-0.5">
                          check_circle
                        </span>
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-rose-50/70 border border-rose-200/60 rounded-2xl p-4">
                  <h4 className="font-bold text-rose-900 text-xs flex items-center gap-1.5 mb-2.5">
                    <span className="material-symbols-outlined text-[18px] text-rose-600">thumb_down</span>
                    <span>نقاط ضعف و معایب</span>
                  </h4>
                  <ul className="space-y-1.5">
                    {product.cons.map((con, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-rose-800">
                        <span className="material-symbols-outlined text-[16px] text-rose-500 shrink-0 mt-0.5">
                          cancel
                        </span>
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-8">
              {/* Form to submit review */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80">
                <h4 className="font-bold text-slate-900 text-xs mb-3">ثبت دیدگاه یا تجربه خرید شما</h4>
                <form onSubmit={handleAddReview} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="نام و نام خانوادگی"
                      value={newReviewAuthor}
                      onChange={(e) => setNewReviewAuthor(e.target.value)}
                      className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2">
                      <span className="text-xs text-slate-500">امتیاز شما:</span>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setNewReviewRating(star)}
                            className="text-amber-400 hover:scale-110 transition-transform"
                          >
                            <span
                              className="material-symbols-outlined text-[18px]"
                              style={{
                                fontVariationSettings: star <= newReviewRating ? "'FILL' 1" : "'FILL' 0",
                              }}
                            >
                              star
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <textarea
                    rows={3}
                    placeholder="نظر، نقاط مثبت و تجربه استفاده از این کالا..."
                    value={newReviewComment}
                    onChange={(e) => setNewReviewComment(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>

                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-colors shadow-xs"
                  >
                    ثبت نظر
                  </button>
                </form>
              </div>

              {/* Existing Reviews */}
              <div className="space-y-4">
                {reviewsList.map((rev) => (
                  <div key={rev.id} className="p-4 rounded-2xl bg-white border border-slate-100 shadow-xs">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-slate-900">{rev.userName}</span>
                        <span className="text-[10px] text-slate-400">({rev.userCity})</span>
                        {rev.verifiedPurchase && (
                          <span className="text-[9px] bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded font-bold">
                            خریدار
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-amber-500 text-xs">
                        {[...Array(rev.rating)].map((_, i) => (
                          <span
                            key={i}
                            className="material-symbols-outlined text-[15px]"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            star
                          </span>
                        ))}
                        <span className="text-slate-400 text-[10px] ms-1">{rev.date}</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">{rev.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-lg font-black text-slate-900 mb-4">کالاهای مشابه و مرتبط</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
