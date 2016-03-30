process.env.NODE_ENV = 'test';

var app = require('../server.js');
var models = require('../models');
var sequelize = models.sequelize;

var mocha = require('mocha');
var expect = require('chai').expect;
var request = require('supertest');
// var fs = require('fs');

describe('GET /api/user/:id', function(){

  beforeEach(function(done) {
    sequelize.sync({force: true}).then(function() { done(); });
  });

  beforeEach(function(done) {
    request(app)
      .post('/api/signUp', {
        headers: {'content-type' : 'application/json'},
        body:    JSON.stringify({username: 'pie', email: "pie@pie.com", password: "piepie"})
      }).end(function(err, response) {
        console.log('err', err);
        console.log("response", response);
        done();
      });
  });

  it('responds with json', function(done){
    request(app)
      .get('/api/user/1')
      .set('Accept', 'application/json')
      // .expect('Content-Type', /json/)
      .expect(200, done);
  });


  xit('fetches a created user', function (done) {

  });

  xit('allows users to add books', function (done) {


  });

  xit('fetches all of a users owned books', function (done) {


  });

  xit('fetches all of a users borrowed books', function (done) {


  });

  xit('fetches all of a users lent books', function (done) {


  });




});