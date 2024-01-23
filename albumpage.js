const albumPhoto = document.getElementById('albumPhoto')
const albumName = document.getElementById('nomeAlbum')
const bandPhoto = document.getElementById('bandPhoto')
const bandName = document.getElementById('bandName')
const albumYear = document.getElementById('bandAnno')
const albumlength = document.getElementById('numeroBrani')
const albumDuration = document.getElementById('durataAlbum')
const albumId = new URLSearchParams(window.location.search).get('albumId')
const createTracks = (canzoni) => {
  canzoni.tracks.data.forEach((canzone, i) => {
    const col = document.createElement('div')
    col.classList.add('row')
    col.classList.add('pb-2')
    col.innerHTML = `<div class="col-1 text-center pt-3">${i + 1}</div>
        <div class="col-5 p-0 ">
          <h6>${canzone.title}</h6>
          <p class="m-0 pb-2">${canzone.artist.name}</p>
        </div>
        <div class="col-4 text-center p-0 pt-3">${canzone.rank}</div>
        <div class="col-2 text-center ps-3 pt-3">${canzone.duration}</div>`
    const row = document.getElementById('rowTrack')
    row.appendChild(col)
  })
}
const secondsToMinutes = (time) => {
  let hours = 0
  let minutes = 0
  let seconds = 0
  if (time >= 60) {
    minutes = parseInt(time / 60)
    if (minutes >= 60) {
      hours = parseInt(minutes / 60)
      minutes = minutes % 60
    }
    seconds = time % 60
  } else {
    minutes = 0
    seconds = time
  }
  if (seconds < 10) {
    seconds = `0${seconds}`
  }
  let result = `${minutes}:${seconds}`
  if (hours != 0) {
    result = `${hours}ora ${minutes}min ${seconds}sec.`
  }
  return result
}
const getAlbum = (albumId) => {
  fetch('https://striveschool-api.herokuapp.com/api/deezer/album/' + albumId)
    .then((response) => {
      console.log(response)
      if (response.ok) {
        return response.json()
      } else {
        throw new Error('Errore nella chiamata del server!')
      }
    })
    .then((data) => {
      albumPhoto.src = data.cover_medium
      albumName.innerText = data.title
      bandPhoto.src = data.artist.picture_small
      bandName.innerText = data.artist.name
      albumYear.innerText = data.release_date.slice(0, 4)
      albumlength.innerText = data.nb_tracks
      albumDuration.innerText = secondsToMinutes(data.duration)

      console.log(data)

      createTracks(data)
    })
    .catch((error) => {
      console.log(error)
    })
}
getAlbum('75621062')
