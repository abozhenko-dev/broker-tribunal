import { useCallback, useRef } from "react";

interface Options {
  timeout?: number;
}

export const useScrollLock = (options?: Options) => {
  // **Ref
  const scrollOffsetRef = useRef<number>(0);

  const lockScroll = useCallback(() => {
    const scrollBarWidth = window.innerWidth - document.body.offsetWidth;
    const isIOS =
      /^iP/.test(navigator.platform) ||
      (/^Mac/.test(navigator.platform) && navigator.maxTouchPoints > 4);

    document.body.style.setProperty("--scrollbar-width", `${scrollBarWidth}px`);
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = "var(--scrollbar-width)";
    document.body.dataset.scrollLock = "true";

    if (isIOS) {
      scrollOffsetRef.current = window.pageYOffset;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollOffsetRef.current}px`;
      document.body.style.width = "100%";
    }
  }, []);

  const unlockScroll = useCallback(() => {
    setTimeout(() => {
      const isIOS =
        /^iP/.test(navigator.platform) ||
        (/^Mac/.test(navigator.platform) && navigator.maxTouchPoints > 4);

      document.body.style.setProperty("--scrollbar-width", null);
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";

      if (isIOS) {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        window.scrollTo(0, scrollOffsetRef.current);
      }

      delete document.body.dataset.scrollLock;
    }, options?.timeout || 300);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    lockScroll,
    unlockScroll
  };
};
