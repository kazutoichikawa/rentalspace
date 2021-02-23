import React, { Fragment, useReducer, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { ReserveDetailItem } from '../components/ReserveDetailItem';
import { ReserveButton } from '../components/Buttons/ReserveButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import { postReserve } from '../apis/reserves';
import { fetchPreReserves } from '../apis/pre_reserve';

import {
  initialState,
  preReservesActionTyps,
  preReservesReducer,
} from '../reducers/preReserves';

import MainLogo from '../images/logo.png';

import { REQUEST_STATE } from '../constants';

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 8px 32px;
`;

const MainLogoImage = styled.img`
  height: 90px;
`;

const ReserveListWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const ReserveItemWrapper = styled.div`
  margin-bottom: 50px;
`;
export const Reserves = () => {
  const [state, dispatch] = useReducer(preReservesReducer, initialState);

  useEffect(() => {
    dispatch({ type: preReservesActionTyps.FETCHING });
    fetchPreReserves()
      .then((data) =>
        dispatch({
          type: preReservesActionTyps.FETCH_SUCCESS,
          payload: {
            preReservesSummary: data
          }
        })
      );
  }, []);

  const postPreReserves = () => {
    dispatch({ type: preReservesActionTyps.POSTING });
    postReserve({
      pre_reserve_ids: state.preReservesSummary.pre_reserve_ids,
    }).then(() => {
      dispatch({ type: preReservesActionTyps.POST_SUCCESS });
      window.location.reload();
    });
  };

  const reserveButtonLabel = () => {
    switch (state.postState) {
      case REQUEST_STATE.LOADING:
        return '注文中...';
      case REQUEST_STATE.OK:
        return '注文が完了しました！';
      default:
        return '注文を確定する';
    }
  };
  return (
    <Fragment>
           <HeaderWrapper>
        <Link to="/builds">
          <MainLogoImage src={MainLogo} alt="main logo" />
        </Link>
      </HeaderWrapper>
      <ReserveListWrapper>
          <div>
            <ReserveItemWrapper>
              {
                state.fetchState === REQUEST_STATE.LOADING ?
                  <CircularProgress />
                :
                  state.preReservesSummary &&
                    <ReserveDetailItem
                      buildName={state.preReservesSummary.build.name}
                      buildId={state.preReservesSummary.build.id}
                      timeCount={state.preReservesSummary.count}
                      price={state.preReservesSummary.amount}
                    />
              }
            </ReserveItemWrapper>
          <div>
            {
              state.fetchState === REQUEST_STATE.OK && state.preReservesSummary &&
                <ReserveButton
                  onClick={() => postPreReserves()}
                  disabled={state.postState === REQUEST_STATE.LOADING || state.postState === REQUEST_STATE.OK}
                >
                  {reserveButtonLabel()}
                </ReserveButton>
            }
            {
              state.fetchState === REQUEST_STATE.OK && !(state.preReservesSummary) &&
                <p>
                  予約予定のルームはありません
                </p>
            }
          </div>
        </div>
      </ReserveListWrapper>
    </Fragment>
  )
}
