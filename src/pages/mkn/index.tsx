import { ComponentClass } from "react";
import Taro, { Component, Config } from "@tarojs/taro";
import { View, Button, Image, Canvas, ScrollView } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import { getSystemInfo } from "@/model/actions/global";
import tool from "@/utils/tool";
import work from "@/utils/work";
import Title from "@/components/Title";
import Sticker from "@/components/Sticker";
import Loading from "@/components/Loading";
import globalData from "@/services/global_data";
import Session from "@/services/session";
import service from "@/services/service";
import { appConfig, ENV } from "@/services/config";
import { createCache } from "@/services/cache";
import "./index.less";
import image_code from "@/assets/images/code.png";
import image_versa from "@/assets/images/versa.png";
import WordBox from "@/components/WordBox";
import iconLock from "@/assets/images/icon_lock.png";
import { getHost } from "@/services/api.config";

type PageStateProps = {
  global: {
    system: object;
  };
};

type PageDispatchProps = {
  getSystemInfo: (data: object) => void;
};

type PageOwnProps = {};

type PageState = {
  coverList: Array<object>;
};

type IProps = PageStateProps & PageDispatchProps & PageOwnProps;

interface Editor {
  props: IProps;
}

@connect(
  ({ global }) => ({
    global,
  }),
  (dispatch) => ({
    getSystemInfo(data) {
      dispatch(getSystemInfo(data));
    },
  })
)
class Editor extends Component {
  config: Config = {
    navigationBarTitleText: "懒人抠图",
    disableScroll: true,
    enablePullDownRefresh: false,
  };

  templateData = undefined;
  selectedItem = null;

  state = {
    textareaText: "",
    showTextarea: false,
    rawImage: {
      localUrl: "",
      remoteUrl: "",
    },
    content: "",
    isshow: false,
    cancelText: "取消",
    confirmText: "看广告",
    frame: {
      width: 0,
      height: 0,
      left: 0,
      top: 0,
    },
    customBg: {
      localUrl: "",
      remoteUrl: "",
      originWidth: 0,
      originHeight: 0,
      autoScale: 1,
      autoWidth: 0,
      autoHeight: 0,
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      rotate: 0,
    },
    chooseText: "添加人像照片",
    coverList: [],
    sceneList: [],
    guiderTop: "",
    hasGuide: false,
    currentScene: {
      type: "recommend", // 'custom' 'recommend'
    },
    canvas: {
      id: "shareCanvas",
      ratio: 3,
    },
    loading: false,
    result: {
      show: false,
      shareImage: {
        remoteUrl: "",
        localUrl: "",
      },
    },
    drawBoard: {
      width: "650rpx",
      height: "416rpx",
    },
    ableToShareToQZone: false,
    screenHeight: 0, //计算滚动用
    screenWidth: 0,
    titleHeight: 0,
    tooltipHeight: 0,
    showType: 0,
    changeButton: {
      top: 0,
      left: 0,
    },
  };

  app = Taro.getApp();

  // 全局主题数据
  themeData = {
    sceneList: [],
    rawCoverList: [], // 原始贴纸数据
  };

  cache = {
    // foreground: createCache("foreground"),
    cover: createCache("cover"),
    source: createCache("source"),
  };

  isSaving = false; // 是否正在保存
  saveNumber = {
    number: 0,
    date: 0,
  };
  componentWillMount() {
    const { getSystemInfo } = this.props;
    const systemInfo: any = Taro.getSystemInfoSync();
    if (
      /iphone x/i.test(systemInfo.model) ||
      (/iphone/i.test(systemInfo.model) && /unknown/.test(systemInfo.model)) ||
      /iphone\s11/i.test(systemInfo.model)
    ) {
      // iPhone XS Max China-exclusive<iPhone11,6>
      // 'iPhone X'
      systemInfo.isIphoneX = true;
    } else {
      systemInfo.isIphoneX = false;
    }
    getSystemInfo(systemInfo);
    const setTop = Taro.getStorageSync("setTop");
    let tooltipHeight = 0;
    if (!setTop) {
      tooltipHeight = (systemInfo.screenWidth / 750) * 92;
    }
    console.log(
      "🔥初始化高度🔥",
      "屏幕高度：",
      systemInfo.screenHeight,
      "屏幕宽度：",
      systemInfo.screenWidth,
      "系统参数：",
      systemInfo
    );
    this.setState({
      screenHeight: systemInfo.screenHeight,
      screenWidth: systemInfo.screenWidth,
      tooltipHeight: tooltipHeight,
      picHeight: systemInfo.screenWidth * 0.8 * 0.94 * 0.5 * 0.9 + 1,
    });
    let totalTopHeight = 72;
    if (
      /iphone x/i.test(systemInfo.model) ||
      (/iphone/i.test(systemInfo.model) && /unknown/.test(systemInfo.model)) ||
      /iphone\s11/i.test(systemInfo.model)
    ) {
      totalTopHeight = 85;
    } else if (systemInfo.model.indexOf("iPhone") !== -1) {
      totalTopHeight = 62;
    }
    this.setState({
      titleHeight: totalTopHeight,
    });
  }

  componentDidMount() {
    console.log(this.$router.params, "this is from router");

    wx.cloud.init();
    this._initPage();
    this.canIShareToQQZone();
    if (
      Taro.getStorageSync("saveNumber") === "" ||
      Taro.getStorageSync("saveNumber").number === 0
    ) {
      Taro.setStorageSync("saveNumber", this.saveNumber);
    }
    const date1 = new Date();

    if (date1.getTime() - Taro.getStorageSync("saveNumber").date > 86400000) {
      this.saveNumber = {
        number: 0,
        date: date1.getTime(),
      };
      Taro.setStorageSync("saveNumber", this.saveNumber);
    }
  }
  componentWillReceiveProps(nextProps) {
    // console.log(this.props, nextProps)
  }
  componentWillUnmount() {}
  componentDidShow() {}
  componentDidHide() {}
  delay(time){
    return new Promise((resolve,reject) => {
      setTimeout(() => {
        resolve();
      }, time);
    })
  }
  async onShareAppMessage(res) {
    // if (res.from === 'button') {
    //   console.log('页面按钮分享', res.target)
    // }
    await this.handleOpenResult();
    await this.delay(200)
    this.app.aldstat.sendEvent("生成页分享", {
      场景名: this.state.currentScene.sceneName,
      场景Id: this.state.currentScene.sceneId,
    });
    const { currentScene, result = {} } = this.state;
    const { shareImage = {} } = result;
    const shareContent = currentScene.shareContent || "";
    const shareImageUrl = `${shareImage.remoteUrl}?x-oss-process=image/resize,m_pad,h_420,w_525`;
    const data = {
      shareSource: shareImage.remoteUrl,
      themeId: globalData.themeId || "",
      sceneId: currentScene.sceneId || "",
    };

    const { userInfo = {} } = globalData;
    const path = `/pages/mkn/index?ispro=true`;
    // console.log('url',path)
    // const title = `@${userInfo.nickName}：${shareContent}`
    if (!shareImage.remoteUrl) {
      console.log("shareImage.remoteUrl", shareImage.remoteUrl);
      return {
        // title: title,
        path: "/pages/mkn/index?ispro=true",
        imageUrl: currentScene.thumbnailUrl,
      };
    }
    return {
      // title: title,
      path: path,
      imageUrl: shareImageUrl,
      success: () => {
        console.log("分享成功");
      },
    };
  }

