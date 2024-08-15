export const formatNumberWithCommas = (number: number = 0) => {
  // 将数字转为字符串
  const numString = number.toString();
  const [intString, pointString] = numString.split('.') || [];

  // 使用正则表达式在数字中插入逗号
  return intString.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  // return `${intString.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}${pointString ? `.${pointString}` : ''}`;
};

export const formatNumberToK = (number: number = 0) => {
  if (number >= 1000) {
    const result = (number / 1000).toFixed(2);
    let withoutDecimal = result.replace(/0+$/, ''); // 去掉小数部分末尾的零
    if (withoutDecimal.endsWith('.')) {
      withoutDecimal = withoutDecimal.substring(0, withoutDecimal.length - 1);
    }
    return withoutDecimal + 'k';
  }
  return number.toString();
};

export const formatAddress = (address: string) => {
  return `${address.slice(0, 3)}...${address.slice(-3)}`;
};

export const formatPadZero = (number: number, decimal = 2) => {
  return String(number).padStart(decimal, '0');
};
