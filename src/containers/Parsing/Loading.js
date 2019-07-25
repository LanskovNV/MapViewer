/*
 * @desc reads data from file
 * @param file - file to read
 * @param callbackProgressF - function to process read data chunks
 * @param callbackEndF - function to process last read data chunk
 */
export default function loading(
  file,
  callbackProgressF,
  callbackEndF,
  callback
) {
  const CHUNK_SIZE = 10 * 1024;
  let start = 0;
  let end;
  let slice;
  const extension = file.name.slice(file.name.lastIndexOf('.') - 1 + 2);
  if (file === undefined) {
    return;
  }
  if (extension !== 'json' && extension !== 'geojson') {
    alert('Wrong extension. Should be .json or .geojson');
    return;
  }
  if (file.size === 0) {
    return;
  }
  let reader = new FileReader();
  reader.onload = function(evt) {
    reader.offset = start;
    callbackRead(
      this,
      file,
      evt,
      callbackProgressF,
      callbackEndF,
      callback,
      Load
    );
    start += CHUNK_SIZE;
  };
  reader.size = CHUNK_SIZE;

  Load();
  function Load() {
    if (start < file.size) {
      end = min(start + CHUNK_SIZE, file.size);
      slice = file.slice(start, end);
      reader.readAsArrayBuffer(slice);
      end = null;
      slice = null;
    }
  }

  /*
   * @desc returns minimum
   * @params a, b - values
   * @return value - minimum out of 'a' and 'b'
   */
  function min(a, b) {
    return a < b ? a : b;
  }

  /*
   * @desc calls corresponding function to process read data
   * @param reader - FileReader
   * @param file - read file
   * @param evt - event
   * @param callbackProgressF - function to process read data chunks
   * @param callbackEndF - function to process last read data chunk
   */
  function callbackRead(
    reader,
    file,
    evt,
    callbackProgressF,
    callbackEndF,
    callback,
    Load
  ) {
    if (reader.offset + reader.size < file.size) {
      callbackProgressF(evt.target.result, Load);
    } else {
      callbackEndF(evt.target.result, callback);
    }
  }
}
