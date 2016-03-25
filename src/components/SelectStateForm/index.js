import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import * as appPropTypes from 'src/components/propTypes';
import states from 'src/lib/states';
import { selectState } from 'src/actions/location';


@connect(state => {
  return {
    state: state.location.state,
  };
}, { selectState })
export default class SelectStateForm extends Component {
  static propTypes = {
    selectState: PropTypes.func,
    state: appPropTypes.state,
  };

  handleChange = () => {
    const select = this.refs.select;
    this.props.selectState(select.options[select.selectedIndex].value);
  };

  render() {
    const { state } = this.props;
    return (
      <form>
        <label htmlFor="state">Current State: </label>
        <select
          name="state"
          ref="select"
          value={state}
          onChange={this.handleChange}>
          {Object.keys(states).map((s) => (
            <option
              key={s}
              value={s}>
              {s.toUpperCase()}
            </option>
          ))}
        </select>
      </form>
    );
  }
}
