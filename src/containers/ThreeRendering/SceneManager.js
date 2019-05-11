import * as THREE from 'three';
import * as d3 from 'd3';
import SceneSubject from './SceneSubject';

export default canvas => {
  const clock = new THREE.Clock();

  const fov = 90;
  const near = 7000;
  const far = 100000;

  const screenDimensions = {
    width: canvas.width,
    height: canvas.height * 3
  };

  const mousePosition = {
    x: 0,
    y: 0
  };

  const scene = buildScene();
  const zoom = d3
    .zoom()
    .scaleExtent([getScaleFromZ(far), getScaleFromZ(near)])
    .on('zoom', () => {
      let d3_transform = d3.event.transform;
      zoomHandler(d3_transform);
    });
  const camera = buildCamera(screenDimensions);
  const renderer = buildRender(screenDimensions);
  const sceneSubjects = createSceneSubjects(scene);

  function buildScene() {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#FFF');

    return scene;
  }

  function buildRender({ width, height }) {
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true
    });
    const DPR = window.devicePixelRatio ? window.devicePixelRatio : 1;
    renderer.setPixelRatio(DPR);
    renderer.setSize(width, height);

    renderer.gammaInput = true;
    renderer.gammaOutput = true;

    const view = d3.select(renderer.domElement);
    setUpZoom(view);
    return renderer;
  }

  function buildCamera({ width, height }) {
    const aspectRatio = width / height;
    const camera = new THREE.PerspectiveCamera(fov, aspectRatio, near, far);

    return camera;
  }

  /* Begin Of Zoom */
  function setUpZoom(view) {
    view.call(zoom);
    let initial_scale = getScaleFromZ(far);
    const initial_transform = d3.zoomIdentity
      .translate(screenDimensions.width / 2, screenDimensions.height / 2)
      .scale(initial_scale);
    zoom.transform(view, initial_transform);
    // camera.position.set(0, 0, far);
  }

  function zoomHandler(d3_transform) {
    let scale = d3_transform.k;
    let x = -(d3_transform.x - screenDimensions.width / 2) / scale;
    let y = (d3_transform.y - screenDimensions.height / 2) / scale;
    let z = getZFromScale(scale);
    camera.position.set(x, y, z);
  }

  function getScaleFromZ(camera_z_position) {
    let half_fov = fov / 2;
    let half_fov_radians = toRadians(half_fov);
    let half_fov_height = Math.tan(half_fov_radians) * camera_z_position;
    let fov_height = half_fov_height * 2;
    return screenDimensions.height / fov_height;
  }

  function getZFromScale(scale) {
    let half_fov = fov / 2;
    let half_fov_radians = toRadians(half_fov);
    let scale_height = screenDimensions.height / scale;
    return scale_height / (2 * Math.tan(half_fov_radians));
  }

  function toRadians(angle) {
    return angle * (Math.PI / 180);
  }
  /* End Of Zoom */

  function createSceneSubjects(scene) {
    return new SceneSubject(scene);
  }

  function update() {
    const elapsedTime = clock.getElapsedTime();

    for (let i = 0; i < sceneSubjects.length; i += 1) {
      sceneSubjects[i].update(elapsedTime);
    }

    renderer.render(scene, camera);
  }

  function onWindowResize() {
    const { width, height } = canvas;

    screenDimensions.width = width;
    screenDimensions.height = height;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
  }

  function onMouseMove(x, y) {
    mousePosition.x = x;
    mousePosition.y = y;
  }

  return {
    update,
    onWindowResize,
    onMouseMove
  };
};
