function compare(triangles1, triangles2) {
  if (triangles1.length !== triangles2.length) return false;

  for (let i = 0; i < triangles1.length; i++) {
    if (triangles1[i].length !== 3 || !find(triangles1[i], triangles2)) {
      return false;
    }
  }
  return true;
}

function find(triangle, triangles) {
  for (let i = 0; i < triangles.length; i++) {
    if (isMatch(triangle, triangles[i])) return true;
  }
  return false;
}

function isMatch(tr1, tr2) {
  let cnt1 = 0;
  let cnt2 = 0;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (tr1[i][0] === tr2[j][0] && tr1[i][1] === tr2[j][1]) {
        cnt1++;
        break;
      }
    }
  }

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (tr2[i][0] === tr1[j][0] && tr2[i][1] === tr1[j][1]) {
        cnt2++;
        break;
      }
    }
  }

  if (cnt1 === 3 && cnt2 === 3) {
    return true;
  }
  return false;
}

function isCorrect(triangles, correctResults) {
  for (let i = 0; i < correctResults.length; i++) {
    if (compare(triangles, correctResults[i])) {
      return true;
    }
  }
  return false;
}

export default isCorrect;
