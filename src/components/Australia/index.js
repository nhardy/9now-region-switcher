import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';

import * as appPropTypes from 'src/components/propTypes';
import states from 'src/lib/states';
import { selectState } from 'src/actions/location';

import AustraliaSVG from './australia.svg';
import styles from './styles.styl';


const regex = new RegExp(`svg-map-(${Object.keys(states).join('|')})`);

@connect(state => {
  return {
    state: state.location.state,
  };
}, { selectState })
export default class Australia extends Component {
  static propTypes = {
    selectState: PropTypes.func,
    state: appPropTypes.state,
  };

  componentDidMount() {
    this.highlightSelected();
    this.forEachState((state, element) => {
      element.addEventListener('click', (event) => this.selectState(event, state));
    });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.state === this.props.state) return;
    this.highlightSelected();
  }

  forEachState = (callback) => {
    Array.from(findDOMNode(this.refs.svg).querySelectorAll('.svg-map-state')).forEach(element => {
      const state = element.classList.toString().match(regex)[1];
      callback(state, element);
    });
  };

  highlightSelected = () => {
    this.forEachState((state, element) => {
      element.classList.toggle(styles.active, state === this.props.state);
    });
  };

  selectState = (event, state) => {
    event.preventDefault();
    this.props.selectState(state);
  };

  render() {
    return (
      <div className={styles.root}>
        <AustraliaSVG ref="svg" className={styles.svg} />
      </div>
    );
  }
}
