'use strict';

var _ = require('lodash');
var React = require('react');
var hl = require('highlight.js');

var CodeBlock = React.createClass({
  render: function() {
    if (_.isUndefined(this.props.type) || _.isUndefined(this.props.codeString)) {
      return false;
    }

    var code = hl.highlight(this.props.type, this.props.codeString).value;

    return (
      <pre>
        <code className="col-xs-12" dangerouslySetInnerHTML={{__html: code}} />
      </pre>
    );
  }
});

module.exports = CodeBlock;
