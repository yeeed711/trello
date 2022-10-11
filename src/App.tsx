import { DropResult, DragDropContext } from '@hello-pangea/dnd';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { toDoState } from './atoms';
import Board from './Components/Board';

const Wrapper = styled.div`
  padding: 10px;
`;

const Boards = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(auto, 353px));
  grid-auto-columns: minmax(353px, auto);
  gap: 18px;
  padding: 10px;
`;

function App() {
  //유저가 드래그를 끝낸 시점에 불려지는 함수
  const onDragEnd = (info: DropResult) => {
    const { destination, source } = info;
    if (!destination) return;
    //동일한 보드 안에서 움직였을 경우
    if (destination?.droppableId === source.droppableId) {
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        const taskObj = boardCopy[source.index];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
      });
    }
    //다른 보드로 이동시킬 경우
    if (destination?.droppableId !== source.droppableId) {
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const taskObj = sourceBoard[source.index];
        const destinationBoard = [...allBoards[destination.droppableId]];
        sourceBoard.splice(source.index, 1);
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
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <Boards>
            {Object.keys(toDos).map((boardId) => (
              <Board key={boardId} toDos={toDos[boardId]} boardId={boardId} />
            ))}
          </Boards>
        </Wrapper>
      </DragDropContext>
    </>
  );
}

export default App;
