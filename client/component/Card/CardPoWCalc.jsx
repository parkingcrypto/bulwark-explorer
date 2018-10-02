
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import Actions from '../../core/Actions';
import Component from '../../core/Component';
import Card from './Card';
import Icon from '../Icon';

class CardPoWCalc extends Component {
  constructor(props) {
    super(props);
    this.input = null;
    this.debounce = null;
    this.state = { amount: 0.0 };
  };

  handleClick = () => {
    const v = this.state.amount;

    if (!!v && !isNaN(v) && v > 0) {
      this.calculatePoW(v);
    } else {
      this.input.focus();
    }
  };

  handleKeyPress = (ev) => {
    if (ev.key === 'Enter') {
      ev.preventDefault();
      this.handleClick();
    } else {
      this.setState({ amount: ev.target.value });
    }
  };

  calculatePoW = (v) => {
    this.setState({ loading: true }, () => {
      if (this.debounce) {
        clearTimeout(this.debounce);
      }

      this.debounce = setTimeout(() => {
        this.props
          .calculatePoW(Number(v))
          .then((response) => {
            console.log(response);
            if (this.debounce) {
              this.setState({ response, loading: false });
            }
          })
          .catch(error => this.setState({ error, loading: false }));
      }, 800);
    });
  }

  render() {
    if (this.state.loading) {
      return this.renderLoading();
    }

    return (
      <Card title="PoW Calculator">
        <div className="row">
          <div className="col-sm-12 col-md-8">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                onClick={ this.handleClick }
                onKeyPress={ this.handleKeyPress }
                onChange={ ev => this.setState({ amount: ev.target.value })}
                ref={ i => this.input = i }
                value={ this.state.amount } />
              <div className="input-group-append">
                <div className="input-group-text">MH/s</div>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-4 text-center">
            <button onClick={ this.handleClick }>
              Estimate
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 text-gray">
            Submit for get an estimated of how much coins could you get mining XMN.
          </div>
        </div>
      </Card>
    );
  };
}

const mapDispatch = dispatch => ({
  calculatePoW: query => Actions.calculatePoW(query)
});

export default connect(null, mapDispatch)(CardPoWCalc);