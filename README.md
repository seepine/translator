# translator

![image.png](https://s2.loli.net/2022/01/04/rPGu5F8lT3mRxDa.png)

## 一、介绍

translator 默认自带了百度翻译试用版，可以直接使用，无需额外配置

`alt+a`快捷键可唤出界面，翻译后`ctrl+v`可快速复制翻译结果

因试用版是使用我的秘钥共享给大家使用，随着使用人数增多，将会导致总额度或每秒并发请求数达到限制，出现翻译失败甚至无法使用的情况，因此推荐大家自行申请密钥，虽然略显繁琐，但只需要申请一次即可享受独享的翻译服务，体验比试用版更好。

## 二、添加私人密钥

点击左上角设置按钮切换到设置界面，点击第二栏的**翻译服务**，点击添加服务，选择百度翻译，填入自行申请的私人`appid`和`密钥`即可，若你的账号是企业版或付费版，可勾选上，未勾选企业版时，请求翻译时将会自动判断是否达到 1 秒并发，提高翻译成功率。

![image.png](https://s2.loli.net/2022/01/04/qMzFr7Hd3kjKVm1.png)

## 三、制作插件

同时因目前只内置了百度翻译接口，若想使用其他服务的话，需要自行制作插件接入你需要的服务商，此方法需要一定的编码能力，也可以使用他人写好的插件，后续会开发插件市场，大家一键安装他人写的插件即可。

### 1.编写插件

在用户缓存目录添加插件文件夹和 js 程序，例如在windows系统下的
`C:\Users\seepine\AppData\Roaming\translator\plugs\youdao\index.js`
，其中 plugs 目录需要自己新建，youdao 则是插件名，重点在于 index.js 文件，插件展示名和 logo、逻辑等在此文件编写，下述以百度翻译为例讲解插件如何编写

```js
const plug = {
  // 插件展示名，例如下名
  name: '百度翻译2',
  // 插件logo，可用网络图片或base64，logo尺寸尽量不超过50x50
  logo: 'https://s2.loli.net/2022/01/02/vzYPtd57xfckFRs.png',
  // 添加插件时需要填写的表单，
  // prop为字段名，
  // name表单展示内容，
  // rules可配置校验规则，
  // type指定表单类型，默认input即输入框支持switch/number/textarea/select等等...
  // value可指定默认值
  // 更多支持参数查看crco文档
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
      prop: 'isPlus',
      name: '是否企业版',
      type: 'switch',
      value: false
    }
  ],
  // 翻译逻辑，需返回Promise对象
  // input结构如下
  // input.src，要翻译的内容
  // input.from，翻译语言，zh或en
  // input.to，一般为auto
  // input.option，添加服务时输入的内容，例如input.option.appid、input.option.secret等，具体有哪些参数取决于上述columns配置的prop
  // ctx结构如下
  // ctx.axios，发起网络请求用，实例为axios，方便请求接口
  // ctx.crypto，加解密用，实例为crypto-js，方便加密无需再安装依赖
  translate: (input, ctx) => {
    return new Promise((RES, REJ) => {
      const salt = new Date().getTime()
      const sign = ctx.crypto
        .MD5(`${input.option.appid}${input.src}${salt}${input.option.secret}`)
        .toString()
      ctx
        .axios({
          url: 'http://api.fanyi.baidu.com/api/trans/vip/translate',
          params: {
            q: input.src,
            appid: input.option.appid,
            salt,
            from: input.from,
            to: input.to,
            sign
          }
        })
        .then((res) => {
          if (res.status === 200) {
            if (res.data.to === input.to && res.data.trans_result) {
              // 返回翻译结果dst和语音tts(目前tts未用到，可先返回将来支持语音播放后无需再改插件)
              RES({
                dst: res.data.trans_result[0].dst,
                tts: res.data.trans_result[0].dst_tts
              })
            } else if (res.data.error_code) {
              REJ(Error(res.data.error_msg))
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
    })
  }
}
module.exports = plug
```

### 2.插件使用

重启程序后到设置页面添加服务，即可看到自己编写的插件
![image.png](https://s2.loli.net/2022/01/04/yaV6nwkUfvrEz5A.png)
