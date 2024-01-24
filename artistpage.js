const artistId = new URLSearchParams(window.location.search).get('artistId')
const cantante = document.getElementById('cantante')
const ascoltatori = document.getElementById('ascoltatori')
const sfondo = document.getElementById('sfondo')

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
  let result = `${minutes}min ${seconds} sec.`
  if (hours != 0) {
    result = `${hours}ora ${minutes}min ${seconds}sec.`
  }
  return result
}
const secondsToMinutes2 = (time) => {
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
    result = `${hours}:${minutes}:${seconds}`
  }
  return result
}

const createTracks = (tracks) => {
  tracks.data.forEach((track, i) => {
    const col = document.createElement('div')
    col.classList.add('row')
    col.classList.add('pb-3')
    col.classList.add('align-items-center')
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
      )}</div>`
    const row = document.getElementById('rowTrack')
    row.appendChild(col)
  })
}

const getArtists = (artistId) => {
  fetch('https://striveschool-api.herokuapp.com/api/deezer/artist/' + artistId)
    .then((response) => {
      console.log(response)
      if (response.ok) {
        return response.json()
      } else {
        throw new Error('Errore nella chiamata del server!')
      }
    })
    .then((artistData) => {
      // ---QUI MANIPOLO I DATI DELL'ARTISTA
      console.log(artistData)
      cantante.innerText = artistData.name
      ascoltatori.innerText = artistData.nb_fan + ' ascoltatori mensili'
      sfondo.setAttribute(
        'style',
        `background-image: url(${artistData.picture_big})`
      )
      fetch(artistData.tracklist)
        .then((response) => {
          console.log(response)
          if (response.ok) {
            return response.json()
          } else {
            throw new Error('Errore nella chiamata del server!')
          }
        })
        .then((tracksData) => {
          // --- QUI MANIPOLO LA SEZIONE POPOLARI

          console.log(tracksData)
          createTracks(tracksData)
        })
    })
    .catch((error) => {
      console.log(error)
    })
}
getArtists(artistId)
