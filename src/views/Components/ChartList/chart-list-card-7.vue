<script setup lang="ts">
import { onMounted, ref } from 'vue'
import echarts from '~/config/echarts'

const item1 = {
  color: '#F54F4A',
}
const item2 = {
  color: '#FF8C75',
}
const item3 = {
  color: '#FFB499',
}
const data = [
  {
    children: [
      {
        value: 5,
        children: [
          {
            value: 1,
            itemStyle: item1,
          },
          {
            value: 2,
            children: [
              {
                value: 1,
                itemStyle: item2,
              },
            ],
          },
          {
            children: [
              {
                value: 1,
              },
            ],
          },
        ],
        itemStyle: item1,
      },
      {
        value: 10,
        children: [
          {
            value: 6,
            children: [
              {
                value: 1,
                itemStyle: item1,
              },
              {
                value: 1,
              },
              {
                value: 1,
                itemStyle: item2,
              },
              {
                value: 1,
              },
            ],
            itemStyle: item3,
          },
          {
            value: 2,
            children: [
              {
                value: 1,
              },
            ],
            itemStyle: item3,
          },
          {
            children: [
              {
                value: 1,
                itemStyle: item2,
              },
            ],
          },
        ],
        itemStyle: item1,
      },
    ],
    itemStyle: item1,
  },
  {
    value: 9,
    children: [
      {
        value: 4,
        children: [
          {
            value: 2,
            itemStyle: item2,
          },
          {
            children: [
              {
                value: 1,
                itemStyle: item1,
              },
            ],
          },
        ],
        itemStyle: item1,
      },
      {
        children: [
          {
            value: 3,
            children: [
              {
                value: 1,
              },
              {
                value: 1,
                itemStyle: item2,
              },
            ],
          },
        ],
        itemStyle: item3,
      },
    ],
    itemStyle: item2,
  },
  {
    value: 7,
    children: [
      {
        children: [
          {
            value: 1,
            itemStyle: item3,
          },
          {
            value: 3,
            children: [
              {
                value: 1,
                itemStyle: item2,
              },
              {
                value: 1,
              },
            ],
            itemStyle: item2,
          },
          {
            value: 2,
            children: [
              {
                value: 1,
              },
              {
                value: 1,
                itemStyle: item1,
              },
            ],
            itemStyle: item1,
          },
        ],
        itemStyle: item3,
      },
    ],
    itemStyle: item1,
  },
  {
    children: [
      {
        value: 6,
        children: [
          {
            value: 1,
            itemStyle: item2,
          },
          {
            value: 2,
            children: [
              {
                value: 2,
                itemStyle: item2,
              },
            ],
            itemStyle: item1,
          },
          {
            value: 1,
            itemStyle: item3,
          },
        ],
        itemStyle: item3,
      },
      {
        value: 3,
        children: [
          {
            value: 1,
          },
          {
            children: [
              {
                value: 1,
                itemStyle: item2,
              },
            ],
          },
          {
            value: 1,
          },
        ],
        itemStyle: item3,
      },
    ],
    itemStyle: item1,
  },
]
const optionData = ref()
optionData.value = {
  series: {
    radius: ['15%', '80%'],
    type: 'sunburst',
    sort: undefined,
    emphasis: {
      focus: 'ancestor',
    },
    data,
    label: {
      rotate: 'radial',
    },
    levels: [],
    itemStyle: {
      color: '#ddd',
      borderWidth: 2,
    },
  },
}
const myChart = ref()
onMounted(() => {
  const mychart = echarts.init(myChart.value)
  mychart.setOption(optionData.value)
})
</script>

<template>
  <el-card header="旭日图" h-300px flex flex-col body-class="flex flex-1">
    <div ref="myChart" class="flex-1" />
  </el-card>
</template>
