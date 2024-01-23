const card = document.getElementsByClassName("card border-0");
console.log(card);
const addressBarContent = new URLSearchParams(location.search);
const searchAlbumId = addressBarContent.get("albumId");

const viewApiFunction = function () {
  fetch("  https://striveschool-api.herokuapp.com/api/deezer/search?q=pop", {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhMzVjOTE4N2U1YzAwMTgxNGM1ZmMiLCJpYXQiOjE3MDU5OTYwNTMsImV4cCI6MTcwNzIwNTY1M30.Ju-0YfIcFvJojPntbOM3hBTb5togegsALw8Xl80OCqM",
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error();
      }
    })
    .then((data) => {
      console.log(data);
      console.log(data.data);
      for (let i = 0; i < data.data.length; i++) {
        console.log(data.data[i].album);
        const album = data.data[i].album;
        console.log(album.id);

        card[i].innerHTML = `
        <img
                      src="${album.cover}"
                      class="card-img-top"
                      alt="copertina"
                      
                    />
                    <div class="card-body bg-dark p-1 d-flex flex-column justify-content-between align-items-start">
                    <p class="card-text fw-semibold text-white">
                      ${album.title}
                    </p>
                    <p class="text-white">${data.data[i].title}</p>
                    <button type="button" class="btn btn-success rounded-circle text-black play"><i class="bi bi-play-circle-fill bg-success"></i></button>
                    </div>
        `;
        const button = document.getElementsByClassName("play");

        button[i].addEventListener("click", function () {
          location.href = "./albumpage.html" + album.id;
        });
      }
    })
    .catch((err) => {
      console.log("errore nella prima chiamata", err);
    });
};
viewApiFunction();
