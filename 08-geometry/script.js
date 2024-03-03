import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// Cursor
const cursor = {
  x: 0,
  y: 0
}
window.addEventListener('mousemove', event => {
  cursor.x = event.clientX / sizes.width - 0.5
  cursor.y = -(event.clientY / sizes.height - 0.5)
})

// Canvas
const canvas = document.querySelector('canvas.webgl') 

// Scene
const scene = new THREE.Scene()

// Object
// const geometry = new THREE.BoxGeometry(1, 1, 1, 5, 5, 5)
// const positionsArray = new Float32Array([
//   0, 0, 0,
//   0, 1, 0,
//   1, 0, 0,
// ]) 
// const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)
// const geometry = new THREE.BufferGeometry()
// geometry.setAttribute('position', positionsAttribute)

const count = 500
const geometry = new THREE.BufferGeometry()
const positionsArray = new Float32Array(count * 3 * 3)
for (let i = 0; i < count * 3 * 3; i++) {
  positionsArray[i] = (Math.random() - 0.5) * 4
  
}
const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)
geometry.setAttribute('position', positionsAttribute)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

window.addEventListener('resize', event => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

window.addEventListener('dblclick', event => {
  const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

  if (!fullscreenElement) {
    canvas.requestFullscreen()

    if (canvas.requestFullscreen) {
      canvas.requestFullscreen()
    } else if (canvas.webkitRequestFullscreen) {
      canvas.webkitRequestFullscreen()
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    }
  }
})

// Camera
const aspectRation = sizes.width / sizes.height
const camera = new THREE.PerspectiveCamera(75, aspectRation, 0.1, 100)
// const camera = new THREE.OrthographicCamera(-1 * aspectRation, 1 * aspectRation, 1, -1, 0.1, 100 )
// camera.position.x = 2
// camera.position.y = 2
camera.position.z = 3
camera.lookAt(mesh.position)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
// controls.target.y = 2
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Clock
const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  // Update controls
  controls.update()
  
  renderer.render(scene, camera)
  window.requestAnimationFrame(tick)
}

tick()
