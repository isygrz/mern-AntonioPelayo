import { useCallback, useMemo, useRef, useState } from 'react';
import { ToastCtx } from './toastContext';

/**
 * ToastProvider
 * Component-only file to satisfy react-refresh/only-export-components.
 * Provides a simple toast API via context and renders transient toasts.
 */
export default function ToastProvider({
  children,
  position = 'top-right',
  duration = 2500,
}) {
  const [toasts, setToasts] = useState([]);
  const idRef = useRef(0);

  const remove = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const push = useCallback(
    (payload) => {
      const id = ++idRef.current;
      const toast = { id, ...payload };
      setToasts((prev) => [...prev, toast]);
      setTimeout(() => remove(id), toast.duration || duration);
    },
    [duration, remove]
  );

  const api = useMemo(
    () => ({
      success: (msg, opts = {}) => push({ type: 'success', msg, ...opts }),
      error: (msg, opts = {}) => push({ type: 'error', msg, ...opts }),
      info: (msg, opts = {}) => push({ type: 'info', msg, ...opts }),
    }),
    [push]
  );

  const posClass =
    {
      'top-right': 'top-4 right-4 items-end',
      'top-left': 'top-4 left-4 items-start',
      'bottom-right': 'bottom-4 right-4 items-end',
      'bottom-left': 'bottom-4 left-4 items-start',
    }[position] || 'top-4 right-4 items-end';

  return (
    <ToastCtx.Provider value={api}>
      {children}
      <div
        className={`fixed z-[9999] pointer-events-none flex flex-col gap-2 ${posClass}`}
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            className={[
              'pointer-events-auto max-w-sm w-[320px] rounded-2xl shadow-lg px-4 py-3 text-sm',
              t.type === 'success'
                ? 'bg-green-600 text-white'
                : t.type === 'error'
                ? 'bg-red-600 text-white'
                : 'bg-gray-800 text-white',
            ].join(' ')}
            role="status"
          >
            {t.msg}
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}
