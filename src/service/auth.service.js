import apiPath from "./apiPath";
import { API } from "./axios";

const authService = {
    signIn,
    signUp,
    movieList,
    createMovie,
    updateMovie,
    movieDetails
}

async function signIn(body) {
    const res = await API.post(apiPath.auth.auth, body);
    if (res?.status === 200) {
        return res?.data?.data
    }
    return null
}

async function signUp(body) {
    const res = await API.put(apiPath.auth.auth, body);
    if (res?.status === 200) {
        return res?.data
    }
    return null
}

async function movieList(param) {
    const res = await API.get(`${apiPath.movies.movies}?${param}`);
    if (res?.status === 200) {
        return res?.data?.data
    }
    return null
}

async function movieDetails(id, body) {
    const res = await API.get(`${apiPath.movies.movies}/${id}`, body);
    if (res?.status === 200) {
        return res?.data?.details
    }
    return null
}

async function createMovie(body) {
    const res = await API.post(`${apiPath.movies.movies}`, body);
    if (res?.status === 200) {
        return res?.data
    }
    return null
}

async function updateMovie(id, body) {
    const res = await API.post(`${apiPath.movies.movies}/${id}`, body);
    if (res?.status === 200) {
        return res?.data
    }
    return null
}

export default authService;