import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

export const useThemeConfigStore = defineStore(
  'ThemeConfig',
  () => {
    // 菜单是否折叠
    const isMenuCollapse = ref(false)
    const changeMenuCollapse = (val: boolean) => {
      isMenuCollapse.value = val
    }
    interface WatherMark {
      content: string[]
      showWaterMark: boolean
    }
    // 水印相关逻辑
    const watherMark = reactive<WatherMark>({
      content: [], // 全局水印内容
      showWaterMark: false,
    })
    /**
     * 切换水印的显示隐藏
     * @param showFlag 水印是否显示
     */
    const toggleWaterMark = (showFlag: boolean) => {
      watherMark.showWaterMark = showFlag
      watherMark.content = watherMark.showWaterMark ? ['全局水印', 'Vue Adminn'] : []
    }
    return { isMenuCollapse, changeMenuCollapse, toggleWaterMark, watherMark }
  },
)
