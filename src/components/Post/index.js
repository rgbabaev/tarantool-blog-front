import React from 'react';
import { Button, ButtonGroup, Card, H2, Classes } from "@blueprintjs/core";
import './styles.css';

class Post extends React.Component {
  handleEditClick = () => this.props.onEditClick(this.props.id);

  handleLikeClick = () => this.props.onLikeClick(this.props.id);

  render() {
    const {
      className,
      title,
      text,
      skeleton
    } = this.props;

    return (
      <Card className={className}>
        <H2 className={skeleton ? Classes.SKELETON : ''}>{title || (skeleton && '|')}</H2>
        <p className={(skeleton ? Classes.SKELETON : '') + ' Post__text'}>{text || (skeleton && '|')}</p>
        <ButtonGroup minimal className={skeleton ? Classes.SKELETON : ''}>
          <Button
            onClick={this.handleLikeClick}
            text='Like'
            icon='heart'
            intent='danger'
            disabled
          />
          <Button
            onClick={this.handleEditClick}
            text='Edit'
            icon='edit'
          />
        </ButtonGroup>
      </Card>
    );
  }
}

export default Post;
