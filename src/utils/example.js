import { OrbitControls } from './jsm/controls/OrbitControls'
import gLTF from './jsm/loaders/GLTFLoader'

let objCache = null
let canvasCache = null
let THREECache = null
let rendererCache = null
let timer
let angle = 0
let controlsCache

export function renderExample1(canvas, THREE, obj, url) {
  let camera, scene, renderer
  var cube
  init()
  animate()
  function init() {
    camera = new THREE.PerspectiveCamera(
      45,
      canvas.width / canvas.height,
      1,
      1000,
    )
    scene = new THREE.Scene()
    // scene.background = new THREE.Color(0xf0f0f0)

    if (!url) {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      renderer.setPixelRatio(wx.getSystemInfoSync().pixelRatio)
      renderer.setSize(canvas.width, canvas.height)
      renderer.setClearAlpha(0.0)
      rendererCache = renderer
    } else {
      renderer = rendererCache
    }

    let geometry = new THREE.BoxGeometry(10, 10, 10)

    if (!url) {
      let GLTFLoader = gLTF(THREE)
      const gltfLoader = new GLTFLoader()
      gltfLoader.load(
        obj,
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
          scene.add(root)
        },
        (e) => {
          console.log(e)
        },
      )
    } else {
      const texture = new THREE.TextureLoader().load(
        require('../assets/images/avatar.png'),
        (texture) => {
          texture.minFilter = THREE.LinearFilter //解决图片2次幂问题
          objCache.traverse(function (child) {
            if (child.isMesh) {
              //   child.material.map = texture
              child.material.emissive = child.material.color
              child.material.emissiveMap = texture
              child.material.map = texture
              //   child.material.image = texture.image
            }
          })
          console.log(
            objCache,
            objCache.children[0].material.map.image.currentSrc,
            'aaa',
          )
          // objCache.rotation.z = (180 * Math.PI) / 180
          // objCache.rotation.y = (180 * Math.PI) / 180
          scene.add(objCache)
        },
        (err) => {
          console.error(err)
        },
      )
      //   const material = new THREE.MeshBasicMaterial({ map: texture })
      //   objCache.children[0].material = material
      //   scene.add(objCache)
    }

    // var material = new THREE.MeshBasicMaterial({ color: 0xed3ed3 })
    // cube = new THREE.Mesh(geometry, material)
    // scene.add(cube)
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.update()
    controlsCache = controls

    for (let i = 0; i < 6; i++) {
      let y = 43 + 12 * i
      let pointLight = new THREE.DirectionalLight(0xffffff, 0.5, 100)
      pointLight.position.set(63, y, 110)
      scene.add(pointLight)
    }

    camera.position.z = 60
  }
  function animate() {
    
    let speed = Math.cos(angle)
    //console.log(Math.cos(angle))
    // -1<Math.cos(angle)<1
    angle += 0.02
    if(objCache){
        objCache.rotation.y = Math.cos(angle)*1.2
    }
    timer = canvas.requestAnimationFrame(animate)
    renderer.render(scene, camera)
  }
}

export function change(url) {
  canvasCache.cancelAnimationFrame(timer)
  renderExample1(canvasCache, THREECache, objCache, 1)
}
