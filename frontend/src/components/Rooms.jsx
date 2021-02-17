import React, { Fragment } from 'react';

export const Rooms = ({
  match
}) => {
  return (
    <Fragment>
      ルーム一覧
      <p>
      buildsIdは {match.params.buildsId} です
      </p>
    </Fragment>
  )
}
