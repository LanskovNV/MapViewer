import { status, GetFileCounts } from './Handle';

function GetBoundsOneFile(json_data) {
  let arr_bounds = new Array(4);
  switch (json_data.points[0].type) {
    case 'LineString':
      arr_bounds[0] = json_data.points[0].coordinates[0][0];
      arr_bounds[1] = arr_bounds[0];
      arr_bounds[2] = json_data.points[0].coordinates[0][1];
      arr_bounds[3] = arr_bounds[2];
      break;
    case 'MultiPolygon':
      arr_bounds[0] = json_data.points[0].coordinates[0][0][0][0];
      arr_bounds[1] = arr_bounds[2];
      arr_bounds[2] = json_data.points[0].coordinates[0][0][0][1];
      arr_bounds[3] = arr_bounds[2];
      break;
    default:
  }

  for (let j = 0; j < json_data.points.length; j++) {
    switch (json_data.points[j].type) {
      case 'LineString':
        for (let k = 0; k < json_data.points[j].coordinates.length; k++) {
          if (json_data.points[j].coordinates[k][0] < arr_bounds[0])
            arr_bounds[0] = json_data.points[j].coordinates[k][0];
          if (json_data.points[j].coordinates[k][0] > arr_bounds[1])
            arr_bounds[1] = json_data.points[j].coordinates[k][0];
          if (json_data.points[j].coordinates[k][1] > arr_bounds[2])
            arr_bounds[2] = json_data.points[j].coordinates[k][1];
          if (json_data.points[j].coordinates[k][1] < arr_bounds[3])
            arr_bounds[3] = json_data.points[j].coordinates[k][1];
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
              if (json_data.points[j].coordinates[l][m][k][0] < arr_bounds[0])
                arr_bounds[0] = json_data.points[j].coordinates[l][m][k][0];
              if (json_data.points[j].coordinates[l][m][k][0] > arr_bounds[1])
                arr_bounds[1] = json_data.points[j].coordinates[l][m][k][0];
              if (json_data.points[j].coordinates[l][m][k][1] > arr_bounds[2])
                arr_bounds[2] = json_data.points[j].coordinates[l][m][k][1];
              if (json_data.points[j].coordinates[l][m][k][1] < arr_bounds[3])
                arr_bounds[3] = json_data.points[j].coordinates[l][m][k][1];
            }
          }
        }
        break;
      default:
    }
  }
  return arr_bounds;
}

function GetBounds(arr_of_file_names) {
  let arr_bounds = new Array(4);
  const file_counts = GetFileCounts();
  for (let i = 0; i < file_counts.length; i++) {
    for (let j = 1; j <= file_counts[i]; j++) {
      let doc = document.getElementById(arr_of_file_names[i] + j + 'ProcFile');
      if (doc !== null) {
        fetch(doc.href)
          .then(status)
          .then(function(data) {
            const json_data = JSON.parse(
              String.fromCharCode.apply(null, new Uint8Array(data))
            );
            let arr_bounds_temp = GetBoundsOneFile(json_data);
            if (arr_bounds[0] === 0) {
              arr_bounds[0] = arr_bounds_temp[0];
              arr_bounds[1] = arr_bounds_temp[1];
              arr_bounds[2] = arr_bounds_temp[2];
              arr_bounds[3] = arr_bounds_temp[3];
            }
            if (arr_bounds_temp[0] < arr_bounds[0])
              arr_bounds[0] = arr_bounds_temp[0];
            if (arr_bounds_temp[1] > arr_bounds[1])
              arr_bounds[1] = arr_bounds_temp[1];
            if (arr_bounds_temp[2] > arr_bounds[2])
              arr_bounds[2] = arr_bounds_temp[2];
            if (arr_bounds_temp[3] < arr_bounds[3])
              arr_bounds[3] = arr_bounds_temp[3];
          })
          .catch(function(err) {
            alert(err);
          });
      }
    }
  }
  if (arr_bounds[0] === undefined) {
    arr_bounds[0] = 0;
    arr_bounds[1] = 0;
    arr_bounds[2] = 0;
    arr_bounds[3] = 0;
  }
  return arr_bounds;
}

function ConvertCoordinatesOneFile(json_data, left, right, up, down) {
  //TODO set corresponding parameters
  const scale = 1000;
  const width = (right - left) * scale,
    height = (up - down) * scale;
  console.log(left, right, up, down, width, height);
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
  return json_data;
}

function ConvertCoordinates(arr_of_file_names) {
  let arr_bounds = GetBounds(arr_of_file_names),
    file_counts = GetFileCounts();
  for (let i = 0; i < file_counts.length; i++) {
    for (let j = 1; j <= file_counts[i]; j++) {
      let doc = document.getElementById(arr_of_file_names[i] + j + 'ProcFile');
      if (doc !== null) {
        fetch(doc.href)
          .then(status)
          .then(function(data) {
            window.URL.revokeObjectURL(doc.href);
            let json_data = JSON.parse(
              String.fromCharCode.apply(null, new Uint8Array(data))
            );
            console.log(json_data);
            json_data = ConvertCoordinatesOneFile(
              json_data,
              arr_bounds[0],
              arr_bounds[1],
              arr_bounds[2],
              arr_bounds[3]
            );
            const blob = new Blob([JSON.stringify(json_data)], {
                type: 'text/json'
              }),
              f = new File([blob], doc.download, { type: 'text/json' });
            doc.href = window.URL.createObjectURL(f);
          })
          .catch(function(err) {
            alert(err);
          });
      }
    }
  }
}

export { ConvertCoordinates };
