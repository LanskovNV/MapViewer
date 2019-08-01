export default function clearScene(scene) {
  while (scene.children.length > 0) {
    scene.remove(this.scene.children[0]);
  }
  return scene;
}