  _initPage = async () => {
    await Session.set();
    const res =
      this.templateData || (await service.mkn.getTemplate("GQVRVV85590")); // RGRFAG1145

    this.templateData = JSON.parse(JSON.stringify(res));
    this.initSceneData(res);
  };

  // qq空间分享兼容性检测
  canIShareToQQZone = () => {
    if (wx.canIUse("openQzonePublish")) {
      console.log("🔥🔥🔥可以分享到空间");
      this.setState({
        ableToShareToQZone: true,
      });
    } else {
      console.log("微信版本小程序不支持分享到QQ空间");
    }
  };

  // 公共方法
  pageToHome = () => {
    Taro.navigateBack({ delta: 1 });
  };
  showLoading = () => {
    this.setState({
      loading: true,
    });
  };
  hideLoading = () => {
    this.setState({
      loading: false,
    });
  };
  setStateTarget = (key, value = {}, callback?: () => void) => {
    const target = this.state[key];
    this.setState(
      {
        [key]: {
          ...target,
          ...value,
        },
      },
      () => {
        typeof callback === "function" && callback();
      }
    );
  };

  calFrameRect = () => {
    work.getDomRect("crop", (rect) => {
      this.setState(
        {
          frame: {
            width: rect.width,
            height: rect.height,
            left: rect.left,
            top: rect.top,
          },
        },
        () => {
          this.initCoverData();
        }
      );
    });
  };

  // 初始化场景信息
  initSceneData = async (res) => {
    ///获取globalData.sceneConfig数据
    // service.home.getCateGoryAndScenes(); //test

    let result = this.transformTemplateRes(res.result.result);

    globalData.sceneConfig = result.currentScene;
    // let foreground = result.foreground;
    const currentScene = globalData.sceneConfig; //来自于主页给每一项设置的，
    console.log(currentScene, "initiating the first scene&&adding");
    this.setState(
      {
        // foreground,
        currentScene: {
          ...this.state.currentScene,
          ...currentScene,
          type: "recommend",
        },
      },
      async () => {
        this.selectedItem = currentScene.sceneConfig.cover.list[0]; //adding
        typeof callback === "function" && callback();
      }
    );
  };
  // 初始化贴纸
  initCoverData = () => {
    const { currentScene } = this.state;
    const sceneConfig = tool.JSON_parse(currentScene.sceneConfig);
    const { cover = {} } = sceneConfig;
    console.log(cover, "covering this is cover ,this is 边框"); //是边框的信息
    this.themeData.rawCoverList = cover.list || [];
    const coverList = work.formatRawCoverList(this.themeData.rawCoverList);
    console.log(coverList, "ccccccccc");

    this.setState(
      {
        coverList: coverList,
      },
      () => {
        console.log("initCoverData", this.state.coverList);
      }
    );
  };

  // 初始化分割
  initSegment = async () => {
    let separateRes;
    try {
      console.log("trying trying trying");
      separateRes = await service.core.separateLocalImg(
        globalData.choosedImage,
        {
          type: -1,
          loading: true,
          showLoading: () => {
            this.showLoading();
          },
          hideLoading: () => {
            this.hideLoading();
          },
        }
      ); // 得到已经分割好的图片

      console.log(separateRes, "this is first separateRes"); //部分url

      const { cateImageDict = {} } = separateRes.result || {};

      if (!cateImageDict["16"] && !cateImageDict["16-1"]) {
        console.log("技术犯规了");
        // work.pageToError();
        Taro.showToast({
          title: "没有找到人物",
          icon: "none",
          duration: 2000,
        });
        return;
      }
    } catch (err) {
      console.log("catch", err);
      this.hideLoading();
      return {};
    }
    return (separateRes && separateRes.result) || {};
  };

  initSeparateData = async (separateResult) => {
    const { currentScene, foreground } = this.state;
    return this.changeSceneChooseSegment(
      currentScene,
      separateResult,
      (res = {}) => {
        console.log(res, "分割人物结果");
      }
    );
  };

  // 根据场景决定头像
  async changeSceneChooseSegment(currentScene, separateResult = {}, callback) {
    const { imageHost } = appConfig;
    if (!separateResult.cateImageDict) {
      return;
    }
    // 判断分离的是全身还是头像    //adding by YUjinZENG-explanation segmentType是导入数据的时候就定义好了的
    let separateUrl = "";
    let separateMaskUrl = "";
    console.log(currentScene, "currentScenceing---ing");
    if (currentScene.segmentType === 1) {
      //目前的数据都是0；所以下面的选项也不影响
      separateUrl = imageHost + separateResult.cateImageDict["16-1"]; //['16-1']没有这个key啊
      separateMaskUrl = imageHost + separateResult.maskImageDict["16-1"];
    } else {
      separateUrl = imageHost + separateResult.cateImageDict["16"];
      separateMaskUrl = imageHost + separateResult.maskImageDict["16"];
    }
    typeof callback === "function" &&
      callback({
        separateUrl, //远程请求的链接
        separateMaskUrl,
      });
    return {
      separateUrl, //远程请求的链接
      separateMaskUrl,
    };
  }

