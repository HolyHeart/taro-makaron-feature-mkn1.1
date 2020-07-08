// import { OrbitControls } from './jsm/controls/OrbitControls'
import gLTF from './jsm/loaders/GLTFLoader'

let objCache = null
let canvasCache = null
let THREECache = null
let rendererCache = null
let timer
let angle = 0
// let controlsCache
let stopAnimation

export function renderExample1(canvas, THREE, obj, url, first = false) {
  let camera, scene, renderer
  var cube
  init()
  animate()
  function init() {
    angle = 0
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
        obj,
        (gltf) => {
          gltf.scene.traverse(function (child) {
            if (child.isMesh) {
              child.material.emissive = child.material.color
              child.material.emissiveMap = child.material.map
              console.log(child.material.map, 123123123)
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
      let pointLight = new THREE.DirectionalLight(0xffffff, 0.5, 100)
      pointLight.position.set(63, y, 110)
      scene.add(pointLight)
    }

    camera.position.z = 50
  }
  function animate() {
    let speed = Math.cos(angle)
    //console.log(Math.cos(angle))
    // -1<Math.cos(angle)<1
    if (!stopAnimation) {
      angle += 0.02
      if (objCache) {
        objCache.rotation.y = Math.cos(angle) * 1.2
      }
    }
    timer = canvas.requestAnimationFrame(animate)
    renderer.render(scene, camera)
  }
}

export function change(url) {
  canvasCache.cancelAnimationFrame(timer)
  renderExample1(canvasCache, THREECache, objCache, url)
}

export function stop() {
  stopAnimation = true
}

export function update(offset) {
  console.log(offset)
  objCache.rotation.y += offset * 0.01
}
