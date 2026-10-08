import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { formatToman, toPersianDigits } from '../utils/formatters';

export const ProfilePage: React.FC = () => {
  const {
    userProfile,
    isLoggedIn,
    openModal,
    logout,
    addresses,
    wishlist,
    products,
    navigateTo,
    addToast,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'wishlist' | 'info'>('orders');

  if (!isLoggedIn) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <div className="w-20 h-20 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
          <span className="material-symbols-outlined text-[40px]">person</span>
        </div>
        <h2 className="text-lg font-bold text-slate-900 mb-2">ورود به حساب کاربری نواتک</h2>
        <p className="text-xs text-slate-500 mb-6">
          برای مشاهده تاریخچه سفارش‌ها، فاکتورها، و آدرس‌های تحویل، لطفاً وارد حساب خود شوید.
        </p>
        <button
          onClick={() => openModal('auth')}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
        >
          ورود یا ثبت‌نام سریع
        </button>
      </div>
    );
  }

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  // Sample order history
  const demoOrders = [
    {
      id: 'ord-101',
      number: 'NV-89410',
      date: '۱۴۰۵/۰۷/۱۴',
      status: 'در حال پردازش در انبار',
      statusColor: 'text-blue-600 bg-blue-50',
      totalPrice: 169400000,
      itemCount: 3,
      items: [
        'لپ‌تاپ گیمینگ ASUS ROG Strix SCAR 16',
        'ماوس گیمینگ لاجیتک G502 X Plus',
        'پایه خنک‌کننده کولرمستر Notepal',
      ],
      trackingCode: 'POST-492019481',
    },
    {
      id: 'ord-100',
      number: 'NV-77124',
      date: '۱۴۰۵/۰۶/۲۰',
      status: 'تحویل داده شده',
      statusColor: 'text-emerald-700 bg-emerald-50',
      totalPrice: 22540000,
      itemCount: 1,
      items: ['هدفون بی‌سیم نویزکنسلینگ سونی WH-1000XM5'],
      trackingCode: 'POST-312984102',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 pb-24 w-full">
      {/* User Header Profile Card */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <img
            src={userProfile.avatar}
            alt={userProfile.name}
            className="w-16 h-16 rounded-2xl object-cover ring-4 ring-blue-50 shadow-sm"
          />
          <div className="text-right">
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black text-slate-900">{userProfile.name}</h1>
              <span className="text-[10px] bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded-full">
                کاربر طلایی نواتک
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1">
              <span>تلفن: {toPersianDigits(userProfile.phone)}</span>
              <span>·</span>
              <span>ایمیل: {userProfile.email}</span>
            </div>
          </div>
        </div>

        <button
          onClick={logout}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">logout</span>
          <span>خروج از حساب</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
        <div className="flex items-center gap-4 border-b border-slate-200 pb-3 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-2 pb-2 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'orders'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">receipt_long</span>
            <span>تاریخچه سفارش‌ها ({toPersianDigits(demoOrders.length)})</span>
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`flex items-center gap-2 pb-2 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'addresses'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">pin_drop</span>
            <span>آدرس‌های ذخیره شده ({toPersianDigits(addresses.length)})</span>
          </button>

          <button
            onClick={() => setActiveTab('wishlist')}
            className={`flex items-center gap-2 pb-2 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'wishlist'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">favorite</span>
            <span>لیست علاقه‌مندی‌ها ({toPersianDigits(wishlist.length)})</span>
          </button>
        </div>

        {/* Tab content */}
        <div className="py-6">
          {/* Orders History Tab */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              {demoOrders.map((ord) => (
                <div
                  key={ord.id}
                  className="p-5 rounded-2xl bg-slate-50 border border-slate-200/70 flex flex-col gap-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">سفارش {ord.number}</span>
                      <span className="text-slate-400">· {toPersianDigits(ord.date)}</span>
                    </div>
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${ord.statusColor}`}>
                      {ord.status}
                    </span>
                  </div>

                  <div className="text-xs text-slate-700 space-y-1">
                    <span className="font-semibold text-slate-500">اقلام خریداری‌شده:</span>
                    <ul className="list-disc list-inside space-y-0.5 pe-2">
                      {ord.items.map((item, idx) => (
                        <li key={idx} className="truncate">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-200 text-xs">
                    <span className="text-slate-500 font-mono">کد رهگیری: {ord.trackingCode}</span>
                    <div className="flex items-baseline gap-1 text-slate-900 font-bold">
                      <span>مبلغ کل:</span>
                      <span className="text-sm font-black text-blue-600">
                        {formatToman(ord.totalPrice)}
                      </span>
                      <span className="text-[10px] text-slate-500">تومان</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Addresses Tab */}
          {activeTab === 'addresses' && (
            <div className="space-y-4">
              {addresses.map((addr) => (
                <div
                  key={addr.id}
                  className="p-5 rounded-2xl border border-slate-200 bg-white relative flex flex-col gap-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-slate-900">
                      <span className="material-symbols-outlined text-[18px] text-blue-600">
                        location_on
                      </span>
                      <span>{addr.title}</span>
                    </div>
                    {addr.isDefault && (
                      <span className="text-[10px] bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded">
                        آدرس پیش‌فرض
                      </span>
                    )}
                  </div>
                  <p className="text-slate-700 leading-relaxed">{addr.fullAddress}</p>
                  <div className="flex flex-wrap items-center justify-between gap-2 text-slate-500 pt-2 border-t border-slate-100">
                    <span>گیرنده: {addr.receiverName} ({toPersianDigits(addr.phone)})</span>
                    <span>کد پستی: {toPersianDigits(addr.postalCode)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Wishlist Tab */}
          {activeTab === 'wishlist' && (
            <div>
              {wishlistProducts.length === 0 ? (
                <div className="text-center py-10 text-slate-400 text-xs">
                  هیچ کالایی در لیست علاقه‌مندی‌های شما وجود ندارد.
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {wishlistProducts.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
