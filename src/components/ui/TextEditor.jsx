import React from 'react';
import { Editor } from '@jeremyling/react-material-ui-rich-text-editor';

export const TextEditor = ({
  value =  "<p>Paragraph</p>",
  onChange,
}) => {

  return (
    <Editor
      html={value}
      updateHtml={(html) => onChange(html)}
    />
  );
};
