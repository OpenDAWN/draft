const IS_ENABLED_GPS = !!global.navigator.geolocation;
const NAME = 0, DISTACNE = 1;

export function find(locations, accurate = 0.001) {
  if (!IS_ENABLED_GPS) {
    return Promise.resolve(null);
  }
  return new Promise((resolve) => {
    global.navigator.geolocation.getCurrentPosition(({ coords }) => {
      return resolve(findNearest(coords, locations, accurate));
    }, () => {
      return resolve(null);
    }, { enableHighAccuracy: true, timeout: Infinity, maximumAge: 0 });
  });
}

export function findNearest(coords, locations, accurate) {
  let nearest = Object.keys(locations).map((name) => {
    let dx = coords.latitude - locations[name].latitude;
    let dy = coords.longitude - locations[name].longitude;
    let distance = Math.sqrt(dx * dx + dy * dy);

    return [ name, distance ];
  }).sort((a, b) => a[DISTACNE] - b[DISTACNE]).shift();

  return nearest[DISTACNE] <= accurate ? nearest[NAME] : null;
}

export default { find };
