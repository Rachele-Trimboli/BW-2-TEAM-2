const form = document.getElementById("search");
const inputField = document.getElementById("inputText");
const searchButton = document.getElementById("searchButton");
const pageCentral = document.getElementById("page-central");
const albumId = new URLSearchParams(window.location.search).get("albumId");

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
        <div class="col-3">
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
