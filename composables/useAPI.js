import axios from 'axios';

export default function () {
  const token = useGetStorage('token');

  return axios.create({
    baseURL: `${ useServer() }/api`,
    headers: token ? {
      'x-auth-token': 'Bearer ' + token
    } : {}
  })
}
