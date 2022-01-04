import { Context, Plug, TranslateInput, TranslateOutput } from '../types/Plug'
import baidu from './baidu'

// TODO 开发环境去掉了明文避免密钥泄漏，若调试需要请换成自己的appid和密钥
const appid = ''
const secret = ''
const plug: Plug = {
  name: '百度翻译试用版',
  logo: baidu.logo,
  translate: (input: TranslateInput, ctx: Context): Promise<TranslateOutput> => {
    return baidu.translate(
      {
        ...input,
        option: {
          appid,
          secret,
          isVip: false
        }
      },
      ctx
    )
  }
}
export default plug
