import { ElTable } from 'element-plus'// 执行一些ElementPlus的全局配置
// 修改表格的一些默认样式
ElTable.props.border = { type: Boolean, default: true }
ElTable.props.highlightCurrentRow = { type: Boolean, default: true }
ElTable.props.headerCellClassName = { type: String, default: 'table-header-cell' }
