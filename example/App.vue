<template>
  <div>
      <tui-editor
        v-model:value="editorValue"
        :height="height"
        :hideModeSwitch="false"
        :language="'cn'"
        @change="onChange"
      ></tui-editor>
  </div>
</template>
<script>
import { ref, watch } from "vue";
export default {
  setup(){
    const editorValue = ref('test md!')
    const height = ref('300px')

    function onChange(newValue){
      console.log('onChange', newValue, editorValue.value)
      editorValue.value = newValue
    }
    
    watch(editorValue, (newVal, oldVal, onInvalidate) => {
      console.log('App watch', newVal, oldVal, onInvalidate)
    })

    return { editorValue, height, onChange }
  },
};
</script>
