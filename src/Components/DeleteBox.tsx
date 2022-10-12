import { Droppable } from '@hello-pangea/dnd';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { isDeleteState } from '../atoms';

const DeleteBox = () => {
  const isDelete = useRecoilValue(isDeleteState);

  return (
    <Droppable droppableId='deleteBox'>
      {(provided, snapshot) => (
        <Wrapper
          ref={provided.innerRef}
          {...provided.droppableProps}
          isDraggingOver={snapshot.isDraggingOver}>
          <div>
            {isDelete && (
              <span
                className='material-icons-round'
                style={{ fontSize: 'inherit' }}>
                delete_forever
              </span>
            )}
          </div>
        </Wrapper>
      )}
    </Droppable>
  );
};

export default DeleteBox;

const Wrapper = styled.div<{ isDraggingOver: boolean }>`
  div {
    height: 100px;
    text-align: center;
    font-size: 80px;
    background-color: ${(props) =>
      props.isDraggingOver ? '#171a22' : 'transparent'};
    span {
      line-height: 100px;
    }
  }
`;
