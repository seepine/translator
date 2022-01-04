import { Context, Plug, TranslateInput, TranslateOutput } from '../types/Plug'

const errDic: object = {
  52001: '请求超时，请重试',
  52002: '系统错误，请重试',
  52003: '未授权用户，请检查appid是否正确或者服务是否开通',
  54000: '必填参数为空，请检查是否少传参数',
  54001: '签名错误，请检查您的签名生成方法',
  54003: '访问频率受限，请降低您的调用频率，或进行身份认证后切换为高级版/尊享版',
  54004: '账户余额不足，请前往管理控制台为账户充值',
  54005: '长query请求频繁，请降低长query的发送频率，3s后再试',
  58000: '客户端IP非法，检查个人资料里填写的IP地址是否正确，可前往开发者信息-基本信息修改',
  58001: '译文语言方向不支持，检查译文语言是否在语言列表里',
  58002: '服务当前已关闭，请前往管理控制台开启服务',
  90107: '认证未通过或未生效，请前往我的认证查看认证进度'
}
let lastTime = new Date().getTime()

const plug: Plug = {
  name: '百度翻译',
  logo: 'data:image/png;base64,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',
  url: 'https://github.com/seepine/translater',
  columns: [
    {
      prop: 'appid',
      name: 'appid',
      rules: [
        {
          required: true,
          message: '请输入appid'
        },
        {
          maxLength: 30,
          message: 'appid长度过长'
        }
      ]
    },
    {
      prop: 'secret',
      name: '密钥',
      rules: [
        {
          required: true,
          message: '请输入appid'
        },
        {
          maxLength: 30,
          message: '密钥长度过长'
        }
      ]
    },
    {
      prop: 'isVip',
      name: '是否企业版',
      type: 'switch',
      value: false
    }
  ],
  translate: (input: TranslateInput, ctx: Context): Promise<TranslateOutput> => {
    return new Promise((RES, REJ) => {
      const salt = new Date().getTime()
      const request = () => {
        const str = `${input.option.appid}${input.src}${salt}${input.option.secret}`
        const sign = ctx.crypto.MD5(str).toString()
        lastTime = new Date().getTime()
        ctx.axios
          .get('http://api.fanyi.baidu.com/api/trans/vip/translate', {
            params: {
              q: input.src,
              appid: input.option.appid,
              salt,
              from: input.from,
              to: input.to,
              sign
            }
          })
          .then((res: any) => {
            if (res.status === 200) {
              if (res.data.to === input.to && res.data.trans_result) {
                let dst = ''
                for (let i = 0; i < res.data.trans_result.length; i += 1) {
                  dst += `${res.data.trans_result[i].dst}`
                  if (i < res.data.trans_result.length - 1) {
                    dst += '\n'
                  }
                }
                RES({
                  dst,
                  tts: res.data.trans_result.map((item: any) => item.dst_tts)
                })
              } else if (res.data.error_code) {
                REJ(
                  Error(
                    // @ts-ignore
                    errDic[res.data.error_code] ? errDic[res.data.error_code] : res.data.error_msg
                  )
                )
              } else {
                REJ(Error(JSON.stringify(res.data)))
              }
            } else {
              REJ(Error('未知错误'))
            }
          })
          .catch((err) => {
            REJ(err)
          })
          .finally(() => {
            lastTime = new Date().getTime()
          })
      }
      if (input.option.isVip !== true) {
        const diff = salt - lastTime
        if (diff < 1000) {
          setTimeout(request, 1000 - diff)
          return
        }
      }
      request()
    })
  }
}
export default plug
