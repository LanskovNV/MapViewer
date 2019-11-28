import { statusJSON, GetFileCounts, saveByteArray } from './Handle';

/**
 * @desc assembles multiple files "fileName##index" into single file "fileName",
 *       files to assemble: ["streets##index", "houses##index", "water##index"]
 * @param {Function} callback - function called when all files assembled
 */
async function Assemble(callback) {
  const arr_names = ['streets', 'houses', 'water'],
    arr_counts = GetFileCounts();

  saveByteArray(
    ['{"items":[]}'],
    arr_names[0] + '.json',
    arr_names[0] + 'ProcFile'
  );
  saveByteArray(
    ['{"items":[]}'],
    arr_names[1] + '.json',
    arr_names[1] + 'ProcFile'
  );
  saveByteArray(
    ['{"items":[]}'],
    arr_names[2] + '.json',
    arr_names[2] + 'ProcFile'
  );

  for (let i = 0; i < arr_counts.length; i++) {
    for (let j = 1; j <= arr_counts[i]; j++) {
      let doc = document.getElementById(arr_names[i] + j + 'ProcFile');
      if (doc !== null) {
        await fetch(doc.href)
          .then(statusJSON)
          .then(function(json_data) {
            let docFull = document.getElementById(arr_names[i] + 'ProcFile');
            fetch(docFull.href)
              .then(statusJSON)
              .then(function(json_save_data) {
                for (let k = 0; k < json_data.items.length; k++) {
                  json_save_data.items.push(json_data.items[k]);
                }
                const blob = new Blob([JSON.stringify(json_save_data)], {
                    type: 'text/json'
                  }),
                  f = new File([blob], docFull.download, { type: 'text/json' });
                docFull.href = window.URL.createObjectURL(f);
                if (i === arr_counts.length - 1 && j === arr_counts[i]) {
                  callback();
                }
              })
              .catch(function(err) {
                alert(err);
              });
          })
          .catch(function(err) {
            alert(err);
          });
      }
    }
  }
}

async function AssembleStreets() {
  const name = 'streets',
    counts = GetFileCounts()[0];

  saveByteArray(['{"items":[]}'], name + '.json', name + 'ProcFile');

  for (let j = 1; j <= counts; j++) {
    let doc = document.getElementById(name + j + 'ProcFile');
    if (doc !== null) {
      await fetch(doc.href)
        .then(statusJSON)
        .then(function(json_data) {
          let docFull = document.getElementById(name + 'ProcFile');
          fetch(docFull.href)
            .then(statusJSON)
            .then(async function(json_save_data) {
              for (let k = 0; k < json_data.items.length; k++) {
                json_save_data.items.push(json_data.items[k]);
              }
              const blob = await new Blob([JSON.stringify(json_save_data)], {
                  type: 'text/json'
                }),
                f = await new File([blob], docFull.download, {
                  type: 'text/json'
                });
              docFull.href = await window.URL.createObjectURL(f);
            })
            .catch(function(err) {
              alert(err);
            });
        })
        .catch(function(err) {
          alert(err);
        });
    }
  }
}

async function AssembleHouses() {
  const name = 'houses',
    counts = GetFileCounts()[1];

  saveByteArray(['{"items":[]}'], name + '.json', name + 'ProcFile');

  for (let j = 1; j <= counts; j++) {
    let doc = document.getElementById(name + j + 'ProcFile');
    if (doc !== null) {
      await fetch(doc.href)
        .then(statusJSON)
        .then(function(json_data) {
          let docFull = document.getElementById(name + 'ProcFile');
          fetch(docFull.href)
            .then(statusJSON)
            .then(async function(json_save_data) {
              for (let k = 0; k < json_data.items.length; k++) {
                json_save_data.items.push(json_data.items[k]);
              }
              const blob = await new Blob([JSON.stringify(json_save_data)], {
                  type: 'text/json'
                }),
                f = await new File([blob], docFull.download, {
                  type: 'text/json'
                });
              docFull.href = await window.URL.createObjectURL(f);
            })
            .catch(function(err) {
              alert(err);
            });
        })
        .catch(function(err) {
          alert(err);
        });
    }
  }
}

async function AssembleWater() {
  const name = 'water',
    counts = GetFileCounts()[2];

  saveByteArray(['{"items":[]}'], name + '.json', name + 'ProcFile');

  for (let j = 1; j <= counts; j++) {
    let doc = document.getElementById(name + j + 'ProcFile');
    if (doc !== null) {
      await fetch(doc.href)
        .then(statusJSON)
        .then(function(json_data) {
          let docFull = document.getElementById(name + 'ProcFile');
          fetch(docFull.href)
            .then(statusJSON)
            .then(async function(json_save_data) {
              for (let k = 0; k < json_data.items.length; k++) {
                json_save_data.items.push(json_data.items[k]);
              }
              const blob = await new Blob([JSON.stringify(json_save_data)], {
                  type: 'text/json'
                }),
                f = await new File([blob], docFull.download, {
                  type: 'text/json'
                });
              docFull.href = await window.URL.createObjectURL(f);
            })
            .catch(function(err) {
              alert(err);
            });
        })
        .catch(function(err) {
          alert(err);
        });
    }
  }
}

export { AssembleHouses, AssembleStreets, AssembleWater };
