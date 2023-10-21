import { MessageBox } from 'element-ui'

export default (done) => {
  return MessageBox('Вы учерены что хотите закрыть диалог?')
    .then(_ => {
      done()
    })
    .catch(_ => {})
}
