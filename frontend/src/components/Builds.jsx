import React, { Fragment, useEffect, useReducer } from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import Skeleton from '@material-ui/lab/Skeleton';

import { fetchBuilds } from '../apis/builds'; 
import { REQUEST_STATE } from '../constants';

import {
  initialState,
  buildsActionTyps,
  buildsReducer,
} from '../reducers/builds';

import MainLogo from '../images/logo.png';
import MainCoverImage from '../images/main-cover-image.png'
import RoomImage from '../images/room-image.png';

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 8px 32px;
`;

const MainLogoImage = styled.img`
  height: 100px;
`

const MainCoverImageWrapper = styled.div`
  text-align: center;
`;

const MainCover = styled.img`
  height: 250px;
`;
const BuildsContentsList = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 150px;
`;

const BuildsContentWrapper = styled.div`
  width: 350px;
  height: 300px;
  padding: 48px;
`;

const BuildsImageNode = styled.img`
  width: 100%;
`;

const MainText = styled.p`
  color: black;
  font-size: 18px;
`;

const SubText = styled.p`
  color: black;
  font-size: 12px;
`;

export const Builds = () => {
  const [state, dispatch] = useReducer(buildsReducer, initialState);

  useEffect(() => {
    dispatch({ type: buildsActionTyps.FETCHING });
    fetchBuilds()
    .then((data) =>
      dispatch({
        type: buildsActionTyps.FETCH_SUCCESS,
        payload: {
          builds: data.builds
        }
      })
    )
  }, [])
  return (
    <Fragment>
    <HeaderWrapper>
      <MainLogoImage src={MainLogo} alt="main logo" />
    </HeaderWrapper>
    <MainCoverImageWrapper>
      <MainCover src={MainCoverImage} alt="main cover" />
    </MainCoverImageWrapper>
    <BuildsContentsList>
        {
          state.fetchState === REQUEST_STATE.LOADING ?
            <Fragment>
              <Skeleton variant="rect" width={450} height={300} />
              <Skeleton variant="rect" width={450} height={300} />
              <Skeleton variant="rect" width={450} height={300} />
            </Fragment>
          :
            state.buildsList.map((build, index) =>
              <Link to={`/builds/${build.id}/rooms`} key={index} style={{ textDecoration: 'none' }}>
                <BuildsContentWrapper>
                  <BuildsImageNode src={RoomImage} />
                  <MainText>{build.name}</MainText>
                  <SubText>{`所在地：${build.postal_code} ${build.address} ${build.building}`}</SubText>
                </BuildsContentWrapper>
              </Link>
            )
        }
      </BuildsContentsList>
  </Fragment>
  )
}
