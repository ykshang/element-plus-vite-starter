import type { UserInfoStore } from '~/types/User'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserInfoStore = defineStore(
  'UserInfo',
  () => {
    const currentUserInfo = ref({
      firstName: 'Kangkang',
      w3account: 'kangkang shang s00132211',
      userid: 's00132211',
      lastName: 'Shang',
      fullName: 'Kangkang Shang',
      age: '31',
      email: '123@qq.com',
      phoneNumber: '13800000000',
      birthday: '1998-12-11',
      sex: '男',
      brief: '指尖划过星辰，文字栖居于此——这里是未命名故事的扉页，也是你与世界的第一帧相遇。',
      offices: ['中国', '济南', '济南CBD办公室 3F', '3C-4D'],
      dept: ['华为技术', '中国地区部', '中国区业务软件部', '软件应用开发部'],
      address: '山东省济南市历下区舜华街道海信龙奥9号，10号楼1901',
      tags: ['AI', '前端开发', '项目管理', '集成交付'],
      skills: ['Vue3', 'TS', 'JS', 'HTML', 'CSS', 'SCSS', 'Less', 'Markdown'],
      avatarUrl: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    })
    const setCurrentUserInfo = (userInfo: Partial<Omit<UserInfoStore, 'age'>>) => {
      Object.assign(currentUserInfo.value, userInfo)
    }
    return { currentUserInfo, setCurrentUserInfo }
  },
)
