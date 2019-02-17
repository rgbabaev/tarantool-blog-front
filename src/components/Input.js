import React from 'react';
import { EditableText } from '@blueprintjs/core';

class Input extends React.PureComponent {
  static defaultProps = {
    value: ''
  };

  constructor(props) {
    super(props);

    this.state = {
      touched: false,
      length: props.value.length
    }
  }

  static getDerivedStateFromProps(props, state) {
    return {
      ...state,
      length: props.value.length
    }
  }

  handleChange = value => {
    const { onChange } = this.props;
    onChange && onChange(value);
    this.setState(({ touched }) => touched ? null : { touched: true });
  };

  render() {
    const { required, onChange, intent, showErrors, ...props } = this.props;
    const { touched, length } = this.state;

    return (
      <EditableText
        onChange={this.handleChange}
        intent={(required && (touched || showErrors) && !length) ? 'danger' : intent}
        {...props}
      />
    );
  }
}

export default Input;
