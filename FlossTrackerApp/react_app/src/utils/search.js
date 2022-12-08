function searchThreads(searchTerms, threads, limit=5) {
  // can search by number, brand, or name
  // for each thread in threads, see if the searchTerms match number, id, or name
  // are going to have to prioritize matches to those that match the most search terms

  let matches = [];

  const splitTerms = searchTerms.split(' ');
  if (splitTerms.length == 0) return matches;

  for (let idx in threads) {
    let thread = threads[idx];
    thread.priority = 0;

    splitTerms.forEach((term) => {
      // if term is not a number, compare to name or brand. if term is a number, compare to brand number
      term = term.toLowerCase();

      if (isNaN(term)) {
        const brand = thread.brand.name.toString().toLowerCase();
        const name = thread.name.toLowerCase();

        // not a number: compare to name or brand
        if (brand.includes(term) || name.includes(term)) {
          thread.priority++;
          matches.push(thread);
        }

        // bonus priority for being at the start of the name or brand
        if (brand.startsWith(term) || name.startsWith(term)) thread.priority++;

      } else {
        const num = parseInt(term);
        if (thread.brand_number == num) {
          thread.priority++;
          matches.push(thread);
        }
      }
    });
  }

  return matches.sort((a, b) => b.priority - a.priority).slice(0, limit);
}

export { searchThreads };