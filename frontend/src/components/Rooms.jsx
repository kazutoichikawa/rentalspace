import React, { Fragment, useEffect, useReducer } from 'react';
import { fetchRooms } from '../apis/rooms';
import {
  initialState as roomsInitialState,
  roomsActionTyps,
  roomsReducer,
} from '../reducers/rooms';
import { REQUEST_STATE } from '../constants';

export const Rooms = ({
  match
}) => {
  const [roomsState, dispatch] = useReducer(roomsReducer, roomsInitialState);
  useEffect(() => {
    dispatch({ type: roomsActionTyps.FETCHING });
    fetchRooms(match.params.buildsId)
      .then((data) => {
        dispatch({
          type: roomsActionTyps.FETCH_SUCCESS,
          payload: {
            rooms: data.rooms
          }
        });
      })
  }, [])
  return (
    <Fragment>
      {
        roomsState.fetchState === REQUEST_STATE.LOADING ?
          <Fragment>
            <p>
              ロード中...
            </p>
          </Fragment>
        :
          roomsState.roomsList.map(room =>
            <div key={room.id}>
              {room.name}
            </div>
          )
      }
    </Fragment>
  )
  }
