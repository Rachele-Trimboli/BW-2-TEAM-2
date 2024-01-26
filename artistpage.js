const artistId = new URLSearchParams(window.location.search).get("artistId");
const cantante = document.getElementById("cantante");
const ascoltatori = document.getElementById("ascoltatori");
const sfondo = document.getElementById("sfondo");
const menu = document.getElementById("menu");
const canzoniAscoltate = localStorage.getItem("canzoniAscoltate")
  ? JSON.parse(localStorage.getItem("canzoniAscoltate"))
  : [];

const secondsToMinutes = (time) => {
  let hours = 0;
  let minutes = 0;
  let seconds = 0;
  if (time >= 60) {
    minutes = parseInt(time / 60);
    if (minutes >= 60) {
      hours = parseInt(minutes / 60);
      minutes = minutes % 60;
    }
    seconds = time % 60;
  } else {
    minutes = 0;
    seconds = time;
  }
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  let result = `${minutes}min ${seconds} sec.`;
  if (hours != 0) {
    result = `${hours}ora ${minutes}min ${seconds}sec.`;
  }
  return result;
};
const secondsToMinutes2 = (time) => {
  let hours = 0;
  let minutes = 0;
  let seconds = 0;
  if (time >= 60) {
    minutes = parseInt(time / 60);
    if (minutes >= 60) {
      hours = parseInt(minutes / 60);
      minutes = minutes % 60;
    }
    seconds = time % 60;
  } else {
    minutes = 0;
    seconds = time;
  }
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  let result = `${minutes}:${seconds}`;
  if (hours != 0) {
    result = `${hours}:${minutes}:${seconds}`;
  }
  return result;
};

const createTracks = (tracks) => {
  tracks.data.forEach((track, i) => {
    const col = document.createElement("div");
    col.classList.add("row");
    col.classList.add("pb-3");
    col.classList.add("align-items-center");
    col.innerHTML = ` <div class="col-1 text-center">${i + 1}</div>
      <div class="col-1 p-0">
        <img src="${track.album.cover_small}" width="35px"/>
      </div>
      <div class="col-6">
        <h6>${track.title}</h6>
      </div>
      <div class="col-2 text-center p-0">${track.rank}</div>
      <div class="col-2 text-center pe-3 ps-5">${secondsToMinutes2(
        track.duration
      )}</div>`;
    const row = document.getElementById("rowTrack");
    row.appendChild(col);
    const imgFooter = document.getElementById("fotocanzone");
    const nomeCantante = document.getElementById("nomecantante");
    const nomeCanzone = document.getElementById("nomecanzone");
    const mobileFoto = document.getElementById("mobileFotoPlayer");
    const mobileTitle = document.getElementById("mobileTitle");
    const player2 = document.getElementById("player2");

    col.addEventListener("click", function () {
      imgFooter.setAttribute("src", track.album.cover);
      nomeCantante.innerHTML = `${track.artist.name}`;
      nomeCanzone.innerHTML = `${track.title}`;
      mobileTitle.innerHTML = `${track.title}`;
      mobileFoto.setAttribute("src", track.album.cover);
      const player = document.getElementById("player");
      player.innerHTML = `<audio controls> <source src="${track.preview}" type="audio/mp3" class="bg-dark text-white"></audio>`;
      player2.innerHTML = `<audio controls> <source src="${track.preview}" type="audio/mp3" class="bg-dark text-white"> </audio>`;
      const newLi = document.createElement("li");
      newLi.innerText = `${track.title}`;
      newLi.classList.add("nav-item");
      menu.appendChild(newLi);
      canzoniAscoltate.push(newLi.innerText);
      console.log(canzoniAscoltate);
      const newSong = {
        title: track.title,
        artist: track.artist.name,
        cover: track.album.cover,
        player: track.preview,
      };
      localStorage.setItem("canzoneInAtto", JSON.stringify(newSong));
      localStorage.setItem(
        "canzoniAscoltate",
        JSON.stringify(canzoniAscoltate)
      );
    });
  });
};

const getArtists = (artistId) => {
  fetch("https://striveschool-api.herokuapp.com/api/deezer/artist/" + artistId)
    .then((response) => {
      console.log(response);
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore nella chiamata del server!");
      }
    })
    .then((artistData) => {
      // ---QUI MANIPOLO I DATI DELL'ARTISTA
      console.log(artistData);
      cantante.innerText = artistData.name;
      ascoltatori.innerText = artistData.nb_fan + " ascoltatori mensili";
      sfondo.setAttribute(
        "style",
        `background-image: url(${artistData.picture_big})`
      );
      fetch(artistData.tracklist)
        .then((response) => {
          console.log(response);
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Errore nella chiamata del server!");
          }
        })
        .then((tracksData) => {
          // --- QUI MANIPOLO LA SEZIONE POPOLARI

          console.log(tracksData);
          createTracks(tracksData);
        });
    })
    .catch((error) => {
      console.log(error);
    });
};
getArtists(artistId);
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
