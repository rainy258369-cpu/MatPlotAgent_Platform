<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { VChart } from '@visactor/vchart'
import { registerBarChart, registerLineChart } from '@visactor/vchart'

VChart.useRegisters([registerBarChart, registerLineChart])

const chartContainer = ref() // 使用 ref 引用

//包含所有spec的柱状图，组合图，展平数据转化
const spec = {
  type: 'bar',
  data: [
    {
      id: 'barData',
      values: [
        { type: 'A', year: '1930', value: 129 },
        { type: 'A', year: '1940', value: 133 },
        { type: 'A', year: '1950', value: 130 },
        { type: 'A', year: '1960', value: 126 },
        { type: 'B', year: '1970', value: 117 },
        { type: 'B', year: '1980', value: 114 },
        { type: 'B', year: '1990', value: 111 },
        { type: 'B', year: '2000', value: 89 },
        { type: 'B', year: '2010', value: 80 },
        { type: 'B', year: '2018', value: 80 },
      ],
    },
  ],
  xField: 'year',
  yField: 'value',
  seriesField: 'type',
  bar: {
    style: {
      cornerradius: 5,
    },
  },
  legends: {
    visible: true,
    orient: 'top',
    position: 'start',
  },
}

const vchart = ref<VChart>()

onMounted(() => {
  // 确保在组件挂载后初始化图表
  if (chartContainer.value) {
    vchart.value = new VChart(spec, {
      dom: chartContainer.value, // 传递 DOM 元素引用
    })
    vchart.value.renderSync()
  }
})

const containerB = ref()
const specB = {
  type: 'line',
  data: [
    {
      id: 'lineData',
      values: [
        {
          type: 'B',
          year: '1930',
          value: 129,
        },
        {
          type: 'B',
          year: '1940',
          value: 133,
        },
        {
          type: 'B',
          year: '1950',
          value: 130,
        },
        {
          type: 'B',
          year: '1960',
          value: 126,
        },
        {
          type: 'B',
          year: '1970',
          value: null,
        },
        {
          type: 'B',
          year: '1980',
          value: 114,
        },
      ],
    },
  ],
  xField: 'year',
  yField: 'value',
  seriesField: 'type',
  invalidType: 'break',
  point: {
    style: {
      shape: 'triangle',
      size: 10,
    },
  },
}

const containerC = ref()
const specC = {
  type: 'pie',
  data: [
    {
      id: 'pieData',
      values: [
        {
          type: 'A',
          value: '20.8',
        },
        {
          type: 'B',
          value: '79.2',
        },
        {
          type: 'C',
          value: '1.2',
        },
        {
          type: 'D',
          value: '33.9',
        },
        {
          type: 'E',
          value: '24.6',
        },
        {
          type: 'F',
          value: '50.2',
        },
        {
          type: 'G',
          value: '13.8',
        },
        {
          type: 'H',
          value: '2.4',
        },
      ],
    },
  ],
  valueField: 'value',
  categoryField: 'type',
  legends: {
    visible: true,
    orient: 'left',
  },
  title: {
    visible: true,
    text: '饼图实例',
  },
  label: {
    visible: true,
  },
}

const containerD = ref()
const specD = {
  type: 'common',
  seriesField: 'type',
  data: [
    {
      id: 'id0',
      values: [
        { x: 'Monday', type: 'breakfast', y: 15 },
        { x: 'Monday', type: 'lunch', y: 25 },
        { x: 'Tuesday', type: 'breakfast', y: 12 },
        { x: 'Tuesday', type: 'lunch', y: 30 },
        { x: 'Wednesday', type: 'breakfast', y: 15 },
        { x: 'Wednesday', type: 'lunch', y: 24 },
        { x: 'Thursday', type: 'breakfast', y: 10 },
        { x: 'Thursday', type: 'lunch', y: 25 },
        { x: 'Friday', type: 'breakfast', y: 13 },
        { x: 'Friday', type: 'lunch', y: 20 },
        { x: 'Saturday', type: 'breakfast', y: 10 },
        { x: 'Saturday', type: 'lunch', y: 22 },
        { x: 'Sunday', type: 'breakfast', y: 12 },
        { x: 'Sunday', type: 'lunch', y: 19 },
      ],
    },
    {
      id: 'id1',
      values: [
        { x: 'Monday', type: 'drinks', y: 22 },
        { x: 'Tuesday', type: 'drinks', y: 43 },
        { x: 'Wednesday', type: 'drinks', y: 33 },
        { x: 'Thursday', type: 'drinks', y: 22 },
        { x: 'Friday', type: 'drinks', y: 10 },
        { x: 'Saturday', type: 'drinks', y: 30 },
        { x: 'Sunday', type: 'drinks', y: 46 },
      ],
    },
  ],
  series: [
    {
      type: 'bar',
      id: 'bar',
      dataIndex: 0,
      label: { visible: true },
      seriesField: 'type',
      xField: ['x', 'type'],
      yField: 'y',
    },
    {
      type: 'line',
      id: 'line',
      dataIndex: 1,
      label: { visible: true },
      seriesField: 'type',
      xField: 'x',
      yField: 'y',
      stack: false,
    },
  ],
  axes: [
    { orient: 'left', seriesIndex: [0] },
    { orient: 'right', seriesId: ['line'], grid: { visible: false } },
    { orient: 'bottom', label: { visible: true }, type: 'band' },
  ],
  legends: {
    visible: true,
    orient: 'bottom',
  },
}

onMounted(() => {
  vchart.value = new VChart(specB, { dom: containerB.value })
  vchart.value.renderSync()
})

onMounted(() => {
  vchart.value = new VChart(specC, { dom: containerC.value })
  vchart.value.renderSync()
})

onMounted(() => {
  vchart.value = new VChart(specD, { dom: containerD.value })
  vchart.value.renderSync()
})

onUnmounted(() => {
  // 清理资源
  if (vchart.value) {
    vchart.value.release()
  }
})
</script>

<template>
  <div ref="chartContainer" :style="{ width: '250px', height: '250px' }"></div>
  <div ref="containerC" :style="{ width: '300px', height: '250px' }"></div>
  <div ref="containerB" :style="{ width: '250px', height: '250px' }"></div>
  <div ref="containerD" :style="{ width: '300px', height: '300px' }"></div>
</template>
