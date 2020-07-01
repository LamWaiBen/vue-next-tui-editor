import { watchEffect, toRaw } from "vue";

import Editor from "@toast-ui/editor";
import "codemirror/lib/codemirror.css";
import "@toast-ui/editor/dist/toastui-editor.css";

import defaultOptions from "./defaultOptions";

const editorEvents = ["load", "change", "stateChange", "focus", "blur"];

export function getProps(){
    const props = {
        // v-model:modelValue
        modelValue: "",
        "onUpdate:modelValue": {
            type: Function,
        },
    };
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
        console.log("value:", props, props.modelValue);
        editor.getCurrentModeEditor().setValue(props.modelValue);
    });
    watchEffect(() => {
        editor.changePreviewStyle(props.previewStyle);
    });
    watchEffect(() => {
        editor.height(props.height);
    });
    watchEffect(() => {
        editor.changeMode(props.initialEditType);
    });
}


export function listenEvent(editor, props, ctx) {
    editorEvents.forEach((event) => {
        editor.on(event, () => {
            if(event === 'change') {
                const newValue = editor.getCurrentModeEditor().getValue();
                ctx.emit(event, newValue);
                props["onUpdate:modelValue"](newValue);
            } else {
                ctx.emit(event)
            }
        })
    });
}

export function destroyEditor(editor) {
    if (editor){
        editorEvents.forEach((event) => editor.off(event));
        editor.remove();
    }
}