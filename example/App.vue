<template>
  <div>
      <tui-editor
        v-model="editorValue"
        :height="height"
        :hideModeSwitch="true"
      />
  </div>
</template>
<script>
import { ref, watch } from "vue";
export default {
  setup(){
    const editorValue = ref('Hello World!')
    const height = ref('300px')

    watch(editorValue, (newVal, oldVal) => {
      console.log('App watch', newVal, oldVal)
    })

    return { editorValue, height }
  },
};
</script>
