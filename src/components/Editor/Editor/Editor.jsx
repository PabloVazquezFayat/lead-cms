import React from 'react';
import EditorNav from '../EditorNav/EditorNav';


export default function Editor(props) {
    return (
        <div className="editor-page">
            <EditorNav/>
            {props.children}
        </div>
    )
}

