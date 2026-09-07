import * as THREE from 'three'

export function light() {
    const scene = new THREE.Scene()

    const fov = 120
    const aspect = window.innerWidth / window.innerHeight
    const near = 0.1
    const far = 1000
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
    // const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10)
    camera.position.set(0, 1,1.8)
    camera.lookAt(new THREE.Vector3(0,0,0))

    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
    })

    renderer.setSize(window.innerWidth, window.innerHeight)

    document.body.appendChild(renderer.domElement)

    const geometry = new THREE.SphereGeometry(0.5, 32, 16)
    const material = new THREE.MeshStandardMaterial({
        color: 0xffffff
    })

    const sphere = new THREE.Mesh(geometry, material)
    sphere.rotation.y = 0.5
    scene.add(sphere)

    const planeGeometry = new THREE.PlaneGeometry(20, 20, 1, 1)
    const planeMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff
    })
    const plane = new THREE.Mesh(planeGeometry, planeMaterial)
    plane.rotation.x = -0.5 * Math.PI
    plane.position.y = -0.2
    scene.add(plane)


    // 빛
    // const ambientLight = new THREE.AmbientLight(0xffa500, 0.1)
    // const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
    // directionalLight.position.set(-1,1,1)
    // scene.add(directionalLight)
    // const dlHelper = new THREE.DirectionalLightHelper(directionalLight, 0.1, 0x0000ff)
    // const hemispherLight = new THREE.HemisphereLight(0x0000ff,  0x0000ff, 0.3)

    // const pointLight = new THREE.PointLight(0xffffff, 1)

    // pointLight.position.set(0.1, 0.5, 0.5)

    // const rectLight = new THREE.RectAreaLight(0xffffff, 2, 1, 0.5)
    // scene.add(rectLight)
    // rectLight.position.set(0.5, 0.5, 1)
    // rectLight.lookAt(0,0,0)

    const spotLight = new THREE.SpotLight(0xffffff, 0.5)
    scene.add(spotLight)

    // scene.add(dlHelper)



    renderer.render(scene, camera)

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)

        renderer.render(scene, camera)
    }

    window.addEventListener('resize', onWindowResize)

}