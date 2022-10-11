import React from 'react';
import { Draggable, Droppable } from '@hello-pangea/dnd';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { IToDo, toDoState } from '../atoms';
import Card from './Card';

interface IBoardProps {
  toDos: IToDo[];
  boardId: string;
  index: number;
}

interface IArea {
  isDraggingOver: boolean;
  draggingFromThisWith: boolean;
}

interface IForm {
  toDo: string;
}

const Board = ({ toDos, boardId, index }: IBoardProps) => {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const setToDos = useSetRecoilState(toDoState);
  const onValid = ({ toDo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    setToDos((allboards) => {
      return { ...allboards, [boardId]: [newToDo, ...allboards[boardId]] };
    });
    setValue('toDo', '');
  };
  return (
    <Draggable draggableId={boardId} index={index} key={boardId}>
      {(provided) => (
        <Wrapper
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}>
          <Droppable droppableId={boardId}>
            {(provided, snapshot) => (
              <Area
                isDraggingOver={snapshot.isDraggingOver}
                draggingFromThisWith={Boolean(snapshot.draggingFromThisWith)}
                ref={provided.innerRef}
                {...provided.droppableProps}>
                <Title>
                  <span>{toDos?.length ? toDos.length : 0}</span>
                  {boardId}
                </Title>
                <Form onSubmit={handleSubmit(onValid)} autoComplete='off'>
                  <input
                    {...register('toDo', { required: true })}
                    type='text'
                    placeholder='+  Add'
                  />
                </Form>
                {toDos?.map((toDo, index) => (
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
      )}
    </Draggable>
  );
};

export default React.memo(Board);

const Wrapper = styled.div``;
const Title = styled.div`
  font-size: 14px;
  span {
    display: inline-block;
    background-color: ${(props) => props.theme.cardColor};
    padding: 5px;
    margin-right: 5px;
    color: #ffffff;
  }
`;
const Form = styled.form`
  margin: 10px 0;
  input {
    width: 100%;
    background-color: transparent;
    border: 2px dotted ${(props) => props.theme.borderColor};
    padding: 10px;
    border-radius: 5px;
    color: ${(props) => props.theme.textColor};
  }
`;

const Area = styled.ul<IArea>`
  padding: 10px;
  /* padding-top: 30px; */
  background-color: ${(props) => props.theme.borardColor};
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 5px;
  height: 100vh;
  li + li {
    margin-top: 8px;
  }
`;
