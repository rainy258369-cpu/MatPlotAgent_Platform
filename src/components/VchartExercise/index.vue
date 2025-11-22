<script setup lang="ts">
import { ref } from 'vue'
import LineBar from './components/line-bar.vue'
import type { EventRecord, AttackRecord } from './components/line-bar.vue'

const events = ref<EventRecord[]>([
  { time: '00:00', class: 'high', v: 5 },
  { time: '00:00', class: 'medium', v: 45 },
  { time: '00:00', class: 'low', v: 1200 },

  { time: '01:00', class: 'high', v: 3 },
  { time: '01:00', class: 'medium', v: 32 },
  { time: '01:00', class: 'low', v: 945 },

  { time: '02:00', class: 'high', v: 2 },
  { time: '02:00', class: 'medium', v: 28 },
  { time: '02:00', class: 'low', v: 820 },

  { time: '03:00', class: 'high', v: 1 },
  { time: '03:00', class: 'medium', v: 25 },
  { time: '03:00', class: 'low', v: 694 },

  { time: '04:00', class: 'high', v: 0 },
  { time: '04:00', class: 'medium', v: 20 },
  { time: '04:00', class: 'low', v: 660 },

  { time: '05:00', class: 'high', v: 4 },
  { time: '05:00', class: 'medium', v: 50 },
  { time: '05:00', class: 'low', v: 1046 },

  { time: '06:00', class: 'high', v: 8 },
  { time: '06:00', class: 'medium', v: 65 },
  { time: '06:00', class: 'low', v: 1427 },

  { time: '07:00', class: 'high', v: 15 },
  { time: '07:00', class: 'medium', v: 110 },
  { time: '07:00', class: 'low', v: 2075 },

  { time: '08:00', class: 'high', v: 25 },
  { time: '08:00', class: 'medium', v: 180 },
  { time: '08:00', class: 'low', v: 2895 },

  { time: '09:00', class: 'high', v: 20 },
  { time: '09:00', class: 'medium', v: 150 },
  { time: '09:00', class: 'low', v: 2680 },

  { time: '10:00', class: 'high', v: 18 },
  { time: '10:00', class: 'medium', v: 135 },
  { time: '10:00', class: 'low', v: 2547 },

  { time: '11:00', class: 'high', v: 30 },
  { time: '11:00', class: 'medium', v: 190 },
  { time: '11:00', class: 'low', v: 2980 },

  { time: '12:00', class: 'high', v: 35 },
  { time: '12:00', class: 'medium', v: 210 },
  { time: '12:00', class: 'low', v: 3255 },

  { time: '13:00', class: 'high', v: 40 },
  { time: '13:00', class: 'medium', v: 250 },
  { time: '13:00', class: 'low', v: 3810 },

  { time: '14:00', class: 'high', v: 32 },
  { time: '14:00', class: 'medium', v: 200 },
  { time: '14:00', class: 'low', v: 3568 },

  { time: '15:00', class: 'high', v: 28 },
  { time: '15:00', class: 'medium', v: 165 },
  { time: '15:00', class: 'low', v: 2757 },

  { time: '16:00', class: 'high', v: 150 },
  { time: '16:00', class: 'medium', v: 300 },
  { time: '16:00', class: 'low', v: 3850 },

  { time: '17:00', class: 'high', v: 45 },
  { time: '17:00', class: 'medium', v: 220 },
  { time: '17:00', class: 'low', v: 3335 },

  { time: '18:00', class: 'high', v: 22 },
  { time: '18:00', class: 'medium', v: 170 },
  { time: '18:00', class: 'low', v: 2608 },

  { time: '19:00', class: 'high', v: 18 },
  { time: '19:00', class: 'medium', v: 140 },
  { time: '19:00', class: 'low', v: 2242 },

  { time: '20:00', class: 'high', v: 15 },
  { time: '20:00', class: 'medium', v: 120 },
  { time: '20:00', class: 'low', v: 1865 },

  { time: '21:00', class: 'high', v: 10 },
  { time: '21:00', class: 'medium', v: 95 },
  { time: '21:00', class: 'low', v: 1695 },

  { time: '22:00', class: 'high', v: 8 },
  { time: '22:00', class: 'medium', v: 80 },
  { time: '22:00', class: 'low', v: 1562 },

  { time: '23:00', class: 'high', v: 6 },
  { time: '23:00', class: 'medium', v: 65 },
  { time: '23:00', class: 'low', v: 1329 },
])
const attack = ref<AttackRecord[]>([
  { time: '00:00', attacks: 1250 },
  { time: '01:00', attacks: 980 },
  { time: '02:00', attacks: 850 },
  { time: '03:00', attacks: 720 },
  { time: '04:00', attacks: 680 },
  { time: '05:00', attacks: 1100 },
  { time: '06:00', attacks: 1500 },
  { time: '07:00', attacks: 2200 },
  { time: '08:00', attacks: 3100 },
  { time: '09:00', attacks: 2850 },
  { time: '10:00', attacks: 2700 },
  { time: '11:00', attacks: 3200 },
  { time: '12:00', attacks: 3500 },
  { time: '13:00', attacks: 4100 },
  { time: '14:00', attacks: 3800 },
  { time: '15:00', attacks: 2950 },
  { time: '16:00', attacks: 4300 },
  { time: '17:00', attacks: 3600 },
  { time: '18:00', attacks: 2800 },
  { time: '19:00', attacks: 2400 },
  { time: '20:00', attacks: 2000 },
  { time: '21:00', attacks: 1800 },
  { time: '22:00', attacks: 1650 },
  { time: '23:00', attacks: 1400 },
])
</script>

<template>
  <div :style="{ display: 'flex', gap: '40px', justifyContent: 'space-evenly' }">
    <LineBar :attack-data="attack" :events-data="events" />
  </div>
</template>
