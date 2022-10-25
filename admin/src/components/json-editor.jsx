/* eslint-disable no-undef */
import { useEffect, useRef } from "react";

import { JSONEditor } from "@json-editor/json-editor";

export const JsonEditor = ({ editorRef, options }) => {
  const elementRef = useRef(null);

  useEffect(() => {
    if (!elementRef.current) return;
    editorRef.current = new JSONEditor(elementRef.current, options);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elementRef.current]);

  return (
    <>
      <div style={{ marginTop: 32 }} ref={elementRef}></div>
    </>
  );
};
