import {
  SYSTEM,
  SCENELIST
} from '../constants/global'

const INITIAL_STATE = {
  system: {
    statusBarHeight: 20,
    isIphoneX: false,
    // screenHeight: 667,
    windowHeight: 667,
  },
  sceneList: [{
      sceneId: '392438488064331776',
      sceneName: '卡1',
      card1:'https://static01.versa-ai.com/upload/2c7d654de708/730a7f8a-4795-444c-baed-6857346a51ab.card_03',
      boxUrl: 'https://static01.versa-ai.com/upload/a606d3115987/98e6b329-7b25-40cb-934d-e9812617d322.png',
      exampleUrl: 'https://static01.versa-ai.com/upload/7172c425f570/9912fad8-bfab-4a15-8014-9c98d8ab2e43.png',
      bgUrl: 'https://static01.versa-ai.com/upload/6eef8db51499/c0df4ab7-52ed-4742-82e0-5e43b12bb425.png',
      thumbnailUrl: 'https://static01.versa-ai.com/upload/2ec5941c0a21/076f2e08-5a69-4e53-8095-aae72a72cb4c.jpg',
      filterUrl: '',
      sceneConfig: {
        "filter": {
          "imageUrls": [],
          "position": {
            "axis": "x",
            "size": 1
          }
        },
        "music": {
          "fileUrl": ""
        },
        "fuse": {
          "support": false
        },
        "watermark": false,
        "position": {
          "place": "6",
          "xAxis": {
            "derection": "left",
            "offset": 0.5
          },
          "yAxis": {
            "derection": "top",
            "offset": 0.5
          }
        },
        "size": {
          "default": "0.7",
          "zoomInMax": 1,
          "zoomOutMin": 1
        },
        "rotate": 0,
        "text": {
          "support": false,
          "defaultText": "",
          "zIndex": 1,
          "bgColor": "",
          "textColor": "",
          "fontSize": 15,
          "bottom": 10
        },
        "cover": {
          "support": true,
          "list": [
            {
              "id": 1584540623143,
              type: 'bankLogo',
              "imageUrl": "https://static01.versa-ai.com/upload/4a72479c5a83/298bd350-21ff-4e39-9189-25967ad4cb94.png",
              "zIndex": 3,
              "fixed": true,
              "isActive": false,
              "size": {
                "default": 1,
                "zoomInMax": 1,
                "zoomOutMin": 1
              },
              "rotate": 0,
              "position": {
                "place": "10",
                "xAxis": {
                  "derection": "left",
                  "offset": 0.5
                },
                "yAxis": {
                  "derection": "top",
                  "offset": 0.5
                }
              },
              visible: false,
              deleted: true,
              width: 300
            },
            {
              "id": 15845406231464,
              type: 'myLogo',
              "imageUrl": "https://static01.versa-ai.com/upload/ce29be05e80a/947c8a95-62b1-4eef-8db4-9b22d3561620.png",
              "zIndex": 3,
              "fixed": true,
              "isActive": false,
              "size": {
                "default": 1,
                "zoomInMax": 1,
                "zoomOutMin": 1
              },
              "rotate": 0,
              "position": {
                "place": "10",
                "xAxis": {
                  "derection": "left",
                  "offset": 0.5
                },
                "yAxis": {
                  "derection": "top",
                  "offset": 0.5
                }
              },
              visible: false,
              deleted: true
            }
          ]
        }
      },
      segmentType: 0,
      bgZIndex: 0.0,
      segmentZIndex: 2.0,
      sceneType: 0,
      index: 0
    },
    {
      sceneId: '392439168623710208',
      sceneName: '卡2',
      card1: 'https://static01.versa-ai.com/upload/506854e1f208/93ada06e-3c17-4d94-b390-0b58358c7a5e.png',
      boxUrl: 'https://static01.versa-ai.com/upload/efc91c9f0499/588410ee-9e18-46da-a39d-b69fba5cd6bc.png',
      exampleUrl: 'https://static01.versa-ai.com/upload/50bcea0f761a/226d1817-979a-4fac-8588-f7e2fa751ec4.png',
      bgUrl: 'https://static01.versa-ai.com/upload/fb218452ab60/ab428f2e-6fa5-4c3f-aacb-0a9797f6fe41.png',
      thumbnailUrl: 'https://static01.versa-ai.com/upload/e1145a1eddca/048e6d3a-ac6a-48d5-bbbf-dc59933125fd.jpg',
      filterUrl: '',
      sceneConfig: {
        "filter": {
          "imageUrls": [],
          "position": {
            "axis": "x",
            "size": 1
          }
        },
        "music": {
          "fileUrl": ""
        },
        "fuse": {
          "support": false
        },
        "watermark": false,
        "position": {
          "place": "6",
          "xAxis": {
            "derection": "left",
            "offset": 0.5
          },
          "yAxis": {
            "derection": "top",
            "offset": 0.5
          }
        },
        "size": {
          "default": "0.7",
          "zoomInMax": 1,
          "zoomOutMin": 1
        },
        "rotate": 0,
        "text": {
          "support": false,
          "defaultText": "",
          "zIndex": 1,
          "bgColor": "",
          "textColor": "",
          "fontSize": 15,
          "bottom": 10
        },
        "cover": {
          "support": true,
          "list": [
            {
              "id": 1584540623143,
              type: 'bankLogo',
              "imageUrl": "https://static01.versa-ai.com/upload/4a72479c5a83/298bd350-21ff-4e39-9189-25967ad4cb94.png",
              "zIndex": 3,
              "fixed": true,
              "isActive": false,
              "size": {
                "default": 1,
                "zoomInMax": 1,
                "zoomOutMin": 1
              },
              "rotate": 0,
              "position": {
                "place": "10",
                "xAxis": {
                  "derection": "left",
                  "offset": 0.5
                },
                "yAxis": {
                  "derection": "top",
                  "offset": 0.5
                }
              },
              visible: false,
              deleted: true,
              width: 300
            },
            {
              "id": 1584540623146,
              type: 'myLogo',
              "imageUrl": "https://static01.versa-ai.com/upload/ce29be05e80a/947c8a95-62b1-4eef-8db4-9b22d3561620.png",
              "zIndex": 3,
              "fixed": true,
              "isActive": false,
              "size": {
                "default": 1,
                "zoomInMax": 1,
                "zoomOutMin": 1
              },
              "rotate": 0,
              "position": {
                "place": "10",
                "xAxis": {
                  "derection": "left",
                  "offset": 0.5
                },
                "yAxis": {
                  "derection": "top",
                  "offset": 0.5
                }
              },
              visible: false,
              deleted: true,
              width: 300
            }
          ]
        }
      },
      segmentType: 0,
      bgZIndex: 0.0,
      segmentZIndex: 2.0,
      sceneType: 0,
      index: 1
    },
    {
      sceneId: '392439445053509632',
      sceneName: '卡3',
      card1: 'https://static01.versa-ai.com/upload/4c6f9c91eb3d/e9d71aa5-c88d-4eb7-9e65-c74ebcfb7181.card_04',
      boxUrl: 'https://static01.versa-ai.com/upload/d9e00ce76b1b/354d9087-c8c6-406b-a9ac-2b11ad5f7d2b.png',
      exampleUrl: 'https://static01.versa-ai.com/upload/ccdbed6e2101/13e95f1c-aef5-4d4c-ae4c-e0b6da4f3c18.png',
      bgUrl: 'https://static01.versa-ai.com/upload/9137dd556acf/d83ca599-6884-474f-8c04-24ba10e22490.png',
      thumbnailUrl: 'https://static01.versa-ai.com/upload/db9d54ffac09/e837a0bc-0295-4072-960c-ca8c915e8af2.jpg',
      filterUrl: '',
      sceneConfig: {
        "filter": {
          "imageUrls": [],
          "position": {
            "axis": "x",
            "size": 1
          }
        },
        "music": {
          "fileUrl": ""
        },
        "fuse": {
          "support": false
        },
        "watermark": false,
        "position": {
          "place": "6",
          "xAxis": {
            "derection": "left",
            "offset": 0.5
          },
          "yAxis": {
            "derection": "top",
            "offset": 0.5
          }
        },
        "size": {
          "default": "0.7",
          "zoomInMax": 1,
          "zoomOutMin": 1
        },
        "rotate": 0,
        "text": {
          "support": false,
          "defaultText": "",
          "zIndex": 1,
          "bgColor": "",
          "textColor": "",
          "fontSize": 15,
          "bottom": 10
        },
        "cover": {
          "support": true,
          "list": [
            {
              "id": 1584540917922,
              type: 'normal',
              "imageUrl": "https://static01.versa-ai.com/upload/43527d78b19a/b6bd79e5-036f-4874-a9d0-d5fda35ba684.png",
              "zIndex": 6,
              "fixed": true,
              "isActive": false,
              "size": {
                "default": 1,
                "zoomInMax": 1,
                "zoomOutMin": 1
              },
              "rotate": 0,
              "position": {
                "place": "10",
                "xAxis": {
                  "derection": "left",
                  "offset": 0.5
                },
                "yAxis": {
                  "derection": "top",
                  "offset": 0.5
                }
              },
              visible: true,
              show: true,
            },
            {
              "id": 1584540623143,
              type: 'bankLogo'
              "imageUrl": "https://static01.versa-ai.com/upload/4a72479c5a83/298bd350-21ff-4e39-9189-25967ad4cb94.png",
              "zIndex": 3,
              "fixed": true,
              "isActive": false,
              "size": {
                "default": 1,
                "zoomInMax": 1,
                "zoomOutMin": 1
              },
              "rotate": 0,
              "position": {
                "place": "10",
                "xAxis": {
                  "derection": "left",
                  "offset": 0.5
                },
                "yAxis": {
                  "derection": "top",
                  "offset": 0.5
                }
              },
              visible: false,
              deleted: true,
            },
            {
              "id": 1584540623146,
              type: 'myLogo',
              "imageUrl": "https://static01.versa-ai.com/upload/ce29be05e80a/947c8a95-62b1-4eef-8db4-9b22d3561620.png",
              "zIndex": 3,
              "fixed": true,
              "isActive": false,
              "size": {
                "default": 1,
                "zoomInMax": 1,
                "zoomOutMin": 1
              },
              "rotate": 0,
              "position": {
                "place": "10",
                "xAxis": {
                  "derection": "left",
                  "offset": 0.5
                },
                "yAxis": {
                  "derection": "top",
                  "offset": 0.5
                }
              },
              visible: false,
              deleted: true,
            }
          ]
        }
      },
      segmentType: 0,
      bgZIndex: 0.0,
      segmentZIndex: 2.0,
      sceneType: 0,
      index: 2
    },
    {
      sceneId: '392439715867140096',
      sceneName: '卡4',
      card1: 'https://static01.versa-ai.com/upload/1a718d7cf2b3/cff82f57-6840-49be-a34d-6467c3bab5d4.card_02',
      boxUrl: 'https://static01.versa-ai.com/upload/cb05d18f2638/0790a5e6-d57a-4cc4-b9ed-60121efd0d5f.png',
      exampleUrl: 'https://static01.versa-ai.com/upload/2755acdf8317/79b5e1b8-464f-4210-a3ca-9a601080deea.png',
      bgUrl: 'https://static01.versa-ai.com/upload/ba7d5855f64f/c527d391-7871-4e50-b921-b6b2776d32fe.png',
      thumbnailUrl: 'https://static01.versa-ai.com/upload/fc5c99c5f7ff/4978d76e-5e68-4239-9bd2-9ad82d70c33f.jpg',
      filterUrl: '',
      cover: [{
          fixed: true,
          id: 1584540917921,
          imageUrl: "https://static01.versa-ai.com/upload/92921a7cd085/dfc0cfcf-1b13-4754-9095-555a53b04461.png",
          isActive: false,
          position: {
            place: "10",
            xAxis: {
              derection: "left",
              offset: 0.5
            },
            yAxis: {
              derection: "top",
              offset: 0.5
            }
          },
          size: {
            default: 1,
            zoomInMax: 1,
            zoomOutMin: 1
          },
          zIndex: 3
        },
        {
          fixed: true,
          id: 1584540917921,
          imageUrl: "https://static01.versa-ai.com/upload/92921a7cd085/dfc0cfcf-1b13-4754-9095-555a53b04461.png",
          isActive: false,
          position: {
            place: "10",
            xAxis: {
              derection: "left",
              offset: 0.5
            },
            yAxis: {
              derection: "top",
              offset: 0.5
            }
          },
          size: {
            default: 1,
            zoomInMax: 1,
            zoomOutMin: 1
          },
          zIndex: 3
        }
      ],
      sceneConfig: {
        "filter": {
          "imageUrls": [],
          "position": {
            "axis": "x",
            "size": 1
          }
        },
        "music": {
          "fileUrl": ""
        },
        "fuse": {
          "support": false
        },
        "watermark": false,
        "position": {
          "place": "6",
          "xAxis": {
            "derection": "left",
            "offset": 0.5
          },
          "yAxis": {
            "derection": "top",
            "offset": 0.5
          }
        },
        "size": {
          "default": "0.7",
          "zoomInMax": 1,
          "zoomOutMin": 1
        },
        "rotate": 0,
        "text": {
          "support": false,
          "defaultText": "",
          "zIndex": 1,
          "bgColor": "",
          "textColor": "",
          "fontSize": 15,
          "bottom": 10
        },
        "cover": {
          "support": true,
          "list": [
            {
              "id": 1584540623143,
              type: 'bankLogo',
              "imageUrl": "https://static01.versa-ai.com/upload/4a72479c5a83/298bd350-21ff-4e39-9189-25967ad4cb94.png",
              "zIndex": 3,
              "fixed": true,
              "isActive": false,
              "size": {
                "default": 1,
                "zoomInMax": 1,
                "zoomOutMin": 1
              },
              "rotate": 0,
              "position": {
                "place": "10",
                "xAxis": {
                  "derection": "left",
                  "offset": 0.5
                },
                "yAxis": {
                  "derection": "top",
                  "offset": 0.5
                }
              },
              visible: false,
              deleted: true,
              width: 300
            },
            {
              "id": 1584540623146,
              type: 'myLogo',
              "imageUrl": "https://static01.versa-ai.com/upload/ce29be05e80a/947c8a95-62b1-4eef-8db4-9b22d3561620.png",
              "zIndex": 3,
              "fixed": true,
              "isActive": false,
              "size": {
                "default": 1,
                "zoomInMax": 1,
                "zoomOutMin": 1
              },
              "rotate": 0,
              "position": {
                "place": "10",
                "xAxis": {
                  "derection": "left",
                  "offset": 0.5
                },
                "yAxis": {
                  "derection": "top",
                  "offset": 0.5
                }
              },
              visible: false,
              deleted: true,
              width: 300
            }
          ]
        }
      },
      segmentType: 0,
      bgZIndex: 0.0,
      segmentZIndex: 2.0,
      sceneType: 0,
      index: 3
    }
  ],
}

export default function setGlobal(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SYSTEM:
      return {
        ...state,
        system: {
          ...state.system,
          ...action.data
        },
      }
      case SCENELIST:
        return {
          ...state,
          sceneList: {
            ...state.sceneList,
            ...action.data
          },
        }
        default:
          return state
  }
}
