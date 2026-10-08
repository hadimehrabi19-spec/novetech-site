import React from 'react';
import { useStore } from '../context/StoreContext';

export const InfoModal: React.FC = () => {
  const { activeModal, closeModal, addToast } = useStore();

  if (
    activeModal !== 'about' &&
    activeModal !== 'contact' &&
    activeModal !== 'faq' &&
    activeModal !== 'warranty' &&
    activeModal !== 'return-policy' &&
    activeModal !== 'privacy' &&
    activeModal !== 'terms'
  ) {
    return null;
  }

  const renderContent = () => {
    switch (activeModal) {
      case 'about':
        return (
          <div className="space-y-4 text-xs leading-relaxed text-slate-600">
            <h3 className="text-base font-black text-slate-900">درباره فروشگاه دیجیتال نواتک (NOVATECH)</h3>
            <p>
              شرکت بازرگانی فناوری نواتک از سال ۱۳۹۸ با هدف تامین و عرضه تخصصی‌ترین تجهیزات دیجیتال، لپ‌تاپ‌های گیمینگ پرچمدار، قطعات سخت‌افزاری و تلفن‌های هوشمند در بازار ایران فعالیت خود را آغاز نمود.
            </p>
            <p>
              ارزش‌های بنیادین نواتک بر پایه سه اصل استوار است: <strong>ضمانت اصالت قطعی کالاها</strong>، <strong>پشتیبانی و خدمات پس از فروش استاندارد</strong>، و <strong>تحویل فوق سریع در کوتاه‌ترین زمان ممکن</strong>. ما به عنوان نماینده رسمی توزیع معتبرترین برندهای جهان نظیر ایسوس، اپل، لنوو، لاجیتک و سامسونگ به خود می‌بالیم.
            </p>
            <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 flex items-center gap-3">
              <span className="material-symbols-outlined text-blue-600 text-[28px]">verified</span>
              <div>
                <p className="font-bold text-blue-900 text-xs">مجوزها و تاییده‌های قانونی</p>
                <p className="text-[11px] text-blue-700">دارای نماد اعتماد الکترونیکی ۵ ستاره و عضویت در سازمان نظام صنفی رایانه‌ای کشور</p>
              </div>
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-4 text-xs leading-relaxed text-slate-600">
            <h3 className="text-base font-black text-slate-900">تماس با نواتک و شعب مرکزی</h3>
            <div className="space-y-2.5 p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
              <div className="flex items-center gap-2 text-slate-800">
                <span className="material-symbols-outlined text-blue-600 text-[18px]">location_on</span>
                <span className="font-bold">نشانی دفتر مرکزی:</span>
                <span>تهران، خیابان ولیعصر، بالاتر از میدان ونک، برج فناوری نوین، طبقه ۶، واحد ۲۴</span>
              </div>
              <div className="flex items-center gap-2 text-slate-800">
                <span className="material-symbols-outlined text-blue-600 text-[18px]">phone</span>
                <span className="font-bold">تلفن پشتیبانی و فروش:</span>
                <span className="font-mono font-bold text-blue-600">۰۲۱-۸۸۸۸۴۳۲۱</span>
              </div>
              <div className="flex items-center gap-2 text-slate-800">
                <span className="material-symbols-outlined text-blue-600 text-[18px]">mail</span>
                <span className="font-bold">ایمیل سازمانی:</span>
                <span className="font-mono">support@novatech.ir</span>
              </div>
              <div className="flex items-center gap-2 text-slate-800">
                <span className="material-symbols-outlined text-blue-600 text-[18px]">schedule</span>
                <span className="font-bold">ساعات کاری:</span>
                <span>شنبه تا چهارشنبه ۹:۰۰ الی ۲۱:۰۰ | پنجشنبه‌ها ۹:۰۰ الی ۱۸:۰۰</span>
              </div>
            </div>

            {/* Quick message form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addToast('پیام شما با موفقیت ارسال شد. کارشناسان ما تا ۲ ساعت آینده با شما تماس خواهند گرفت.', 'success');
                closeModal();
              }}
              className="space-y-3 pt-2"
            >
              <h4 className="font-bold text-slate-800 text-xs">ارسال سریع پیام به مدیریت:</h4>
              <input
                type="text"
                placeholder="نام و نام خانوادگی"
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="tel"
                placeholder="شماره تماس"
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                placeholder="متن پیام یا درخواست مشاوره خرید..."
                rows={3}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
              <button
                type="submit"
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-colors"
              >
                ارسال پیام
              </button>
            </form>
          </div>
        );

      case 'faq':
        return (
          <div className="space-y-3 text-xs leading-relaxed text-slate-600">
            <h3 className="text-base font-black text-slate-900 mb-2">پرسش‌های متداول مشتریان</h3>
            <div className="border border-slate-200 rounded-xl p-3 bg-slate-50/50">
              <h4 className="font-bold text-slate-900 mb-1">آیا تمامی کالاها دارای گارانتی رسمی و پلمپ هستند؟</h4>
              <p>بله، تمامی دستگاه‌های دیجیتال در نواتک دارای گارانتی معتبر شرکتی ۱۸ الی ۳۶ ماهه بوده و با پلمپ اصلی کمپانی سازنده به همراه کد رجیستری همتا عرضه می‌شوند.</p>
            </div>
            <div className="border border-slate-200 rounded-xl p-3 bg-slate-50/50">
              <h4 className="font-bold text-slate-900 mb-1">زمان ارسال سفارش‌ها در تهران و شهرستان چقدر است؟</h4>
              <p>سفارش‌های تهران با ناوگان اکسپرس نواتک در کمتر از ۲ تا ۳ ساعت تحویل می‌گردند. سفارش‌های سایر استان‌ها با پست پیشتاز بیمه‌شده یا تیپاکس طی ۲۴ الی ۴۸ ساعت کاری ارسال می‌شوند.</p>
            </div>
            <div className="border border-slate-200 rounded-xl p-3 bg-slate-50/50">
              <h4 className="font-bold text-slate-900 mb-1">امکان خرید اقساطی بدون ضامن وجود دارد؟</h4>
              <p>بله، از طریق درگاه اسنپ‌پی می‌توانید تا سقف مبالغ مجاز، خرید خود را در ۴ قسط مساوی بدون نیاز به چک و ضامن ثبت فرمایید.</p>
            </div>
          </div>
        );

      case 'warranty':
        return (
          <div className="space-y-3 text-xs leading-relaxed text-slate-600">
            <h3 className="text-base font-black text-slate-900">گارانتی طلایی نواتک پلاس</h3>
            <p>
              تمامی محصولات تحت پوشش نواتک پلاس شامل ۱۸ تا ۲۴ ماه ضمانت کامل تعویض و تعمیر قطعات با قطعات ۱۰۰٪ اورجینال کمپانی می‌باشند.
            </p>
            <ul className="list-disc list-inside space-y-1.5 font-medium text-slate-700">
              <li>تعویض آنی کالا در صورت وجود نقص فنی کارخانه‌ای در ۷ روز اول خرید</li>
              <li>بیمه حوادث کامل (نوسانات برق، شکستگی صفحه نمایش و آب‌خوردگی)</li>
              <li>کالیبراسیون رایگان نرم‌افزاری و نصب ویندوز و درایورهای اختصاصی</li>
              <li>پیک اختصاصی رفت و برگشت دستگاه معیوب از درب منزل در تهران</li>
            </ul>
          </div>
        );

      case 'return-policy':
        return (
          <div className="space-y-3 text-xs leading-relaxed text-slate-600">
            <h3 className="text-base font-black text-slate-900">رویه ۷ روزه بازگشت کالا</h3>
            <p>
              آسودگی خاطر مشتریان هدف اول نواتک است. چنانچه کالای دریافتی دارای هرگونه مغایرت با اطلاعات درج‌شده در سایت باشد یا ایراد فنی در کارکرد آن وجود داشته باشد، تا ۷ روز پس از دریافت بسته می‌توانید درخواست بازگشت ثبت نمایید.
            </p>
            <p>
              وجه پرداختی حداکثر تا ۲۴ ساعت پس از رسیدن کالا به انبار مرکزی و تایید کارشناسان به شماره شبای شما واریز خواهد شد.
            </p>
          </div>
        );

      default:
        return (
          <div className="space-y-3 text-xs leading-relaxed text-slate-600">
            <h3 className="text-base font-black text-slate-900">قوانین و حریم خصوصی نواتک</h3>
            <p>
              خرید از فروشگاه نواتک به منزله پذیرش کامل قوانین تجارت الکترونیک جمهوری اسلامی ایران و حفظ محرمانگی اطلاعات هویتی و پرداختی کاربران می‌باشد.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[85vh] overflow-y-auto">
        <button
          onClick={closeModal}
          className="absolute top-5 end-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        {renderContent()}
      </div>
    </div>
  );
};
