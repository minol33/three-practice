import * as THREE from 'three'

export function camera() {
    const scene = new THREE.Scene()

    const fov = 75
    const aspect = window.innerWidth / window.innerHeight
    const near = 0.1
    const far = 1000
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
    // const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10)
    camera.position.set(2, 2,1)
    camera.lookAt(new THREE.Vector3(0,0,0))

    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
    })

    renderer.setSize(window.innerWidth, window.innerHeight)

    document.body.appendChild(renderer.domElement)

    const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)
    const material = new THREE.MeshStandardMaterial({
        color: 0xFF7F00
    })

    const cube = new THREE.Mesh(geometry, material)
    cube.rotation.y = 0.5
    scene.add(cube)

    const planeGeometry = new THREE.PlaneGeometry(30, 30, 1, 1)
    const planeMaterial = new THREE.MeshStandardMaterial({
        color: 0xeeeeee
    })
    const plane = new THREE.Mesh(planeGeometry, planeMaterial)
    plane.rotation.x = -0.5 * Math.PI
    plane.position.y = -0.5
    scene.add(plane)

    const pointLight = new THREE.PointLight(0xffffbb, 50)
    pointLight.position.set(0, 2, 4)
    scene.add(pointLight)

    renderer.render(scene, camera)

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)

        renderer.render(scene, camera)
    }

    window.addEventListener('resize', onWindowResize)

}