  // 背景
  handleBackgroundClick = () => {
    this.setForegroundActiveStatus(false);
    this.setCoverListActiveStatus({ type: "all" }, false);
  };
  // 自定义背景
  onCustomBgLoaded = (detail: object) => {
    const { width, height } = detail;
    this.setStateTarget(
      "customBg",
      {
        originWidth: width,
        originHeight: height,
      },
      () => {
        this.customBgAuto();
      }
    );
  };
  handleBgLoaded = ({ detail }) => {
    let k = detail.width / detail.height;
    console.log(detail, k); //背景图片的尺寸-eg：背景图 900,1200---整个框包括白板也是这么大
    this.setState(
      {
        drawBoard: {
          width: "650rpx",
          height: `${650 / k}rpx`, //先写固定
        },
      },
      () => {
        setTimeout(() => {
          this.calFrameRect();
        }, 250);
      }
    );
  };
  handleChangeCustomBgStyle = (data) => {
    const { frame } = this.state;
    if (data.x > 0) {
      data.x = 0;
    }
    if (data.y > 0) {
      data.y = 0;
    }
    if (frame.width - data.width > data.x) {
      data.x = frame.width - data.width;
    }
    if (frame.height - data.height > data.y) {
      data.y = frame.height - data.height;
    }
    const { customBg } = this.state;
    this.setState(
      {
        customBg: {
          ...customBg,
          ...data,
        },
      },
      () => {}
    );
  };

  // 贴纸
  onCoverLoaded = (detail: object, item?: any) => {
    const { width, height } = detail;
    const originInfo = {
      originWidth: width,
      originHeight: height,
    };
    this.coverAuto(originInfo, item);
  };
  handleChangeCoverStyle = (data) => {
    console.log(data, "---------this is to check data to check id -------");
    const { id } = data;
    const { coverList } = this.state;
    coverList.forEach((v, i) => {
      if (v.id === id) {
        coverList[i] = data;
      }
    });
    this.setState({
      coverList: coverList,
    });
  };
  handleCoverTouchstart = (sticker) => {
    if (this.state.showType === 0) return false;
    this.setCoverListActiveStatus({ type: "some", ids: [sticker.id] }, true);
    this.setForegroundActiveStatus(false);
  };
  handleCoverTouchend = (sticker) => {
    this.storeCoverInfo(sticker);
    this.app.aldstat.sendEvent("贴纸使用", { 贴纸Id: sticker.id });
  };
  handleDeleteCover = (sticker) => {
    const { id } = sticker;
    const { coverList } = this.state;
    coverList.forEach((v, i) => {
      if (v.id === id) {
        coverList[i] = {
          ...v,
          deleted: true,
          visible: false,
        };
      }
    });
    this.setState({
      coverList: coverList,
    });
    this.app.aldstat.sendEvent("贴纸删除", { 贴纸Id: sticker.id });
  };

  async save() {
    if (!this.state.currentScene.bgUrl) {
      return;
    }
    if (this.isSaving) {
      return;
    }
    this.app.aldstat.sendEvent("保存图片或视频", {
      场景名: this.state.currentScene.sceneName,
      场景Id: this.state.currentScene.sceneId,
    });
    Taro.showLoading({
      title: "照片生成中...",
      mask: true,
    });
    const mySaveNumber = {
      number: Taro.getStorageSync("saveNumber").number + 1,
      date: Taro.getStorageSync("saveNumber").date,
    };
    Taro.setStorageSync("saveNumber", mySaveNumber);
    this.isSaving = true;
    const canvasImageUrl = await this.createCanvas();
    console.log(canvasImageUrl, "这是canvasImageUrl"); //图片的本地地址
    Taro.hideLoading();
    this.isSaving = false;
    this.setState(
      {
        result: {
          shareImage: {
            localUrl: canvasImageUrl,
            remoteUrl: "",
          },
          show: true,
        },
      },
      async () => {
        const { url } = await service.base.upload(canvasImageUrl);
        this.setState({
          result: {
            // show: this.state.result.show,
            shareImage: {
              localUrl: canvasImageUrl,
              remoteUrl: url, //获得远端的url
            },
          },
        });
      }
    );
  }

  // 保存
  handleOpenResult = async () => {
    return new Promise(async (resolve,reject)=>{
      if (!this.state.currentScene.bgUrl) {
        return;
      }
      if (this.isSaving) {
        return;
      }
      this.app.aldstat.sendEvent("保存图片或视频", {
        场景名: this.state.currentScene.sceneName,
        场景Id: this.state.currentScene.sceneId,
      });
      Taro.showLoading({
        title: "照片生成中...",
        mask: true,
      });
      const mySaveNumber = {
        number: Taro.getStorageSync("saveNumber").number + 1,
        date: Taro.getStorageSync("saveNumber").date,
      };
      Taro.setStorageSync("saveNumber", mySaveNumber);
      this.isSaving = true;
      const canvasImageUrl = await this.createCanvas();
      console.log(canvasImageUrl, "这是canvasImageUrl"); //图片的本地地址
      Taro.hideLoading();
      this.isSaving = false;
      this.setState(
        {
          result: {
            shareImage: {
              localUrl: canvasImageUrl,
              remoteUrl: "",
            },
            show: true,
          },
        },
        async () => {
          const { url } = await service.base.upload(canvasImageUrl);
          this.setState({
            result: {
              // show: this.state.result.show,
              shareImage: {
                localUrl: canvasImageUrl,
                remoteUrl: url, //获得远端的url
              },
            },
          });
        }
      );
  
      // 保存图片到相册
      work.saveSourceToPhotosAlbum({
        location: "local",
        sourceUrl: canvasImageUrl,
        sourceType: "image",
        onSuccess: () => {
          Taro.showToast({
            title: "保存成功!",
            icon: "success",
            duration: 2000,
          });
          resolve();
        },
        onAuthFail: () => {
          Taro.authModal({
            open: true,
          });
          this.setResultModalStatus(false);
        },
        onFail: () => {
          Taro.showToast({
            title: "保存失败!",
            icon: "success",
            duration: 2000,
          });
        },
      });
    });
  };
  // 再玩一次
  handlePlayAgain = () => {
    this.app.aldstat.sendEvent("生成页再玩一次", "再玩一次");
    // this.pageToHome()
    this.setState({
      result: {
        show: false,
        shareImage: {
          remoteUrl: "",
          localUrl: "",
        },
      },
    });
  };

  // 发布到QQ空间

  publishToQzone = () => {
    const { currentScene } = this.state;
    const shareContent =
      currentScene.shareContent ||
      (globalData.themeData && globalData.themeData.shareContent);
    qq.openQzonePublish({
      text: shareContent,
      media: [
        {
          type: "photo",
          path: this.state.result.shareImage.localUrl,
        },
      ],
    });
  };

  setResultModalStatus = (flag = false) => {
    const { result } = this.state;
    result.show = flag;
    this.setState({
      result: {
        ...result,
      },
    });
  };

