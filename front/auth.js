function getToken() {
    return localStorage.getItem('token');
}

function addTokenToHeaders(headers) {
    const token = getToken();
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }
}


export { getToken, addTokenToHeaders };