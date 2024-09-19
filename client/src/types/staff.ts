import { BaseResponse, Meta } from '@/types/common'

// same with the attribute on responses
export interface Staff {
  type: string
  id: string
  staffId: string
  firstName: string
  lastName: string
  fullName: string
  email: string
  password: string
}

export type StaffBrowseRequest = {
  page: number
  pageSize: number
}

export type StaffBrowseResponse = BaseResponse<Staff>
export type StaffDetailResponse = BaseResponse<Staff>