  createCanvas = async () => {
    return new Promise(async (resolve, reject) => {
      const { canvas } = this.state;
      const context = Taro.createCanvasContext(canvas.id, this); //组件绘图的上下文
      await this.canvasDrawRecommend(context);
      //绘制图片
      context.draw(); //【有点像将之前的设置保存到context中】
      //将生成好的图片保存到本地，需要延迟一会，绘制期间耗时
      setTimeout(function () {
        Taro.canvasToTempFilePath({
          //存储照片
          canvasId: canvas.id,
          fileType: "jpg",
          // 解决vivo手机模糊bug，强制图片质量为原图
          quality: 1,
          success: function (res) {
            let tempFilePath = res.tempFilePath;
            resolve(tempFilePath);
          },
          fail: function (res) {
            reject(res);
          },
          complete: function () {},
        });
      }, 400);
    });
  };

  canvasDrawRecommend = async (context) => {
    const { currentScene, frame, canvas } = this.state;
    console.log(currentScene, "currentScene currentScene currentScene");

    console.log(frame, "frame ===width===height===frame");

    const postfix = "?x-oss-process=image/resize,h_748,w_560";
    const { ratio = 3 } = canvas;
    const sceneInfo = this.state.currentScene;
    let sceneConfig = {};
    try {
      sceneConfig = tool.JSON_parse(sceneInfo.sceneConfig);
    } catch (err) {
      console.log("canvasDrawRecommend 解析sceneConfig JSON字符串失败", err);
    }
    // 下载远程背景图片
    let localBgImagePath = "";
    try {
      const bgUrl =
        currentScene.bgUrl +
        (/^(http|https):\/\//gi.test(currentScene.bgUrl) ? postfix : "");
      localBgImagePath = await this.downloadRemoteImage(bgUrl);
    } catch (err) {
      console.log("下载背景图片失败", err);
      return;
    }
    //localBgImagePath = currentScene.bgUrl;
    //防止锯齿，绘的图片是所需图片的3倍
    context.drawImage(
      localBgImagePath,
      0,
      0,
      frame.width * ratio,
      frame.height * ratio
    );
    // 绘制元素
    await this.canvasDrawElement(context, ratio);
    // 绘制二维码
    if (sceneConfig.watermark) {
      this.canvasDrawLogo(context, ratio);
    }
  };
  // 绘制贴纸，文字，覆盖层所有元素
  canvasDrawElement = async (context, ratio) => {
    const {
      currentScene,
      foreground,
      frame,
      canvas,
      coverList = [],
    } = this.state;
    // 收集所有元素进行排序
    let elements: Array<any> = [];
    // 收集人物
    // 收集贴纸
    coverList
      .filter((v) => !v.deleted)
      .forEach((v) => {
        const element_cover = {
          type: "cover",
          zIndex: v.zIndex,
          id: v.id,
          remoteUrl: v.remoteUrl,
          width: v.width * ratio,
          height: v.height * ratio,
          x: v.x * ratio,
          y: v.y * ratio,
          rotate: v.rotate,
          isMirror: v.isMirror,
        };
        elements.push(element_cover);
      });
    // 对元素进行排序
    elements.sort((a, b) => {
      return a.zIndex - b.zIndex;
    });
    // 下载成本地图片并绘制
    console.log(elements, "elements elements elements");
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      try {
        const localImagePath = await this.downloadRemoteImage(
          element.remoteUrl
        );
        element.localUrl = localImagePath;
        drawElement(element);
      } catch (err) {
        console.log("下载贴纸图片失败", err);
        continue;
      }
    }
    // console.log('elements', elements)
    function drawElement({ localUrl, width, height, x, y, rotate, isMirror }) {
      if (isMirror) {
        context.save();
        let cosR = Math.cos((rotate * Math.PI) / 180);
        let sinR = Math.sin((rotate * Math.PI) / 180);
        context.setTransform(
          -1 * cosR,
          -1 * sinR,
          -1 * sinR,
          cosR,
          x + 0.5 * width,
          y + 0.5 * height
        );
        context.drawImage(localUrl, -0.5 * width, -0.5 * height, width, height);
        context.restore();
      } else {
        context.save();
        context.translate(x + 0.5 * width, y + 0.5 * height);
        context.rotate((rotate * Math.PI) / 180);
        context.drawImage(localUrl, -0.5 * width, -0.5 * height, width, height);
        context.restore();
      }
      context.stroke();
    }
  };
  // 绘制二维码和logo
  canvasDrawLogo = (context, ratio) => {
    const { frame } = this.state;
    // const localCodeImagePath = '../../assets/images/code.png'
    const codeWidth = 67.5 * 1.5;
    const codeHeight = 67.5 * 1.5;
    const codeLeft = frame.width * ratio - codeWidth - 15;
    const codeTop = frame.height * ratio - codeHeight - 15;
    context.save();
    context.drawImage(image_code, codeLeft, codeTop, codeWidth, codeHeight);
    context.restore();
    context.stroke();
    // const localLogoImagePath = '../../assets/images/versa.png'
    const logoWidth = 197 * 1.5;
    const logoHeight = 20 * 1.5;
    const logoLeft = frame.width * ratio * 0.5 - logoWidth * 0.5;
    const logoTop = frame.height * ratio - logoHeight - 8;
    context.save();
    context.drawImage(image_versa, logoLeft, logoTop, logoWidth, logoHeight);
    context.restore();
    context.stroke();
  };

  // 下载照片并存储到本地
  downloadRemoteImage = async (remoteUrl = "") => {
    let localImagePath = remoteUrl;
    try {
      const result = await service.base.downloadFile(remoteUrl);
      localImagePath = result.tempFilePath || remoteUrl;
    } catch (err) {
      console.log("下载图片失败", err);
    }
    return localImagePath;
  };

  // 设置人物状态
  setForegroundActiveStatus = (value = false) => {
    this.setStateTarget("foreground", { isActive: value });
    this.setState({
      changeButton: {
        top: -60,
        left: -60,
      },
    });
  };
  // 设置贴纸状态
  setCoverListActiveStatus = (options = {}, value = false) => {
    const { type, ids = [] } = options;
    const { coverList } = this.state;
    if (type === "all") {
      coverList.forEach((v) => {
        v["isActive"] = value;
      });
    } else {
      coverList.forEach((v) => {
        if (ids.indexOf(v.id) > -1) {
          v["isActive"] = value;
        } else {
          v["isActive"] = !value;
        }
      });
    }
    this.setState({
      coverList,
    });
  };

