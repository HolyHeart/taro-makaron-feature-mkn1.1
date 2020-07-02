import { OrbitControls } from './jsm/controls/OrbitControls'
import gLTF from './jsm/loaders/GLTFLoader'

let objCache = null
let canvasCache = null
let THREECache = null

export function renderExample1(canvas, THREE, obj, url) {
  var camera, scene, renderer
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

    renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(wx.getSystemInfoSync().pixelRatio)
    renderer.setSize(canvas.width, canvas.height)
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
          console.log(
            root,
            123123,
            root.children[0].material.map.image.currentSrc,
          )
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
      objCache.traverse(function (child) {
        if (child.isMesh) {
          child.material.emissive = child.material.color
          child.material.emissiveMap = child.material.map
        }
      })
      //   objCache.children[0].material.map.image.currentSrc = url
      let material = new THREE.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture(
          'https://static01.versa-ai.com/versa-website/static/img/src/pages/offical/pc/index/img/-view-11.cfa33dc.jpg',
        ),
      })
      objCache.children[0].material = material
      scene.add(objCache)
    }

    var material = new THREE.MeshBasicMaterial({ color: 0xed3ed3 })
    cube = new THREE.Mesh(geometry, material)
    // scene.add(cube)
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.update()

    let helper = new THREE.GridHelper(1000, 100)
    scene.add(helper)

    camera.position.z = 30
  }
  function animate() {
    cube.rotation.x += 0.01
    cube.rotation.y += 0.01
    canvas.requestAnimationFrame(animate)
    renderer.render(scene, camera)
  }
}

export function change(url) {
  renderExample1(canvasCache, THREECache, objCache, url)
}
