global.onload = () => {
  let isEnabledGPS = !!global.navigator.geolocation;

  const LOCATIONS = {
    unebi: [ 34.508369, 135.793686 ],
    square: [ 34.506784, 135.795755 ],
    kango: [ 34.510087, 135.795766 ],
    uoko: [ 34.507943, 135.795779 ],
    "yagi-net": [ 34.511390, 135.795899 ],
  };

  let app = new Vue({
    el: "#app",
    data: {
      latitude: 0,
      longitude: 0,
      accuracy: 0,
      guess: isEnabledGPS ? "" : "NOT SUPPORTED",
      reports: Object.keys(LOCATIONS).map((key) => {
        return {
          place: key,
          latitude: LOCATIONS[key][0],
          longitude: LOCATIONS[key][1],
          distance: NaN,
          info: "",
        };
      }),
    },
    methods: {
      onClick() {
        if (isEnabledGPS) {
          this.guess = "SEARCH...";

          global.navigator.geolocation.getCurrentPosition((pos) => {
            this.latitude = pos.coords.latitude;
            this.longitude = pos.coords.longitude;
            this.accuracy = pos.coords.altitudeAccuracy;

            let maxDistance = Infinity;
            let nearPlace = null;

            this.reports.forEach((items) => {
              let dx = items.latitude - this.latitude;
              let dy = items.longitude - this.longitude;
              let distance = Math.sqrt(dx * dx + dy * dy);

              items.distance = distance;
              items.info = (distance / 0.0001) + "m";

              if (distance < maxDistance) {
                nearPlace = items;
                maxDistance = distance;
              }
            });

            if (nearPlace.distance <= 0.001) {
              this.guess = nearPlace.place;
            } else {
              this.guess = "NONE";
            }
          }, (e) => {
            this.guess = `ERROR: ${e}`;
          }, {
            enableHighAccuracy: true,
            timeout: Infinity,
            maximumAge: 0,
          });
        }
      },
    },
  });
};
