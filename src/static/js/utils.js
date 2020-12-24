export function getRandomItem(arr) {
  return arr[Math.floor(arr.length * Math.random())];
}

export function randomArray(start, end, maxLength = 8) {
  const count = Math.floor(maxLength * Math.random());
  const output = [];
  for (let i = 0; i < count; i++) {
    output.push(Math.floor((end - start) * Math.random()) + start);
  }
  return output.filter((item, pos) => output.indexOf(item) == pos);
}

export function paginate(array, page_size, page_number) {
  return array.slice((page_number - 1) * page_size, page_number * page_size);
}

export function pathToRegex(path) {
  return new RegExp(
    '^' + path.replace(/\//g, '\\/').replace(/:\w+/g, '(.+)') + '$'
  );
}

export function getParams(match) {
  const values = match.result.slice(1);
  const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(
    (result) => result[1]
  );

  return Object.fromEntries(
    keys.map((key, i) => {
      return [key, values[i]];
    })
  );
}
