import React from 'react';

import { DialogContent, Dialog, DialogTitle } from '@material-ui/core';
import { ReserveButton } from './Buttons/ReserveButton';

export const NewReserveConfirmDialog = ({
  isOpen,
  onClose,
  existingBuildName,
  newBuildName,
  onClickSubmit,
}) => (
  <Dialog
    open={isOpen}
    onClose={onClose}
    maxWidth="xs"
  >
    <DialogTitle>
      新規予約を開始しますか？
    </DialogTitle>
    <DialogContent>
      <p>
        {
          `ご予約に ${existingBuildName} のルームが含まれています。
          新規の注文を開始して ${newBuildName} のルームを追加してください。`
        }
      </p>
      <ReserveButton onClick={onClickSubmit}>
        新規注文
      </ReserveButton>
    </DialogContent>
  </Dialog>
);
