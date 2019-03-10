import { select, takeLatest } from 'redux-saga/effects';
import { READ_MAP } from 'containers/App/constants';
import { makeSelectMapName } from '../App/selectors';

export function* readChosenMap() {
  const mapname = yield select(makeSelectMapName());
  // For future testing and to not leave 'mapname' unused
  console.log(mapname);
  // TODO Method for reading and parsing map file
}

export default function* mapData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(READ_MAP, readChosenMap);
}
