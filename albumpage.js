const albumPhoto = document.getElementById('albumPhoto')
const albumName = document.getElementById('nomeAlbum')
const bandPhoto = document.getElementById('bandPhoto')
const bandName = document.getElementById('bandName')
const albumYear = document.getElementById('bandAnno')
const albumlength = document.getElementById('numeroBrani')
const albumDuration = document.getElementById('durataAlbum')
const canzoniAscoltate = localStorage.getItem('canzoniAscoltate')
  ? JSON.parse(localStorage.getItem('canzoniAscoltate'))
  : []
const albumId = new URLSearchParams(window.location.search).get('albumId')
const createTracks = (canzoni) => {
  canzoni.tracks.data.forEach((canzone, i) => {
    const col = document.createElement('div')
    col.classList.add('row')
    col.classList.add('pb-2')
    col.innerHTML = `<div class="col-1 text-center pt-3">${i + 1}</div>
        <div class="col-5 p-0 ">
          <h6 class="text-white">${canzone.title}</h6>
          <p class="m-0 pb-2">${canzone.artist.name}</p>
        </div>
        <div class="col-4 text-center p-0 pt-3 d-none d-md-inline">${
          canzone.rank
        }</div>
        <div class="col-2 text-center ps-3 pt-3">${secondsToMinutes2(
          canzone.duration
        )}</div>`
    const row = document.getElementById('rowTrack')
    row.appendChild(col)
    const footerImg = document.getElementById('fotocanzone')
    const nomeCantante = document.getElementById('nomecantante')
    const nomeCanzone = document.getElementById('nomecanzone')
    const mobileFoto = document.getElementById('mobileFotoPlayer')
    const mobileTitle = document.getElementById('mobileTitle')
    col.addEventListener('click', function () {
      footerImg.setAttribute('src', canzone.album.cover)
      console.log(footerImg)
      console.log(canzone.album.cover)
      nomeCanzone.innerHTML = `${canzone.title}`
      nomeCantante.innerHTML = `${canzone.artist.name}`
      mobileTitle.innerHTML = `${canzone.title}`
      mobileFoto.setAttribute('src', canzone.album.cover)
      const player = document.getElementById('player')
      const player2 = document.getElementById('player2')
      player.innerHTML = `<audio controls> <source src="${canzone.preview}" type="audio/mp3" class="bg-dark text-white"> </audio>`
      player2.innerHTML = `<audio controls> <source src="${canzone.preview}" type="audio/mp3" class="bg-dark text-white"> </audio>`
      const newLi = document.createElement('li')
      newLi.innerText = `${canzone.title}`
      newLi.classList.add('nav-item')
      canzoniAscoltate.push(newLi.innerText)
      menu.appendChild(newLi)
      const newSong = {
        title: canzone.title,
        artist: canzone.artist.name,
        cover: canzone.album.cover,
        player: canzone.preview,
      }
      localStorage.setItem('canzoneInAtto', JSON.stringify(newSong))
      localStorage.setItem('canzoniAscoltate', JSON.stringify(canzoniAscoltate))
    })
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
      albumlength.innerText = data.nb_tracks + ' brani'
      albumDuration.innerText = secondsToMinutes(data.duration)

      console.log(data)

      createTracks(data)
    })
    .catch((error) => {
      console.log(error)
    })
}
getAlbum(albumId)

const playerFunction = function () {
  const currentSong = JSON.parse(localStorage.getItem('canzoneInAtto'))
  const songsAscoltate = JSON.parse(localStorage.getItem('canzoniAscoltate'))
  console.log(currentSong)
  if (currentSong) {
    const player = document.getElementById('player')
    const player2 = document.getElementById('player2')
    const footerImg = document.getElementById('fotocanzone')
    const nomeCantante = document.getElementById('nomecantante')
    const nomeCanzone = document.getElementById('nomecanzone')
    const mobileFoto = document.getElementById('mobileFotoPlayer')
    const mobileTitle = document.getElementById('mobileTitle')
    footerImg.setAttribute('src', currentSong.cover)
    console.log(footerImg)
    nomeCanzone.innerHTML = `${currentSong.title}`
    nomeCantante.innerHTML = `${currentSong.artist}`
    mobileTitle.innerHTML = `${currentSong.title}`
    mobileFoto.setAttribute('src', currentSong.cover)

    player.innerHTML = `<audio controls> <source src="${currentSong.player}" type="audio/mp3" class="bg-dark text-white"> </audio>`
    player2.innerHTML = `<audio controls> <source src="${currentSong.player}" type="audio/mp3" class="bg-dark text-white"> </audio>`
  }
  if (songsAscoltate) {
    for (let i = 0; i < songsAscoltate.length; i++) {
      const newLi = document.createElement('li')
      newLi.innerText = songsAscoltate[i]
      menu.appendChild(newLi)
    }
  }
}
playerFunction()
