<script setup lang="ts">
import { ref } from 'vue'
import draggable from 'vuedraggable'

const gridList = ref<{ id: number, num: number }[]>([])
for (let i = 0; i < 40; i++) {
  gridList.value.push({ id: i + 1, num: i + 1 })
}
</script>

<template>
  <draggable
    v-model="gridList"
    class="card grid grid-cols-8 grid-rows-5 flex-1 gap-10px"
    item-key="id"
    animation="300"
    chosen-class="chosen"
    force-fallback="true"
  >
    <template #item="{ element }">
      <div :class="`item` + ` ` + `item-${element.num % 9 + 1}`">
        {{ element.num }}
      </div>
    </template>
  </draggable>
</template>

<style scoped lang="scss">
.item {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;
  color: #ffffff;
  cursor: move;
  border: 1px solid #e5e4e9;
  user-select: none;
}
.item-1 {
  background-color: #87bba2;
}
.item-2 {
  background-color: #ff9b54;
}
.item-3 {
  background-color: #73628a;
}
.item-4 {
  background-color: #76c893;
}
.item-5 {
  background-color: #619b8a;
}
.item-6 {
  background-color: #55828b;
}
.item-7 {
  background-color: #427aa1;
}
.item-8 {
  background-color: #38a3a5;
}
.item-9 {
  background-color: #fcca46;
}
.chosen {
  border: 2px solid #89cffd !important;
}
</style>
