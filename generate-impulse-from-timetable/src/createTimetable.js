const TO_N = [ 1380, 2460, 1500, 2460, 1500, 2880, 1980, 3540, 2820, 3540, 3540, 4320, 4080, 2640, 1860, 1380, 2160, 2640, 2220, 2460, 1920, 2940, 3540 ];
const TO_S = [ 3900, 1620, 2400, 1500, 2280, 3780, 3660, 3540, 3540, 3480, 3600, 2580, 2340, 2280, 2160, 1560, 1980, 2520, 2100, 1920, 2100, 2700, 2700 ];

function rotate(list, index) {
  let result = list.slice();

  return result.slice(index).concat(result.slice(0, index));
}

function uniq(list) {
  let result = [];

  list.forEach((x) => {
    if (result.indexOf(x) === -1) {
      result.push(x);
    }
  });

  return result;
}

function crawl(list, zoom, limit) {
  let result = [];
  let time = 0;
  let i = 0;

  while (time < limit) {
    time += list[i++ % list.length] * zoom;

    result.push(time);
  }

  return result;
}

export default function(zoom, limit) {
  let result = [];

  for (let i = 0; i < TO_N.length; i++) {
    for (let j = 0; j < TO_S.length; j++) {
      let a = crawl(rotate(TO_N, i), zoom, limit);
      let b = crawl(rotate(TO_S, j), zoom, limit);
      let list = [].concat(a, b);

      list = list.map(x => limit <= x ? x % limit : x);
      list = list.map(Math.round);
      list = uniq(list);
      list = list.sort((a, b) => a - b);

      result.push(list);
    }
  }

  return result;
}
