function isAllChinese(str: string) {
    return /^[\u4E00-\u9FA5]+$/.test(str)
}

export function checkRealName(realName: string): boolean {
    return isAllChinese(realName) && realName.length >= 2 && realName.length <= 6
}