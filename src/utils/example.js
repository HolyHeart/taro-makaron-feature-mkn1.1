// import { OrbitControls } from './jsm/controls/OrbitControls'
import gLTF from './jsm/loaders/GLTFLoader'
import card from '../assets/card.jpg'

let objCache = null
let canvasCache = null
let THREECache = null
let rendererCache = null
let timer
let angle
let shadowCache
let stopAnimation
let screenWidthCache

const initAngle = 1.3

export function renderExample1(
  canvas,
  THREE,
  obj,
  url,
  first = false,
  screenWidth = screenWidthCache,
) {
  let camera, scene, renderer
  var cube
  init()
  animate()
  function init() {
    angle = initAngle
    objCache && (objCache.rotation.x = 0)
    objCache && (objCache.rotation.y = 0)
    // let gl = canvas.getContext('webgl', { alpha: true })
    // gl.clearColor(0, 0, 0, 0)
    // gl.clear(gl.COLOR_BUFFER_BIT)
    camera = new THREE.PerspectiveCamera(
      45,
      canvas.width / canvas.height,
      1,
      1000,
    )
    scene = new THREE.Scene()

    if (first) {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      renderer.setPixelRatio(wx.getSystemInfoSync().pixelRatio)
      renderer.setSize(canvas.width, canvas.height)
      renderer.setClearAlpha(0.0)
      rendererCache = renderer
    } else {
      renderer = rendererCache
    }

    let geometry = new THREE.BoxGeometry(10, 10, 10)

    if (first) {
      let GLTFLoader = gLTF(THREE)
      const gltfLoader = new GLTFLoader()
      gltfLoader.load(
        card,
        (gltf) => {
          gltf.scene.traverse(function (child) {
            if (child.isMesh) {
              child.material.emissive = child.material.color
              child.material.emissiveMap = child.material.map
            }
          })

          const root = gltf.scene
          objCache = root
          canvasCache = canvas
          THREECache = THREE

          const texture = new THREE.TextureLoader().load(
            url,
            (texture) => {
              texture.minFilter = THREE.LinearFilter //解决图片2次幂问题
              objCache.traverse(function (child) {
                if (child.isMesh) {
                  child.material.emissive = child.material.color
                  child.material.emissiveMap = texture
                  child.material.map = texture
                }
              })
              scene.add(objCache)
              objCache.rotation.z += (180 * Math.PI) / 180
            },
            (err) => {
              console.error(err)
            },
          )
          //   scene.add(root)
        },
        (e) => {
          console.log(e)
        },
      )
    } else {
      const texture = new THREE.TextureLoader().load(
        url,
        (texture) => {
          texture.minFilter = THREE.LinearFilter //解决图片2次幂问题
          objCache.traverse(function (child) {
            if (child.isMesh) {
              child.material.emissive = child.material.color
              child.material.emissiveMap = texture
              child.material.map = texture
              console.log(texture, 666666)
            }
          })
          scene.add(objCache)
        },
        (err) => {
          console.error(err)
        },
      )
    }

    // const controls = new OrbitControls(camera, renderer.domElement)
    // controls.update()
    // controlsCache = controls

    for (let i = 0; i < 6; i++) {
      let y = 43 + 12 * i
      let pointLight = new THREE.DirectionalLight(0xffffff, 0.001, 100)
      pointLight.position.set(63, y, 110)
      scene.add(pointLight)
    }

    const shadowTexture = new THREE.TextureLoader().load(
      'https://static01.versa-ai.com/upload/abc2f38a4d4d/cab30fe0-349f-4498-95f8-f594f089e43c.png',
      (texture) => {
        texture.minFilter = THREE.LinearFilter //解决图片2次幂问题
      },
    )
    const shadowGeometry = new THREE.PlaneGeometry(50, 10)
    const shadowMaterial = new THREE.MeshLambertMaterial({
      map: shadowTexture,
    })
    // const shadowMesh = new THREE.Mesh(shadowGeometry, shadowMaterial)
    // // shadowMesh.rotation.z = (180 * Math.PI) / 180
    // // shadowMesh.rotation.x = (-90 * Math.PI) / 180
    // shadowMesh.position.y = -10
    // scene.add(shadowMesh)
    // shadowCache = shadowMesh

    screenWidthCache = screenWidth
    camera.position.z = 50
  }
  function animate() {
    if (!stopAnimation) {
      if (objCache) {
        objCache.rotation.y = Math.cos(angle) * 1.2
        angle += 0.02
      }
    }
    timer = canvas.requestAnimationFrame(animate)
    renderer.render(scene, camera)
  }
}

export function change(url) {
  canvasCache && canvasCache.cancelAnimationFrame(timer)
  renderExample1(canvasCache, THREECache, objCache, url)
  angle = initAngle
  objCache && (objCache.rotation.y = Math.cos(angle) * 1.2)
}

export function stop() {
  stopAnimation = true
}

export function begin() {
  angle = initAngle
  stopAnimation = false
}

export function update(offsetX, offsetY) {
  objCache.rotation.y += offsetX * 0.01
  objCache.rotation.x += offsetY * 0.01
  objCache.rotation.x < -0.5 && (objCache.rotation.x = -0.5)
  objCache.rotation.x > 0.5 && (objCache.rotation.x = 0.5)
}
