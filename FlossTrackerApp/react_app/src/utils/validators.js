function makeValidSkeinsOwned(text) {
  if (!text.includes('.')) text += '.';

  const halves = text.split('.');
  if (halves[1].length > 2) {
    halves[1] = halves[1].substring(0, 2);
  }
  const joined = halves[0] + '.' + halves[1];
  return joined;
}

function autofilledThreadToID(text, threads) {
  const parts = text.split(' ');
  const brandName = parts[0];
  const brandNumber = parts[1].slice(0, -1);
  
  const thread = threads.filter(e => e.brand_number === brandNumber).find(e => e.brand.name === brandName);
  
  return thread.id;
}

export { makeValidSkeinsOwned, autofilledThreadToID };