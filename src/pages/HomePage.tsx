import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { CATEGORIES } from '../data/categories';
import { formatToman, toPersianDigits } from '../utils/formatters';

export const HomePage: React.FC = () => {
  const { products, navigateTo, setCategoryFilter } = useStore();

  // Countdown timer simulation for Special Deals
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 28, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Filtered collections for home sections
  const specialDeals = products.filter((p) => p.discountPercent >= 6);
  const gamingProducts = products.filter((p) => p.isGaming);
  const laptopProducts = products.filter((p) => p.category === 'laptops');
  const smartphoneProducts = products.filter((p) => p.category === 'smartphones');
  const bestSellers = products.filter((p) => p.isBestSeller);

  return (
    <div className="flex flex-col w-full pb-16">
      {/* 1. Hero Section */}
      <section className="relative w-full bg-gradient-to-b from-blue-900 via-indigo-950 to-slate-950 text-white overflow-hidden py-10 lg:py-16">
        {/* Subtle grid background glow */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>
        <div className="absolute -top-32 start-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Hero Text */}
            <div className="lg:col-span-7 flex flex-col items-start text-right">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-semibold mb-4 backdrop-blur-xs">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
                <span>رویداد بزرگ تکنولوژی ۲۰۲۶ نواتک</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight mb-4">
                اوج فناوری روز دنیا، <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300">
                  با ضمانت اصالت نواتک
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6 max-w-xl">
                مرجع تخصصی خرید لپ‌تاپ‌های گیمینگ پرچمدار، مک‌بوک‌های نسل جدید M3، آیفون ۱۷ پرو و قطعات سخت‌افزاری اورجینال با ارسال فوری ۲ ساعته در تهران و پوشش گارانتی طلایی نواتک پلاس.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => navigateTo('shop')}
                  className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                  <span>مشاهده فروشگاه جامع</span>
                </button>

                <button
                  onClick={() => {
                    setCategoryFilter('gaming');
                  }}
                  className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm backdrop-blur-xs transition-all flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[20px]">sports_esports</span>
                  <span>تجهیزات گیمینگ</span>
                </button>
              </div>

              {/* Trust highlights */}
              <div className="grid grid-cols-3 gap-4 pt-8 mt-6 border-t border-white/10 w-full max-w-lg text-slate-300 text-xs">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-blue-400 text-[20px]">check_circle</span>
                  <span>۱۰۰٪ پلمپ شرکتی</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-blue-400 text-[20px]">bolt</span>
                  <span>ارسال فوق‌سریع ۲ ساعته</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-blue-400 text-[20px]">shield_with_heart</span>
                  <span>۷ روز مهلت تست</span>
                </div>
              </div>
            </div>

            {/* Hero Visual: ASUS ROG SCAR 16 / Flagship Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md bg-gradient-to-tr from-white/10 to-white/5 p-4 rounded-3xl border border-white/20 shadow-2xl backdrop-blur-md">
                <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-slate-900/60 p-4 flex items-center justify-center">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBlDMwAL1AKpGIn_Vhqt-QljBbwZT4Hf4TRCH2FdhYVLD15C54uPqb5bVwAkRIHYt7wwkFe30pA5UJA536syz0QKhRpw2fqfBciaEoSQrjJNK2KhNNfM5iMs9xm2axlaudKjWz1NH1xvbXvangsO2ree0PXpi8KHZ1stJOIvedgovo9P9FhzFgux940G6F2KeRrJpcHW6y1hqIswKlu4L9YD7RQJeps1KscNmmf3GfKnu4UygnA2odMjA"
                    alt="ASUS ROG Strix SCAR 16"
                    className="w-full h-full object-contain filter drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]"
                  />
                  <div className="absolute top-3 start-3 bg-red-600 text-white font-bold text-[11px] px-2.5 py-0.5 rounded-lg shadow-md">
                    پرچمدار ویژه
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-white">ASUS ROG Strix SCAR 16</h3>
                    <p className="text-xs text-blue-300 font-mono">RTX 4080 • Mini-LED 240Hz</p>
                  </div>
                  <button
                    onClick={() => navigateTo('product-detail', 'asus-rog-strix-scar-16')}
                    className="px-3.5 py-1.5 bg-blue-500 hover:bg-blue-400 text-white font-bold text-xs rounded-xl shadow-md transition-all"
                  >
                    بررسی و خرید
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Popular Categories Icons Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 w-full">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-blue-600 text-[24px]">category</span>
            <h2 className="text-lg sm:text-xl font-black text-slate-900">دسته‌بندی‌های محبوب</h2>
          </div>
          <button
            onClick={() => navigateTo('shop')}
            className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
          >
            <span>مشاهده همه دسته‌ها</span>
            <span className="material-symbols-outlined text-[16px]">chevron_left</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {CATEGORIES.slice(1, 13).map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setCategoryFilter(cat.id);
                navigateTo('shop');
              }}
              className="group flex flex-col items-center p-4 rounded-2xl bg-white hover:bg-blue-50/50 border border-slate-200/70 hover:border-blue-300 shadow-xs hover:shadow-md transition-all duration-200 text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-slate-50 group-hover:bg-blue-100/70 text-slate-700 group-hover:text-blue-600 flex items-center justify-center transition-colors mb-2.5">
                <span className="material-symbols-outlined text-[28px]">{cat.icon}</span>
              </div>
              <span className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                {cat.nameFa}
              </span>
              <span className="text-[10px] text-slate-400 mt-0.5">
                {toPersianDigits(cat.count)} کالا
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* 3. Special Deals Carousel (پیشنهاد شگفت‌انگیز) */}
      <section className="w-full bg-gradient-to-r from-rose-700 via-red-600 to-rose-700 py-10 my-4 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6 text-white">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[32px] animate-bounce">local_fire_department</span>
              <div>
                <h2 className="text-xl sm:text-2xl font-black">پیشنهادات شگفت‌انگیز نواتک</h2>
                <p className="text-xs text-rose-100">تخفیف‌های ویژه با موجودی محدود و زمان مشخص</p>
              </div>
            </div>

            {/* Countdown Clock */}
            <div className="flex items-center gap-2 bg-black/20 backdrop-blur-xs px-4 py-2 rounded-2xl border border-white/20">
              <span className="text-xs text-rose-200 font-semibold">فرصت باقی‌مانده:</span>
              <div className="flex items-center gap-1 font-mono font-bold text-sm">
                <span className="bg-white text-rose-700 px-2 py-1 rounded-lg">
                  {toPersianDigits(String(timeLeft.hours).padStart(2, '0'))}
                </span>
                <span>:</span>
                <span className="bg-white text-rose-700 px-2 py-1 rounded-lg">
                  {toPersianDigits(String(timeLeft.minutes).padStart(2, '0'))}
                </span>
                <span>:</span>
                <span className="bg-white text-rose-700 px-2 py-1 rounded-lg">
                  {toPersianDigits(String(timeLeft.seconds).padStart(2, '0'))}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {specialDeals.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Gaming Zone Banner & Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 w-full">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-purple-600 text-[26px]">sports_esports</span>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900">دنیای گیمینگ حرفه‌ای نواتک</h2>
              <p className="text-xs text-slate-500">لپ‌تاپ‌های ROG، سنسورهای HERO لاجیتک و مانیتورهای اولد</p>
            </div>
          </div>
          <button
            onClick={() => {
              setCategoryFilter('gaming');
              navigateTo('shop');
            }}
            className="text-xs font-bold text-purple-600 hover:text-purple-800 flex items-center gap-1 transition-colors"
          >
            <span>مشاهده همه محصولات گیمینگ</span>
            <span className="material-symbols-outlined text-[16px]">chevron_left</span>
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {gamingProducts.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. Promotional Double Banners */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Banner 1: Apple Flagship */}
          <div
            onClick={() => navigateTo('product-detail', 'apple-iphone-17-pro')}
            className="group relative bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-6 sm:p-8 text-white overflow-hidden shadow-lg cursor-pointer flex flex-col justify-between min-h-[220px]"
          >
            <div className="relative z-10 max-w-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 text-white px-2 py-0.5 rounded">
                نسل جدید پرچمداران اپل
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-2 leading-tight">
                آیفون ۱۷ پرو با فریم تیتانیوم خالص
              </h3>
              <p className="text-xs text-slate-300 mt-2">
                با رجیستری رسمی همتا و گارانتی طلایی ۱۸ ماهه نواتک
              </p>
              <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-blue-300 group-hover:text-blue-200">
                <span>سفارش با ارسال فوری</span>
                <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              </div>
            </div>
            <img
              src="/src/assets/images/iphone_17_pro_titanium_1791187947646.jpg"
              alt="iPhone 17 Pro"
              className="absolute end-2 -bottom-6 w-44 sm:w-52 h-auto object-contain group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Banner 2: Samsung Flagship */}
          <div
            onClick={() => navigateTo('product-detail', 'samsung-galaxy-s26-ultra')}
            className="group relative bg-gradient-to-r from-indigo-950 to-blue-900 rounded-3xl p-6 sm:p-8 text-white overflow-hidden shadow-lg cursor-pointer flex flex-col justify-between min-h-[220px]"
          >
            <div className="relative z-10 max-w-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-500/30 text-blue-200 px-2 py-0.5 rounded">
                پادشاه عکاسی موبایل
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-2 leading-tight">
                سامسونگ گلکسی S26 Ultra 5G
              </h3>
              <p className="text-xs text-slate-300 mt-2">
                مجهز به دوربین ۲۰۰ مگاپیکسلی و هوش مصنوعی Galaxy AI
              </p>
              <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-blue-300 group-hover:text-blue-200">
                <span>خرید نقدی یا اقساطی</span>
                <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              </div>
            </div>
            <img
              src="/src/assets/images/samsung_s26_ultra_phone_1791187958654.jpg"
              alt="Samsung S26 Ultra"
              className="absolute end-2 -bottom-6 w-44 sm:w-52 h-auto object-contain group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </section>

      {/* 6. Laptops & Ultrabooks Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 w-full">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-blue-600 text-[26px]">laptop_mac</span>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900">لپ‌تاپ و اولترابوک‌های برتر</h2>
              <p className="text-xs text-slate-500">انواع لپ‌تاپ‌های مهندسی، طراحی، دانشجویی و تجاری</p>
            </div>
          </div>
          <button
            onClick={() => {
              setCategoryFilter('laptops');
              navigateTo('shop');
            }}
            className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
          >
            <span>مشاهده همه لپ‌تاپ‌ها</span>
            <span className="material-symbols-outlined text-[16px]">chevron_left</span>
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {laptopProducts.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 7. Customer Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 w-full">
        <div className="text-center mb-8">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">تجربه خریداران تاییدشده نواتک</h2>
          <p className="text-xs text-slate-500 mt-1">نظرات واقعی همراهان ما درباره اصالت کالا و سرعت تحویل</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1 text-amber-400 mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    star
                  </span>
                ))}
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                «من لپ‌تاپ ایسوس ROG رو از نواتک خریدم. بسته‌بندی عالی بود و دقیقاً ۲ ساعت بعد از ثبت سفارش با پیک اختصاصی تحویل گرفتم. پلمپ گارانتی دست‌نخورده بود و کارت قرعه‌کشی هم داخلش قرار داشت.»
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-900">آرمین شریفی</h4>
                <span className="text-[10px] text-slate-400">خریدار ROG Strix G16 • تهران</span>
              </div>
              <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full">
                خرید تاییدشده
              </span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1 text-amber-400 mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    star
                  </span>
                ))}
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                «مک‌بوک ایر ۱۵ اینچ با گارانتی ۱۸ ماهه گرفتم. پشتیبانی تلفنی قبل از خرید خیلی باحوصله راهنماییم کردن بین M2 و M3 کدوم رو انتخاب کنم. واقعاً تجربه خرید دیجیتال متفاوتی بود.»
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-900">نیما ارجمند</h4>
                <span className="text-[10px] text-slate-400">خریدار MacBook Air M3 • شیراز</span>
              </div>
              <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full">
                خرید تاییدشده
              </span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1 text-amber-400 mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    star
                  </span>
                ))}
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                «هدفون سونی XM5 رو با تخفیف عالی خریدم. اصالت کالا و کد LDAC در اپلیکیشن رسمی سونی تایید شد. از نواتک متشکرم که اجناس ۱۰۰٪ اورجینال می‌فرسته.»
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-900">روجا سلطانی</h4>
                <span className="text-[10px] text-slate-400">خریدار Sony WH-1000XM5 • تهران</span>
              </div>
              <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full">
                خرید تاییدشده
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
