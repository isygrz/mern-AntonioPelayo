import { useContext } from 'react';
import { ToastCtx } from './toastContext';

/**
 * useToast
 * Hook lives in its own module so ToastProvider.jsx only exports components.
 */
export const useToast = () => {
  const ctx = useContext(ToastCtx);
  if (!ctx) throw new Error('useToast must be used within <ToastProvider />');
  return ctx;
};
