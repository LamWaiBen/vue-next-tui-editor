<template>
  <div>
      <editorcomp
      :initialValue="editorValue"
      :height="height"
      ></editorcomp>
  </div>
</template>
<script>
import { ref } from "vue";

import editorcomp from "./components/Editor";
export default {
  setup(){
    const editorValue = ref('')
    const height = ref('300px')
    return { editorValue, height }
  },
  components: {
    editorcomp
  }
};
</script>
