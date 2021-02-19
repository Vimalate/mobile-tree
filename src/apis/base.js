export const LOGIN = '/auth/auth/appLogin'
export const LOGIN_UC = '/usercenter/sys/uCenterLogin'

export const PERSON_INFO = '/system/app/getUserInfo'
export const PERSON_TREE = '/system/manage/getManagePersonTree'

export const ORG_LIST = '/system/org/listOrgNoPage'
export const MANAGE_LIST = '/system/manage/getManageByOrgId'
export const MANAGE_PERSON_LIST = '/system/manage/getManageAndPersonById'
// export const MANAGE_PERSON_LIST_NAME = '/system/manage/getPersonByName'
export const MANAGE_PERSON_LIST_NAME = '/system/personManage/getPersonByName'

// 邀请加入企业
export const PERSON_INVITE = '/system/person/agreeInvite'
export const PERSON_INVITE_ID = '/system/person/getInviteById'

//会议室预定
export const MEETING_RESERVE_LIST = '/system/meetingReserve/listConference'
export const MEETING_RESERVE_DELETE = '/system/meetingReserve/deleteConference'
export const MEETING_RESERVE_UPDATE = '/system/meetingReserve/updateConference'
export const MEETING_RESERVE_DETAILS = '/system/meetingReserve/getConferenceDetails'
export const MEETING_RESERVE_CREATE = '/system/meetingReserve/saveConference'
//export const CONFERENCE_JUDGE_TIME = '/system/meetingReserve/findReserveByMeetingAndDate'
export const MEETING_RESERVE_DATE = '/system/meetingReserve/findReserveByMeetingAndDate'

//会议室管理
export const MEETING_LIST = '/system/meeting/listMeeting'
export const MEETING_DELETE = '/system/meeting/deleteMeeting'
export const MEETING_UPDATE = '/system/meeting/updateMeeting'
export const MEETING_CREATE = '/system/meeting/saveMeeting'
export const ISEXIT_LOCAL = '/system/meeting/isExitLocal'
export const MEETING_LIST_ALL = '/system/meeting/listAllMeeting'
export const UNIT_MEETING_LIST_ALL = '/system/meeting/listAllUnitMeeting'

// app授权
export const AUTHORIZE = '/system/appAuthorize/authorize'
export const AUTHORIZE_FIND ='/system/appAuthorize/findAuthorize'