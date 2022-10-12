import { Droppable } from '@hello-pangea/dnd';
import React from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { isDeleteState } from '../atoms';

const DeleteBox = () => {
  const isDelete = useRecoilValue(isDeleteState);
  return (
    <Droppable droppableId='deleteBox'>
      {(provided) => (
        <Wrapper ref={provided.innerRef} {...provided.droppableProps}>
          {isDelete && <div> 삭제할 공간입니다</div>}
        </Wrapper>
      )}
    </Droppable>
  );
};

export default DeleteBox;

const Wrapper = styled.div`
  div {
    font-size: 100px;
  }
`;
