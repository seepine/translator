<script setup lang="ts">
import { onMounted, ref } from 'vue'

const divRef = ref()
let divHeight = 0
const lock = ref(false)
const resetHeight = () => {
  if (lock.value) {
    return
  }
  lock.value = true
  if (divRef.value && divHeight !== divRef.value.clientHeight && divRef.value.clientHeight > 0) {
    divHeight = divRef.value.clientHeight
    window.ipcRenderer.send('resize', {
      width: divRef.value.clientWidth,
      height: divHeight
      // width: 1200,
      // height: 800
    })
    lock.value = false
  } else {
    lock.value = false
  }
}
onMounted(() => {
  setInterval(() => {
    resetHeight()
  }, 16)
})
// const route = useRoute()
// const isSetting = computed(() => route.fullPath !== '/')
</script>

<template>
  <div class="div" ref="divRef" style="width: 440px">
    <!-- <div class="div" ref="divRef" :style="{ width: `${isSetting ? 540 : 440}px` }"> -->
    <router-view></router-view>
  </div>
</template>
