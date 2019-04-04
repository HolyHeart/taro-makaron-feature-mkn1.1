// 全局对象 单例

interface GlobalProps {
  name: string,
  choosedImage: string,
  userInfo: object,
  columnList: Array<object>,
  themeId: string,
  themeData: any,
  separateResult: object,
}

class GlobalObj implements GlobalProps {
  name: string;
  choosedImage = ''
  userInfo = {}
  columnList = []
  themeId = ''
  themeData = null
  separateResult = {}
  constructor (name) {
    this.name = name
  }
}

export const createGlobalObj = (name:string) => {
  return new GlobalObj(name)
}

const globalData = createGlobalObj('global object')
export default globalData