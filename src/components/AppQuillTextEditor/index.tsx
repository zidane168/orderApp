import { Component } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './styles.css';

interface EditorProps {
    value: string;
    onChange: (html: string) => void;
}

interface EditorState {
    editorHtml: string;
}

class Editor extends Component<EditorProps, EditorState> {
    static formats: string[];
    static modules: {
        toolbar: (
            | string[]
            | ({ header: string; font?: undefined } | { font: never[]; header?: undefined })[]
            | { size: never[] }[]
            | ({ list: string; indent?: undefined } | { indent: string; list?: undefined })[]
        )[];
        clipboard: {
            matchVisual: boolean;
        };
    };

    constructor(props: EditorProps) {
        super(props);
        this.state = { editorHtml: props.value || '' };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidUpdate(prevProps: EditorProps) {
        if (prevProps.value !== this.props.value) {
            this.setState({ editorHtml: this.props.value });
        }
    }

    handleChange(html: string) {
        this.setState({ editorHtml: html });
        this.props.onChange(html);
    }

    render() {
        return (
            <div  className='mb-[50px]'>
                <div> </div>
                <ReactQuill
                    className='h-[300px]'
                    onChange={this.handleChange}
                    modules={Editor.modules}
                    formats={Editor.formats}
                    bounds={'#root'}
                    value={this.state.editorHtml}
                />
            </div>
        );
    }
}

Editor.modules = {
    toolbar: [
        [{ font: [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline'],
        [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ],
    clipboard: {
        matchVisual: false,
    },
};

Editor.formats = [
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
];

export default Editor;
