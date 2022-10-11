import { Draggable } from '@hello-pangea/dnd';
import React from 'react';
import styled from 'styled-components';

interface ICardProps {
  toDoId: number;
  toDoText: string;
  index: number;
}

const Card = ({ toDoId, toDoText, index }: ICardProps) => {
  return (
    <Draggable key={toDoId} draggableId={toDoId + ''} index={index}>
      {(provided, snapshot) => (
        <CardStyle
          isDragging={snapshot.isDragging}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}>
          {toDoText}
        </CardStyle>
      )}
    </Draggable>
  );
};

export default React.memo(Card);

const CardStyle = styled.li<{ isDragging: boolean }>`
  background-color: ${(props) => props.theme.cardColor};
  border-radius: 5px;
  padding: 10px;
  font-size: 14px;
  line-height: 21px;
  border: 1.5px solid ${(props) => props.theme.borderColor};
`;
