"use strict";
var _ = require('lodash');
var React = require('react');
var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var BootstrapButton = require('react-bootstrap').Button;
var BootstrapInput = require('react-bootstrap').Input;
var Codeblock = require('../codeblock/codeblock.jsx');
var Dispatcher = require('../../dispatchers/dispatcher');

var Webfinger = React.createClass({

  defaults: {
    domain: '',
    resource: '',
    aliases: [],
    links: [],
    properties: {},
    subject: '',
    code: {}
  },

  handleSubmit: function(e) {
    e.preventDefault();

    var domain = this.refs.host.getValue().trim();
    var resource = this.refs.resource.getValue().trim();

    if (!domain.length) {
      return false;
    }

    if (!resource.length) {
      return false;
    }

    Dispatcher.dispatch({
      actionType: 'updateResourceUrl',
      data: {
        domain: domain,
        resource: resource
      }
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

  updateWebFingerData: function() {
    this.setState({
      aliases: this.props.model.get('aliases'),
      links: this.props.model.get('links'),
      properties: this.props.model.get('properties'),
      subject: this.props.model.get('subject'),
      codeType: 'json',
      codeString: this.props.model.get('rawCode')
    });
  },

  componentDidMount: function() {
    this.props.model.on('sync', this.updateWebFingerData);
  },

  componentWillUnmount: function() {
    this.props.model.off('change');
  },

  //render helpers
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

    output.dt = <dt>Links</dt>;
    output.dd =  _.map(data, function(link, key) {
      return <dd key={_.uniqueId()} className="indent-1">{link.rel}</dd>;
    });

    return <dl>{output}</dl>;
  },


  getSubject: function(data) {
    if (_.isUndefined(data)) {
      return false;
    }

    var output = {};

    output.dt = <dt>Subject</dt>;
    output.dd = <dd className="indent-1">{data}</dd>

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
            <h2 Webfinger Check/>
            <BootstrapInput
              type = 'text'
              name = 'host'
              placeholder = 'Enter Complete Host Url'
              autoFocus = 'true'
              addonBefore = 'https://'
              ref = 'host'
              id = 'host'
              value = {this.state.domain}
              label = 'Domain to Lookup'
              required
            />
            <BootstrapInput
              type = 'text'
              name = 'resource'
              placeholder = 'Enter Account'
              ref = 'resource'
              id = 'resource'
              value = {this.state.resource}
              label = 'Account to Lookup at Domain'
              required
            />
            <BootstrapButton bsStyle="primary" type="submit">Get Webfinger Data</BootstrapButton>
          </form>
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-8">
            {this.getAliases(this.state.aliases)}
            {this.getLinks(this.state.links)}
            {this.getSubject(this.state.subject)}
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

module.exports = Webfinger;
