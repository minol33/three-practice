import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

import textureBaseColorUrl from '../assets/img/Stone_Path_008_basecolor.jpg'
import textureNormalUrl from '../assets/img/Stone_Path_008_normal.jpg'
import textureHeightUrl from '../assets/img/Stone_Path_008_height.png'
import textureRoughnessUrl from '../assets/img/Stone_Path_008_roughness.jpg'
export function texture() {
    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        10
    )

    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
    })

    renderer.setSize(window.innerWidth, window.innerHeight)

    document.body.appendChild(renderer.domElement)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.update()

    const pointLight = new THREE.PointLight(0xffffff, 80)
    pointLight.position.set(1, 3, 3)
    scene.add(pointLight)

    // 텍스처 추가
    const textureLoader = new THREE.TextureLoader()
    const textureBaseColor = textureLoader.load(textureBaseColorUrl)
    const textureNormal = textureLoader.load(textureNormalUrl)
    const textureHeight = textureLoader.load(textureHeightUrl)
    const textureRoughness = textureLoader.load(textureRoughnessUrl)


    const geometry = new THREE.SphereGeometry(0.3, 32, 16)
    const materials = [
        new THREE.MeshStandardMaterial({
            map: textureBaseColor,
        }),
        new THREE.MeshStandardMaterial({
            map: textureBaseColor,
            normalMap: textureNormal,
        }),
        new THREE.MeshStandardMaterial({
            map: textureBaseColor,
            normalMap: textureNormal,
            displacementMap: textureHeight,
            displacementScale: 0.03,
        }),
        new THREE.MeshStandardMaterial({
            map: textureBaseColor,
            normalMap: textureNormal,
            displacementMap: textureHeight,
            displacementScale: 0.03,
            roughnessMap: textureRoughness,
            roughness: 0.8
        }),
    ]

    materials.forEach((material, index) => {
        const item = new THREE.Mesh(geometry, material)

        item.position.x = (index - (materials.length - 1) / 2)

        scene.add(item)
    })

    camera.position.z = 2.5

    function animate() {
        renderer.render(scene, camera)
    }

    renderer.setAnimationLoop(animate)

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight

        camera.updateProjectionMatrix()

        renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', onWindowResize)


}