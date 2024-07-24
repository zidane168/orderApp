import React from "react"; 
import 'react-quill/dist/quill.snow.css'; 
import dynamic from 'next/dynamic' 
import { IQuill } from "./home";
 
const DynamicComponentWithNoSSR = dynamic(  // phai dung kieu nay de client side rendering
    () => import('./home'),
    { ssr: false }
)

export default function AppQuillTextEditor2( {value, setValue} : IQuill ) { 
    return (
        <div>
            {/* <ReactQuill theme="snow" value={value} onChange={setValue} formats={formats} modules={ modules } />  */}
          
            <DynamicComponentWithNoSSR value={ value } setValue={ setValue } /> 
        </div>
    )
}
