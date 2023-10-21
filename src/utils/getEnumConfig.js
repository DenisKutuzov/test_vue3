import { driverRikStatusEnum } from '@/enums/DriverPropsEnums'

export const getRikDriverStatusConfig = (status) => {
  const findResult = driverRikStatusEnum.find(conf => conf.val === status)
  if (!findResult) return driverRikStatusEnum.find(conf => conf.id === 5)
  return findResult
}
