import { OrbitControls } from './jsm/controls/OrbitControls'
import gLTF from './jsm/loaders/GLTFLoader'
import url from '../assets/card.gltf'

export default function renderExample1(canvas, THREE) {
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

    let GLTFLoader = gLTF(THREE)
    var geometry = new THREE.BoxGeometry(10, 10, 10)
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
        console.log(root, 123123)
        scene.add(root)
      },
      (e) => {
        console.log(e)
      },
    )
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
