import { DropResult, DragDropContext, Droppable } from '@hello-pangea/dnd';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { BoardState, toDoState } from './atoms';
import Board from './Components/Board';

const Wrapper = styled.div``;

const Boards = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 353px);
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
  //유저가 드래그를 끝낸 시점에 불려지는 함수
  const onDragEnd = (info: DropResult) => {
    console.log(info);
    const { destination, source, type } = info;
    if (!destination) return;

    if (source.droppableId === 'boards') {
      setBoards((prev) => {
        const boardsCopy = [...prev];
        const targetBoard = boardsCopy.splice(source.index, 1)[0];
        boardsCopy.splice(destination?.index, 0, targetBoard);
        return boardsCopy;
      });
    } else if (destination?.droppableId === source.droppableId) {
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        const taskObj = boardCopy.splice(source.index, 1)[0];
        boardCopy.splice(destination?.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
      });
    } else if (destination?.droppableId !== source.droppableId) {
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const taskObj = sourceBoard.splice(source.index, 1)[0];
        const destinationBoard = [...allBoards[destination.droppableId]];
        destinationBoard.splice(destination?.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
    }
  };

  const [toDos, setToDos] = useRecoilState(toDoState);
  const [boards, setBoards] = useRecoilState(BoardState);

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
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
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
                <AddBoard onClick={handleAddColumn}>+ Add columns</AddBoard>
                {provided.placeholder}
              </Boards>
            )}
          </Droppable>
        </Wrapper>
      </DragDropContext>
    </>
  );
}

export default App;
