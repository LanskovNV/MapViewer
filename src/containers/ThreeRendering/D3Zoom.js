import * as d3 from 'd3';
import * as THREE from 'three';

function getCurrentScale(camera, height) {
  const vFOV = (camera.fov * Math.PI) / 180;
  const scale_height = 2 * Math.tan(vFOV / 2) * camera.position.z;
  const currentScale = height / scale_height;
  return currentScale;
}

export default function zoomInit(camera, width, height) {
  return d3
    .zoom()
    .scaleExtent([camera.near, camera.far])
    .on('zoom', () => {
      const event = d3.event;
      if (event.sourceEvent) {
        // Get z from D3
        const new_z = event.transform.k;

        if (new_z !== camera.position.z) {
          // Handle a zoom event
          const { clientX, clientY } = event.sourceEvent;

          // Project a vector from current mouse position and zoom level
          // Find the x and y coordinates for where that vector intersects the new
          // zoom level.
          // Code from WestLangley https://stackoverflow.com/questions/13055214/mouse-canvas-x-y-to-three-js-world-x-y-z/13091694#13091694
          const vector = new THREE.Vector3(
            (clientX / width) * 2 - 1,
            -(clientY / height) * 2 + 1,
            1
          );
          vector.unproject(camera);
          const dir = vector.sub(camera.position).normalize();
          const distance = (new_z - camera.position.z) / dir.z;
          const pos = camera.position.clone().add(dir.multiplyScalar(distance));

          // Set the camera to new coordinates
          camera.position.set(pos.x, pos.y, new_z);
        } else {
          // Handle panning
          const { movementX, movementY } = event.sourceEvent;

          // Adjust mouse movement by current scale and set camera
          const current_scale = getCurrentScale(camera, height);
          camera.position.set(
            camera.position.x - movementX / current_scale,
            camera.position.y + movementY / current_scale,
            camera.position.z
          );
        }
      }
    });
}
