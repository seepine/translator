<template>
  <a-space direction="vertical" fill>
    <a-textarea
      ref="inputRef"
      v-model="inputValue"
      @keydown="keyListen"
      :auto-size="{
        minRows: 3,
        maxRows: 5
      }"
    ></a-textarea>
    <a-collapse v-model:active-key="activeKeys" :bordered="false" expand-icon-position="right">
      <a-collapse-item :header="item.name" v-for="(item, index) in services" :key="index">
        <template #header>
          <div class="un-select flex-row align-center">
            <img :src="item.logo" class="logo" />
            {{ item.name }}<a-spin v-if="loadingList[index]" style="margin-left: 10px" />
          </div>
        </template>

        <div style="min-height: 20px; white-space: pre-wrap">
          {{ resList[index] }}
        </div>

        <a-tooltip
          v-model:popup-visible="copyList[index]"
          content="已复制"
          trigger="click"
          :default-popup-visible="false"
          position="top"
          :popup-offset="-6"
          mini
          ><icon-copy
            v-if="resList[index]"
            class="pt-sm px-sm"
            style="cursor: pointer; margin-left: -18px"
            @click="handleCopy(index)"
          />
        </a-tooltip>
      </a-collapse-item>
    </a-collapse>
  </a-space>
</template>
<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue'
import crypto from 'crypto-js'
import store from '../../store'
import { Plug } from '../../types/Plug'
import axios from '../../utils/axios'

let crypto2: any
try {
  crypto2 = window.require('crypto-js')
  // eslint-disable-next-line no-empty
} catch (e) {}
const inputValue = ref('')
const inputRef = ref()

const services = computed<Array<Plug>>(() => {
  return store.state.services.filter((item) => item.active)
})
const resList = ref<Array<string>>([])
const loadingList = ref<Array<boolean>>([])
const copyList = ref<Array<boolean>>([])
const activeKeys = ref<Array<number>>([])

const focus = () => {
  nextTick(() => {
    inputValue.value = ''
    try {
      inputRef.value.$refs.textareaRef.focus()
      // eslint-disable-next-line no-empty
    } catch (e) {}
  })
}

onMounted(() => {
  window.ipcRenderer.on('show', () => {
    focus()
  })
  focus()
})

const handleCopy = (index: number) => {
  if (resList.value[index]) {
    window.ipcRenderer.send('copy', resList.value[index])
    copyList.value[index] = true
    setTimeout(() => {
      copyList.value[index] = false
    }, 1500)
  }
}

let leftTime = new Date().getTime()
let cTime = new Date().getTime()
const keyListen = (e: KeyboardEvent) => {
  if (e.code === 'ControlLeft') {
    leftTime = new Date().getTime()
  } else if (e.code === 'KeyC') {
    cTime = new Date().getTime()
    if (cTime > leftTime && cTime - leftTime < 200) {
      handleCopy(0)
    }
  } else if (e.code === 'Enter' || e.code === 'NumpadEnter') {
    e.preventDefault()
    if (inputValue.value) {
      activeKeys.value = []
      const to = /.*[\u4e00-\u9fa5]+.*$/.test(inputValue.value) ? 'en' : 'zh'
      for (let i = 0; i < services.value.length; i += 1) {
        const item = services.value[i]
        loadingList.value[i] = true
        resList.value[i] = ''
        try {
          item
            .translate(
              {
                src: inputValue.value,
                from: 'auto',
                option: {
                  ...item.option
                },
                to
              },
              {
                axios,
                crypto,
                crypto2
              }
            )
            .then((res) => {
              resList.value[i] = res.dst
            })
            .catch((err) => {
              resList.value[i] = `Error:\n${err.message ? err.message : err}`
            })
            .finally(() => {
              activeKeys.value.push(i)
              loadingList.value[i] = false
            })
        } catch (err: any) {
          resList.value[i] = `Error:\n${err.message}`
          activeKeys.value.push(i)
          loadingList.value[i] = false
        }
      }
    }

    return false
  }
  return true
}
</script>
