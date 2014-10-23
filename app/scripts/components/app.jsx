var React = require('react');
var TopBar = require('./header/top-bar.jsx');
var HostMeta = require('./host-meta/host-meta.jsx');

var model = new (require('./../stores/host-meta-model'))();

require('react-bootstrap');

var App =
  React.createClass({

  render:function(){
    return (
      <div>
        <TopBar />
        <div className="container">
          <HostMeta model={model} />
        </div>
      </div>
    )
  }
});

module.exports = App;
