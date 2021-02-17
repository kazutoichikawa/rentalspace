import axios from 'axios';
import { roomsIndex } from '../urls/index'

export const fetchRooms =(buildId) => {
  return axios.get(roomsIndex(buildId))
  .then(res => {
    return res.data
  })
  .catch((e) => console.error(e))
}
