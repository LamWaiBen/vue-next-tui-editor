<template>
    <div ref="toastuiEditor"></div>
</template>
<script>
import Editor from '@toast-ui/editor';
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';

import { ref, onMounted, watch, computed } from 'vue';

import { getOptions, onLifeCycle } from "./composition";
export default {
    name: 'ToastuiEditor',
    setup(props, ctx) {
        const toastuiEditor = ref(null);
        
        const { computedOptions } = getOptions(props, ctx)

        const previewStyle = computed(() => props.previewStyle)
        const height = computed(() => props.height)
        // todo
        // const initialEditType = computed(() => props.initialEditType)
        // const initialEditValue = computed(() => props.initialEditValue)
        // const options = computed(() => props.options)

        onMounted(() => {
            const editor = new Editor({ el: toastuiEditor.value, ...computedOptions});
            editor.on('change', (val) => {
                console.log('editor on change', val, editor);
            });

            watch(previewStyle, newValue => {
                editor.changePreviewStyle(newValue)
            })
            watch(height, newValue => {
                editor.height(newValue)
            })

            onLifeCycle(editor)

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
        initialEditValue: {
            type: String
        },
        options: {
            type: Object
        }
    }
};
</script>
