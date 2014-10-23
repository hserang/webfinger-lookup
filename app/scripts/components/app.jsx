var React = require('react');
var TopBar = require('./header/top-bar.jsx');
var Webfinger = require('./webfinger/webfinger.jsx');

var model = new (require('./../stores/webfinger-model'))();

require('react-bootstrap');

var App =
  React.createClass({

  render:function(){
    return (
      <div>
        <TopBar />
        <div className="container">
          <Webfinger model={model} />
        </div>
      </div>
    )
  }
});

module.exports = App;
