const register = async (userData) => {
  const response = await fetch(`/user/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'same-origin',
    body: JSON.stringify({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: userData.password
    })
  })
  let jsonRes = await response.json();
  jsonRes.status = response.status;
  return jsonRes
}

const login = async (loginData) => {
  const response = await fetch(`/user/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'same-origin',
    body: JSON.stringify({
      email: loginData.email,
      password: loginData.password
    })
  })
  let jsonRes = await response.json();
  jsonRes.status = response.status;
  return jsonRes
}

const getVideos = async (token) => {
  const response = await fetch('/videos/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'auth-token': token
    },
  });
  let jsonRes = await response.json();
  return jsonRes
}

const addVideo = async (url, token) => {
  const response = await fetch(`/videos/addVideo`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'auth-token': token
    },
    credentials: 'same-origin',
    body: JSON.stringify({
      url: url
    })
  })
  let jsonRes = await response.json();
  jsonRes.status = response.status;
  return jsonRes
}

//UNUSED
const playVideo = async (url, token) => {
  const response = await fetch(`/videos/playVideo`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'auth-token': token
    },
    credentials: 'same-origin',
    body: JSON.stringify({
      url: url
    })
  })
  let jsonRes = await response.json();
  jsonRes.status = response.status;
  return jsonRes
}

export {
  register,
  login,
  getVideos,
  addVideo
}
