/**
 * Sanitize UTF-8 string to remove all control characters and invalid code points.
 * @param str
 */
export const sanitizeUTF8 = (str: string) => {
  // 移除替换字符 (0xFFFD) 和其他非法字符
  return Array.from(str)
    .filter((char) => {
      // 移除 Unicode 替换字符
      if (char === '�') return false;

      const code = char.codePointAt(0)!;

      // 移除控制字符
      if (
        (code >= 0x00 && code <= 0x08) ||
        code === 0x0b ||
        code === 0x0c ||
        (code >= 0x0e && code <= 0x1f) ||
        (code >= 0x7f && code <= 0x9f)
      )
        return false;

      // 移除未配对的代理项码点
      if (code >= 0xd800 && code <= 0xdfff) return false;

      return true;
    })
    .join('');
};
