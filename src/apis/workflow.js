export const PROCESS_START = '/workflow/process/start'
// 流程
export const PROCESS_TASK_SUBMIT = '/workflow/process/task/submit'
export const PROCESS_TASK_AUDIT = '/workflow/process/task/findAuditInfoByBusinessKey'
export const PROCESS_PUSH_WAIT = '/workflow/ent/pushWait'
export const PROCESS_ENT_STATUS = '/workflow/ent/updateWaitStatus'
export const PROCESS_COPY_LIST = '/workflow/approvalCopy/findAllCopyForMe'
export const PROCESS_DETAIL = '/workflow/businessApproval/getDetail'

// 外出
export const EGRESS_CREATE = '/system/egress/saveEgress'
export const EGRESS_DELETE = '/system/egress/deleteEgress'
export const EGRESS_UPDATE = '/system/egress/updateEgress' 
export const EGRESS_LIST = '/system/egress/listEgress' 
export const EGRESS_DETAIL = '/system/egress/getEgress'

export const EGRESS_SUBMIT = '/workflow/egress/submit'
export const EGRESS_TURN = '/workflow/egress/turn'
export const EGRESS_BACK = '/workflow/egress/back'
export const EGRESS_INVALID = '/workflow/egress/invalid'
export const EGRESS_OVER = '/workflow/egress/over'
export const EGRESS_RECALL = '/workflow/egress/recall'

// 请假
export const LEAVE_CREATE = '/system/leave/saveLeave'
export const LEAVE_DELETE = '/system/leave/deleteLeave'
export const LEAVE_UPDATE = '/system/leave/updateLeave' 
export const LEAVE_LIST = '/system/leave/listLeave' 
export const LEAVE_DETAIL = '/system/leave/getLeave' 

export const LEAVE_SUBMIT = '/workflow/leave/submit'
export const LEAVE_TURN = '/workflow/leave/turn'
export const LEAVE_BACK = '/workflow/leave/back'
export const LEAVE_INVALID = '/workflow/leave/invalid'
export const LEAVE_OVER = '/workflow/leave/over'
export const LEAVE_RECALL = '/workflow/leave/recall'

//出差
export const BUSINESS_CREATE = '/system/business/saveBusiness'
export const BUSINESS_DELETE = '/system/business/deleteBusiness'
export const BUSINESS_UPDATE = '/system/business/updateBusiness' 
export const BUSINESS_LIST = '/system/business/listBusiness' 
export const BUSINESS_DETAIL = '/system/business/getBusiness' 

export const BUSINESS_SUBMIT = '/workflow/business/submit'
export const BUSINESS_TURN = '/workflow/business/turn'
export const BUSINESS_BACK = '/workflow/business/back'
export const BUSINESS_INVALID = '/workflow/business/invalid'
export const BUSINESS_OVER = '/workflow/business/over'
export const BUSINESS_RECALL = '/workflow/business/recall'
 

//用车
export const VEHICLE_CREATE = '/workflow/vehicleApplication/save'
export const VEHICLE_TYPE = '/workflow/vehicleUseType/list'
export const VEHICLE_SELECT = '/workflow/vehicle/list' 
export const VEHICLE_LIST = '/workflow/vehicleApplication/list'
export const VEHICLE_SUBMIT = '/workflow/vehicleApplication/submit'
export const VEHICLE_TURN = '/workflow/vehicleApplication/turn'
export const VEHICLE_BACK = '/workflow/vehicleApplication/back'
export const VEHICLE_INVALID = '/workflow/vehicleApplication/invalid'
export const VEHICLE_DELETE = '/workflow/vehicleApplication/delete'
export const VEHICLE_OVER = '/workflow/vehicleApplication/over'
export const VEHICLE_RECALL = '/workflow/vehicleApplication/recall'
export const VEHICLE_DETAIL = '/workflow/vehicleApplication/getDetailById'
export const VEHICLE_GETID = '/workflow/businessApproval/getDetail'


// 补卡
export const REPLENISH_CARD_CREATE = '/workflow/replenishCard/saveReplenishCard'
export const REPLENISH_CARD_DELETE = '/workflow/replenishCard/deleteReplenishCard'
export const REPLENISH_CARD_UPDATE = '/workflow/replenishCard/updateReplenishCard'
export const REPLENISH_CARD_PAGE = '/workflow/replenishCard/pageReplenishCard'
export const REPLENISH_CARD_LIST = '/workflow/replenishCard/listReplenishCard' 
export const REPLENISH_CARD_DETAIL = '/workflow/replenishCard/getReplenishCardById'
export const REPLENISH_CARD_COUNT = '/workflow/replenishCard/countReplenishCard'

export const REPLENISH_CARD_SUBMIT = '/workflow/replenishCard/submit'
export const REPLENISH_CARD_TURN = '/workflow/replenishCard/turn'
export const REPLENISH_CARD_BACK = '/workflow/replenishCard/back'
export const REPLENISH_CARD_INVALID = '/workflow/replenishCard/invalid'
export const REPLENISH_CARD_OVER = '/workflow/replenishCard/over'
export const REPLENISH_CARD_RECALL = '/workflow/replenishCard/recall' 
