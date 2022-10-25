import { Editor } from "@tinymce/tinymce-react";

import { editorConfig } from "@configs";

export const TextEditor = ({ value, onChange }) => (
  <Editor
    apiKey={process.env.REACT_APP_EDITOR_API_KEY}
    init={editorConfig}
    value={value}
    onEditorChange={onChange}
  />
);
