import React from 'react';
import {
  Button,
  Dialog,
  H2,
  Classes,
  Intent,
  FormGroup,
  EditableText
} from '@blueprintjs/core';

class PostEditor extends React.Component {
  constructor(props) {
    super(props);

    if (typeof props.postId === 'number') {
      const { title, text } = props.posts[props.postId];

      this.state = {
        title,
        text
      };
    } else {
      this.state = {
        title: '',
        text: ''
      };
    }
  }

  handleTitleChange = title => this.setState({ title });
  handleTextChange = text => this.setState({ text });

  handleSave = () => {
    this.props.onSave(this.state);
    this.props.onClose();
  }

  render() {
    const { isOpen, onClose, postId } = this.props;

    return (
      <Dialog
        title={postId ? `Editing post #${postId}` : 'New post'}
        icon={postId ? 'edit' : 'insert'}
        isOpen={isOpen}
        onClose={onClose}
      >
        <div className={Classes.DIALOG_BODY}>
          <FormGroup
            label='Title'
            helperText='Maximum 120 symbols'
          >
            <H2>
              <EditableText
                value={this.state.title}
                onChange={this.handleTitleChange}
                placeholder='My favourite spider'
                maxLength={120}
              />
            </H2>
          </FormGroup>
          <FormGroup label='Post text'>
            <EditableText
              value={this.state.text}
              onChange={this.handleTextChange}
              placeholder='Very interesting and long story'
              multiline
              minLines={3}
            />
          </FormGroup>
        </div>
        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button onClick={onClose} text='Close' />
            <Button onClick={this.handleSave} intent={Intent.PRIMARY} text='Save' />
          </div>
        </div>
      </Dialog>
    );
  }
}

export default PostEditor;