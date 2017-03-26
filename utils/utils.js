/**
 * 将unicode编码&#x8BED;&#x8A00;&#x53C2;&#x8003;&#x624B;&#x518C; 形式进行 unicode解码
 */
export function decode(str) {
  function _decode(strTmp) {
    return unescape(strTmp.replace(/&#x/g, '%u').replace(/;/g, '').replace(/%uA0/g, ' '));
  }
  if (!str) return ;
  if (typeof str === 'string')
    return _decode(str);

  if (Object.prototype.toString.call(str).slice(8, -1) === 'Array') {
    return str.map((item, index) => {
      return _decode(item);
    })
  }
}

// 将字符串 hash 化
export function hashStr(str) {
  if (!str) return ;
  var hash = 0,
    i, chr, len;
  if (str.length === 0) return hash;
  for (i = 0, len = str.length; i < len; i++) {
    chr = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

export function parseUrl(url) {
  if (!url) return;
  const patternUrl = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
  const urlPartArr = patternUrl.exec(url);
  return {
    scheme: urlPartArr[1],
    slash: urlPartArr[2],
    host: urlPartArr[3],
    port: urlPartArr[4],
    path: urlPartArr[5],
    query: urlPartArr[6],
    hash: urlPartArr[7],
  }
}