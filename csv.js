function id(file) {
  return new Promise((resolve, reject) => {
    reader = new FileReader();
    reader.onload = function(e) {
      parsedLines = e.target.result.split(/\r|\n|\r\n/);
      resolve(parsedLines);
    };
    reader.readAsText(file);
  });
}

document.getElementById('fileInput').addEventListener('change', function(e) {
  var file = e.target.files[0];

  if (file != undefined) {
    id(file).then(id => {
      console.log(id)
      console.log(parsedLines)
      console.log(typeof id);

      var idInt = id.map(Number);

      var idFiltered = id.filter(function(v){return v!==''});

      console.log(idFiltered)

      idFiltered.forEach(idFiltered => {
        getRelease(idFiltered);
      });
    });
  }
});

function getRelease(idFiltered) {
  return fetch(`https://api.discogs.com/releases/${idFiltered}`, {
    'User-Agent': 'Dispodger/0.1',
  })
    .then(response => response.json())
    .then(data => {
      if (data.message === 'Release not found.') {
        return { error: `Release with ID ${idFiltered} does not exist` };
      } else {
        const id = data.id;
        const artists = data.artists ? data.artists.map(artist => artist.name) : [];
        const country = data.country || 'Unknown';
        const released = data.released_formatted || 'Unknown';
        const genres = data.genres || [];
        const styles = data.styles || [];
        const tracklist = data.tracklist ? data.tracklist.map(track => track.title) : [];

        console.log(idFiltered);
      console.log(artists, country, released, genres, styles, tracklist)

        let htmlString =`<tr>
        <td>${idFiltered}</td>
        <td>${artists}</td>
        <td>${country}</td>
        <td>${released}</td>
        <td>${genres}</td>
        <td>${styles}</td>
        <td>${tracklist}</td>
        </tr>`

        document.getElementById('tableRow').innerHTML =
        htmlString;

        return { idFiltered, artists, country, released, genres, styles, tracklist };
      }
    });
}
