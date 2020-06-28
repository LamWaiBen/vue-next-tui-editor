<template>
  <div>
      <tui-editor
      :initialValue="editorValue"
      :height="height"
      @change="onChange"
      ></tui-editor>
  </div>
</template>
<script>
import { ref } from "vue";
export default {
  setup(){
    const editorValue = ref('test md!')
    const height = ref('300px')

    function onChange(editor){
      if(editor && editor.getCurrentModeEditor){
        editorValue.value = editor.getCurrentModeEditor().getValue()
      }
    }

    setTimeout(() => {
      height.value = '500px'
    }, 3000)
    return { editorValue, height, onChange }
  },
};
</script>
