
<template>
  <div class="three-canvas"
       ref="threeTarget"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { basicObjectsList } from './assets/ts/TBasicObject'
import { TEngine } from './assets/ts/TEngine'

export default defineComponent({
  setup() {
    const threeTarget = ref(null)
    onMounted(() => {
      const TE = new TEngine(threeTarget.value)
      TE.addObject(...basicObjectsList)
    })

    return {
      threeTarget,
    }
  },
})
</script>
<style>
.three-canvas {
  width: 100%;
  height: 100%;
}
#app {
  width: 100%;
  height: 100%;
}
</style>


