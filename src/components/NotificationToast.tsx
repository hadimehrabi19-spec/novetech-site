import React from 'react';
import { useStore } from '../context/StoreContext';

export const NotificationToast: React.FC = () => {
  const { toasts, removeToast } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-20 start-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 pointer-events-none w-full max-w-md px-4">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-center justify-between p-3.5 rounded-2xl shadow-xl border backdrop-blur-md transition-all animate-in fade-in slide-in-from-top-4 duration-200 ${
            toast.type === 'error'
              ? 'bg-rose-50/95 border-rose-200 text-rose-900'
              : toast.type === 'info'
              ? 'bg-slate-900/90 border-slate-700 text-white'
              : 'bg-emerald-50/95 border-emerald-200 text-emerald-900'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[22px]">
              {toast.type === 'error'
                ? 'error'
                : toast.type === 'info'
                ? 'info'
                : 'check_circle'}
            </span>
            <p className="text-xs font-bold leading-tight">{toast.message}</p>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="p-1 rounded-lg hover:bg-black/10 transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      ))}
    </div>
  );
};
