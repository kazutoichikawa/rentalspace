import axios from 'axios';
import { reserves } from '../urls/index'

export const postReserve = (params) => {
  return axios.post(reserves,
    {
      pre_reserve_ids: params.pre_reserve_ids
    },
  )
  .then(res => {
    return res.data
  })
  .catch((e) => console.error(e))
}