  // 自定义背景自适应
  customBgAuto = (callback?: () => void) => {
    // 获取图片原始大小
    const { customBg, frame } = this.state;
    const { originWidth = 0, originHeight = 0 } = customBg || {};
    const imageRatio = originWidth / originHeight;
    // 计算宽高比例
    const result = {
      autoScale: 1,
      autoWidth: 0,
      autoHeight: 0,
      width: 0,
      height: 0,
      x: 0,
      y: 0,
    };
    if (originWidth / originHeight > frame.width / frame.height) {
      // 图片宽高比大于框
      // 将图片高度放大为与框相同，宽度超出框
      result.autoScale = frame.width / originWidth;
      result.autoHeight = frame.height;
      result.autoWidth = result.autoHeight * imageRatio;
    } else {
      result.autoScale = frame.height / originHeight;
      result.autoWidth = frame.width;
      result.autoHeight = result.autoWidth / imageRatio;
    }
    // 位移使图片居中
    result.width = result.autoWidth;
    result.height = result.autoHeight;
    result.x -= (result.width - frame.width) * 0.5;
    result.y -= (result.height - frame.height) * 0.5;
    this.setState(
      {
        customBg: {
          ...this.state.customBg,
          ...result,
        },
      },
      () => {
        typeof callback === "function" && callback();
      }
    );
  };

  // 贴纸自适应
  coverAuto = (originInfo, cover, callback?: () => void) => {
    const size = this.calcCoverSize(originInfo, cover);
    console.log(size, originInfo, cover, "size size size");
    const position = this.calcCoverPosition(size, cover);
    const { coverList = [], currentScene } = this.state;
    coverList.forEach((v, i) => {
      if (v.id === cover.id) {
        // 判断是否有缓存
        const cacheKey = `${currentScene.sceneId}_${v.id}`;
        const cacheRes = this.cache["cover"].get(cacheKey);
        if (cacheRes) {
          coverList[i] = cacheRes;
        } else {
          coverList[i] = {
            ...v,
            ...size,
            ...position,
            visible: true,
            deleted: false,
          };
        }
      }
    });

    this.setState(
      {
        coverList: coverList,
      },
      () => {
        typeof callback === "function" && callback();
      }
    );
  };
  calcCoverSize = (originInfo, cover) => {
    const { originWidth, originHeight } = originInfo;
    const { frame } = this.state;
    const coverInfo = work.getCoverInfoById(
      cover.id,
      this.themeData.rawCoverList,
      "id"
    );
    const imageRatio = originWidth / originHeight;
    let autoScale;
    if (coverInfo && coverInfo.size) {
      autoScale = parseFloat(coverInfo.size.default || 0.5);
    } else {
      autoScale = 0.5;
    }
    const result = {
      autoScale,
      autoWidth: 0,
      autoHeight: 0,
      width: 0,
      height: 0,
    };
    if (originWidth > originHeight) {
      // 以最短边计算
      result.autoWidth = frame.width * autoScale;
      result.autoHeight = result.autoWidth / imageRatio;
    } else {
      result.autoHeight = frame.height * autoScale;
      result.autoWidth = result.autoHeight * imageRatio;
    }
    result.width = result.autoWidth;
    result.height = result.autoHeight;

    return result;
  };

  changeWord() {
    this.setState({
      textareaText: this.selectedItem.data.wordContent,
      showTextarea: true,
    });
    // Taro.showToast({
    //   title: '暂不支持文字',
    //   icon: 'success',
    //   duration: 2000
    // })
  }

  //上传图片的操作
  todo = (data) => {
    // console.log(data, 'datadatadataOftodo')//授权获得用户信息
    this.app.aldstat.sendEvent("bank_replace", {});
    const {
      detail: { userInfo },
    } = data;
    if (userInfo) {
      service.base.loginAuth(data.detail); //【上传用户信息】
      globalData.userInfo = userInfo;
      if (this.selectedItem.data) {
        return this.changeWord();
      }
      work.chooseImageSimple({
        onSuccess: async (path) => {
          //获得加载图片的路径,这里的success就是用来把加载进来的图片进行处理
          this.app.aldstat.sendEvent("编辑页面人像成功", "上传成功");
          globalData.choosedImage = path; //存入图片，为之后的处理准备
          Taro.getFileSystemManager().readFile({
            filePath: path,
            success: async (data: any) => {
              //async
              if (this.selectedItem.id.indexOf("foreground") !== -1) {
                const separateResult = (globalData.separateResult = await this.initSegment());
                let res = await this.initSeparateData(separateResult);
                if (res && res.separateUrl) {
                  path = res.separateUrl;
                }
                this.uploadCoverImg(path);
              } else {
                this.uploadCoverImg(path);
              }
            },
            fail: () => {},
          });
        },
        onFail: () => {},
      });
    } else {
      Taro.showToast({
        title: "请授权",
        icon: "success",
        duration: 2000,
      });
    }
  };

  changeBg = (data) => {
    // console.log(data, 'datadatadataOftodo')//授权获得用户信息
    this.app.aldstat.sendEvent("bank_replace", {});
    const {
      detail: { userInfo },
    } = data;
    if (userInfo) {
      service.base.loginAuth(data.detail); //【上传用户信息】
      globalData.userInfo = userInfo;
      work.chooseImageSimple({
        onSuccess: async (path) => {
          //获得加载图片的路径,这里的success就是用来把加载进来的图片进行处理
          this.app.aldstat.sendEvent("编辑页面人像成功", "上传成功");
          globalData.choosedImage = path; //存入图片，为之后的处理准备
          let currentScene = { ...this.state.currentScene };
          currentScene.bgUrl = path;
          currentScene.sceneConfig.cover.list = this.state.coverList;
          this.setState({
            currentScene,
            coverList: [],
          });
        },
        onFail: () => {
          // if (!this.state.foreground.remoteUrl) {
          //   this.pageToHome();
          // }
        },
      });
    } else {
      Taro.showToast({
        title: "请授权",
        icon: "success",
        duration: 2000,
      });
    }
  };

  uploadCoverImg(path) {
    let coverList = this.state.coverList.map((cover) => {
      if (cover.id === this.selectedItem.id) {
        cover.remoteUrl = path;
      }
      return cover;
    });
    console.log(coverList, "uploadcoverimg");
    this.setState({
      chooseText: "重新上传人像",
      coverList,
    });
  }

