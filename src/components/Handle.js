const KByte50 = 50 * 1024;
let file_counts = [1, 1, 1];

function GetFileCounts() {
  return file_counts;
}

function status(response) {
  if (response.status !== 200) {
    alert('Looks like there was a problem.');
  }

  // Examine the text in the response
  return response.arrayBuffer();
}

function statusJSON(response) {
  if (response.status !== 200) {
    alert('Looks like there was a problem.');
  }

  // Examine the text in the response
  return response.json();
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
      n = file_counts[0];
      break;
    case 'houses':
      n = file_counts[1];
      break;
    case 'water':
      n = file_counts[2];
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

      if (data_str.length < 2) {
        buf = buf_rest_json.substr(0, buf_rest_json.length);
      } else {
        buf =
          data_str.substr(0, data_temp.byteLength - 2) +
          ',' +
          buf_rest_json.substr(10, buf_rest_json.length - 10);
      }

      let blob = new Blob([buf], { type: 'text/json' }),
        f = new File([blob], tempFile.download, { type: 'text/json' }),
        url = window.URL.createObjectURL(f);
      tempFile.href = url;
      if (buf.length > KByte50) {
        switch (file_name) {
          case 'streets':
            file_counts[0]++;
            break;
          case 'houses':
            file_counts[1]++;
            break;
          case 'water':
            file_counts[2]++;
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

function ClearTempFiles() {
  const file_names = ['streets', 'houses', 'water'];
  for (let i = 0; i < file_names.length; i++) {
    for (let j = 1; j <= file_counts[i]; j++) {
      let doc = document.getElementById(file_names[i] + j + 'ProcFile');
      if (doc !== null) {
        window.URL.revokeObjectURL(doc.href);
        document.head.removeChild(doc);
      }
    }
    file_counts[i] = 1;
  }
  document.head.removeChild(document.getElementById('restProcFile'));
}

function ClearFiles() {
  const file_names = ['streets', 'houses', 'water'];
  for (let i = 0; i < file_names.length; i++) {
    let doc = document.getElementById(file_names[i] + 'ProcFile');
    if (doc !== null) {
      window.URL.revokeObjectURL(doc.href);
      document.head.removeChild(doc);
    }
  }
}

export {
  status,
  statusJSON,
  saveByteArray,
  HandleFile,
  ClearTempFiles,
  ClearFiles,
  GetFileCounts
};
