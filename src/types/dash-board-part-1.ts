// 组装 card1 模块测试数据
interface tickerType {
  date: string // 日期
  createNum: number // 当日新增问题单
  closeNum: number // 当日关闭问题单
  slaNum: number // 当日SLA超时问题单
  negativeNum: number // 当日不满意问题单
  satisfaction: number // 当日满意度
}
export default interface DateSource {
  data: tickerType[]
  totalNum: number // 问题单总数
  totalClosed: number // 关闭问题单总数
  totalOpened: number // 打开问题单总数
  totalNegativeNum: number // 不满意问题单总数
  totalSlaNum: number // SLA超时问题单总数
}