  calcCoverPosition = (size = {}, cover = {}) => {
    const { width = 0, height = 0 } = size;
    const { frame } = this.state;
    const coverInfo = work.getCoverInfoById(
      cover.id,
      this.themeData.rawCoverList,
      "id"
    );
    console.log(cover.id, this.themeData.rawCoverList, "id");
    const { position, rotate = 0 } = coverInfo;
    const boxWidth = frame.width;
    const boxHeight = frame.height;

    const type = position.place || "0";
    const result = {
      x: 0,
      y: 0,
      rotate: 0,
    };
    switch (type) {
      case "0":
        result.x = (boxWidth - width) * 0.5;
        result.y = (boxHeight - height) * 0.5;
        break;
      case "1":
        result.x = 0;
        result.y = 0;
        break;
      case "2":
        result.x = (boxWidth - width) * 0.5;
        result.y = 0;
        break;
      case "3":
        result.x = boxWidth - width;
        result.y = 0;
        break;
      case "4":
        result.x = boxWidth - width;
        result.y = (boxHeight - height) * 0.5;
        break;
      case "5":
        result.x = boxWidth - width;
        result.y = boxHeight - height;
        break;
      case "6":
        result.x = (boxWidth - width) * 0.5;
        result.y = boxHeight - height;
        break;
      case "7":
        result.x = 0;
        result.y = boxHeight - height;
        break;
      case "8":
        result.x = 0;
        result.y = (boxHeight - height) * 0.5;
        break;
      case "9":
        const result_location = location(
          position,
          boxWidth,
          boxHeight,
          width,
          height
        );
        result.x = result_location.x;
        result.y = result_location.y;
        break;
      case "10":
        const result_center = centerLocation(
          position,
          boxWidth,
          boxHeight,
          width,
          height
        );
        result.x = result_center.x;
        result.y = result_center.y;
        break;
      default:
        result.x = (boxWidth - width) * 0.5;
        result.y = (boxHeight - height) * 0.5;
    }
    result.rotate = parseInt(rotate);
    return result;

    function location(position, boxWidth, boxHeight, width, height) {
      const result = {
        x: 0,
        y: 0,
      };
      if (position.xAxis.derection === "left") {
        result.x = position.xAxis.offset * boxWidth;
      }
      if (position.xAxis.derection === "right") {
        result.x = boxWidth * (1 - position.xAxis.offset) - width;
      }
      if (position.yAxis.derection === "top") {
        result.y = position.yAxis.offset * boxHeight;
      }
      if (position.yAxis.derection === "bottom") {
        result.y = boxHeight * (1 - position.yAxis.offset) - height;
      }
      return result;
    }
    // 中心点设置位置
    function centerLocation(position, boxWidth, boxHeight, width, height) {
      const result = {
        x: 0,
        y: 0,
      };
      if (position.xAxis.derection === "left") {
        result.x = position.xAxis.offset * boxWidth - width * 0.5;
      }
      if (position.xAxis.derection === "right") {
        result.x = boxWidth * (1 - position.xAxis.offset) - width * 0.5;
      }
      if (position.yAxis.derection === "top") {
        result.y = position.yAxis.offset * boxHeight - height * 0.5;
      }
      if (position.yAxis.derection === "bottom") {
        result.y = boxHeight * (1 - position.yAxis.offset) - height * 0.5;
      }
      return result;
    }
  };
  // 缓存贴纸信息
  storeCoverInfo = (sticker) => {
    const { currentScene } = this.state;
    const clone_cover = tool.deepClone(sticker);
    // 贴纸存储不激活状态
    clone_cover.isActive = false;
    const sceneId = currentScene.sceneId || "demo_scene";
    const cacheKey = `${sceneId}_${sticker.id}`;
    this.cache["cover"].set(cacheKey, clone_cover);
  };
  handleGetUserInfo = (data) => {
    // console.log('handleGetUserInfo', data)
    const {
      detail: { userInfo },
    } = data;
    if (userInfo) {
      service.base.loginAuth(data.detail);
      globalData.userInfo = userInfo;
      // this.todo()
    } else {
      Taro.showToast({
        title: "请授权",
        icon: "success",
        duration: 2000,
      });
    }
  };
  handelVideoAd() {
    //.catch((err)=>{console.log(err)})
    this.setState({
      isshow: false,
    });
    this.videoAd = wx.createRewardedVideoAd({
      adUnitId: "adunit-7815bc095ad4a222",
    });
    this.videoAd.onLoad(() => {
      console.log("广告拉取成功");
    });
    this.videoAd.onError((err) => {
      console.log(err);
    });
    this.videoAd.onClose((res) => {
      if (res.isEnded) {
        this.handleOpenResult();
      }
    });

    if (this.videoAd) {
      this.videoAd.load().then(() => {
        this.videoAd.show();
      });
    }
  }
  saveImg() {
    this.setState({
      isshow: true,
      content: "观看完整的视频广告后，才可以保存这张图片哦~",
    });
  }
  handelCancel() {
    this.setState({
      isshow: false,
    });
  }
  changeNav() {
    this.app.aldstat.sendEvent("保存后返回首页", "回到首页");
    Taro.navigateTo({ url: "/pages/home/index" });
  }

