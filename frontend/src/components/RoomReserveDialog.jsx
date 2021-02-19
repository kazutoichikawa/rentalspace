import React from 'react';
import { DialogContent, Dialog, DialogTitle, DialogActions } from '@material-ui/core';
import styled from 'styled-components';
import { SubText } from '../styles/StyledText';
import { CountUpButton } from './Buttons/CountUpButton';
import { CountDownButton } from './Buttons/CountDownButton';
import { ReserveButton } from './Buttons/ReserveButton';
import ReserveHeaderImage from '../images/reserve-header.png';

const ReserveHeader = styled.img`
  width: 100%;
  height: 300px;
`;

const DetailWrapper = styled.div`
  padding: 0 8px 8px 8px;
  height: 50px;
`;

const CountersWrapper = styled.div`
  margin-right: auto;
  padding: 0 16px;
`;

const CountTimeWrapper = styled.div`
  display: flex;
  margin-bottom: 6px;
`

const CountTime = styled.div`
  margin: 0 7px;
`

const CountNum = styled.div`
  padding-top: 10px;
`

const ReserveTextWrapper = styled.div`
  display: flex;
`;

const ReserveFormWrapper = styled.div`
  margin: 0px 0 10px 10px ;
`

const ReserveForm = styled.div`

`

const ReserveButtonTextWrapper = styled.div`
  width: 300px;
`;

const PriceWrapper = styled.div`
  padding-top: 4px;
`;

export const RoomReserveDialog = ({
  room,
  isOpen,
  onClose,
  countNumber,
  onClickCountUp,
  onClickCountDown,
  onClickReserve,
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
    >
      <ReserveHeader src={ReserveHeaderImage} alt="reserve header" />
      <DialogTitle>
        {room.name}
      </DialogTitle>
      <DialogContent>
        <DetailWrapper>
          <SubText>{room.detail}</SubText>
          <SubText>最大収容人数：{room.capacity}人</SubText>
          <SubText>60分/ {room.price}円</SubText>
        </DetailWrapper>
      </DialogContent>
      <DialogActions>
      <CountersWrapper>
        <ReserveFormWrapper>
          <ReserveForm>
            予約フォーム
          </ReserveForm>
        </ReserveFormWrapper>
        <CountTimeWrapper>
          <CountTime>
            <CountDownButton
              onClick={() => onClickCountDown()}
              isDisabled={countNumber <= 1}
            />
          </CountTime>
          <CountTime>
            <CountNum>
              {countNumber}
            </CountNum>
          </CountTime>
          <CountTime>
            <CountUpButton
              onClick={() => onClickCountUp()}
              isDisabled={countNumber >= 9}
            />
          </CountTime>
        </CountTimeWrapper>
      </CountersWrapper>
        <ReserveButton onClick={() => onClickReserve()}>
          <ReserveTextWrapper>
            <ReserveButtonTextWrapper>
              {`${countNumber}時間の予約をストック`}
            </ReserveButtonTextWrapper>
            <PriceWrapper>
              {`¥${countNumber * room.price}`}
            </PriceWrapper>
          </ReserveTextWrapper>
        </ReserveButton>
      </DialogActions>
    </Dialog>
  )
}
