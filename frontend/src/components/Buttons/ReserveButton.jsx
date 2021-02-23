import styled from 'styled-components';
import { BaseButton } from '../../styles/shared_style';
import { FONT_SIZE } from '../../style_constants';

export const ReserveButton = styled(BaseButton)`
  width: 390px;
  background-color: black;
  color: white;
  border-style: none;
  padding: 8px 16px;
  border-radius: 10px;
  font-size: ${FONT_SIZE.BODY1};
`;
