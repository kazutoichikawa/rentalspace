import React from 'react';
import styled from 'styled-components';

import { SubText } from '../styles/StyledText';
import { COLORS } from '../style_constants';

const Wrapper = styled.div`
  display: flex;
  width: 450px;
  height: 180px;
  border-width: 1px;
  border-style: solid;
  border-color: ${COLORS.BORDER};
  border-image: initial;
  cursor: pointer;
`;

const RoomDetail = styled.div`
  padding: 24px 16px;
  width: 250px;
`;

const PriceWrapper = styled.div`
  margin-top: 16px;
`

const RoomImageNode = styled.img`
  width: 250px;
`;

export const RoomWrapper = ({
  room,
  onClickRoomWrapper,
  imageUrl,
}) => (
  <Wrapper onClick={() => onClickRoomWrapper(room)}>
    <RoomDetail>
      {room.name}
      <PriceWrapper>
         <SubText>最大収容人数：{room.capacity}人</SubText>
         <SubText>60分/{room.price}円</SubText>
         <SubText>{room.detail}</SubText>
      </PriceWrapper>
    </RoomDetail>
    <RoomImageNode src={imageUrl} />
  </Wrapper>
)
