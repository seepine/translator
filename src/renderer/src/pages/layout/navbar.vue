<template>
  <div class="navbar flex-row align-center justify-between px-sm">
    <a-space>
      <icon-pushpin
        class="icon"
        :class="{
          active: isTop
        }"
        @click="handleSetTop"
      />
      <icon-settings
        class="icon"
        :class="{
          active: isSetting
        }"
        @click="handleToSetting"
      />
      <a-dropdown @select="handleThemeChange">
        <icon-sun-fill
          class="icon"
          v-if="!isDarkMode"
          :class="{
            active: themeMode !== 1
          }"
        />
        <icon-moon-fill
          class="icon"
          v-if="isDarkMode"
          :class="{
            active: themeMode !== 1
          }"
        />
        <template #content>
          <a-doption :value="index + 1" v-for="(item, index) in themes" :key="item"
            ><template #icon>
              <icon-check v-if="index + 1 === themeMode" />
              <i v-else style="margin-right: 14px"></i> </template
            >{{ item }}</a-doption
          >
        </template>
      </a-dropdown>
    </a-space>
    <div>
      <a-space>
        <icon-close-circle class="icon" @click="handleQuit" />
      </a-space>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getStore, setStore } from '../../utils/storage'

const route = useRoute()
const router = useRouter()
const isTop = ref(false)

// theme start =============================
const themeMode = ref(getStore('theme-mode') ? getStore('theme-mode') : 1)
const themes = ['跟随系统', '浅色模式', '深色模式']
const isDarkMode = ref(true)
const changeTheme = (isDark: boolean) => {
  if (isDark === undefined) {
    return
  }
  isDarkMode.value = isDark
  if (isDark) {
    document.body.setAttribute('arco-theme', 'dark')
  } else {
    document.body.removeAttribute('arco-theme')
  }
}
window.ipcRenderer.on('themeChange', (e, isDark: boolean) => {
  if (themeMode.value === 1) {
    changeTheme(isDark)
  }
})
if (themeMode.value === 1) {
  window.ipcRenderer.invoke('is-dark-mode').then((isDark: boolean) => {
    changeTheme(isDark)
  })
} else {
  changeTheme(themeMode.value === 3)
}
const handleThemeChange = (e: number) => {
  themeMode.value = e
  setStore('theme-mode', e)
  if (e === 1) {
    window.ipcRenderer.invoke('is-dark-mode').then((isDark: boolean) => {
      changeTheme(isDark)
    })
  } else {
    changeTheme(e === 3)
  }
}
// theme end ===============================

const handleSetTop = () => {
  isTop.value = !isTop.value
  window.ipcRenderer.invoke('set-always-on-top', isTop.value)
}
window.ipcRenderer.invoke('set-always-on-top').then((res) => {
  isTop.value = res
})
const isSetting = computed(() => route.fullPath !== '/')
const handleToSetting = () => {
  if (!isSetting.value) {
    router.push('/setting')
  } else {
    router.push('/')
  }
}
const handleQuit = () => {
  window.ipcRenderer.send('quit')
}
</script>

<style lang="scss" scoped>
.navbar {
  background-color: var(--color-bg-3);
  height: 40px;
  -webkit-app-region: drag;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}
.icon {
  font-size: 18px;
  -webkit-app-region: no-drag;
  color: var(--color-text-2);
  cursor: pointer;
  &.active {
    color: rgb(var(--arcoblue-6));
  }
}
</style>
