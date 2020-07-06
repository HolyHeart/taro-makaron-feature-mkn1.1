import { SYSTEM, SCENELIST } from '../constants/global'

const INITIAL_STATE = {
  system: {
    statusBarHeight: 20,
    isIphoneX: false,
    // screenHeight: 667,
    windowHeight: 667,
  },
  sceneList: [
    {
      sceneId: '392438488064331776',
      sceneName: '油画-盛开杏花',
      boxUrl:'https://static01.versa-ai.com/upload/a606d3115987/98e6b329-7b25-40cb-934d-e9812617d322.png',
      exampleUrl:'https://static01.versa-ai.com/upload/7172c425f570/9912fad8-bfab-4a15-8014-9c98d8ab2e43.png',
      bgUrl:
        'https://static01.versa-ai.com/upload/6eef8db51499/c0df4ab7-52ed-4742-82e0-5e43b12bb425.png',
      thumbnailUrl:
        'https://static01.versa-ai.com/upload/2ec5941c0a21/076f2e08-5a69-4e53-8095-aae72a72cb4c.jpg',
      filterUrl: '',
      sceneConfig:
        '{"filter":{"imageUrls":[],"position":{"axis":"x","size":1}},"music":{"fileUrl":""},"fuse":{"support":false},"watermark":false,"position":{"place":"6","xAxis":{"derection":"left","offset":0.5},"yAxis":{"derection":"top","offset":0.5}},"size":{"default":"0.7","zoomInMax":1,"zoomOutMin":1},"rotate":0,"text":{"support":false,"defaultText":"","zIndex":1,"bgColor":"","textColor":"","fontSize":15,"bottom":10},"cover":{"support":true,"list":[{"id":1584540623141,"imageUrl":"https://static01.versa-ai.com/upload/930ca3bc2c12/4721854d-bf68-4dca-9892-8f47576584a5.png","zIndex":3,"fixed":true,"isActive":false,"size":{"default":1,"zoomInMax":1,"zoomOutMin":1},"rotate":0,"position":{"place":"10","xAxis":{"derection":"left","offset":0.5},"yAxis":{"derection":"top","offset":0.5}}}]}}',
      segmentType: 0,
      bgZIndex: 0.0,
      segmentZIndex: 2.0,
      sceneType: 0,
      index: 0
    },
    {
      sceneId: '392439168623710208',
      sceneName: '油画-花园小路',
      boxUrl:'https://static01.versa-ai.com/upload/efc91c9f0499/588410ee-9e18-46da-a39d-b69fba5cd6bc.png',
      exampleUrl:'https://static01.versa-ai.com/upload/50bcea0f761a/226d1817-979a-4fac-8588-f7e2fa751ec4.png',
      bgUrl:
        'https://static01.versa-ai.com/upload/fb218452ab60/ab428f2e-6fa5-4c3f-aacb-0a9797f6fe41.png',
      thumbnailUrl:
        'https://static01.versa-ai.com/upload/e1145a1eddca/048e6d3a-ac6a-48d5-bbbf-dc59933125fd.jpg',
      filterUrl: '',
      sceneConfig:
        '{"filter":{"imageUrls":[],"position":{"axis":"x","size":1}},"music":{"fileUrl":""},"fuse":{"support":false},"watermark":false,"position":{"place":"6","xAxis":{"derection":"left","offset":0.5},"yAxis":{"derection":"top","offset":0.5}},"size":{"default":"0.7","zoomInMax":1,"zoomOutMin":1},"rotate":0,"text":{"support":false,"defaultText":"","zIndex":1,"bgColor":"","textColor":"","fontSize":15,"bottom":10},"cover":{"support":true,"list":[{"id":1584540787583,"imageUrl":"https://static01.versa-ai.com/upload/44dba1fc2256/8b084ec2-b72e-440d-9503-9caa2b6bf532.png","zIndex":3,"fixed":true,"isActive":false,"size":{"default":1,"zoomInMax":1,"zoomOutMin":1},"rotate":0,"position":{"place":"10","xAxis":{"derection":"left","offset":0.5},"yAxis":{"derection":"top","offset":0.5}}}]}}',
      segmentType: 0,
      bgZIndex: 0.0,
      segmentZIndex: 2.0,
      sceneType: 0,
      index: 1
    },
    {
      sceneId: '392439445053509632',
      sceneName: '油画-花簇',
      boxUrl:'https://static01.versa-ai.com/upload/d9e00ce76b1b/354d9087-c8c6-406b-a9ac-2b11ad5f7d2b.png'
      exampleUrl:'https://static01.versa-ai.com/upload/ccdbed6e2101/13e95f1c-aef5-4d4c-ae4c-e0b6da4f3c18.png',
      bgUrl:
        'https://static01.versa-ai.com/upload/ba7d5855f64f/c527d391-7871-4e50-b921-b6b2776d32fe.png',
      thumbnailUrl:
        'https://static01.versa-ai.com/upload/db9d54ffac09/e837a0bc-0295-4072-960c-ca8c915e8af2.jpg',
      filterUrl: '',
      sceneConfig:
        '{"filter":{"imageUrls":[],"position":{"axis":"x","size":1}},"music":{"fileUrl":""},"fuse":{"support":false},"watermark":false,"position":{"place":"6","xAxis":{"derection":"left","offset":0.5},"yAxis":{"derection":"top","offset":0.5}},"size":{"default":"0.7","zoomInMax":1,"zoomOutMin":1},"rotate":0,"text":{"support":false,"defaultText":"","zIndex":1,"bgColor":"","textColor":"","fontSize":15,"bottom":10},"cover":{"support":true,"list":[{"id":1584540852727,"imageUrl":"https://static01.versa-ai.com/upload/d95e22f1fa3b/b7b9db70-f94c-4d02-a444-ac830698a74b.png","zIndex":3,"fixed":true,"isActive":false,"size":{"default":1,"zoomInMax":1,"zoomOutMin":1},"rotate":0,"position":{"place":"10","xAxis":{"derection":"left","offset":0.5},"yAxis":{"derection":"top","offset":0.5}}}]}}',
      segmentType: 0,
      bgZIndex: 0.0,
      segmentZIndex: 2.0,
      sceneType: 0,
      index: 2
    },
    {
      sceneId: '392439715867140096',
      sceneName: '油画-湖畔',
      boxUrl:'https://static01.versa-ai.com/upload/cb05d18f2638/0790a5e6-d57a-4cc4-b9ed-60121efd0d5f.png',
      exampleUrl:'https://static01.versa-ai.com/upload/2755acdf8317/79b5e1b8-464f-4210-a3ca-9a601080deea.png',
      bgUrl:
        'https://static01.versa-ai.com/upload/9137dd556acf/d83ca599-6884-474f-8c04-24ba10e22490.png',
      thumbnailUrl:
        'https://static01.versa-ai.com/upload/fc5c99c5f7ff/4978d76e-5e68-4239-9bd2-9ad82d70c33f.jpg',
      filterUrl: '',
      sceneConfig:
        '{"filter":{"imageUrls":[],"position":{"axis":"x","size":1}},"music":{"fileUrl":""},"fuse":{"support":false},"watermark":false,"position":{"place":"6","xAxis":{"derection":"left","offset":0.5},"yAxis":{"derection":"top","offset":0.5}},"size":{"default":"0.7","zoomInMax":1,"zoomOutMin":1},"rotate":0,"text":{"support":false,"defaultText":"","zIndex":1,"bgColor":"","textColor":"","fontSize":15,"bottom":10},"cover":{"support":true,"list":[{"id":1584540917921,"imageUrl":"https://static01.versa-ai.com/upload/92921a7cd085/dfc0cfcf-1b13-4754-9095-555a53b04461.png","zIndex":3,"fixed":true,"isActive":false,"size":{"default":1,"zoomInMax":1,"zoomOutMin":1},"rotate":0,"position":{"place":"10","xAxis":{"derection":"left","offset":0.5},"yAxis":{"derection":"top","offset":0.5}}}]}}',
      segmentType: 0,
      bgZIndex: 0.0,
      segmentZIndex: 2.0,
      sceneType: 0,
      index: 3
    },
    // {
    //   sceneId: '392438100435144704',
    //   sceneName: '油画-雪山湖泊',
    //   bgUrl:
    //     'https://static01.versa-ai.com/upload/9b7f5b73a84d/d1313539-5048-4fe2-bbcd-b3e08f3f10ac.jpg',
    //   thumbnailUrl:
    //     'https://static01.versa-ai.com/upload/bb6bfabc0e06/26fb2efb-45a9-49da-b937-71b54d862011.jpg',
    //   filterUrl: '',
    //   sceneConfig:
    //     '{"filter":{"imageUrls":[],"position":{"axis":"x","size":1}},"music":{"fileUrl":""},"fuse":{"support":false},"watermark":false,"position":{"place":"10","xAxis":{"derection":"left","offset":0.5},"yAxis":{"derection":"top","offset":0.5}},"size":{"default":"0.7","zoomInMax":1,"zoomOutMin":1},"rotate":0,"text":{"support":false,"defaultText":"","zIndex":1,"bgColor":"","textColor":"","fontSize":15,"bottom":10},"cover":{"support":true,"list":[{"id":1584540532448,"imageUrl":"https://static01.versa-ai.com/upload/5fc50fc7013d/9ad78040-c815-4be1-9a22-a6609a89597a.png","zIndex":3,"fixed":true,"isActive":false,"size":{"default":1,"zoomInMax":1,"zoomOutMin":1},"rotate":0,"position":{"place":"10","xAxis":{"derection":"left","offset":0.5},"yAxis":{"derection":"top","offset":0.5}}}]}}',
    //   segmentType: 0,
    //   bgZIndex: 0.0,
    //   segmentZIndex: 2.0,
    //   sceneType: 0,
    // },
  ],
}

export default function setGlobal(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SYSTEM:
      return {
        ...state,
        system: { ...state.system, ...action.data },
      }
    case SCENELIST:
      return {
        ...state,
        sceneList: action.data,
      }
    default:
      return state
  }
}
