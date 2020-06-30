<template>
    <div ref="toastuiEditor" :id="id"></div>
</template>
<script>
import { ref, onMounted, onUnmounted } from 'vue';

import { createEditor, destroyEditor, getProps } from "./composition";

const props = getProps()
export default {
    name: 'ToastuiEditor',
    props,
    setup(props, ctx) {
        const toastuiEditor = ref(null);
        const id = `tui-editor-${+new Date() + (parseInt(Math.random() * 10000))}`
        onMounted(() => {
            const editor = createEditor(toastuiEditor, props, ctx)
            onUnmounted(() => {
                destroyEditor(editor)
            })
        });


        function getValue(){
            console.log('getValue')
            return 1
        }

        function setValue(newVal){
            console.log('setValue', newVal)
        }
        
        return { toastuiEditor, id, getValue, setValue };
    },
};
</script>
