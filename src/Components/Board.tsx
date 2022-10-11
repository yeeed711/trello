import { Droppable } from '@hello-pangea/dnd';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { IToDo, toDoState } from '../atoms';
import Card from './Card';

interface IBoardProps {
  toDos: IToDo[];
  boardId: string;
}

interface IArea {
  isDraggingOver: boolean;
  draggingFromThisWith: boolean;
}

interface IForm {
  toDo: string;
}

const Board = ({ toDos, boardId }: IBoardProps) => {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const setToDos = useSetRecoilState(toDoState);
  const onValid = ({ toDo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    setToDos((allboards) => {
      return {
        ...allboards,
        [boardId]: [newToDo, ...allboards[boardId]],
      };
    });
    setValue('toDo', '');
  };
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Form onSubmit={handleSubmit(onValid)} autoComplete='off'>
        <input {...register('toDo', { required: true })} type='text' />
      </Form>
      <Droppable droppableId={boardId}>
        {(provided, snapshot) => (
          <Area
            isDraggingOver={snapshot.isDraggingOver}
            draggingFromThisWith={Boolean(snapshot.draggingFromThisWith)}
            ref={provided.innerRef}
            {...provided.droppableProps}>
            {toDos.map((toDo, index) => (
              <Card
                key={toDo.id}
                index={index}
                toDoId={toDo.id}
                toDoText={toDo.text}
              />
            ))}
            {provided.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
};

export default Board;

const Wrapper = styled.div``;
const Title = styled.div``;
const Form = styled.form``;

const Area = styled.ul<IArea>`
  padding: 10px;
  padding-top: 30px;
  background-color: ${(props) => props.theme.borardColor};
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 5px;
  height: 100vh;
  li + li {
    margin-top: 10px;
  }
`;
