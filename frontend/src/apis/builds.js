import axios from 'axios';
import { buildsIndex } from '../urls/index'

export const fetchBuilds =() => {
  return axios.get(buildsIndex)
  .then(res => {
    return res.data
  })
  .catch((e) => console.error(e))
}
