import { DragDropContext, Droppable, DragStart } from '@hello-pangea/dnd';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { BoardState, isDeleteState, toDoState } from './atoms';
import Board from './Components/Board';
import DeleteBox from './Components/DeleteBox';
import { onDragEnd } from './utils';

const Wrapper = styled.div``;

const Boards = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 353px);
  grid-template-rows: 1fr;
  padding: 30px 15px;
  div {
    margin-right: 15px;
  }
`;

const AddBoard = styled.button`
  width: 353px;
  border: 2px dotted ${(props) => props.theme.borderColor};
  border-radius: 5px;
  font-size: 20px;
  font-weight: 200;
  color: ${(props) => props.theme.textColor};
  &:hover {
  }
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const [boards, setBoards] = useRecoilState(BoardState);
  const setIsDelete = useSetRecoilState(isDeleteState);

  //유저가 드래그를 시작한 시점에 불려지는 함수
  const onBeforeDragStart = (info: DragStart) => {
    if (info.type === 'DEFAULT') {
      setIsDelete(true);
    }
  };

  const handleAddColumn = () => {
    const newColumn = prompt('추가할 보드의 이름은 무엇인가요?');
    if (newColumn) {
      if (boards.includes(newColumn)) {
        alert('동일한 보드가 이미 추가되어 있습니다.');
        return;
      }
      setBoards([...boards, newColumn]);
      setToDos((prev) => {
        return { ...prev, [newColumn]: [] };
      });
    }
  };

  return (
    <>
      <DragDropContext
        onBeforeDragStart={onBeforeDragStart}
        onDragEnd={(info) => onDragEnd(info, setIsDelete, setBoards, setToDos)}>
        <Wrapper>
          <div>
            <DeleteBox />
          </div>
          <Droppable droppableId='boards' direction='horizontal' type='board'>
            {(provided) => (
              <Boards ref={provided.innerRef} {...provided.droppableProps}>
                {boards.map((boardId: string, index: number) => (
                  <Board
                    key={index}
                    index={index}
                    boardId={boardId}
                    toDos={toDos[boardId]}
                  />
                ))}
                {provided.placeholder}
                <AddBoard onClick={handleAddColumn}>+ Add columns</AddBoard>
              </Boards>
            )}
          </Droppable>
        </Wrapper>
      </DragDropContext>
    </>
  );
}

export default App;
