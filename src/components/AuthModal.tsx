import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { toPersianDigits } from '../utils/formatters';

export const AuthModal: React.FC = () => {
  const { activeModal, closeModal, login, addToast } = useStore();
  const [phoneNumber, setPhoneNumber] = useState('09123456789');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [otpCode, setOtpCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (activeModal !== 'auth') return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.length < 10) {
      addToast('لطفاً شماره موبایل معتبر ۱۱ رقمی وارد نمایید', 'error');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep('otp');
      setOtpCode('8941'); // autofill realistic sample OTP
      addToast('کد تایید ۴ رقمی به شماره شما پیامک شد (کد نمونه: ۸۹۴۱)', 'info');
    }, 600);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode.length < 4) {
      addToast('لطفاً کد تایید ۴ رقمی را وارد نمایید', 'error');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      login(phoneNumber);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-5 end-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        {/* Brand Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-extrabold text-2xl shadow-lg shadow-blue-500/25 mb-3">
            N
          </div>
          <h3 className="text-lg font-black text-slate-900">ورود به حساب کاربری نواتک</h3>
          <p className="text-xs text-slate-500 mt-1">
            {step === 'phone'
              ? 'برای مشاهده سفارش‌ها و تخفیف‌های ویژه، شماره همراه خود را وارد کنید'
              : `کد تایید ارسال شده به شماره ${toPersianDigits(phoneNumber)} را وارد نمایید`}
          </p>
        </div>

        {step === 'phone' ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                شماره تلفن همراه
              </label>
              <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus-within:ring-2 focus-within:ring-blue-600 focus-within:bg-white transition-all">
                <span className="material-symbols-outlined text-slate-400 ms-1 text-[20px]">
                  smartphone
                </span>
                <input
                  type="tel"
                  dir="ltr"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="09123456789"
                  className="w-full bg-transparent text-sm font-mono text-slate-900 outline-none text-left tracking-wider"
                  autoFocus
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold rounded-xl text-sm transition-all shadow-md shadow-blue-500/20 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <span>در حال ارسال پیامک...</span>
              ) : (
                <>
                  <span>دریافت کد تایید یکبار مصرف</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                </>
              )}
            </button>

            <div className="pt-2 text-center text-[11px] text-slate-400 leading-relaxed">
              با ورود به نواتک، کلیه{' '}
              <span className="text-blue-600 font-semibold cursor-pointer">شرایط و قوانین</span> و{' '}
              <span className="text-blue-600 font-semibold cursor-pointer">حریم خصوصی</span> را می‌پذیرید.
            </div>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-700">کد تایید ۴ رقمی</label>
                <button
                  type="button"
                  onClick={() => setStep('phone')}
                  className="text-xs text-blue-600 hover:underline"
                >
                  ویرایش شماره
                </button>
              </div>
              <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus-within:ring-2 focus-within:ring-blue-600 focus-within:bg-white transition-all">
                <span className="material-symbols-outlined text-slate-400 ms-1 text-[20px]">key</span>
                <input
                  type="text"
                  dir="ltr"
                  maxLength={4}
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  placeholder="8941"
                  className="w-full bg-transparent text-lg font-mono text-center font-bold text-slate-900 outline-none tracking-[0.5em]"
                  autoFocus
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold rounded-xl text-sm transition-all shadow-md shadow-blue-500/20 flex items-center justify-center gap-2"
            >
              {isSubmitting ? <span>در حال تایید...</span> : <span>تایید و ورود به سیستم</span>}
            </button>

            <div className="text-center text-xs text-slate-500">
              ارسال مجدد کد پس از{' '}
              <span className="font-bold text-slate-800 font-mono">۰۱:۴۵</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
