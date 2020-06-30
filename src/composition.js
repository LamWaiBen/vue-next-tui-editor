import { watchEffect, toRaw } from "vue";

import Editor from "@toast-ui/editor";
import "codemirror/lib/codemirror.css";
import "@toast-ui/editor/dist/toastui-editor.css";

import defaultOptions from "./defaultOptions";

const editorEvents = ["load", "change", "stateChange", "focus", "blur"];

export function getProps(){
    const props = {
        value: ''
    }
    for(const key in defaultOptions){
        props[key] = {
            default: defaultOptions[key]
        }
    }
    return props
}

export function createEditor(elRef, props, ctx) {
    const options = Object.assign({}, toRaw(props));
    
    const editor = new Editor({ el: elRef.value, ...options });

    watch(editor, props)
    listenEvent(editor, props, ctx);

    return editor
}

export function watch(editor, props) {
    watchEffect(() => {
        console.log("value:", props, props.value);
        editor.getCurrentModeEditor().setValue(props.value);
    });
    watchEffect(() => {
        editor.changePreviewStyle(props.previewStyle);
    });
    watchEffect(() => {
        editor.height(props.height);
    });
}


export function listenEvent(editor, props, ctx) {
    editorEvents.forEach((event) => {
        if(event === 'change') {
            editor.on(event, () => {
                const newValue = editor.getCurrentModeEditor().getValue();
                ctx.emit(event, newValue);

                // toRef(props, "value").value = newValue;
            })
        }
    });
}

export function destroyEditor(editor) {
    if (editor){
        editorEvents.forEach((event) => editor.off(event));
        editor.remove();
    }
}