import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { formatToman, toPersianDigits } from '../utils/formatters';

export const CartCheckoutPage: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
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
    navigateTo,
    addToast,
  } = useStore();

  const [inputCoupon, setInputCoupon] = useState('');
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [newProvince, setNewProvince] = useState('تهران');
  const [newCity, setNewCity] = useState('تهران');
  const [newFullAddress, setNewFullAddress] = useState('');
  const [newPostalCode, setNewPostalCode] = useState('');
  const [newReceiverName, setNewReceiverName] = useState('علیرضا تهرانی');
  const [newPhone, setNewPhone] = useState('۰۹۱۲۳۴۵۶۷۸۹');

  const selectedAddress = addresses.find((a) => a.id === selectedAddressId) || addresses[0];

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCoupon) {
      applyCoupon(inputCoupon);
      setInputCoupon('');
    }
  };

  const handleSaveNewAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFullAddress || newPostalCode.length < 10) {
      addToast('لطفاً نشانی کامل و کد پستی ۱۰ رقمی معتبر را وارد نمایید', 'error');
      return;
    }
    addAddress({
      title: 'آدرس جدید',
      receiverName: newReceiverName,
      phone: newPhone,
      province: newProvince,
      city: newCity,
      fullAddress: newFullAddress,
      postalCode: newPostalCode,
      isDefault: true,
    });
    setShowAddressModal(false);
    setNewFullAddress('');
    setNewPostalCode('');
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="w-24 h-24 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
          <span className="material-symbols-outlined text-[48px]">shopping_cart</span>
        </div>
        <h2 className="text-xl font-black text-slate-900 mb-2">سبد خرید شما در حال حاضر خالی است</h2>
        <p className="text-xs text-slate-500 mb-6">
          می‌توانید به صفحات محصولات مراجعه کرده و بهترین کالاهای دیجیتال را به سبد خریدتان اضافه فرمایید.
        </p>
        <button
          onClick={() => navigateTo('shop')}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
        >
          مشاهده محصولات فروشگاه
        </button>
      </div>
    );
  }

  // SnappPay first installment estimation
  const snappPayInstallment = Math.round(cartFinalTotal / 4);

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-6 py-4 pb-28 w-full">
      {/* 1. Step Indicator (Exact match to Reference Image 3) */}
      <section className="w-full bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-xs mb-4">
        <div className="flex items-center justify-between relative max-w-lg mx-auto">
          {/* Progress bar line behind steps */}
          <div className="absolute top-1/2 -translate-y-1/2 start-8 end-8 h-1 bg-slate-100 z-0">
            <div
              className="h-full bg-blue-600 transition-all duration-300"
              style={{
                width: checkoutStep === 1 ? '15%' : checkoutStep === 2 ? '50%' : '100%',
              }}
            ></div>
          </div>

          {/* Step 1: Cart */}
          <button
            onClick={() => setCheckoutStep(1)}
            className="relative z-10 flex flex-col items-center gap-1.5 focus:outline-none"
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                checkoutStep >= 1
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-100 text-slate-400'
              }`}
            >
              {checkoutStep > 1 ? (
                <span className="material-symbols-outlined text-[18px]">check</span>
              ) : (
                '۱'
              )}
            </div>
            <span
              className={`text-xs ${
                checkoutStep === 1 ? 'text-blue-600 font-bold' : 'text-slate-600 font-medium'
              }`}
            >
              سبد خرید
            </span>
          </button>

          {/* Step 2: Shipping & Address (Active) */}
          <button
            onClick={() => setCheckoutStep(2)}
            className="relative z-10 flex flex-col items-center gap-1.5 focus:outline-none"
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                checkoutStep >= 2
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-100 text-slate-400'
              }`}
            >
              {checkoutStep > 2 ? (
                <span className="material-symbols-outlined text-[18px]">check</span>
              ) : (
                '۲'
              )}
            </div>
            <span
              className={`text-xs ${
                checkoutStep === 2 ? 'text-blue-600 font-bold' : 'text-slate-600 font-medium'
              }`}
            >
              اطلاعات ارسال
            </span>
          </button>

          {/* Step 3: Payment */}
          <button
            onClick={() => setCheckoutStep(3)}
            className="relative z-10 flex flex-col items-center gap-1.5 focus:outline-none"
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                checkoutStep === 3
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-100 text-slate-400'
              }`}
            >
              ۳
            </div>
            <span
              className={`text-xs ${
                checkoutStep === 3 ? 'text-blue-600 font-bold' : 'text-slate-400 font-medium'
              }`}
            >
              پرداخت نهایی
            </span>
          </button>
        </div>
      </section>

      {/* 2. Order Items Section (اقلام سفارش شما) */}
      <section className="flex flex-col space-y-3 mb-4">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-blue-600 text-[20px]">
              shopping_basket
            </span>
            <h2 className="text-sm font-bold text-slate-900">اقلام سفارش شما</h2>
          </div>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold">
            {toPersianDigits(cart.length)} کالا
          </span>
        </div>

        <div className="space-y-2.5">
          {cart.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs flex flex-col gap-3"
            >
              <div className="flex gap-3 items-start">
                <div className="relative w-20 h-20 rounded-xl bg-slate-50 flex-shrink-0 p-1.5 border border-slate-100 overflow-hidden">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.titleFa}
                    className="w-full h-full object-contain mix-blend-multiply"
                  />
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-1">
                    {item.product.titleFa}
                  </h3>

                  {item.selectedColor && (
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-800 inline-block"></span>
                      <span className="text-xs text-slate-500">رنگ: {item.selectedColor}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-1 mt-0.5 text-blue-600">
                    <span className="material-symbols-outlined text-[15px]">verified</span>
                    <span className="text-[11px] font-medium">{item.selectedWarranty}</span>
                  </div>
                </div>
              </div>

              {/* Quantity Controls and Unit/Total Price */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <div className="flex items-center bg-slate-100 rounded-lg p-0.5">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-7 h-7 flex items-center justify-center text-slate-700 hover:text-blue-600 rounded-md transition-colors"
                  >
                    <span className="material-symbols-outlined text-[16px]">add</span>
                  </button>
                  <span className="w-7 text-center font-bold text-xs text-slate-900">
                    {toPersianDigits(item.quantity)}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-7 h-7 flex items-center justify-center text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {item.quantity === 1 ? 'delete' : 'remove'}
                    </span>
                  </button>
                </div>

                <div className="flex items-baseline gap-1 text-slate-900">
                  <span className="text-sm sm:text-base font-black">
                    {formatToman(item.unitPrice * item.quantity)}
                  </span>
                  <span className="text-[10px] text-slate-500">تومان</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 3. Delivery Address Section (آدرس تحویل سفارش) */}
      <section className="flex flex-col space-y-2 mb-4">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-blue-600 text-[20px]">location_on</span>
            <h2 className="text-sm font-bold text-slate-900">آدرس تحویل سفارش</h2>
          </div>
          <button
            onClick={() => setShowAddressModal(true)}
            className="text-xs text-blue-600 hover:text-blue-800 font-bold transition-colors"
          >
            تغییر یا ویرایش
          </button>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs relative overflow-hidden">
          {selectedAddress.isDefault && (
            <div className="absolute top-0 end-0 bg-blue-50 text-blue-700 px-3 py-1 rounded-bl-xl text-[11px] font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">check_circle</span>
              <span>آدرس پیش‌فرض</span>
            </div>
          )}

          <p className="text-xs sm:text-sm text-slate-800 font-semibold leading-relaxed mt-2 pe-16">
            {selectedAddress.fullAddress}
          </p>

          <div className="mt-3 pt-3 bg-slate-50 rounded-xl p-3 flex flex-col gap-1 text-slate-600 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-blue-600">person</span>
              <span className="font-bold text-slate-900">گیرنده: {selectedAddress.receiverName}</span>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2 mt-1">
              <span>شماره همراه: {toPersianDigits(selectedAddress.phone)}</span>
              <span>کد پستی: {toPersianDigits(selectedAddress.postalCode)}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Shipping Method Selection (روش و زمان ارسال) */}
      <section className="flex flex-col space-y-2 mb-4">
        <div className="flex items-center gap-2 px-1">
          <span className="material-symbols-outlined text-blue-600 text-[20px]">local_shipping</span>
          <h2 className="text-sm font-bold text-slate-900">روش و زمان ارسال</h2>
        </div>

        <div className="grid grid-cols-1 gap-2.5">
          {/* Express Option */}
          <label
            onClick={() => setShippingMethod('express')}
            className={`relative flex items-start gap-3 p-4 rounded-2xl border transition-all cursor-pointer ${
              shippingMethod === 'express'
                ? 'border-blue-600 bg-blue-50/20 shadow-xs'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <input
              type="radio"
              name="shipping_method"
              checked={shippingMethod === 'express'}
              onChange={() => setShippingMethod('express')}
              className="mt-1 accent-blue-600 w-4 h-4"
            />
            <div className="flex flex-col flex-1">
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <span>ارسال اکسپرس ویژه نواتک</span>
                  <span className="text-[10px] bg-rose-100 text-rose-700 px-1.5 py-0.5 rounded-full font-bold">
                    فوری
                  </span>
                </span>
                <span className="text-xs sm:text-sm font-bold text-blue-600">۵۵,۰۰۰ تومان</span>
              </div>
              <span className="text-xs text-slate-500 mt-1">
                تحویل امروز بین ساعت ۱۶:۰۰ تا ۲۱:۰۰ با ناوگان اختصاصی نواتک در تهران
              </span>
            </div>
          </label>

          {/* Standard Free Shipping Option */}
          <label
            onClick={() => setShippingMethod('standard')}
            className={`relative flex items-start gap-3 p-4 rounded-2xl border transition-all cursor-pointer ${
              shippingMethod === 'standard'
                ? 'border-blue-600 bg-blue-50/20 shadow-xs'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <input
              type="radio"
              name="shipping_method"
              checked={shippingMethod === 'standard'}
              onChange={() => setShippingMethod('standard')}
              className="mt-1 accent-blue-600 w-4 h-4"
            />
            <div className="flex flex-col flex-1">
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm font-semibold text-slate-900">
                  ارسال بیمه‌شده پست پیشتاز / تیپاکس
                </span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                  رایگان
                </span>
              </div>
              <span className="text-xs text-slate-500 mt-1">
                ۲ تا ۳ روز کاری (ویژه خریدهای بالای ۵ میلیون تومان نواتک)
              </span>
            </div>
          </label>
        </div>
      </section>

      {/* 5. Discount Coupon & Gift Card Field */}
      <section className="flex flex-col space-y-2 mb-4">
        <div className="flex items-center gap-2 px-1">
          <span className="material-symbols-outlined text-blue-600 text-[20px]">
            confirmation_number
          </span>
          <h2 className="text-sm font-bold text-slate-900">کد تخفیف و کارت هدیه</h2>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs flex flex-col gap-2.5">
          <form onSubmit={handleApplyCoupon} className="flex items-center gap-2">
            <div className="flex-1 flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 h-11 focus-within:ring-2 focus-within:ring-blue-500">
              <input
                type="text"
                value={couponCode || inputCoupon}
                onChange={(e) => setInputCoupon(e.target.value)}
                placeholder="کد تخفیف (مثال: NOVAFIRST)"
                className="w-full bg-transparent font-mono text-xs sm:text-sm text-slate-900 uppercase font-bold outline-none"
              />
              {couponCode && (
                <span className="material-symbols-outlined text-blue-600 text-[20px]">
                  check_circle
                </span>
              )}
            </div>

            {couponCode ? (
              <button
                type="button"
                onClick={removeCoupon}
                className="h-11 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors"
              >
                حذف کد
              </button>
            ) : (
              <button
                type="submit"
                className="h-11 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-colors"
              >
                اعمال کد
              </button>
            )}
          </form>

          {/* Coupon Active Feedback */}
          {appliedCouponDiscount > 0 && (
            <div className="flex items-center justify-between bg-blue-50 border border-blue-100 px-3 py-2 rounded-xl text-blue-900">
              <div className="flex items-center gap-1.5 text-xs font-semibold">
                <span className="material-symbols-outlined text-[18px] text-blue-600">celebration</span>
                <span>تخفیف سفارش اول با موفقیت اعمال گردید</span>
              </div>
              <span className="font-bold text-xs text-blue-700">
                {formatToman(appliedCouponDiscount)}- تومان
              </span>
            </div>
          )}
        </div>
      </section>

      {/* 6. Payment Gateway Selection (انتخاب روش پرداخت) */}
      <section className="flex flex-col space-y-2 mb-4">
        <div className="flex items-center gap-2 px-1">
          <span className="material-symbols-outlined text-blue-600 text-[20px]">
            account_balance_wallet
          </span>
          <h2 className="text-sm font-bold text-slate-900">انتخاب روش پرداخت</h2>
        </div>

        <div className="grid grid-cols-1 gap-2.5">
          {/* Saman Bank */}
          <label
            onClick={() => setPaymentGateway('saman')}
            className={`flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer ${
              paymentGateway === 'saman'
                ? 'border-blue-600 bg-blue-50/20 shadow-xs'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="payment_gateway"
                checked={paymentGateway === 'saman'}
                onChange={() => setPaymentGateway('saman')}
                className="accent-blue-600 w-4 h-4"
              />
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm font-bold text-slate-900">
                  درگاه مستقیم پرداخت بانک سامان
                </span>
                <span className="text-xs text-slate-500">
                  پرداخت سریع با کلیه کارت‌های شتاب و رمز دوم پویا
                </span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-blue-600">
              <span className="material-symbols-outlined text-[24px]">credit_card</span>
            </div>
          </label>

          {/* Mellat Bank */}
          <label
            onClick={() => setPaymentGateway('mellat')}
            className={`flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer ${
              paymentGateway === 'mellat'
                ? 'border-blue-600 bg-blue-50/20 shadow-xs'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="payment_gateway"
                checked={paymentGateway === 'mellat'}
                onChange={() => setPaymentGateway('mellat')}
                className="accent-blue-600 w-4 h-4"
              />
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm font-semibold text-slate-900">
                  درگاه پرداخت بانک ملت (به‌پرداخت)
                </span>
                <span className="text-xs text-slate-500">
                  اتصال پایدار و رسمی به شبکه امن شاپرک
                </span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600">
              <span className="material-symbols-outlined text-[24px]">account_balance</span>
            </div>
          </label>

          {/* SnappPay 4 Installments */}
          <label
            onClick={() => setPaymentGateway('snapppay')}
            className={`flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer ${
              paymentGateway === 'snapppay'
                ? 'border-indigo-600 bg-indigo-50/20 shadow-xs'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="payment_gateway"
                checked={paymentGateway === 'snapppay'}
                onChange={() => setPaymentGateway('snapppay')}
                className="accent-indigo-600 w-4 h-4"
              />
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm font-bold text-slate-900">
                    پرداخت اقساطی اسنپ‌پی
                  </span>
                  <span className="text-[10px] bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-bold">
                    ۴ قسطه بدون ضامن
                  </span>
                </div>
                <span className="text-xs text-slate-500">
                  قسط اول امروز: {formatToman(snappPayInstallment)} تومان
                </span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
              <span className="material-symbols-outlined text-[22px]">splitscreen</span>
            </div>
          </label>
        </div>
      </section>

      {/* 7. Final Financial Invoice Breakdown (فاکتور نهایی سفارش) */}
      <section className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-xs flex flex-col space-y-3 mb-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <span className="text-xs sm:text-sm font-bold text-slate-900">فاکتور نهایی سفارش</span>
          <span className="text-xs font-mono text-slate-400">کد پیش‌فاکتور: NV-89410</span>
        </div>

        <div className="flex flex-col space-y-2 text-xs text-slate-600">
          <div className="flex justify-between items-center">
            <span>جمع کل اقلام ({toPersianDigits(cart.length)} کالا)</span>
            <span className="font-bold text-slate-900">{formatToman(cartSubtotal + cartDiscount)} تومان</span>
          </div>

          {cartDiscount > 0 && (
            <div className="flex justify-between items-center text-rose-600 font-medium">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">local_offer</span>
                <span>تخفیف شگفت‌انگیز نواتک</span>
              </span>
              <span className="font-bold">{formatToman(cartDiscount)}- تومان</span>
            </div>
          )}

          {appliedCouponDiscount > 0 && (
            <div className="flex justify-between items-center text-rose-600 font-medium">
              <span>کد تخفیف اختصاصی ({couponCode})</span>
              <span className="font-bold">{formatToman(appliedCouponDiscount)}- تومان</span>
            </div>
          )}

          <div className="flex justify-between items-center">
            <span>هزینه بسته‌بندی و ارسال بیمه‌شده</span>
            <span className={`font-bold ${shippingFee === 0 ? 'text-emerald-600' : 'text-slate-800'}`}>
              {shippingFee === 0 ? 'رایگان (سفارش ویژه)' : `${formatToman(shippingFee)} تومان`}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span>مالیات بر ارزش افزوده (۱۰٪)</span>
            <span className="text-slate-400">محاسبه در قیمت کالا</span>
          </div>
        </div>

        {/* Final Payable Highlight */}
        <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-3 sm:p-4 flex items-center justify-between mt-2">
          <div className="flex flex-col">
            <span className="text-xs font-bold text-blue-950">مبلغ نهایی قابل پرداخت:</span>
            <span className="text-[10px] text-blue-600">با احتساب کلیه کسورات و بیمه</span>
          </div>
          <div className="flex items-baseline gap-1 text-blue-600">
            <span className="text-xl sm:text-2xl font-black">{formatToman(cartFinalTotal)}</span>
            <span className="text-xs font-bold text-slate-700">تومان</span>
          </div>
        </div>
      </section>

      {/* 8. Security & Trust Badges */}
      <section className="bg-slate-50 rounded-2xl p-4 border border-slate-200/60 mb-6 flex flex-col gap-1.5">
        <div className="flex items-center gap-2 text-slate-900">
          <span className="material-symbols-outlined text-blue-600 text-[20px]">verified_user</span>
          <span className="text-xs font-bold">خرید امن با تضمین نواتک</span>
        </div>
        <p className="text-[11px] text-slate-500 leading-relaxed">
          کلیه پرداخت‌ها در درگاه شاپرک با پروتکل رمزنگاری پیشرفته SSL 256-bit انجام گرفته و شامل تضمین ۷ روز بازگشت ۱۰۰٪ وجه در صورت هرگونه مغایرت فنی کالا می‌باشد.
        </p>
      </section>

      {/* 9. Sticky Bottom Checkout CTA Action Bar (Exact match to Reference Image 3) */}
      <div className="fixed bottom-16 md:bottom-0 start-0 end-0 z-40 bg-white/95 backdrop-blur-md p-4 border-t border-slate-200 shadow-xl">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-[11px] text-slate-400">مبلغ پرداختی:</span>
            <div className="flex items-baseline gap-1">
              <span className="text-lg sm:text-xl font-black text-blue-600">
                {formatToman(cartFinalTotal)}
              </span>
              <span className="text-xs text-slate-600 font-semibold">تومان</span>
            </div>
          </div>

          <button
            type="button"
            onClick={submitOrder}
            className="flex-1 max-w-sm h-12 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/25"
          >
            <span className="material-symbols-outlined text-[20px]">lock</span>
            <span>پرداخت و ثبت نهایی سفارش</span>
          </button>
        </div>
      </div>

      {/* Address Edit / Add Modal */}
      {showAddressModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="font-bold text-sm text-slate-900">انتخاب یا افزودن آدرس تحویل</h3>
              <button
                onClick={() => setShowAddressModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            {/* List of existing saved addresses */}
            <div className="space-y-2 mb-4 max-h-48 overflow-y-auto pe-1">
              {addresses.map((addr) => (
                <div
                  key={addr.id}
                  onClick={() => {
                    setSelectedAddressId(addr.id);
                    setShowAddressModal(false);
                    addToast(`آدرس «${addr.title}» انتخاب شد`, 'info');
                  }}
                  className={`p-3 rounded-xl border text-xs cursor-pointer transition-colors ${
                    selectedAddressId === addr.id
                      ? 'border-blue-600 bg-blue-50/50'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold text-slate-900 mb-1">
                    <span>{addr.title}</span>
                    {addr.isDefault && (
                      <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">
                        پیش‌فرض
                      </span>
                    )}
                  </div>
                  <p className="text-slate-600 line-clamp-2">{addr.fullAddress}</p>
                </div>
              ))}
            </div>

            {/* Form to add a new address */}
            <div className="border-t border-slate-100 pt-3">
              <h4 className="text-xs font-bold text-slate-800 mb-2">ثبت آدرس جدید:</h4>
              <form onSubmit={handleSaveNewAddress} className="space-y-2.5 text-xs">
                <textarea
                  rows={2}
                  placeholder="نشانی کامل پستی (خیابان، کوچه، پلاک، واحد)"
                  value={newFullAddress}
                  onChange={(e) => setNewFullAddress(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="کد پستی ۱۰ رقمی"
                    value={newPostalCode}
                    onChange={(e) => setNewPostalCode(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="نام تحویل‌گیرنده"
                    value={newReceiverName}
                    onChange={(e) => setNewReceiverName(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-xs"
                >
                  ذخیره و انتخاب این آدرس
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
