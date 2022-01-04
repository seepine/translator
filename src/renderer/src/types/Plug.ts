import { FieldRule } from '@arco-design/web-vue/es/form/interface'
import { AxiosInstance } from 'axios'

export type PlugColumn = {
  prop: string
  name: string
  type?: string
  placeholder?: string
  labelStyle?: object
  value?: any
  rules?: FieldRule | FieldRule[]
}

export type Context = {
  axios: AxiosInstance
  crypto: any
  crypto2: any
}

export type TranslateInput = {
  src: string
  from: string
  option: any
  to: string
}
export type TranslateOutput = {
  dst: string
  tts?: string | string[]
}

export type Plug = {
  name: string
  logo: string
  url?: string
  columns?: Array<PlugColumn>
  option?: any
  active?: boolean
  path?: string
  translate: (p_input: TranslateInput, p_context: Context) => Promise<TranslateOutput>
}
export type Plugs = {
  in: Array<Plug>
  extra: Array<Plug>
}
