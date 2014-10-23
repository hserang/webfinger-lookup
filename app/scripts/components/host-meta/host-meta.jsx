"use strict";
var _ = require('lodash');
var React = require('react');
var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var BootstrapButton = require('react-bootstrap').Button;
var BootstrapInput = require('react-bootstrap').Input;
var Codeblock = require('../codeblock/codeblock.jsx');
var Dispatcher = require('../../dispatchers/dispatcher');

var HostMeta = React.createClass({

  defaults: {
    hostUrl: "",
    accounts: [],
    aliases: [],
    links: [],
    hotWallets: [],
    code: {}
  },

  handleSubmit: function(e) {
    e.preventDefault();

    var hostUrl = this.refs.host.getValue().trim();

    if (!hostUrl.length) {
      return false;
    }

    Dispatcher.dispatch({
      actionType: 'updateUrl',
      data: {hostUrl: hostUrl}
    });
  },

  toggleJSON: function(e) {
    e.preventDefault();

    var newVisibilityState = !this.state.codeVisible;
    var icon = {
      true: '▼',
      false: '▶'
    };

    this.setState({
      codeVisible: newVisibilityState,
      toggleIcon: icon[newVisibilityState]
    });
  },

  getInitialState: function() {
    return {
      toggleIcon: '▶',
      codeVisible: false
    };
  },

  updateHostMetaData: function() {
    this.setState({
      hostUrl: this.props.model.get('subject'),
      accounts: this.props.model.get('accounts'),
      aliases: this.props.model.get('aliases'),
      links: this.props.model.get('links'),
      hotWallets: this.props.model.get('hotWallets'),
      codeType: 'json',
      codeString: this.props.model.get('rawCode')
    });
  },

  componentDidMount: function() {
    this.props.model.on('sync', this.updateHostMetaData);
  },

  componentWillUnmount: function() {
    this.props.model.off('change');
  },

  //render helpers
  getCurrencies: function(data) {
    if (!data) {
      return false;
    }

    var output = {};

    output.currencyDt = <dt className="indent-2"> Currencies </dt>;

    output.currencyDd =  _.map(data, function(val, key) {
      return <dd key={_.uniqueId()} className="indent-3">{key}</dd>
    });

    return output;
  },

  getAccounts: function(data) {
    if (_.isUndefined(data)) {
      return false;
    }

    var output = {};
    var _this = this;

    output.accountDt = <dt> Accounts </dt>;
    output.accountDd =  _.map(data, function(account, key) {

      return ({
       account: <dd key={_.uniqueId()} className="indent-1">{account.address}</dd>,
       currency: _this.getCurrencies(account['rl:currencies'])
      });
    });

    return <dl>{output}</dl>;
  },

  getAliases: function(data) {
    if (_.isUndefined(data)) {
      return false;
    }

    var output = {};

    output.aliasDt = <dt> Aliases </dt>;
    output.aliasDd =  _.map(data, function(alias, key) {
      return <dd key={_.uniqueId()} className="indent-1">{alias}</dd>;
    });

    return <dl>{output}</dl>;
  },

  getLinks: function(data) {
    if (_.isUndefined(data)) {
      return false;
    }

    var output = {};

    output.dt = <dt> Links </dt>;
    output.dd =  _.map(data, function(link, key) {
      return <dd key={_.uniqueId()} className="indent-1">{link.rel}</dd>;
    });

    return <dl>{output}</dl>;
  },

  getHotWallets: function(data) {
    if (_.isUndefined(data)) {
      return false;
    }

    var output = {};

    output.dt = <dt> Hot Wallets </dt>;
    output.dd =  _.map(data, function(wallet, key) {
      return <dd key={_.uniqueId()} className="indent-1">{wallet}</dd>;
    });

    return <dl>{output}</dl>;
  },

  render: function() {

    var codeVisible = {};
    var _this = this;

    if (!this.state.codeVisible) {
      codeVisible.display = "none";
    }

    return (
      <div>
        <div className="row">
          <form role="form" className="col-xs-12" onSubmit={this.handleSubmit}>
            <h2 Host-Meta Check/>
            <BootstrapInput
              type = 'text'
              name = 'host'
              placeholder = 'Enter Complete Host Url'
              autoFocus = 'true'
              addonBefore = 'https://'
              ref = 'host'
              id = 'host'
              value = {this.state.value}
              label = 'Domain to Lookup'
            />
            <BootstrapButton bsStyle="primary" type="submit">Get Host-Meta Data</BootstrapButton>
          </form>
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-8">
              {this.getAccounts(this.state.accounts)}
              {this.getAliases(this.state.aliases)}
              {this.getLinks(this.state.links)}
              {this.getHotWallets(this.state.hotWallets)}
          </div>
        </div>
        <h5 onClick={this.toggleJSON} className="toggleable">raw JSON {this.state.toggleIcon}</h5>
        <div className="row" style={codeVisible}>
          <Codeblock type={this.state.codeType} codeString={this.state.codeString} />
        </div>
      </div>
    );
  }
});

module.exports = HostMeta;
