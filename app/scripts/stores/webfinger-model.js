'use strict';

var _ = require('lodash');
var $ = require('jquery');
var Backbone = require('backbone');
var Dispatcher = require('../dispatchers/dispatcher');
Backbone.$ = $;

var WebfingerData = Backbone.Model.extend({
  defaults: {
    resource: '',
    rawCode: {},
    expires: '',
    aliases: [],
    links: [],
    subject: ''
  },

  requiredAttrs: {
    expires: {
      type: 'string',
      minLength: 1
    },
    aliases: {
      type: 'array',
      minLength: 1
    },
    links: {
      type: 'array',
      minLength: 1
    },
    subject: {
      type: 'string',
      minLength: 1
    },
  },

  initialize: function() {
    _.bindAll(this, 'testValid', 'validate', 'setResource', 'setUrl', 'setResourceUrl', 'updateResourceUrl', 'dispatchCallback');

    Dispatcher.register(this.dispatchCallback);
  },

  dispatchCallback: function(payload) {
    var handleAction = {
      updateResourceUrl: this.updateResourceUrl
    };

    if (!_.isUndefined(handleAction[payload.actionType])) {
      handleAction[payload.actionType](payload.data);
    }
  },

  validationErrors: [],

  handleObject: function(attr, minLength) {
    if (attr === null) {
      return false;
    }

    if (Array.isArray(attr)) {
      return attr.length >= minLength;
    }

    return Object.keys(attr).length >= minLength;
  },

  handleString: function(attr, minLength) {
    return !!attr && attr.length >= minLength;
  },

  testValid: function(attr, requirements) {
    var attribute = this.get(attr);
    var testValid = {
      object: this.handleObject,
      string: this.handleString,
    };
    var isDefined = !_.isUndefined(attribute);
    var type = requirements.type === 'array' ? 'object' : requirements.type;
    var isValid = typeof attribute === type;

    if (isValid && !_.isUndefined(testValid[typeof attribute])) {
      isValid = testValid[typeof attribute](attribute, requirements.minLength);
    }

    // custom error messaging
    if (!isDefined) {
      this.validationErrors.push('"' + attr + '" of webfinger data is undefined');
    } else if (!isValid) {
      this.validationErrors.push('"' + attr + '" of webfinger data is invalid');
    }

    return isDefined && isValid;
  },

  validate: function() {
    var isValid = true,
        _this = this;

    _.each(this.requiredAttrs, function(requirements, requiredAttr) {
      if (!_this.testValid(requiredAttr, requirements)) {
        isValid = false;
      }
    });

    if (!isValid) {
      return 'There is an error';
    }
  },

  setResource: function(resource) {
    this.set('resource', resource);
  },

  setUrl: function(url) {
    var filePath = '/.well-known/webfinger';

    this.url = 'https://' + url + filePath + '?resource=' + this.get('resource');
  },

  setResourceUrl: function(domain, resource) {
    if (resource !== this.get('resource')) {
      this.set('resource', resource);
    }

    if (domain !== this.get('domain')) {
      this.setUrl(domain);
    }
  },

  updateResourceUrl: function(data) {
    this.setResourceUrl(data.domain, data.resource);
    this.fetch({reset:true});
  },

  parse: function(data) {
    // move stringify if we're not sanitizing here
    var output = {
          rawCode: JSON.stringify(data, undefined, 2),
          expires: data.expires,
          aliases: data.aliases,
          links: data.links,
          subject: data.subject,
          properties: data.properties
        };

    // _.extend(output, this.parseProperties(data.properties));

    return output;
  },

  // parseProperties: function(properties) {
  //   return {
  //     description: properties.description,
  //     name: properties.name,
  //     domain: properties['rl:domain'],
  //     hotWallets: properties['rl:hotwallets'],
  //     type: properties['rl:type'],
  //     accounts: properties['rl:accounts']
  //   };
  // }

});

module.exports = WebfingerData;
