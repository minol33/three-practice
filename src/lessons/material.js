import * as THREE from 'three'

export function material() {
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xeeeeee)

    const camera = new THREE.PerspectiveCamera(
        75,
         window.innerWidth / window.innerHeight,
        0.1,
        10
    )

    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    })

    renderer.setSize(window.innerWidth, window.innerHeight)

    document.body.appendChild(renderer.domElement)

    // 빛
    const pointlight = new THREE.PointLight(0xffffff, 50)
    pointlight.position.set(0, 3, 4)
    scene.add(pointlight)



    const geometry = new THREE.TorusGeometry( 0.5, 0.2, 16, 100 )
    const materials = [
        new THREE.MeshStandardMaterial({
        color: 0xff7f00,
        // metalness: 0.7,
        // roughness: 0.5,
        // wireframe: true,
        // transparent: true,
        // opacity: 0.5
        }),
        new THREE.MeshDepthMaterial(),
        new THREE.MeshPhongMaterial({
            color: 0xff7f00,
            shininess: 200,
            specular: 0x004fff,
        }),
        new THREE.MeshLambertMaterial({
            color: 0xff7f00,
        }),
        new THREE.MeshPhysicalMaterial({
            color: 0xff7f00,
            clearcoat: 1,
            clearcoatRoughness: 0.1
        }),

    ]

    const GAP = 2

    const toruses = []

    materials.forEach((material, index) => {
        const torus = new THREE.Mesh(geometry, material)

        torus.position.x = (index - (materials.length - 1) / 2) * GAP

        scene.add(torus)
        toruses.push(torus)
    })

    camera.position.z = 6

    function animate(time) {
        time *= 0.001

        toruses.forEach((torus) => {
            torus.rotation.y = time
        })

        renderer.render(scene, camera)
    }

    renderer.setAnimationLoop(animate)

    function onWindowResize() {
        camera.aspect =
            window.innerWidth /
            window.innerHeight

        camera.updateProjectionMatrix()

        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        )
    }

    window.addEventListener(
        'resize',
        onWindowResize
    )
}