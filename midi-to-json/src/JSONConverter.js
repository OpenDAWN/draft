function ticksToSeconds(ticks, tempo, ticksPerBeat) {
  return (ticks / ticksPerBeat) * (60 / tempo);
}

function convert(data, tempo) {
  let ticksPerBeat = data.header.ticksPerBeat;
  let tracks = [];

  data.tracks.forEach((track, i) => {
    let time = 0;
    let memo = [];

    tracks[i] = [];

    track.forEach((items, j) => {
      time += items.deltaTime;

      if (items.subtype === "noteOn") {
        let note = {};

        note.time = time;
        note.track = i;
        note.noteNumber = items.noteNumber,
        note.velocity = items.velocity;

        if (!memo[items.noteNumber]) {
          memo[items.noteNumber] = [];
        }

        memo[items.noteNumber].push(note);

        tracks[i].push(note);
      }

      if (items.subtype === "noteOff") {
        if (!memo[items.noteNumber]) {
          console.log([ i, j, time ], items.noteNumber + " NOT exists?")
        } else {
          memo[items.noteNumber][0].gateTime = time - memo[items.noteNumber][0].time;
          memo[items.noteNumber].shift();
        }
      }
    });
  });

  tracks = tracks.reduce((a, b) => a.concat(b), []);
  tracks.sort((a, b) => a.time - b.time);


  return tracks;
}

function convertTicksToSeconds(data, tempo) {
  return data.map((items) => {
    return {
      time: ticksToSeconds(items.time, tempo, ticksPerBeat),
      track: items.track,
      noteNumber: items.noteNumber,
      velocity: items.velocity,
      gateTime: ticksToSeconds(items.gateTime, tempo, ticksPerBeat),
    }
  });
}

export default { convert, convertTicksToSeconds };
