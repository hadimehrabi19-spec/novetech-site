import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';

export const Footer: React.FC = () => {
  const { navigateTo, openModal, addToast } = useStore();
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      addToast('لطفاً یک آدرس ایمیل معتبر وارد کنید', 'error');
      return;
    }
    addToast('عضویت شما در خبرنامه تخفیف‌های ویژه نواتک با موفقیت ثبت شد', 'success');
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-white border-t border-slate-200/80 pt-10 pb-20 md:pb-12 text-slate-700">
      {/* Trust Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-12">
        <div className="bg-[#f8faff] rounded-2xl p-6 border border-blue-50 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-2xl bg-blue-100/60 text-blue-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-[28px]">verified</span>
            </div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-900">ضمانت اصالت ۱۰۰٪ کالا</h4>
            <p className="text-[11px] text-slate-500">تمامی محصولات پلمپ و با کد اصالت شرکت مادر</p>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-2xl bg-indigo-100/60 text-indigo-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-[28px]">published_with_changes</span>
            </div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-900">۷ روز ضمانت بازگشت</h4>
            <p className="text-[11px] text-slate-500">امکان تعویض یا عودت بی‌قید و شرط در صورت هرگونه نقص</p>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-2xl bg-sky-100/60 text-sky-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-[28px]">local_shipping</span>
            </div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-900">ارسال اکسپرس و ایمن</h4>
            <p className="text-[11px] text-slate-500">تحویل کمتر از ۲ ساعت در تهران و بیمه کامل پستی در سراسر کشور</p>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100/60 text-emerald-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-[28px]">support_agent</span>
            </div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-900">مشاوره تخصصی خرید</h4>
            <p className="text-[11px] text-slate-500">پاسخگویی کارشناسان سخت‌افزار در ۷ روز هفته</p>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-slate-200">
          {/* Brand & Story */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-lg">
                N
              </div>
              <span className="text-lg font-black text-slate-900">فروشگاه تخصصی نواتک (NOVATECH)</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed max-w-md">
              نواتک مرجع پیشرو در عرضه جدیدترین لپ‌تاپ‌های گیمینگ، گوشی‌های هوشمند پرچمدار، مک‌بوک و تجهیزات دیجیتال در ایران است. ما متعهد به اصالت قطعات، قیمت‌گذاری منصفانه شرکتی و سریع‌ترین خدمات پشتیبانی هستیم.
            </p>
            <div className="flex flex-col gap-1.5 text-xs text-slate-600 mt-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-blue-600">location_on</span>
                <span>دفتر مرکزی: تهران، خیابان ولیعصر، بالاتر از میدان ونک، برج فناوری نوین، طبقه ۶</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-blue-600">call</span>
                <span>تلفن پشتیبانی: ۰۲۱-۸۸۸۸۴۳۲۱ (شنبه تا پنجشنبه ۹ الی ۲۱)</span>
              </div>
            </div>
          </div>

          {/* Quick Links 1 */}
          <div className="flex flex-col gap-2.5">
            <h5 className="text-xs font-bold text-slate-900 uppercase">دسته‌بندی‌های برتر</h5>
            <ul className="space-y-1.5 text-xs text-slate-600">
              <li>
                <button onClick={() => navigateTo('shop')} className="hover:text-blue-600 transition-colors">
                  لپ‌تاپ‌های گیمینگ ایسوس و لنوو
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop')} className="hover:text-blue-600 transition-colors">
                  مک‌بوک ایر و پرو اپل M3 و M4
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop')} className="hover:text-blue-600 transition-colors">
                  گوشی‌های آیفون ۱۷ پرو و پرچمداران
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop')} className="hover:text-blue-600 transition-colors">
                  مانیتورهای حرفه‌ای OLED و 240Hz
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop')} className="hover:text-blue-600 transition-colors">
                  حافظه SSD و تجهیزات ذخیره‌سازی
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Links 2 */}
          <div className="flex flex-col gap-2.5">
            <h5 className="text-xs font-bold text-slate-900 uppercase">خدمات مشتریان</h5>
            <ul className="space-y-1.5 text-xs text-slate-600">
              <li>
                <button onClick={() => openModal('warranty')} className="hover:text-blue-600 transition-colors">
                  شرایط گارانتی نواتک پلاس
                </button>
              </li>
              <li>
                <button onClick={() => openModal('return-policy')} className="hover:text-blue-600 transition-colors">
                  رویه ۷ روزه بازگشت کالا
                </button>
              </li>
              <li>
                <button onClick={() => openModal('faq')} className="hover:text-blue-600 transition-colors">
                  پرسش‌های متداول (FAQ)
                </button>
              </li>
              <li>
                <button onClick={() => openModal('contact')} className="hover:text-blue-600 transition-colors">
                  فرم تماس با کارشناسان نواتک
                </button>
              </li>
              <li>
                <button onClick={() => openModal('privacy')} className="hover:text-blue-600 transition-colors">
                  حفظ حریم خصوصی و امنیت
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter & Trust Badges */}
          <div className="flex flex-col gap-3">
            <h5 className="text-xs font-bold text-slate-900">خبرنامه شگفت‌انگیزها</h5>
            <p className="text-[11px] text-slate-500">از تخفیف‌های ویژه تکنولوژی و کدهای تخفیف زودتر از دیگران مطلع شوید:</p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-2">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="ایمیل خود را وارد کنید..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-colors shadow-xs"
              >
                عضویت در خبرنامه
              </button>
            </form>

            <div className="flex items-center gap-3 pt-2">
              <div className="w-14 h-14 bg-slate-50 border border-slate-200 rounded-xl flex flex-col items-center justify-center text-center p-1">
                <span className="material-symbols-outlined text-blue-600 text-[20px]">shield</span>
                <span className="text-[8px] font-bold text-slate-600 mt-0.5">اینماد پنج‌ستاره</span>
              </div>
              <div className="w-14 h-14 bg-slate-50 border border-slate-200 rounded-xl flex flex-col items-center justify-center text-center p-1">
                <span className="material-symbols-outlined text-blue-600 text-[20px]">workspace_premium</span>
                <span className="text-[8px] font-bold text-slate-600 mt-0.5">نظام صنفی رایانه‌ای</span>
              </div>
              <div className="w-14 h-14 bg-slate-50 border border-slate-200 rounded-xl flex flex-col items-center justify-center text-center p-1">
                <span className="material-symbols-outlined text-blue-600 text-[20px]">lock</span>
                <span className="text-[8px] font-bold text-slate-600 mt-0.5">شاپرک SSL</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2">
          <span>تمامی حقوق مادی و معنوی این وب‌سایت متعلق به شرکت بازرگانی نواتک (NOVATECH) می‌باشد. © ۲۰۲۶</span>
          <div className="flex items-center gap-3">
            <button onClick={() => openModal('terms')} className="hover:text-slate-600">شرایط استفاده</button>
            <span>·</span>
            <button onClick={() => openModal('about')} className="hover:text-slate-600">درباره ما</button>
            <span>·</span>
            <button onClick={() => openModal('contact')} className="hover:text-slate-600">شعبه‌ها</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
