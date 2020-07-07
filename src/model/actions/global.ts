import { SYSTEM, SCENELIST } from '../constants/global'

export const getSystemInfo = (data) => {
  return {
    type: SYSTEM,
    data,
  }
}

export const setSceneList = (data) => {
  return {
    type: SCENELIST,
    data,
  }
}
