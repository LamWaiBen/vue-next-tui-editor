<template>
    <div ref="toastuiEditor"></div>
</template>
<script>
import Editor from '@toast-ui/editor';
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';

import { ref, onMounted, onUnmounted, watchEffect } from 'vue';

import defaultOptions from "./defaultOptions";

export default {
    name: 'ToastuiEditor',
    setup(props, ctx) {
        const toastuiEditor = ref(null);
        onMounted(() => {
            const editor = new Editor({ el: toastuiEditor.value, ...Object.assign({}, defaultOptions, props)});

            const editorEvents = ['load', 'change', 'stateChange', 'focus', 'blur'];

            editorEvents.forEach(event => {
                editor.on(event, (...args) => {
                    ctx.emit(event, [editor, ...args])
                });
            })

            watchEffect(() => {
                editor.getCurrentModeEditor().setValue(props.initialValue)
            })
            watchEffect(() => {
                editor.changePreviewStyle(props.previewStyle)
            })
            watchEffect(()=>{
                editor.height(props.height)
            })

            onUnmounted(() => {
                editorEvents.forEach(event => editor.off(event))
                editor.remove()
            })
        });
        
        return { toastuiEditor };
    },
    props: {
        previewStyle: {
            type:String
        },
        height: {
            type: String
        },
        initialEditType: {
            type: String
        },
        initialValue: {
            type: String
        },
        options: {
            type: Object
        }
    }
};
</script>
