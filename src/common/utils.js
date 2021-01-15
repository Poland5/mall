// 防抖动操作
export function debounce(func, delay) {
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

/**
 * 时间格式化
 * @param {*} date = Fri Aug 31 2018 14:34:32 GMT+0800
 * @param {*} fmt = 'yyyy-MM-dd'
 * @return 2018-08-31
 */
export function formatDate(date, fmt) {
  /**
   * 匹配年份
   * fmt = 2018-MM-dd
   */
  if (/(y+)/.test(fmt)) {
    /**
     * 注意：substr这里的作用
     * 根据参数"y"传入的个数决定年份展示格式
     * 2021
     * yy -> 21
     * yyyy -> 2021
     */
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));

  }

  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };

  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

/**
匹配补位
MM -> 8 -> 08 如果写两个MM而获取月份是“个数”就前面“+0”补位
*/
function padLeftZero(str) {
  return ('00' + str).substr(str.length);
};

