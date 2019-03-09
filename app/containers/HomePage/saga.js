import { put, select, takeLatest } from 'redux-saga/effects';
import { LOAD_REPOS } from 'containers/App/constants';
import { reposLoaded, repoLoadingError } from 'containers/App/actions';

import { makeSelectUsername } from 'containers/HomePage/selectors';
import { mapList } from 'readyMaps/config.json';

export function* getMapList() {
  const username = yield select(makeSelectUsername());

  try {
    const repos = yield mapList;
    yield put(reposLoaded(repos, username));
  } catch (err) {
    yield put(repoLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* mapListData() {
  // Watches for LOAD_REPOS actions and calls getMapList when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOAD_REPOS, getMapList);
}
