import { OrbitControls } from './jsm/controls/OrbitControls'
import gLTF from './jsm/loaders/GLTFLoader'

let objCache = null
let canvasCache = null
let THREECache = null
let rendererCache = null
let timer

export function renderExample1(canvas, THREE, obj, url) {
  let camera, scene, renderer
  var cube
  init()
  animate()
  function init() {
    camera = new THREE.PerspectiveCamera(
      100,
      canvas.width / canvas.height,
      1,
      1000,
    )
    scene = new THREE.Scene()
    scene.background = new THREE.Color(0xf0f0f0)

    if (!url) {
      renderer = new THREE.WebGLRenderer({ antialias: true })
      renderer.setPixelRatio(wx.getSystemInfoSync().pixelRatio)
      renderer.setSize(canvas.width, canvas.height)
      rendererCache = renderer
    } else {
      renderer = rendererCache
    }

    let geometry = new THREE.BoxGeometry(10, 10, 10)

    if (!url) {
      let GLTFLoader = gLTF(THREE)
      const gltfLoader = new GLTFLoader()
      gltfLoader.load(
        'https://activity-dev.versa-ai.com/cardB.gltf',
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
      //   let material = new THREE.MeshBasicMaterial({
      //     map: THREE.ImageUtils.loadTexture(
      //       'https://static01.versa-ai.com/versa-website/static/img/src/pages/offical/pc/index/img/-view-11.cfa33dc.jpg',
      //     ),
      //   })
      //   objCache.traverse(function (child) {
      //     if (child.isMesh) {
      //       child.material.emissive = child.material.color
      //       child.material.emissiveMap = child.material.map
      //       child.material.needsUpdate = true
      //     }
      //   })

      //   objCache.children[0].material = material
      //   scene.add(objCache)

      const texture = new THREE.TextureLoader().load(
        require('../assets/images/avatar.jpg'),
        (texture) => {
          //   console.log(texture, 'texture', objCache.children[0].material.map)
          texture.minFilter = THREE.LinearFilter //解决图片2次幂问题
          try {
            texture.image.currentSrc = texture.image.src
          } catch (e) {
            console.log(e)
          }
          console.log(texture.image.currentSrc, 'src')

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
          //   objCache.children[0].material.map = texture
          //   console.log(
          //     objCache,
          //     'show',
          //     objCache.children[0].material.map.image.currentSrc,
          //   )
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

    let helper = new THREE.GridHelper(1000, 100)
    scene.add(helper)

    camera.position.z = 30
  }
  function animate() {
    // cube && (cube.rotation.x += 0.01)
    // cube && (cube.rotation.y += 0.01)
    timer = canvas.requestAnimationFrame(animate)
    renderer.render(scene, camera)
  }
}

export function change(url) {
  canvasCache.cancelAnimationFrame(timer)
  renderExample1(canvasCache, THREECache, objCache, 1)
}
