/* eslint-disable */
export function serialize(obj: any) {
  let result = ''
  function serializeInternal(o: any, path: string) {
    for (const i in o) {
      const p: any = i
      const value = o[p]
      if (typeof value !== 'object') {
        if (typeof value === 'string') {
          result +=
            `\n${path}[${isNaN(p) ? `"${p}"` : p}] = ` + `"${value.replace(/\"/g, '\\"')}"` + `;`
        } else {
          result += `\n${path}[${isNaN(p) ? `"${p}"` : p}] = ${value};`
        }
      } else if (value instanceof Array) {
        result += `\n${path}[${isNaN(p) ? `"${p}"` : p}]` + `=` + `new Array();`
        serializeInternal(value, `${path}[${isNaN(p) ? `"${p}"` : p}]`)
      } else {
        result += `\n${path}[${isNaN(p) ? `"${p}"` : p}]` + `=` + `new Object();`
        serializeInternal(value, `${path}[${isNaN(p) ? `"${p}"` : p}]`)
      }
    }
  }
  serializeInternal(obj, 'obj')
  return result
}

export function deserialize(deserialization_lang: string, isArray?: boolean) {
  var obj = new Object()
  if(isArray){
    obj = new Array()
  }
  eval(deserialization_lang)
  return obj
}
