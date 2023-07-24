/**
 * 此方法不是判断js假值
 * NaN, "", {}, [], undefined, null为空值 => true
 * @param {*} v
 */
export const isEmpty = (v) => {
  const type = typeof v
  switch (type) {
    case 'undefined':
      return true
    case 'function':
      return false
    case 'boolean':
      return false
    case 'string':
      return !v.trim().length
    case 'object':
      if (v === null) {
        return true
      }
      if (v.length === 0) {
        return true
      }
      for (let p in v) {
        return false
      }
      return true
    case 'number':
      return isNaN(v)
    case 'symbol':
      return false
    default:
      return false
  }
}
