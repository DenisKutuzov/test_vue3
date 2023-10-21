import { DEFAULT_DURATION, LONG_DURATION } from '@/constants/durations'
import { ErrorMessagesTypes } from '@/enums/ErrorMessagesTypes'
import { Message } from 'element-ui'
const defaultError = 'Произошла ошибка'

export const showDefaultErrorMessage = () => {
  return showErrorMessage(defaultError)
}

export const showSuccessMessage = (message) => Message({
  message,
  type: 'success',
  duration: DEFAULT_DURATION
})

export const showErrorMessage = (
  message = defaultError,
  duration = DEFAULT_DURATION) => {
  return Message({
    message: message,
    type: 'error',
    duration: duration
  })
}

export const errorResponseMessage = (responseData) => {
  try {
    const message = responseData.message
    console.log(message)
    const car = responseData?.data?.car || {}
    const exceptions = convertStringToArray(responseData?.data?.exception) || []
    const groupToErrorResponse = {
      [ErrorMessagesTypes.scheduleDriver]: {
        text: car.number ? `Водитель уже стоит в расписании за ${car.number}` : exceptions[0],
        duration: LONG_DURATION
      },
      [ErrorMessagesTypes.scheduleContractDriver]: {
        text: exceptions[0] || defaultError
      },
      [ErrorMessagesTypes.scheduleCreateContract]: {
        text: exceptions[1] || defaultError
      },
      [ErrorMessagesTypes.scheduleBindDriver]: {
        text: ErrorMessagesTypes.scheduleBindDriver
      },
      [ErrorMessagesTypes.scheduleUnbindDriver]: {
        text: ErrorMessagesTypes.scheduleUnbindDriver
      }
    }
    if (!groupToErrorResponse[message]?.text) {
      return showErrorMessage(message, LONG_DURATION)
    }
    showErrorMessage(groupToErrorResponse[message].text, groupToErrorResponse[message].duration)
  } catch (e) {
    return Promise.reject(e)
  }
}
const convertStringToArray = (sentence) => {
  return sentence ? sentence.replace(/["'[\]]/g, '').split(', ') : []
}
