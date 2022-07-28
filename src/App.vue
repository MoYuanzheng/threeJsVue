
<template>
  <div class="three-canvas"
       ref="threeTarget"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { basicObjectsList } from './assets/ts/TBasicObject'
import { TEngine } from './assets/ts/TEngine'
import { TCanvasTextureEditor } from './assets/ts/TCanvasTextureEditor'
export default defineComponent({
  setup() {
    const threeTarget = ref(null)
    onMounted(() => {
      // @ts-ignore
      const TE = new TEngine(threeTarget.value)
      TE.addObject(...basicObjectsList)

      const testCanvas = new TCanvasTextureEditor()

      // testCanvas.draw(ctx => {
      //   ctx.beginPath()
      //   ctx.rect(10, 10, 200, 200)
      //   ctx.strokeStyle = 'red'
      //   ctx.stroke()
      //   ctx.closePath
      // }).preview()
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


