import React from "react";
import parse from 'html-react-parser';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import dynamic from 'next/dynamic' 

export interface IQuill {
    value: string,
    setValue: any
} 

const modules = {
    toolbar: [
        [{ header: '1' }, { header: '2' }, { font: [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
        ],
        ['link', 'image', 'video'],
        ['clean'],
    ],
    clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
    },
}
/*
    * Quill editor formats
    * See https://quilljs.com/docs/formats/
    */
const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
]

export default function MyComponent({ value, setValue } : IQuill) { 
    return (
        <div>
            <ReactQuill theme="snow" value={value} onChange={setValue} formats={formats} modules={ modules } />  
          
            <p>{value}</p>
            {parse(value)}
        </div>
    )
}