'use strict';

var chai = require('chai');
var should = chai.should();
var sinon = require('sinon');
var sinonChai = require('sinon-chai');

var hostMetaSuccess = require('./fixtures/successes');
var hostMetaError = require('./fixtures/errors');

var Model = require('../app/scripts/stores/host-meta-model');

var setUpSuccessfulModel = function() {
  var url = 'https://latambridgepay.com';

  this.model = new Model({url: url});
  this.model.set(hostMetaSuccess[url]);
  this.hostMeta = this.model.attributes;
};

var setUpErroneousModel = function() {
  var url = '404';

  this.model = new Model({url: url});
  this.model.set(hostMetaError[url]);
  this.hostMeta = this.model.attributes;
};

chai.should();
chai.use(sinonChai);

describe('error response', function() {
  // model fetch should return 200 response code
});

describe('invalid model', function() {
  beforeEach(setUpErroneousModel);

  it('should determine if model data is invalid', function() {
    this.model.isValid().should.equal(false);
    this.model.validationErrors.should.eql([
      '"subject" of host meta data is invalid',
      '"expires" of host meta data is invalid',
      '"properties" of host meta data is invalid',
      '"links" of host meta data is invalid'
    ]);
  });
});

describe('valid model', function() {
  beforeEach(setUpSuccessfulModel);

  it('should determine if model data is valid', function() {
    this.model.isValid().should.equal(true);
  });
});

describe('required data', function() {
  beforeEach(setUpSuccessfulModel);

  it('should have a subject', function() {
    this.hostMeta.should.have.property('subject').with.length.above(0);
    this.hostMeta.subject.should.be.a('string');
  });

  it('should have an expiration date', function() {
    this.hostMeta.should.have.property('expires').with.length.above(0);
    this.hostMeta.expires.should.be.a('string');
  });

  it('should have properties', function() {
    this.hostMeta.should.have.property('properties');
    this.hostMeta.properties.should.be.an('object');
  });

  it('should have links', function() {
    this.hostMeta.should.have.property('links').with.length.above(0);
    this.hostMeta.links.should.be.an('array');
  });
});

describe('properties', function() {
  beforeEach(setUpSuccessfulModel);

  it('should have a name', function() {
    this.hostMeta.properties.should.have.property('name').with.length.above(0);
    this.hostMeta.properties.name.should.be.a('string');
  });

  it('should have a description', function() {
    this.hostMeta.properties.should.have.property('description').with.length.above(0);
    this.hostMeta.properties.description.should.be.a('string');
  });

  it('should have a type', function() {
    this.hostMeta.properties.should.have.property('rl:type').with.length.above(0);
    this.hostMeta.properties['rl:type'].should.be.a('string');
  });

  it('should have a domain', function() {
    this.hostMeta.properties.should.have.property('rl:domain').with.length.above(0);
    this.hostMeta.properties['rl:domain'].should.be.a('string');
  });

  it('should have an account', function() {
    this.hostMeta.properties.should.have.property('rl:accounts').with.length.above(0);
    this.hostMeta.properties['rl:accounts'].should.be.an('array');
  });

  it('should have at least one hot wallet', function() {
    this.hostMeta.properties.should.have.property('rl:hotwallets').with.length.above(0);
    this.hostMeta.properties['rl:hotwallets'].should.be.an('array');
  });
});

describe('accounts', function() {
  beforeEach(setUpSuccessfulModel);

  it('should have an address', function() {
    this.hostMeta.properties['rl:accounts'].forEach(function(element) {
      element.should.have.property('address').with.length.above(0);
    });
  });

  it('should have currencies', function() {
    this.hostMeta.properties['rl:accounts'].forEach(function(element) {
      element.should.have.property('rl:currencies');
      // sometimes it's an object (single item), sometimes it's an array (multiple items)
    });
  });
});

describe('links', function() {
  beforeEach(setUpSuccessfulModel);

  it('should include required rel field', function() {
    this.hostMeta.links.forEach(function(element) {
      element.should.have.property('rel').with.length.above(0);
      element.rel.should.be.a('string');
    });
  });
});

