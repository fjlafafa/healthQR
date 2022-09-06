export function checkIdentityNumber(identityNumber: string): boolean {
  if (!checkLength18(identityNumber)) return false;
  const zipCode = identityNumber.slice(0, 6);
  const birthday = identityNumber.slice(6, 14);
  const orderCode = identityNumber.slice(14, 17);
  return (
    checkZipCode(zipCode) &&
    checkBirthday(birthday) &&
    checkOrderCode(orderCode) &&
    checkCheckCode(identityNumber)
  );
}

export function isNumber(str: string): boolean {
  if (str.trim() === "") return false;
  return !Number.isNaN(Number(str));
}

export function checkLength(string: string, length: number): boolean {
  return string.length == length;
}

function checkLength18(identityNumber: string): boolean {
  return checkLength(identityNumber, 18);
}

function checkZipCode(zipCode: string): boolean {
  const zipCodeFormat =
    /^(([1][1-5])|([2][1-3])|([3][1-7])|([4][1-6])|([5][0-4])|([6][1-5])|([7][1])|([8][1-2]))\d{4}$/;
  return zipCodeFormat.test(zipCode);
}

function checkBirthday(birthday: string): boolean {
  if (!isNumber(birthday)) return false;
  const year = birthday.slice(0, 4);
  const month = birthday.slice(4, 6);
  const day = birthday.slice(6, 8);
  const dateString = [year, month, day].join("-");
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return false;
  if (date > new Date()) return false;
  return true;
}

function checkOrderCode(orderCode: string): boolean {
  return isNumber(orderCode);
}

function checkCheckCode(identityNumber: string): boolean {
  const numbers = identityNumber.split("");
  const checkCode = numbers[17];
  const checkCodeFormat = /^[0-9xX]$/;
  if (!checkCodeFormat.test(checkCode)) return false;
  const weight = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]; //系数
  const lookUpMap = ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"]; //校验码对照表
  let sum = 0;
  for (let k = 0; k < 17; k++) {
    sum += parseInt(numbers[k]) * weight[k];
  }
  if (checkCode.toUpperCase() != lookUpMap[sum % 11].toUpperCase())
    return false;
  return true;
}
