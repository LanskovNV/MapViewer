import SceneManager from './SceneManager';

export default (container, objects) => {
  const canvas = createCanvas(document, container);
  canvasInit();
  const sceneManager = new SceneManager(canvas, objects);

  let canvasHalfWidth = 0;
  let canvasHalfHeight = 0;

  bindEventListeners();
  render();

  function createCanvas(document, container) {
    const canvas = document.createElement('canvas');
    container.appendChild(canvas);
    return canvas;
  }

  function bindEventListeners() {
    window.onresize = resizeCanvas;
    window.onmousemove = mouseMove;
    resizeCanvas();
  }

  function canvasInit() {
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  function resizeCanvas() {
    canvasInit();

    canvasHalfWidth = Math.round(canvas.offsetWidth / 2);
    canvasHalfHeight = Math.round(canvas.offsetHeight / 2);

    sceneManager.onWindowResize();
  }

  function mouseMove({ screenX, screenY }) {
    sceneManager.onMouseMove(
      screenX - canvasHalfWidth,
      screenY - canvasHalfHeight
    );
  }

  function render() {
    requestAnimationFrame(render);
    sceneManager.update();
  }
};