  transformTemplateRes(result: any) {
    let foregroundList = result.config.layerConfig.filter((item) => {
      return item.category === 16;
    });
    let newForegroundList = [];
    for (let i = 0; i < foregroundList.length; i++) {
      let derectionX = foregroundList[i].position.hasOwnProperty("left")
        ? "left"
        : "right";
      let derectionY = foregroundList[i].position.hasOwnProperty("top")
        ? "top"
        : "bottom";
      let newForeground = {
        //存储切图信息
        id: "foreground" + i,
        name: "人物" + (i + 1),
        remoteUrl: foregroundList[i].url,
        zIndex: foregroundList[i].order,
        width: 0,
        height: 0,
        x: 0,
        y: 0,
        rotate: foregroundList[i].position.rotation,
        originWidth: 0, // 原始宽度
        originHeight: 0, // 原始高度
        autoWidth: 0, // 自适应后的宽度
        autoHeight: 0, // 自适应后的高度
        autoScale: 0, // 相对画框缩放比例
        defaultScale: foregroundList[i].position.defaultScale,
        fixed: true, // 是否固定
        isActive: false, // 是否激活
        deleteable: true,
        loaded: false, // 是否加载完毕
        visible: true, // 是否显示
        position: {
          place: foregroundList[i].position.relativePosition,
          xAxis: {
            derection: derectionX,
            offset: foregroundList[i].position[derectionX],
          },
          yAxis: {
            derection: derectionY,
            offset: foregroundList[i].position[derectionY],
          },
          rotate: foregroundList[i].position.rotation,
        },
        size: {
          default: foregroundList[i].position.defaultScale,
          zoomInMax: 1,
          zoomOutMin: 1,
        },
      };
      newForegroundList.push(newForeground);
    }
    let imageList = result.config.layerConfig.filter((item) => {
      return item.category === 10001;
    });
    let newImageList = [];
    for (let i = 0; i < imageList.length; i++) {
      let derectionX = imageList[i].position.hasOwnProperty("left")
        ? "left"
        : "right";
      let derectionY = imageList[i].position.hasOwnProperty("top")
        ? "top"
        : "bottom";
      let newImage = {
        //存储切图信息
        id: "image" + i,
        name: "图片" + (i + 1),
        remoteUrl: imageList[i].url,
        zIndex: imageList[i].order,
        width: 0,
        height: 0,
        x: 0,
        y: 0,
        rotate: imageList[i].position.rotation,
        originWidth: 0, // 原始宽度
        originHeight: 0, // 原始高度
        autoWidth: 0, // 自适应后的宽度
        autoHeight: 0, // 自适应后的高度
        autoScale: 0, // 相对画框缩放比例
        defaultScale: imageList[i].position.defaultScale,
        fixed: true, // 是否固定
        isActive: false, // 是否激活
        deleteable: true,
        loaded: false, // 是否加载完毕
        visible: true, // 是否显示
        position: {
          place: imageList[i].position.relativePosition,
          xAxis: {
            derection: derectionX,
            offset: imageList[i].position[derectionX],
          },
          yAxis: {
            derection: derectionY,
            offset: imageList[i].position[derectionY],
          },
          rotate: imageList[i].position.rotation,
        },
        size: {
          default: imageList[i].position.defaultScale,
          zoomInMax: 1,
          zoomOutMin: 1,
        },
      };
      newImageList.push(newImage);
    }

    let currentScene = result.config.layerConfig.filter((item) => {
      return item.category === 1;
    })[0];
    let coverList = result.config.layerConfig.filter((item) => {
      return (
        (item.type && item.type.indexOf("Sticker") !== -1) ||
        item.category === 10003
      );
    });
    let j = 1;
    coverList = coverList.map((item, index) => {
      let cover = {
        id: "",
        imageUrl: item.url,
        zIndex: item.order,
        fixed: item.isLock === "1",
        // fixed: false,
        isActive: false,
        size: {
          default: item.position.defaultScale,
          zoomInMax: 1,
          zoomOutMin: 1,
        },
        rotate: item.position.rotation,
        position: {
          place: item.position.relativePosition,
          xAxis: {
            derection: "left",
            offset: item.position.left,
          },
          yAxis: {
            derection: "top",
            offset: item.position.top,
          },
        },
        name: item.category === 10003 ? `文字${j}` : "贴纸" + (index + 1),
        deleteable: item.isLock !== "1",
        isLock: item.isLock === "1",
        // inList: true
      };
      if (item.category === 10003) {
        cover.data = item;
        //cover.data.noMirror = true;
        cover.noMirror = true;
        j++;
      }
      return cover;
    });
    //sorting cover for islock
    console.log(coverList, "before sorting");

    let isLockList = coverList.filter((item) => {
      if (item.isLock) {
        return item;
      }
    });

    let unLockList = coverList.filter((item) => {
      if (!item.isLock) {
        return item;
      }
    });

    coverList = unLockList.concat(isLockList);

    coverList.unshift(...newForegroundList, ...newImageList);
    console.log(coverList, "ccc");
    coverList = work.formatRawCoverList(coverList);
    console.log(coverList, "ccc");

    let newCoverList = {
      support: true,
      list: coverList,
    };
    let newCurrentScene = {
      bgUrl: currentScene.url,
      bgZIndex: currentScene.order,
      filterUrl: "",
      sceneConfig: {
        filter: {
          imageUrls: [],
          position: {
            axis: "x",
            size: 1,
          },
        },
        music: {
          fileUrl: "",
        },
        fuse: {
          support: false,
        },
        watermark: false,
        position: {
          place: "9",
          xAxis: {
            derection: "left",
            offset: 0.46,
          },
          yAxis: {
            derection: "bottom",
            offset: 0,
          },
        },
        size: {
          default: "0.75",
          zoomInMax: 1,
          zoomOutMin: 1,
        },
        rotate: 0,
        text: {
          support: false,
          defaultText: "",
          zIndex: 1,
          bgColor: "",
          textColor: "",
          fontSize: 15,
          bottom: 10,
        },
        cover: newCoverList,
      },
      // sceneId: "370960045183913984",
      // sceneName: "白色飞马",
      templateCode: result.templateCode,
      templateName: result.templateName,
      segmentType: 0,
      thumbnailUrl: result.thumbnailUrl,
      isLock: false, //adding,
      isActive: false,
    };
    return {
      // foreground: newForegroundList,
      currentScene: newCurrentScene,
    };
  }

  activatePicture(targetIndex) {
    let tempCover = [...this.state.coverList];
    tempCover.forEach((item, index) => {
      if (index === targetIndex) {
        item.isActive = true;
        item.fixed = false;
        this.selectedItem = item;
      } else {
        item.isActive = false;
        item.fixed = true;
      }
    });

    // let temp = { ...this.state.foreground };
    // temp.isActive = false;
    // temp.fixed = true;

    let currentScene = { ...this.state.currentScene };
    currentScene.isActive = false;

    this.setState({
      // foreground: { ...temp },
      coverList: [...tempCover],
      currentScene,
    });
  }

  activateBg() {
    let coverList = [...this.state.coverList];
    let currentScene = { ...this.state.currentScene };
    currentScene.isActive = true;
    coverList.forEach((item) => {
      item.isActive = false;
      item.fixed = true;
    });
    this.setState({
      coverList,
      currentScene,
    });
  }

  resetButton() {
    const query = Taro.createSelectorQuery().in(this.$scope);
    query.select(".crop >>> .canChange").boundingClientRect();
    query.selectViewport().scrollOffset(); //获取滚动区域，
    query.exec((res) => {
      if (res[0]) {
        const { left, top, width, height } = res[0];
        let x = left + width / 2;
        let y = top + height / 2;
        this.changeButtonPosition(x, y);
      }
    });
  }

  showPicList() {
    let coverList = [...this.state.coverList];
    console.log(coverList, "showPicListshowPicListshowPicList");
    let needAutoActive = true;
    for (let i = 0; i < coverList.length; i++) {
      if (coverList[i].isActive) {
        needAutoActive = false;
        break;
      }
    }
    if (needAutoActive) {
      coverList[0].isActive = true;
      coverList[0].fixed = false;
    }
    this.setState({
      showType: 1,
      coverList,
    });
  }

  changeButtonPosition(left, top) {
    this.setState({
      changeButton: {
        left,
        top,
      },
    });
  }

