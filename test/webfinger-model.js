'use strict';

var chai = require('chai');
var should = chai.should();
var sinon = require('sinon');
var sinonChai = require('sinon-chai');

var webfingerSuccess = require('./fixtures/successes');
var webfingerError = require('./fixtures/errors');

var Model = require('../app/scripts/stores/webfinger-model');

var setUpSuccessfulModel = function() {
  var url = 'latambridgepay.com';

  this.model = new Model();
  this.model.setResource('conner@staging.latambridgepay.com');
  this.model.setUrl('staging.latambridgepay.com');
  this.model.set(webfingerSuccess.mockJSON);
};

var setUpErroneousModel = function() {
  var url = '404';

  this.model = new Model({url: url});
  this.model.set(webfingerError[url]);
};

chai.should();
chai.use(sinonChai);

describe('invalid model', function() {
  beforeEach(setUpErroneousModel);

  it('should determine if model data is invalid', function() {
    this.model.isValid().should.equal(false);
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

  it('should have correct url', function() {
    this.model.url.should.exist
      .and.equal(webfingerSuccess.fullUrl);
  });

  it('should have a subject', function() {
    this.model.get('subject').should.exist
      .and.be.a('string');
  });

  it('should have links', function() {
    this.model.get('links').should.exist
      .and.be.an('array').with.length.above(0);
  });

  it('should have an expiration date', function() {
    this.model.get('expires').should.exist
      .and.be.a('string');
  });

});
