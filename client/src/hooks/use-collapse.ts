import { useEffect, useRef, useState } from "react";

interface UseCollapseProps {
  defaultValue?: boolean;
  minHeight?: number;
}

export const useCollapse = (props: UseCollapseProps) => {
  // **Props
  const { defaultValue, minHeight } = props;

  // **Local state
  const [isCollapseOpen, setIsCollapseOpen] = useState(defaultValue);

  // **Ref
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const collapseRef = useRef<any | null>(null);

  // Handler for changing state
  const handleCollapse = () => {
    if (!collapseRef.current) return;

    const height = collapseRef.current.scrollHeight;

    if (isCollapseOpen) {
      const elementTransition = collapseRef.current.style.transition;
      collapseRef.current.style.transition = "";

      requestAnimationFrame(() => {
        const { style } = collapseRef.current as HTMLElement;

        if (!style) return;

        style.height = `${height}px`;
        style.transition = elementTransition;

        requestAnimationFrame(() => {
          style.height = minHeight ? `${minHeight}px` : "0px";
        });
      });

      setIsCollapseOpen(false);
    } else {
      collapseRef.current.style.height = `${height}px`;
      setIsCollapseOpen(true);
    }
  };

  // Component is loading first time
  // Configuring default styles and states
  useEffect(() => {
    if (!collapseRef.current) return;

    if (!isCollapseOpen) {
      collapseRef.current.style.height = minHeight ? `${minHeight}px` : "0px";
    } else {
      collapseRef.current.style.height = "auto";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Change height after animation is ended
  useEffect(() => {
    if (!collapseRef.current) return;

    const listener = () => {
      if (!collapseRef.current) return;

      if (isCollapseOpen) {
        collapseRef.current.style.height = "auto";
      } else {
        collapseRef.current.style.height = minHeight ? `${minHeight}px` : "0px";
      }
    };

    const collapseInstance = collapseRef.current;
    collapseInstance.addEventListener("transitionend", listener);

    return () => collapseInstance.removeEventListener("transitionend", listener);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCollapseOpen, collapseRef]);

  return {
    collapseRef,
    isCollapseOpen,
    handleCollapse
  };
};
