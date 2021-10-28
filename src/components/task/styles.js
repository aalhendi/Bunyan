import styled from 'styled-components'
import { FiEdit } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';


export const UpdateBtn = styled(FiEdit)`
  color: #81b9d9;
  font-size: 20px;
  cursor: pointer;
  :hover {
    color: #000
  }
`;
export const DeleteBtn = styled(AiOutlineDelete)`
  color: red;
  font-size: 20px;
  cursor: pointer;
  :hover {
    color: #000
  }
`;