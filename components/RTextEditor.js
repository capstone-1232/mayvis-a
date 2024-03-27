import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

function RTextEditor({ props }) {
  const [value, setValue] = useState(props.content);

  useEffect(() => {
    props.setContent(value);
  }, [value]);

  const toolbarOptions = [
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'font': [] }],
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'align': [] }],
    ['link', 'image', 'video', 'formula']
  ];

  const modules = {
    toolbar: toolbarOptions
  };

  return <>
    <Box
      className="myQuillContainer"
      sx={{
        height: "100%",
        py: "30px",
      }}
    >
      <ReactQuill
        theme="snow"
        modules={modules}
        value={value}
        onChange={setValue}
      />
    </Box>
  </>

}

export default RTextEditor;