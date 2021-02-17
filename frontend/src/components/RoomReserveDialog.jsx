import React from 'react';
import { DialogContent, Dialog, DialogTitle, DialogActions } from '@material-ui/core';
import styled from 'styled-components';

// components
import { SubText } from '../styles/StyledText';

// images
import ReserveHeaderImage from '../images/reserve-header.png';

const ReserveHeader = styled.img`
  width: 100%;
  height: 350px;
`;

const DetailWrapper = styled.div`
  padding: 0 8px 8px 8px;
  height: 50px;
`;

export const RoomReserveDialog = ({
  room,
  isOpen,
  onClose,
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
          <SubText>
            {room.detail}
          </SubText>
        </DetailWrapper>
      </DialogContent>
      <DialogActions>
       // 数量を操作するアクションを入れる予定
      </DialogActions>
    </Dialog>
  )
}
