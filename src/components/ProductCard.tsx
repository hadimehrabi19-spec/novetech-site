import React from 'react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { formatToman, formatPercent, formatRating, toPersianDigits } from '../utils/formatters';

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, compact = false }) => {
  const { navigateTo, addToCart, toggleWishlist, isInWishlist } = useStore();
  const isFavorite = isInWishlist(product.id);

  const handleCardClick = (e: React.MouseEvent) => {
    // Only navigate if click wasn't on button
    navigateTo('product-detail', product.id);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative flex flex-col bg-white rounded-2xl p-3 border border-slate-100 hover:border-blue-200 shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden"
    >
      {/* Top Image Well & Badges */}
      <div className="relative w-full aspect-square bg-[#f8f9fc] rounded-xl flex items-center justify-center p-3 mb-2.5 overflow-hidden">
        {/* Discount Badge */}
        {product.discountPercent > 0 && (
          <span className="absolute top-2 start-2 bg-rose-600 text-white text-[11px] font-bold px-2 py-0.5 rounded-lg shadow-xs z-10">
            {formatPercent(product.discountPercent)}
          </span>
        )}

        {/* Urgent or Warehouse Badge if no discount */}
        {product.discountPercent === 0 && product.tags.length > 0 && (
          <span className="absolute top-2 start-2 bg-slate-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-lg shadow-xs z-10">
            {product.tags[product.tags.length - 1]}
          </span>
        )}

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={handleToggleFavorite}
          aria-label="افزودن به علاقه‌مندی"
          className="absolute top-2 end-2 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-slate-400 hover:text-rose-600 active:scale-90 transition-all shadow-xs z-10"
        >
          <span
            className={`material-symbols-outlined text-[19px] transition-colors ${
              isFavorite ? 'text-rose-600' : ''
            }`}
            style={{ fontVariationSettings: isFavorite ? "'FILL' 1" : "'FILL' 0" }}
          >
            favorite
          </span>
        </button>

        {/* Product Image */}
        <img
          src={product.images[0]}
          alt={product.titleFa}
          className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          onError={(e) => {
            // Elegant fallback SVG
            (e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80';
          }}
        />

        {/* Stock status overlay if low */}
        {product.stockCount <= 3 && product.stockCount > 0 && (
          <div className="absolute bottom-1.5 start-2 end-2 bg-rose-50 text-rose-700 text-[10px] font-bold py-0.5 px-2 rounded text-center">
            تنها {toPersianDigits(product.stockCount)} عدد در انبار نواتک
          </div>
        )}
      </div>

      {/* Guarantee & Specs Mini Chips */}
      <div className="flex items-center gap-1.5 mb-1.5 overflow-hidden">
        {product.tags.slice(0, 2).map((tag, idx) => (
          <span
            key={idx}
            className={`text-[10px] px-2 py-0.5 rounded-md font-semibold truncate ${
              idx === 0
                ? 'bg-blue-50 text-blue-700'
                : 'bg-indigo-50 text-indigo-700'
            }`}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Product Title */}
      <h3 className="text-xs sm:text-[13px] font-bold text-slate-800 line-clamp-2 leading-snug min-h-[36px] mb-1 group-hover:text-blue-600 transition-colors">
        {product.titleFa}
      </h3>

      {/* Core Specs summary */}
      <p className="text-[11px] text-slate-500 line-clamp-1 mb-2 font-mono" dir="ltr">
        {product.mainSpecs}
      </p>

      {/* Rating & Review count */}
      <div className="flex items-center gap-1 text-[11px] text-slate-500 mb-2">
        <span
          className="material-symbols-outlined text-[15px] text-amber-400"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          star
        </span>
        <span className="font-bold text-slate-800">{formatRating(product.rating)}</span>
        <span className="text-slate-400 text-[10px]">({toPersianDigits(product.reviewsCount)})</span>

        {product.brandFa && (
          <span className="ms-auto text-[11px] text-slate-400 font-medium">{product.brandFa}</span>
        )}
      </div>

      {/* Price & Action Row */}
      <div className="mt-auto pt-2 border-t border-slate-100 flex flex-col">
        {/* Original Price / Strikethrough & Bonus tag */}
        <div className="flex items-center justify-between min-h-[18px]">
          {product.discountPercent > 0 ? (
            <span className="text-[11px] text-slate-400 line-through">
              {formatToman(product.originalPrice)}
            </span>
          ) : (
            <span className="text-[10px] text-slate-400 font-medium">قیمت مصوب</span>
          )}

          {product.specialBadge && (
            <span className="text-[10px] font-semibold text-blue-600 bg-blue-50/70 px-1.5 py-0.5 rounded">
              {product.specialBadge}
            </span>
          )}
        </div>

        {/* Final Price + Add to Cart Button */}
        <div className="flex items-center justify-between mt-1">
          <div className="flex items-baseline gap-1">
            <span className="text-base sm:text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors">
              {formatToman(product.finalPrice)}
            </span>
            <span className="text-[11px] text-slate-500 font-medium">تومان</span>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            aria-label="افزودن به سبد"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white flex items-center justify-center transition-all shadow-sm shadow-blue-600/20"
          >
            <span className="material-symbols-outlined text-[19px]">add_shopping_cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};
