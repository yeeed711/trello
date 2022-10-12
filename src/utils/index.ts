import { DropResult } from '@hello-pangea/dnd';
import { SetterOrUpdater } from 'recoil';
import { IToDoState } from '../atoms';

export const onDragEnd = (
  info: DropResult,
  setIsDelete: SetterOrUpdater<boolean>,
  setBoards: SetterOrUpdater<string[]>,
  setToDos: SetterOrUpdater<IToDoState>
) => {
  const { destination, source } = info;
  if (!destination) return;
  setIsDelete(false);

  if (source.droppableId === 'boards') {
    setBoards((prev) => {
      const boardsCopy = [...prev];
      const targetBoard = boardsCopy.splice(source.index, 1)[0];
      boardsCopy.splice(destination?.index, 0, targetBoard);
      return boardsCopy;
    });
  } else if (destination.droppableId === 'deleteBox') {
    setToDos((allBoards) => {
      const boardCopy = [...allBoards[source.droppableId]];
      boardCopy.splice(source.index, 1);
      return { ...allBoards, [source.droppableId]: boardCopy };
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
