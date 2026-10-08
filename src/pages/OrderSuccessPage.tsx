import React from 'react';
import { useStore } from '../context/StoreContext';
import { formatToman, toPersianDigits } from '../utils/formatters';

export const OrderSuccessPage: React.FC = () => {
  const { lastOrder, navigateTo } = useStore();

  const order = lastOrder || {
    id: 'ord-demo',
    orderNumber: 'NV-89410',
    date: 'امروز - ۱۴۰۵/۰۷/۱۴',
    statusFa: 'در حال پردازش در انبار نواتک',
    finalPaidAmount: 169400000,
    trackingCode: 'POST-492019481',
    paymentMethod: 'درگاه مستقیم بانک سامان',
    shippingMethod: 'ارسال اکسپرس ویژه نواتک',
    items: [],
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 w-full pb-24">
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 animate-in zoom-in duration-300">
          <span className="material-symbols-outlined text-[44px]">verified</span>
        </div>

        <h1 className="text-xl sm:text-2xl font-black text-slate-900 mb-1">
          سفارش شما با موفقیت پرداخت و ثبت گردید!
        </h1>
        <p className="text-xs text-slate-500 max-w-md mx-auto mb-6">
          پیامک تایید سفارش به همراه لینک پیگیری آنلاین برای شماره همراه شما ارسال شد. هم‌اکنون همکاران ما در حال پردازش و بسته‌بندی اقلام شما هستند.
        </p>

        {/* Order Details Card */}
        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/70 text-right space-y-3 mb-6 text-xs">
          <div className="flex justify-between items-center pb-2 border-b border-slate-200">
            <span className="text-slate-500">شماره سفارش:</span>
            <span className="font-mono font-bold text-sm text-blue-600">{order.orderNumber}</span>
          </div>

          <div className="flex justify-between items-center pb-2 border-b border-slate-200">
            <span className="text-slate-500">کد رهگیری پستی / ترکینگ:</span>
            <span className="font-mono font-bold text-slate-800">{order.trackingCode}</span>
          </div>

          <div className="flex justify-between items-center pb-2 border-b border-slate-200">
            <span className="text-slate-500">روش و زمان ارسال:</span>
            <span className="font-bold text-slate-800">{order.shippingMethod} (تحویل امروز)</span>
          </div>

          <div className="flex justify-between items-center pb-2 border-b border-slate-200">
            <span className="text-slate-500">درگاه پرداختی:</span>
            <span className="font-bold text-slate-800">{order.paymentMethod}</span>
          </div>

          <div className="flex justify-between items-center pt-1 text-slate-900">
            <span className="font-bold">مبلغ نهایی پرداخت‌شده:</span>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-black text-emerald-600">
                {formatToman(order.finalPaidAmount)}
              </span>
              <span className="text-slate-500">تومان</span>
            </div>
          </div>
        </div>

        {/* Timeline Status */}
        <div className="bg-blue-50/60 rounded-2xl p-4 border border-blue-100 mb-6 text-right">
          <h4 className="font-bold text-xs text-blue-900 mb-3">وضعیت فعلی مرسوله:</h4>
          <div className="flex items-center justify-between text-[11px] text-slate-600 relative">
            <div className="flex flex-col items-center gap-1 z-10">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[12px]">
                ✓
              </span>
              <span className="font-bold text-blue-900">ثبت سفارش</span>
            </div>
            <div className="h-0.5 bg-blue-600 flex-1 -mt-4"></div>
            <div className="flex flex-col items-center gap-1 z-10">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[12px]">
                ✓
              </span>
              <span className="font-bold text-blue-900">پرداخت موفق</span>
            </div>
            <div className="h-0.5 bg-blue-600 flex-1 -mt-4"></div>
            <div className="flex flex-col items-center gap-1 z-10">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[12px] animate-pulse">
                ⚙
              </span>
              <span className="font-bold text-blue-900">انبار نواتک</span>
            </div>
            <div className="h-0.5 bg-slate-200 flex-1 -mt-4"></div>
            <div className="flex flex-col items-center gap-1 z-10 opacity-50">
              <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center text-[12px]">
                🚚
              </span>
              <span>تحویل به پیک</span>
            </div>
          </div>
        </div>

        {/* Navigation Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3 justify-center">
          <button
            onClick={() => navigateTo('profile')}
            className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-md transition-colors"
          >
            مشاهده سفارش در پنل کاربری
          </button>
          <button
            onClick={() => navigateTo('shop')}
            className="w-full sm:w-auto px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs transition-colors"
          >
            ادامه خرید از فروشگاه نواتک
          </button>
        </div>
      </div>
    </div>
  );
};
