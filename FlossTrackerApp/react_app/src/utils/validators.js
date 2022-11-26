function makeValidSkeinsOwned(text) {
  if (!text.includes('.')) text += '.';

  const halves = text.split('.');
  if (halves[1].length > 2) {
    halves[1] = halves[1].substring(0, 2);
  }
  const joined = halves[0] + '.' + halves[1];
  return joined;
}

export { makeValidSkeinsOwned };