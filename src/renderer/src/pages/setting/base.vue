<template>
  <a-space direction="vertical" fill>
    <div class="flex-row">
      <!-- <div class="item flex-1">
        <span class="label">开机自启</span>
        <a-switch v-model="config.autoStartUp"></a-switch>
      </div> -->
      <div class="item flex-1">
        <span class="label">快捷键</span>
        <div class="value">
          <a-typography-paragraph editable v-model:editText="shortcut" @edit-end="editEnd">
            {{ config.shortcut }}
          </a-typography-paragraph>
        </div>
      </div>
    </div>
  </a-space>
</template>
<script setup lang="ts">
import { Message } from '@arco-design/web-vue'
import { ref, watchEffect } from 'vue'
import { getStore, setStore } from '../../utils/storage'

const config = ref<{
  autoStartUp: boolean
  shortcut: string
}>(
  getStore('config')
    ? getStore('config')
    : {
        autoStartUp: false,
        shortcut: 'alt+a'
      }
)
const shortcut = ref(config.value.shortcut)
let init = false
watchEffect(() => {
  setTimeout(() => {
    window.ipcRenderer
      .invoke('config', {
        ...config.value
      })
      .then((result) => {
        if (result === true) {
          if (!init) {
            init = true
          } else {
            Message.success('保存成功')
          }
        } else {
          Message.error(result)
        }
      })
  }, 0)
  setStore('config', config.value)
})

const editEnd = () => {
  window.ipcRenderer
    .invoke('config', {
      ...config.value,
      shortcut: shortcut.value
    })
    .then((result) => {
      if (result === true) {
        config.value.shortcut = shortcut.value
      } else {
        shortcut.value = config.value.shortcut
        Message.error(result)
      }
    })
}
</script>
<style scoped lang="scss">
.item {
  display: flex;
  flex-direction: row;
  align-items: center;
  .label {
    width: 80px;
    line-height: 32px;
  }
  .value {
    flex: 1;
    display: flex;
    align-items: center;
  }
}
::v-deep(.arco-typography),
::v-deep(.arco-typography-edit-content) {
  margin-bottom: 0 !important;
}
</style>
