/**
 * RegexUtils 是一个提供正则表达式相关实用方法的静态类。
 */
export class RegexUtils {
  static emailRegex =
    /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
  /**
   * 验证一个字符串是否是有效的电子邮件地址。
   * @param name 待验证的字符串。
   * @returns 返回一个布尔值，表示电子邮件地址是否有效。
   */
  static isValidEmail(name: string): boolean {
    // 使用正则表达式对字符串进行测试
    return RegexUtils.emailRegex.test(name);
  }
}
