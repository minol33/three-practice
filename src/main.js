import './style.css'
import * as THREE from 'three'

const scene = new THREE.Scene()
scene.background = new THREE.Color(0x004fff)

// 카메라
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 2

// const canvas = document.querySelector('#three');
// const renderer = new THREE.WebGLRenderer({antialias: true, canvas});

// 랜더러
const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
})
renderer.setSize(window.innerWidth, window.innerHeight)

document.body.appendChild(renderer.domElement)
// renderer.render(scene, camera)

// 매쉬
const geometry01 = new THREE.BoxGeometry(0.5, 0.5, 0.5)
const material01 = new THREE.MeshStandardMaterial({
    color: 0x999999
})

const obj01 = new THREE.Mesh(geometry01, material01)
obj01.position.x = -1
scene.add(obj01)

// 매쉬 2
const geometry02 = new THREE.ConeGeometry(0.4, 0.7, 6)
const material02 = new THREE.MeshStandardMaterial({
    color: 0x999999
})

const obj02 = new THREE.Mesh(geometry02, material02)
scene.add(obj02)

// 매쉬 3
const geometry03 = new THREE.IcosahedronGeometry(0.4, 0)
const material03 = new THREE.MeshStandardMaterial({
    color: 0x999999
})

const obj03 = new THREE.Mesh(geometry03, material03)
obj03.position.x = 1
scene.add(obj03)


function render(time) {
    time *= 0.0005;  // 시간을 초 단위로 변환

    obj01.rotation.y = time;
    obj02.rotation.y = time;
    obj03.rotation.y = time;

    renderer.render(scene, camera);

    requestAnimationFrame(render);
}
requestAnimationFrame(render);

// 반응형 처리
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
}
window.addEventListener('resize', onWindowResize)
