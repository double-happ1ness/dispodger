const request = new XMLHttpRequest();
request.open('GET',
`https://api.discogs.com/releases/${searchDetails}`);
 request.send();

    request.addEventListener('readystatechange', (e) => {
    if (e.target.readyState === 4) {
        const data = JSON.parse(e.target.response);
        if (data.message === 'Release not found.') {
            alert('Release ID does not exist');
        } else {
            console.log(data);
            const id = data.id;
            const artist = data.artists[0].name;
            var country = data.country;
            if (country == "") country = "Unknown";
            var released = data.released_formatted;
            if (typeof released == 'undefined') released = "Unknown";
            const genres = data.genres[0];
            var styles = data.styles;
            if (typeof styles == 'undefined') styles = "None";
            let tracklist =''; //sets tracklist to an empty string

            if (data.tracklist.length > 1) {
                data.tracklist.forEach(
                    (track) => {
                        tracklist += `${track.title}, `
                    }
                )
            } else {
                tracklist = data.tracklist.title;
            }

            tracklist = tracklist.slice(0, -2); //Removes the last two characters from the tracklist

console.log(typeof country);

            let htmlString =`<tr>
            <td>${id}</td>
            <td>${artist}</td>
            <td>${country}</td>
            <td>${released}</td>
            <td>${genres}</td>
            <td>${styles}</td>
            <td>${tracklist}</td>
            </tr>`

            document.getElementById('tableRow').innerHTML =
 htmlString;  //Sends output to a web-page

        }
    }
})

$(document).ready(function(){    //DOM manipulation code
    $('#upload').click(function(){

        var csv = $('#filename');
        var csvFile = csv[0].files[0];
        var ext = csv.val().split(".").pop().toLowerCase();

        if($.inArray(ext, ["csv"]) === -1){
            alert('upload csv');
            return false; //Checks the file type
        }
        if(csvFile != undefined){
            reader = new FileReader();
            reader.onload = function(e){

                csvResult = e.target.result.split(/\r|\n|\r\n/); //Splits string by new line
                $('.csv').append(csvResult);
                console.log(csvResult); // getReleases needs to be here

                var id = $.map($('#csvResult').text().split(','), function(value){
                    return parseInt(value, 10);
                });

                                console.log(id);

                function getReleases(id) { //ID should be an integer
                  const request = new XMLHttpRequest();
                  request.open('GET',
                  `https://api.discogs.com/releases/${id}`);
                   request.send();

                      request.addEventListener('readystatechange', (e) => {
                      if (e.target.readyState === 4) {
                          const data = JSON.parse(e.target.response);
                          if (data.message === 'Release not found.') {
                              alert('Release ID does not exist');
                          } else {
                              console.log(data);
                              const id = data.id;
                              const artist = data.artists[0].name;
                              var country = data.country;
                              if (country == "") country = "Unknown";
                              var released = data.released_formatted;
                              if (typeof released == 'undefined') released = "Unknown";
                              const genres = data.genres[0];
                              var styles = data.styles;
                              if (typeof styles == 'undefined') styles = "None";
                              let tracklist =''; //sets tracklist to an empty string

                              if (data.tracklist.length > 1) {
                                  data.tracklist.forEach(
                                      (track) => {
                                          tracklist += `${track.title}, `
                                      }
                                  )
                              } else {
                                  tracklist = data.tracklist.title;
                              }

                              tracklist = tracklist.slice(0, -2); //Removes the last two characters from the tracklist

                              let htmlString =`<tr>
                              <td>${id}</td>
                              <td>${artist}</td>
                              <td>${country}</td>
                              <td>${released}</td>
                              <td>${genres}</td>
                              <td>${styles}</td>
                              <td>${tracklist}</td>
                              </tr>`

                              document.getElementById('tableRow').innerHTML =
                   htmlString;  //Sends output to a web-page
                }
                }
                })

                }

            }
            reader.readAsText(csvFile);
        }
    });
});
