import { VChart, registerLineChart, registerAreaChart } from '@visactor/vchart'

VChart.useRegisters([registerLineChart, registerAreaChart])

export default VChart
