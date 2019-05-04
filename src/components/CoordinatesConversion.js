function GetBoundsOneFile(json_data) {
  let left, right, up, down;

  switch (json_data.points[0].type) {
    case 'LineString':
      left = json_data.points[0].coordinates[0][0];
      right = left;
      break;
    case 'MultiPolygon':
      up = json_data.points[0].coordinates[0][0][0][0];
      down = up;
      break;
    default:
  }

  for (let j = 0; j < json_data.points.length; j++) {
    switch (json_data.points[j].type) {
      case 'LineString':
        for (let k = 0; k < json_data.points[j].coordinates.length; k++) {
          if (json_data.points[j].coordinates[k][0] < left)
            left = json_data.points[j].coordinates[k][0];
          if (json_data.points[j].coordinates[k][0] > right)
            right = json_data.points[j].coordinates[k][0];
          if (json_data.points[j].coordinates[k][1] < down)
            down = json_data.points[j].coordinates[k][1];
          if (json_data.points[j].coordinates[k][1] > up)
            up = json_data.points[j].coordinates[k][1];
        }
        break;
      case 'MultiPolygon':
        for (let l = 0; l < json_data.points[j].coordinates.length; l++) {
          for (let m = 0; m < json_data.points[j].coordinates[l].length; m++) {
            for (
              let k = 0;
              k < json_data.points[j].coordinates[l][m].length;
              k++
            ) {
              if (json_data.points[j].coordinates[l][m][k][0] < left)
                left = json_data.points[j].coordinates[l][m][k][0];
              if (json_data.points[j].coordinates[l][m][k][0] > right)
                right = json_data.points[j].coordinates[l][m][k][0];
              if (json_data.points[j].coordinates[l][m][k][1] < down)
                down = json_data.points[j].coordinates[l][m][k][1];
              if (json_data.points[j].coordinates[l][m][k][1] > up)
                up = json_data.points[j].coordinates[l][m][k][1];
            }
          }
        }
        break;
      default:
    }
  }
  return { left, right, up, down };
}

function GetBounds() {
  //TODO get bounds, go through all files
}

function ConvertCoordinatesOneFile(json_data, left, right, up, down) {
  //TODO set corresponding parameters
  const scale = 10000;
  const width = (right - left) * scale,
    height = (up - down) * scale;
  for (let j = 0; j < json_data.points.length; j++) {
    switch (json_data.points[j].type) {
      case 'LineString':
        for (let k = 0; k < json_data.points[j].coordinates.length; k++) {
          json_data.points[j].coordinates[k][0] = Math.round(
            ((json_data.points[j].coordinates[k][0] - left) / (right - left)) *
              width
          );
          json_data.points[j].coordinates[k][1] = Math.round(
            ((json_data.points[j].coordinates[k][1] - down) / (up - down)) *
              height
          );
        }
        break;
      case 'MultiPolygon':
        for (let l = 0; l < json_data.points[j].coordinates.length; l++) {
          for (let m = 0; m < json_data.points[j].coordinates[l].length; m++) {
            for (
              let k = 0;
              k < json_data.points[j].coordinates[l][m].length;
              k++
            ) {
              json_data.points[j].coordinates[l][m][k][0] = Math.round(
                ((json_data.points[j].coordinates[l][m][k][0] - left) /
                  (right - left)) *
                  width
              );
              json_data.points[j].coordinates[l][m][k][1] = Math.round(
                ((json_data.points[j].coordinates[l][m][k][1] - down) /
                  (up - down)) *
                  height
              );
            }
          }
        }
        break;
      default:
    }
  }
}

function ConvertCoordinates(arr_of_file_names) {
  let { left, right, up, down } = GetBounds(arr_of_file_names);
  for (let i = 0; i < arr_of_file_names.length; i++) {
    //TODO load each file and convert coordinates
  }
}

export { ConvertCoordinates };
