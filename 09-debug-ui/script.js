import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap'
import GUI from 'lil-gui'

// Debug
const gui = new GUI({
  width: 300,
  title: 'Nice debug UI',
  closeFolders: false
})
// gui.close()
// gui.hide()

window.addEventListener('keydown', event => {
  if (event.key === 'h') {
    gui.show(gui._hidden)
  }
})

const debugObject = {}

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
debugObject.color = '#A778D8'
debugObject.subdivision = 2
const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2)
const material = new THREE.MeshBasicMaterial({ color: debugObject.color, wireframe: true })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

debugObject.spin = () => {
  gsap.to(mesh.rotation, { y: mesh.rotation.y + Math.PI * 2 })
}

const cubeTweaks = gui.addFolder('Awesome cube')
// cubeTweaks.close()

cubeTweaks.add(mesh.position, 'y').min(-3).max(3).step(0.01).name('Elevation')
cubeTweaks.add(mesh, 'visible').name('Visible')
cubeTweaks.add(mesh.material, 'wireframe').name('Wireframe')
cubeTweaks.addColor(debugObject, 'color').onChange(() => material.color.set(debugObject.color)).name('Color')
cubeTweaks.add(debugObject, 'spin').name('Spin')
cubeTweaks
  .add(debugObject, 'subdivision')
  .min(1)
  .max(20)
  .step(1)
  .onFinishChange(() => {
    mesh.geometry.dispose()
    mesh.geometry = new THREE.BoxGeometry(1, 1, 1, debugObject.subdivision, debugObject.subdivision, debugObject.subdivision)
  })
  .name('Subdivision')


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

// Camera
const aspectRation = sizes.width / sizes.height
const camera = new THREE.PerspectiveCamera(75, aspectRation, 0.1, 100)
camera.position.x = 2
camera.position.y = 2
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
