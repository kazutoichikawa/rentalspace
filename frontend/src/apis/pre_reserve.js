import axios from 'axios';
import { PreReserve, PreReserveReplace } from '../urls/index'

export const postPreReserve =(params) => {
  return axios.post(PreReserve,
    {
      room_id: params.roomId,
      count: params.count,
    }
  )
  .then(res => {
    return res.data
  })
  .catch((e) => { throw e; })
};

export const replacePreReserve = (params) => {
  return axios.put(PreReserveReplace,
    {
      room_id: params.roomId,
      count: params.count,
    }
  )
  .then(res => {
    return res.data
  })
  .catch((e) => { throw e; })
};
