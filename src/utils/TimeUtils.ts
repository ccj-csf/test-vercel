import dayjs from 'dayjs';

export class TimeUtils {
  /**
   * 获取当前的 Unix 时间戳（秒）
   * @returns {number} 当前 Unix 时间戳
   */
  static getCurrentUnixTimestamp(): number {
    return dayjs().unix();
  }

  /**
   * 获取当前的 ISO 8601 格式的时间字符串
   * @returns {string} 当前时间的 ISO 8601 字符串
   */
  static getCurrentISOString(): string {
    return dayjs().toISOString();
  }

  /**
   * 格式化时间为指定的格式
   * @param date {string | number | Date} 日期或时间戳
   * @param format {string} 目标格式
   * @returns {string} 格式化后的时间字符串
   */
  static formatDate(date: string | number | Date, format: string): string {
    return dayjs(date).format(format);
  }

  /**
   * 计算两个时间戳之间的差值（秒）
   * @param startTimestamp {number} 起始时间戳
   * @param endTimestamp {number} 结束时间戳
   * @returns {number} 时间差值（秒）
   */
  static calculateTimeDifference(startTimestamp: number, endTimestamp: number): number {
    return endTimestamp - startTimestamp;
  }

  /**
   * 判断给定的时间戳是否在今天
   * @param timestamp {number} 时间戳
   * @returns {boolean} 是否在今天
   */
  static isToday(timestamp: number): boolean {
    return dayjs().isSame(dayjs.unix(timestamp), 'day');
  }
}
