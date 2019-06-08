/**
 * File size
 * @type {number}
 */
const KByte50 = 50 * 1024;
/**
 * Counts for streets, houses and water files
 * @type {number[]}
 */
let file_counts = [1, 1, 1];

/**
 * gets files' counts
 * @returns {number[]}
 * @constructor
 */
function GetFileCounts() {
  return file_counts;
}

/**
 * @desc processes fetch response into arrayBuffer
 * @param {Response} response - response get from fetch
 * @returns {ArrayBuffer | Promise<ArrayBuffer>} response.arrayBuffer() - request result as arrayBuffer
 */
function status(response) {
  if (response.status !== 200) {
    alert('Looks like there was a problem.');
  }

  // Examine the text in the response
  return response.arrayBuffer();
}

/**
 * @desc processes fetch response into json
 * @param {Response} response - response get from fetch
 * @returns {json} response.json() - request result as json
 */
function statusJSON(response) {
  if (response.status !== 200) {
    alert('Looks like there was a problem.');
  }

  // Examine the text in the response
  return response.json();
}

/**
 * @desc creates a File and appends it to the header via link
 * @param {Array} data - initial data that will be recorded in file
 * @param {string} name - file name
 * @param {string} idName - link id
 */
function saveByteArray(data, name, idName) {
  let a = document.createElement('a');
  document.head.appendChild(a);
  const blob = new Blob(data, { type: 'text/json' }),
    f = new File([blob], name, { type: 'text/json' });
  a.href = window.URL.createObjectURL(f);
  a.download = name;
  a.id = idName;
}

/**
 * @desc appends new data to corresponding file
 * @param {json} buf_rest - data to append
 * @param {string} file_name - file's name to which it is needed to append
 */
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
    // File to write is not created
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
        // Empty file
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
        // Reached file's size restriction (set by Map-Viewer's developers)
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

/**
 * @desc clears all temporary files
 */
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

/**
 * @desc clears files with ready map data
 */
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
