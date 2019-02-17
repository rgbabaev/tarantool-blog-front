import React from 'react';
import {
  Button,
  Dialog,
  H2,
  Classes,
  Intent,
  FormGroup
} from '@blueprintjs/core';
import Input from './Input';

class PostEditor extends React.Component {
  constructor(props) {
    super(props);

    if (typeof props.postId === 'number') {
      const { title, text } = props.posts[props.postId];

      this.state = {
        title,
        text,
        showErrors: false
      };
    } else {
      this.state = {
        title: '',
        text: '',
        showErrors: false
      };
    }
  }

  handleTitleChange = title => this.setState({ title });
  handleTextChange = text => this.setState({ text });

  handleSave = () => {
    const { title, text } = this.state;
    if (title.length && text.length) {
      this.props.onSave(this.state);
      this.props.onClose();
    } else {
      this.setState({ showErrors: true });
    }
  }

  render() {
    const { isOpen, onClose, postId } = this.props;
    const { title, text, showErrors } = this.state;

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
            intent='primary'
          >
            <H2>
              <Input
                value={title}
                onChange={this.handleTitleChange}
                placeholder='My favourite spider'
                maxLength={120}
                showErrors={showErrors}
                required
              />
            </H2>
          </FormGroup>
          <FormGroup label='Post text'>
            <Input
              value={text}
              onChange={this.handleTextChange}
              placeholder='Very interesting and long story should be here'
              multiline
              minLines={3}
              showErrors={showErrors}
              required
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