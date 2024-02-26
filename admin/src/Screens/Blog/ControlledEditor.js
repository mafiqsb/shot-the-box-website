import React from 'react';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function ControlledEditor() {
  const [value, setValue] = useState('');

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'strike', 'underline', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image', 'video'],
    ],
  };

  return (
    <div className="lg:w-[1240px] grid grid-cols-2 gap-2">
      <div>
        <ReactQuill
          theme="snow"
          value={value}
          onChange={setValue}
          modules={modules}
        />
      </div>
      <div
        className="border border-solid pt-16"
        dangerouslySetInnerHTML={{ __html: value }}
      />
    </div>
  );
}
