<script lang="ts" setup>
import { onMounted, ref, onUnmounted, watch } from 'vue'
import VChart from '../lib/vchart.ts'

const vchart = ref<VChart | null>(null)

const containerRef = ref<HTMLDivElement>()

export interface AttackRecord {
  time: string
  attacks: number
}
export interface EventRecord {
  time: string
  class: 'high' | 'medium' | 'low'
  v: number
}
interface Props {
  attackData: AttackRecord[]
  eventsData: EventRecord[]
}
const props = defineProps<Props>()

const spec = {
  type: 'common',
  data: [
    {
      id: 'attack',
      values: props.attackData,
    },
    {
      id: 'events',
      values: props.eventsData,
    },
  ],
  series: [
    {
      type: 'line',
      id: 'attackLine',
      dataId: 'attack',
      label: { visible: true },
      xField: 'time',
      yField: 'attacks',
    },
    {
      type: 'bar',
      id: 'eventsBar',
      dataId: 'events',
      label: { visible: true },
      xField: ['time'],
      yField: 'v',
      stack: true,
      seriesField: 'class',
    },
  ],
  legends: { visible: true, orient: 'right' },
  axes: [
    { orient: 'left', seriesIndex: [0] },
    { orient: 'right', seriesIndex: [1] },
    { orient: 'bottom', seriesIndex: [0, 1] },
  ],
  title: {
    visible: true,
    text: '攻击次数与安全事件数量',
  },
}

const render = () => {
  if (containerRef.value) {
    if (!vchart.value) {
      vchart.value = new VChart(spec, { dom: containerRef.value })
      vchart.value.renderSync()
    }
    vchart.value.updateData('attack', props.attackData)
    vchart.value.updateData('events', props.eventsData)
  }
}

onMounted(render())

watch()

onUnmounted(() => {
  if (vchart.value) {
    vchart.value.release()
  }
})
</script>

<template>
  <div ref="containerRef" :style="{ width: '500px', height: '500px' }"></div>
</template>
