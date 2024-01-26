const form = document.getElementById("search");
const inputField = document.getElementById("inputText");
const searchButton = document.getElementById("searchButton");
const pageCentral = document.getElementById("page-central");
const albumId = new URLSearchParams(window.location.search).get("albumId");
const canzoniAscoltate = localStorage.getItem("canzoniAscoltate")
  ? JSON.parse(localStorage.getItem("canzoniAscoltate"))
  : [];

searchButton.addEventListener("click", function (e) {
  e.preventDefault();
  fetch(
    "  https://striveschool-api.herokuapp.com/api/deezer/search?q=" +
      inputField.value,
    {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhMzVjOTE4N2U1YzAwMTgxNGM1ZmMiLCJpYXQiOjE3MDU5OTYwNTMsImV4cCI6MTcwNzIwNTY1M30.Ju-0YfIcFvJojPntbOM3hBTb5togegsALw8Xl80OCqM",
      },
    }
  )
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error();
      }
    })
    .then((data) => {
      console.log(data);
      for (let i = 0; i < data.data.length; i++) {
        const searched = document.createElement("div");
        searched.classList.add(
          "row",
          "justify-content-center",
          "align-items-center",
          "mt-5",
          "text-white"
        );
        searched.innerHTML = `
        <div class="col-3 d-flex justify-content-end">
                  <img
                    src="${data.data[i].album.cover}"
                    alt="copertina"
                    width="50px"
                    
                  />
                </div>
                <div class="col-6">
                  <p>${data.data[i].title}</p>
                </div>

        `;
        pageCentral.appendChild(searched);
        searched.addEventListener("click", function () {
          location.href = "./albumpage.html?albumId=" + data.data[i].album.id;
        });
      }
    })
    .catch((err) => {
      console.log("errore nella chiamata", err);
    });
});

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

    player.innerHTML = `<audio controls> <source src="${currentSong.player}" type="audio/mp3" class="bg-dark text-white"> </audio>`;
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
