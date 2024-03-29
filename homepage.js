const card = document.getElementsByClassName("card border-0");
console.log(card);
const addressBarContent = new URLSearchParams(location.search);
const searchAlbumId = addressBarContent.get("albumId");
const searchIcon = document.getElementById("cerca");
const canzoniAscoltate = localStorage.getItem("canzoniAscoltate")
  ? JSON.parse(localStorage.getItem("canzoniAscoltate"))
  : [];
const menu = document.getElementById("menu");
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
                    <div class="card-body h-100 bg-dark p-1 d-flex flex-column justify-content-evenly align-items-center">
                    <p class="card-text fw-semibold text-white">
                      ${album.title}
                    </p>
                    <p class="artist">${data.data[i].artist.name}</p>
                    <div class="w-100 d-flex justify-content-center">
                    <button type="button" class="btn btn-spotifygreen rounded-circle text-black play"><i class="bi bi-play-circle-fill bg-spotifygreen"></i></button>
                    </div>
                    </div>
        `;
        const button = document.getElementsByClassName("play");
        const artist = document.getElementsByClassName("artist");

        button[i].addEventListener("click", function () {
          location.href = "./albumpage.html?albumId=" + album.id;
        });
        artist[i].addEventListener("click", function () {
          location.href =
            "./artistpage.html?artistId=" + data.data[i].artist.id;
        });
      }
    })
    .catch((err) => {
      console.log("errore nella prima chiamata", err);
    });
};
viewApiFunction();

const playerFunction = function () {
  const currentSong = JSON.parse(localStorage.getItem("canzoneInAtto"));
  const songsAscoltate = JSON.parse(localStorage.getItem("canzoniAscoltate"));
  console.log(currentSong);
  if (currentSong) {
    const player = document.getElementById("player");
    const player2 = document.getElementById("player2");
    const footerImg = document.getElementById("fotocanzone");
    const nomeCantante = document.getElementById("nomecantante");
    const nomeCanzone = document.getElementById("nomecanzone");
    const mobileFoto = document.getElementById("mobileFotoPlayer");
    const mobileTitle = document.getElementById("mobileTitle");
    footerImg.setAttribute("src", currentSong.cover);
    console.log(footerImg);
    nomeCanzone.innerHTML = `${currentSong.title}`;
    nomeCantante.innerHTML = `${currentSong.artist}`;
    mobileTitle.innerHTML = `${currentSong.title}`;
    mobileFoto.setAttribute("src", currentSong.cover);

    player.innerHTML = `<audio controls> <source src="${currentSong.player}" type="audio/mp3" class="bg-dark text-white"> </audio>`;
    player2.innerHTML = `<audio controls> <source src="${currentSong.player}" type="audio/mp3" class="bg-dark text-white"> </audio>`;
  }
  if (songsAscoltate) {
    for (let i = 0; i < songsAscoltate.length; i++) {
      const newLi = document.createElement("li");
      newLi.innerText = songsAscoltate[i];
      menu.appendChild(newLi);
    }
  }
};
playerFunction();
