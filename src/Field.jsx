import React, { Component } from 'react';
import Context from './Context';

class Field extends Component {
  handleChange(value, Form) {
    const { name, normalize, onChange } = this.props;
    const { _internal, ...formApi } = Form;

    if (normalize) {
      value = normalize(value);
    }
    formApi.onChange(((field = { name, value }), formApi));
    formApi.setField(name, value);
    formApi.validateField(name);
    _internal.updateComponent(name);
    onChange && onChange(value, formApi);
  }

  render() {
    const { name, render, normalize, onChange, ...rest } = this.props;
    const Component = render;

    return (
      <Context.Consumer>
        {Form => {
          const { getField, getError, isTouched, _internal } = Form;
          const { storeComponent } = _internal;
          storeComponent(name, this);

          return (
            <Component
              {...rest}
              error={getError(name)}
              name={name}
              value={getField(name)}
              touched={isTouched(name)}
              onChange={value => this.handleChange(value, Form)}
            />
          );
        }}
      </Context.Consumer>
    );
  }
}

export default Field;
