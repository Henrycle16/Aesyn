// types/global.d.ts
export {};

declare global {
  interface Window {
    fbAsyncInit: () => void;
    FB: any;
  }
}