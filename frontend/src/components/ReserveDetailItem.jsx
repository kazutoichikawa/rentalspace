import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";

import { LocalMallIcon } from '../Icons';

import { FONT_SIZE } from '../style_constants';

const LineWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const AmountText = styled.p`
  font-size: ${FONT_SIZE.STAND_BODY};
  font-weight: bold;
`;

export const ReserveDetailItem = ({
  buildId,
  buildName,
  datetime,
  timeCount,
  price,
}) => (
  <Fragment>
    <LineWrapper>
      <LocalMallIcon />
      <Link to={`/builds/${buildId}/rooms`}>
        {buildName}
      </Link>
    </LineWrapper>
    <LineWrapper>
      <p>
        商品数
      </p>
      <p>
        {timeCount}
      </p>
    </LineWrapper>
    <LineWrapper>
      <p>
        利用時間:{datetime}から{timeCount}時間
      </p>
      <p>
        ¥ {price}
      </p>
    </LineWrapper>
    <LineWrapper>
      <AmountText>
        合計
      </AmountText>
      <AmountText>
        ¥ {price}
      </AmountText>
    </LineWrapper>
  </Fragment>
);
