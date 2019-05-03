const KByte50 = 50 * 1024;
let streets_file_count = 1,
  houses_file_count = 1,
  water_file_count = 1;

function status(response) {
  if (response.status !== 200) {
    alert('Looks like there was a problem.');
  }

  // Examine the text in the response
  return response.arrayBuffer();
}

function saveByteArray(data, name, idName) {
  let a = document.createElement('a');
  document.head.appendChild(a);
  const blob = new Blob(data, { type: 'text/json' }),
    f = new File([blob], name, { type: 'text/json' });
  a.href = window.URL.createObjectURL(f);
  a.download = name;
  a.id = idName;
}

function HandleFile(buf_rest, file_name) {
  let n;
  switch (file_name) {
    case 'streets':
      n = streets_file_count;
      break;
    case 'houses':
      n = houses_file_count;
      break;
    case 'water':
      n = water_file_count;
      break;
    default:
  }
  let tempFile = document.getElementById(file_name + n + 'ProcFile');
  if (tempFile === null) {
    saveByteArray([''], file_name + n + '.json', file_name + n + 'ProcFile');
    tempFile = document.getElementById(file_name + n + 'ProcFile');
  }
  fetch(tempFile.href)
    .then(status)
    .then(function(data_temp) {
      window.URL.revokeObjectURL(tempFile.href);
      let data_str = String.fromCharCode.apply(null, new Uint8Array(data_temp));
      let buf_rest_json = JSON.stringify(buf_rest);
      let buf;

      if (data_str.length < 2 && n === 1) {
        buf = buf_rest_json.substr(0, buf_rest_json.length);
      } else {
        buf =
          data_str.substr(0, data_temp.byteLength - 2) +
          ',' +
          buf_rest_json.substr(11, buf_rest_json.length - 11);
      }

      let blob = new Blob([buf], { type: 'text/json' }),
        f = new File([blob], tempFile.download, { type: 'text/json' }),
        url = window.URL.createObjectURL(f);
      tempFile.href = url;
      if (buf.length > KByte50) {
        switch (file_name) {
          case 'streets':
            streets_file_count++;
            break;
          case 'houses':
            houses_file_count++;
            break;
          case 'water':
            water_file_count++;
            break;
          default:
        }
      }
      buf = null;
      f = null;
      blob = null;
      url = null;
    })
    .catch(function(err) {
      alert(err);
    });
}

export { status, saveByteArray, HandleFile };
