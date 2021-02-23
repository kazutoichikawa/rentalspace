import React, { Fragment, useEffect, useReducer, useState } from 'react';
import styled from 'styled-components';
import { useHistory, Link } from "react-router-dom";

import { NewReserveConfirmDialog } from '../components/NewReserveConfirmDialog';
import Skeleton from '@material-ui/lab/Skeleton';
import { RoomWrapper } from './RoomWrapper';

import { postPreReserve, replacePreReserve } from '../apis/pre_reserve';
import { fetchRooms } from '../apis/rooms';

import {
  initialState as roomsInitialState,
  roomsActionTyps,
  roomsReducer,
} from '../reducers/rooms';

import { REQUEST_STATE } from '../constants';
import { HTTP_STATUS_CODE } from '../constants';
import { RoomReserveDialog } from '../components/RoomReserveDialog';
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
  const history = useHistory();
  const [roomsState, dispatch] = useReducer(roomsReducer, roomsInitialState);
  const initialState = {
    isOpenReserveDialog: false,
    selectedRoom: null,
    selectedTimeCount: 1,
    selectedDatetime: Date.today,
    isOpenNewReserveDialog: false,
    existingBuildName: '',
    newBuildName: '',
}
const [state, setState] = useState(initialState);
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
  const submitReserve = () => {
    postPreReserve({
      roomId: state.selectedRoom.id,
      count: state.selectedTimeCount,
      datetime: state.selectedDatetime,
    }).then(() => history.push('/reserves'))
    .catch((e) => {
      if(e.response.status === HTTP_STATUS_CODE.NOT_ACCEPTABLE){
        setState({
          ...state,
          isOpenReserveDialog: false,
          isOpenNewReserveDialog: true,
          existingBuildName: e.response.data.existing_build,
          newBuildName: e.response.data.new_build,
        })
      } else {
        throw e;
      }
    })
  };

const replaceReserve = () => {
  replacePreReserve({
    roomId: state.selectedRoom.id,
    count: state.selectedTimeCount,
    datetime: state.selectedDatetime,
  }).then(() => history.push('/reserves'))
};
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
                  onClickRoomWrapper={
                    (room) =>setState({
                      ...state,
                      isOpenReserveDialog:true,
                      selectedRoom:room,
                    })
                  }
                  imageUrl={RoomImage}
                />
              </ItemWrapper>
            )
        }
      </RoomsList>
      {
        state.isOpenReserveDialog &&
          <RoomReserveDialog
            room={state.selectedRoom}
            isOpen={state.isOpenReserveDialog}
            countNumber={state.selectedTimeCount}
            selectedDatetime={state.selectedDatetime}

            onClickCountUp={() => setState({
              ...state,
              selectedTimeCount: state.selectedTimeCount + 1,
            })}
            onClickCountDown={() => setState({
              ...state,
              selectedTimeCount: state.selectedTimeCount - 1,
            })}
            handleDateChange={() => setState({
              ...state,
              selectedDatetime: state.selectedDatetime
            })}
            onClickReserve={() => submitReserve()}
            onClose={() => setState({
              ...state,
              isOpenReserveDialog: false,
              selectedRoom: null,
              selectedDatetime: Date.today,
              selectedTimeCount: 1,
            })}
          />
      }
      {
            state.isOpenNewReserveDialog &&
            <NewReserveConfirmDialog
              isOpen={state.isOpenNewReserveDialog}
              onClose={() => setState({ ...state, isOpenNewReserveDialog: false })}
              existingBuildName={state.existingBuildName}
              newBuildName={state.newBuildName}
              onClickSubmit={() => replaceReserve()}
            />
       }
    </Fragment>
  )
  }
