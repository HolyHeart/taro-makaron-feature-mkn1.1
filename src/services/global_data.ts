// 全局对象 单例

interface GlobalProps {
  name: string,
}

class GlobalObj implements GlobalProps {
  name: string;
  columnList = []
  constructor (name) {
    this.name = name
  }
}

export const createGlobalObj = (name:string) => {
  return new GlobalObj(name)
}

const globalData = createGlobalObj('global object')
export default globalData