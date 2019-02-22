import {API_TOKEN} from '../Config/token'

export function getFilms(text, page) {
    const url = "https://api.themoviedb.org/3/search/movie?api_key=" + API_TOKEN + "&language=fr-FR&query=" + text + '&page=' + page
    return fetch(url)
        .then((response) => response.json())
        .catch((error) => console.log(error))
}

export function getFilm(id) {
    const url = "https://api.themoviedb.org/3/movie/" + id + "?api_key=" + API_TOKEN + "&language=fr-FR"
    return fetch(url)
        .then((response) => response.json())
        .catch((error) => console.log(error))
}


export function getImage(name) {
    return 'https://image.tmdb.org/t/p/w300' + name
}