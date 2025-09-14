<script setup lang="ts">
import { dayjs, ElNotification } from 'element-plus'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useUserInfoStore } from '~/stores/userIfnoStroe'

const userInfoStore = useUserInfoStore()

const { currentUserInfo } = storeToRefs(userInfoStore)

// console.log(currentUserInfo.value)

// const isFollow = ref(false)
// function followFun() {
//   isFollow.value = !isFollow.value
//   if (isFollow.value) {
//     ElNotification.success('关注成功')
//   } else {
//     ElNotification.success('取消关注成功')
//   }
// }
const currentUserInfoDept = ref()
currentUserInfoDept.value = currentUserInfo.value.dept[currentUserInfo.value.dept.length - 1]
</script>

<template>
  <el-card shadow="never" class="relative">
    <!-- <div class="absolute right-15px top-15px" @click="followFun">
      <div v-if="isFollow" class="i-ep:star-filled followed-star" />
      <div v-else class="i-ep:star unfollow-star" />
    </div> -->
    <div class="m-auto max-w-fit w-full flex flex-col items-center justify-center px-5%">
      <el-avatar
        size="large"
        class="border-1px border-[--ep-color-primary] border-solid" shape="circle"
        :src="currentUserInfo.avatarUrl"
      />
      <div class="mt-15px flex text-lg">
        {{ currentUserInfo.w3account }}
        <div v-if="currentUserInfo.sex === '男'" class="i-ep:male ml-10px color-[#409eff]" />
        <div v-else class="i-ep:female ml-10px color-[#e574d0]" />
      </div>
      <div class="mt-10px break-all text-sm text-[--ep-color-text-2]">
        {{ currentUserInfo.brief }}
      </div>
      <div class="mt-12px">
        <el-tag v-for="item in currentUserInfo.tags" :key="item" class="mb-5px mr-8px" type="primary">
          {{ item }}
        </el-tag>
      </div>
      <el-divider />
      <div class="grid-cols grid mx-10% mb-30px flex-1 gap-6px font-size-sm color-[--ep-text-color-regular]">
        <div class="i-ep:user" />
        <div>
          {{ currentUserInfo.userid }}
        </div>
        <div class="i-ep:notification" />
        <div>
          {{ currentUserInfo.fullName }}
        </div>
        <div class="i-ep:magic-stick" />
        <div>
          {{ currentUserInfo.age }}岁
        </div>
        <div class="i-ep:calendar" />
        <div>
          {{ dayjs(currentUserInfo.birthday).format('YYYY-MM-DD') }}
        </div>
        <div class="i-ep:iphone" />
        <div>
          {{ currentUserInfo.phoneNumber }}
        </div>
        <div class="i-ep:message" />
        <div>
          {{ currentUserInfo.email }}
        </div>
        <div class="i-ep:location" />
        <div>
          {{ currentUserInfo.dept.join(' / ') }}
        </div>
        <div class="i-ep:map-location" />
        <div>
          {{ currentUserInfo.offices.join(' / ') }}
        </div>
        <div class="i-ep:office-building" />
        <div>
          {{ currentUserInfo.address }}
        </div>
        <div class="i-ep:notebook" />
        <div>
          {{ currentUserInfo.skills.join('、') }}
        </div>
      </div>
    </div>
  </el-card>
</template>

 <style lang="scss" scoped>
// .unfollow-star {
//   cursor: pointer;
//   &:hover {
//     color: var(--ep-color-primary);
//   }
// }
// .followed-star {
//   color: var(--ep-color-primary);
//   &:hover {
//     cursor: pointer;
//   }
// }
.grid-cols {
  grid-template-columns: 30px 1fr;
}
</style>