  produceWordUrl(data) {
    data = data.toString().replace(/[\n\r]/gi, "\n");
    let fontPackageUrl = this.selectedItem.data.config.fontPackageUrl;
    let fontColor = this.selectedItem.data.wordColor;
    //
    console.log(encodeURI(fontColor), "this is font");

    let fontSize = this.selectedItem.data.wordFontSize;
    let deviceId = tool.getDeviceId();
    let sessionId = Session.get();
    let str = `${getHost("miniapi", ENV)}/word/sticker/picture?text=${encodeURI(
      data
    )}&fontPackageUrl=${fontPackageUrl}&fontSize=${fontSize}&sessionId=${sessionId}&deviceId=${deviceId}&fontColor=${encodeURIComponent(
      fontColor
    )}`;
    this.selectedItem.data.wordContent = data;
    return str;
  }

  uploadText(data) {
    console.log(data.detail.value, "wordbox");
    this.setState(
      {
        showTextarea: false,
      },
      () => {
        this.showLoading();
        let wordUrl = this.produceWordUrl(data.detail.value);
        let coverList = [...this.state.coverList];
        coverList.forEach((item) => {
          if (this.selectedItem.id === item.id) {
            item.remoteUrl = wordUrl;
          }
        });
        this.setState(
          {
            coverList,
          },
          () => {
            this.hideLoading();
          }
        );
      }
    );
  }

  backHandler() {
    this.setState(
      {
        showType: 0,
        coverList: [],
        currentScene: {
          type: "recommend", // 'custom' 'recommend'
        },
      },
      () => {
        this._initPage();
      }
    );
  }

  render() {
    const {
      loading,
      showType,
      frame,
      customBg,
      foreground,
      coverList,
      sceneList,
      currentScene,
      result,
      canvas,
      showTextarea,
    } = this.state;

    return (
      <ScrollView
        scrollY
        className="scrollPage"
        style={{ height: this.state.screenHeight + "px" }}
      >
        <View className={`page-editor`}>
          <Title
            color="#333"
            leftStyleObj={{ left: Taro.pxTransform(8) }}
            showBack={showType}
            backHandler={() => {
              this.backHandler();
            }}
          >
            懒人抠图
          </Title>
          <View className={`main ${showTextarea ? "blur" : ""}`}>
            <View className="pic-section">
              <View
                style={{
                  width: this.state.drawBoard.width,
                  height: this.state.drawBoard.height,
                }}
                className={`crop`}
                id="crop"
              >
                {showType === 0 && (
                  <Image
                    className="thumbnail_image"
                    src={currentScene.thumbnailUrl}
                  />
                )}
                <View className="background-image">
                  <Image
                    src={currentScene.bgUrl}
                    style="width:100%;height:100%;"
                    mode="scaleToFill"
                    onLoad={this.handleBgLoaded}
                    onClick={this.handleBackgroundClick}
                  />
                </View>
                {coverList.map((item) => {
                  return (
                    <Sticker
                      key={item.id}
                      url={item.remoteUrl}
                      stylePrams={item}
                      framePrams={frame}
                      onChangeStyle={this.handleChangeCoverStyle}
                      onImageLoaded={this.onCoverLoaded}
                      onTouchstart={this.handleCoverTouchstart}
                      onTouchend={this.handleCoverTouchend}
                      onDeleteSticker={this.handleDeleteCover.bind(this, item)}
                      // showBtn={item.data && item.data.wordStickerCode}
                    />
                  );
                })}
              </View>
            </View>

            {this.state.showType && (
              <View
                className={`scrollBox ${
                  coverList.length < 6 ? "listCenter" : ""
                }`}
              >
                <ScrollView
                  scrollX
                  className="scrollList"
                  style="white-space: nowrap;overflow:hidden;"
                >
                  <View className="block bg0">
                    <Image
                      src={currentScene.bgUrl}
                      onClick={this.activateBg.bind(this)}
                      className="singlePicture"
                      mode="aspectFill"
                    />
                    <Button
                      className={
                        !currentScene.isLock && currentScene.isActive
                          ? "acitivated"
                          : ""
                      }
                      openType="getUserInfo"
                      onGetUserInfo={this.changeBg}
                    >
                      {!currentScene.isLock && currentScene.isActive
                        ? "点击修改"
                        : ""}
                    </Button>
                    <View className="text">背景</View>
                  </View>

                  {this.state.coverList.map((item, index) => {
                    return !item.isLock ? (
                      <View className="block">
                        <Image
                          src={item.remoteUrl}
                          onClick={this.activatePicture.bind(this, index)}
                          className="singlePicture"
                          mode={
                            item.data.category === 10003
                              ? "aspectFit"
                              : "aspectFill"
                          }
                        />
                        <Button
                          className={item.isActive ? "acitivated" : ""}
                          openType="getUserInfo"
                          onGetUserInfo={this.todo}
                        >
                          {item.isActive ? "点击修改" : ""}
                        </Button>
                        <View className="text">{item.name}</View>
                      </View>
                    ) : (
                      <View className="block">
                        <Image
                          src={item.remoteUrl}
                          className="singlePicture"
                          mode="aspectFill"
                        />
                        <Image
                          src={iconLock}
                          className="locked"
                          mode="aspectFit"
                        />
                        <View className="text">{item.name}</View>
                      </View>
                    );
                  })}
                </ScrollView>
              </View>
            )}

            {this.state.showType === 0 ? (
              <View
                className={`buttonPart ${
                  this.state.showType === 0 ? "moreMargin" : ""
                }`}
              >
                <Button
                  style="flex:1;z-index:2;"
                  id="addPhoto1"
                  openType="getUserInfo"
                  className="custom-button pink"
                  hoverClass="btn-hover"
                  onClick={this.showPicList}
                >
                  开始做同款
                </Button>
              </View>
            ) : (
              ""
            )}

            {this.state.showType && (
              <View
                className={`buttonPart ${
                  this.state.showType === 1 ? "lessWidth" : ""
                }`}
              >
                <Button
                  style="flex:1;margin-left:10px"
                  className="custom-button white"
                  hoverClass="btn-hover"
                  open-type='share'
                >
                  分享并保存
                </Button>
              </View>
            )}
          </View>

          <View className="canvas-wrap">
            <Canvas
              disable-scroll={true}
              style={`width: ${frame.width * canvas.ratio}px; height: ${
                frame.height * canvas.ratio
              }px;`}
              canvasId={canvas.id}
            />
          </View>

          <Loading visible={loading} />
        </View>
        {showTextarea && (
          <WordBox
            uploadText={(data) => {
              this.uploadText(data);
            }}
            value={this.state.textareaText}
          />
        )}
      </ScrollView>
    );
  }
}

export default Editor as ComponentClass<PageOwnProps, PageState>;
