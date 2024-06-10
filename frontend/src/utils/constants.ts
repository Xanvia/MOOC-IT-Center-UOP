export const HOST = process.env.NEXT_PUBLIC_HOST;
export const CALLBACK_URL = process.env.NEXT_PUBLIC_CALLBACK_URL;
export const API_URL = `${HOST}/api`;
export const redirect_uri = "http://localhost:3000/api/auth/google/callback";
export const TINY_API_KEY = process.env.NEXT_PUBLIC_TINY_API_KEY;

export interface ToastProps {
  message: string;
  onClose: () => void;
}
