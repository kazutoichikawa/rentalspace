import React, { Fragment, useEffect, useReducer } from 'react';
import { fetchRooms } from '../apis/rooms';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import {
  initialState as roomsInitialState,
  roomsActionTyps,
  roomsReducer,
} from '../reducers/rooms';
import { REQUEST_STATE } from '../constants';
import { RoomWrapper } from './RoomWrapper';
import Skeleton from '@material-ui/lab/Skeleton';

import { COLORS } from '../style_constants';
import { LocalMallIcon } from '../Icons';

import MainLogo from '../images/logo.png';
import RoomImage from '../images/room-image.png';

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 32px;
`;

const BagIconWrapper = styled.div`
  padding-top: 24px;
`;

const ColoredBagIcon = styled(LocalMallIcon)`
  color: ${COLORS.MAIN};
`;

const MainLogoImage = styled.img`
  height: 90px;
`

const RoomsList = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-bottom: 50px;
`;

const ItemWrapper = styled.div`
  margin: 16px;
`;

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
      <HeaderWrapper>
        <Link to="/builds">
          <MainLogoImage src={MainLogo} alt="main logo" />
        </Link>
        <BagIconWrapper>
          <Link to="/reserves">
            <ColoredBagIcon fontSize="large" />
          </Link>
        </BagIconWrapper>
      </HeaderWrapper>
      <RoomsList>
        {
          roomsState.fetchState === REQUEST_STATE.LOADING ?
            <Fragment>
              {
                [...Array(12).keys()].map(i =>
                  <ItemWrapper key={i}>
                    <Skeleton key={i} variant="rect" width={450} height={180} />
                  </ItemWrapper>
                )
              }
            </Fragment>
          :
            roomsState.roomsList.map(room =>
              <ItemWrapper key={room.id}>
                <RoomWrapper
                  room={room}
                  onClickRoomWrapper={(room) => console.log(room)}
                  imageUrl={RoomImage}
                />
              </ItemWrapper>
            )
        }
      </RoomsList>
    </Fragment>
  )
  }
