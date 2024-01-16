import axios from 'axios';

export default function () {
  const
    token = useGetStorage('token'),
    serverURL = process.env.NODE_ENV === 'development'
      ? 'http://localhost:9001'
      : 'https://mdsr-server-2.onrender.com';

  return axios.create({
    baseURL: `${ serverURL }/api`,
    headers: token ? {
      'x-auth-token': 'Bearer ' + token
    } : {}
  })
}
