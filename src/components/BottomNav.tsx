import React from 'react';
import { useStore } from '../context/StoreContext';
import { toPersianDigits } from '../utils/formatters';

export const BottomNav: React.FC = () => {
  const { activePage, navigateTo, cartTotalItems, wishlist } = useStore();

  const navItems = [
    {
      id: 'home',
      label: 'خانه',
      icon: 'home',
      target: 'home' as const,
      badge: 0,
    },
    {
      id: 'shop',
      label: 'دسته‌بندی‌ها',
      icon: 'grid_view',
      target: 'shop' as const,
      badge: 0,
    },
    {
      id: 'cart',
      label: 'سبد خرید',
      icon: 'shopping_bag',
      target: 'cart' as const,
      badge: cartTotalItems,
    },
    {
      id: 'favorites',
      label: 'علاقه‌مندی‌ها',
      icon: 'favorite',
      target: 'favorites' as const,
      badge: wishlist.length,
    },
    {
      id: 'profile',
      label: 'پروفایل من',
      icon: 'person',
      target: 'profile' as const,
      badge: 0,
    },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 start-0 end-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200/80 shadow-[0_-2px_12px_rgba(0,0,0,0.05)] pb-safe">
      <div className="flex justify-around items-center h-16 px-1">
        {navItems.map((item) => {
          const isActive =
            activePage === item.target ||
            (item.target === 'cart' && (activePage === 'checkout' || activePage === 'order-success'));

          return (
            <button
              key={item.id}
              onClick={() => navigateTo(item.target)}
              className={`flex flex-col items-center justify-center min-w-[56px] h-12 relative transition-all duration-200 ${
                isActive ? 'text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <div className="relative">
                <span
                  className="material-symbols-outlined text-[24px]"
                  style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                >
                  {item.icon}
                </span>

                {item.badge > 0 && (
                  <span className="absolute -top-1 -end-2.5 bg-blue-600 text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center leading-none ring-2 ring-white">
                    {toPersianDigits(item.badge)}
                  </span>
                )}
              </div>
              <span className="text-[11px] mt-0.5">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
