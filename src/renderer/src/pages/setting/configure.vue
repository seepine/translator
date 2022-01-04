<template>
  <div style="min-height: 200px; overflow-y: auto; max-height: 600px">
    <div class="flex-row flex-wrap justify-between">
      <div class="item" v-for="(item, index) in services" :key="index">
        <div
          class="flex-row justify-between align-center arco-btn-secondary arco-btn-size-medium mb-md"
        >
          <div class="flex-row align-center">
            <a-switch
              size="small"
              style="margin-right: 12px"
              :default-checked="item.active"
              @change="(checked:boolean)=>handleSwitchChange(checked,index)"
            ></a-switch>
            <img :src="item.logo" class="logo" />{{ item.name }}
          </div>
          <a-space>
            <a-dropdown @select="(e:string) => handleOpService(e, index)">
              <icon-down style="cursor: pointer; padding: 4px 0 4px 10px" class="pl-sm" />
              <template #content>
                <a-doption :value="item.url" v-if="item.url">前往插件主页</a-doption>
                <a-doption value="del">删除</a-doption>
              </template>
            </a-dropdown>
          </a-space>
        </div>
      </div>
      <div class="item" v-if="!isAdd">
        <a-dropdown @select="handleAdd">
          <a-button long>
            <template #icon><icon-plus /></template>添加服务
          </a-button>
          <template #content>
            <a-dgroup title="内置">
              <a-doption v-for="(item, index) in plugs.in" :key="item" :value="'in-' + index">
                <div class="option-body"><img :src="item.logo" class="logo" />{{ item.name }}</div>
              </a-doption>
            </a-dgroup>
            <a-dgroup title="插件" v-if="plugs.extra.length > 0">
              <a-doption v-for="(item, index) in plugs.extra" :key="item" :value="'extra-' + index">
                <div class="option-body"><img :src="item.logo" class="logo" />{{ item.name }}</div>
              </a-doption>
            </a-dgroup>
          </template>
        </a-dropdown>
      </div>
    </div>
    <div v-if="isAdd">
      <div>
        <a-card v-if="selectPlug">
          <a-typography-text class="flex-row align-center justify-center pb-md">
            <img :src="selectPlug.logo" class="logo" />{{ selectPlug.name }}
          </a-typography-text>
          <c-form
            @submit="confirmAdd"
            :option="{
              btn: {
                text: '添加'
              },
              size: 'small',
              columns: selectPlug.columns ? selectPlug.columns : []
            }"
          >
            <template #btnRight>
              <a-button @click="isAdd = false" style="margin-left: 12px">取消</a-button>
            </template>
          </c-form>
        </a-card>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import store from '../../store'
import { Plug, Plugs } from '../../types/Plug'

const isAdd = ref(false)
const plugs = computed<Plugs>(() => store.state.plugs)
const services = computed<Array<Plug>>(() => store.state.services)
const selectPlug = ref<Plug>()

const confirmAdd = (form: any, done: Function) => {
  if (selectPlug.value) {
    selectPlug.value.option = form
    store.commit('addService', selectPlug.value)
  }
  isAdd.value = false
  done()
}
const handleAdd = (e: string) => {
  const arr: Array<string> = e.split('-')
  // @ts-ignore
  selectPlug.value = plugs.value[arr[0]][arr[1]]
  if (!selectPlug.value?.columns) {
    confirmAdd({}, () => {})
  } else {
    isAdd.value = true
  }
}

const handleOpService = (e: string, index: number) => {
  if (e === 'del') {
    store.commit('delService', index)
  } else if (e.indexOf('http') === 0) {
    window.ipcRenderer.send('open-url', e)
  }
}
const handleSwitchChange = (checked: boolean, index: number) => {
  store.commit('changeService', {
    checked,
    index
  })
}
</script>
<style scoped>
.item {
  width: 100%;
}
.logo {
  margin-right: 2px;
  width: 18px;
  height: 18px;
}
.option-body {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-right: 4px;
}
::v-deep(.arco-form-item) {
  margin-bottom: 6px;
}
</style>
