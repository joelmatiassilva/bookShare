process.env.NODE_ENV = 'test';

var app = require('../server.js');
var models = require('../models');
var sequelize = models.sequelize;

var mocha = require('mocha');
var expect = require('chai').expect;
var request = require('supertest');
// var fs = require('fs');

var token;

function setup(mochaDescribe){
  mochaDescribe.beforeEach(function() {
    return sequelize.sync({force: true});
  });

  mochaDescribe.beforeEach(function(done) {
    request(app)
    .post('/api/signUp', {
      headers: {'Content-type' : 'application/json'},
    })
    .send({username: 'Jack', email: "jack@yahoo.com", password: "jack2"})
    .end(function(err, response) {
      if (err) {
        console.log('err', err);
      }
      token = response.body.token;
      done();
    });
  });
}

describe('POST /api/books/', function(){
  setup(this);

  it('allows users to add books',  (done) => {
    request(app)
    .post('/api/books')
    .set('Authorization', token)
    .send({
      isbn10: '1234567890',
      isbn13: '1234567890123',
      authors: 'J.K. Rowling',
      title: 'Harry Potter 10',
      description: 'Best Wizard Ever!',
      image: 'insertPictureHere',
      categories: 'Fiction'
    })
    .expect(201)
    .end((err, res)=>{
      done();
    });
  });
});

describe('GET /api/books/', () => {

  it('view my self', (done) => {
    request(app)
    .get('/api/books')
    .set('Authorization', token)
    .expect(200)
    .end((err, res)=>{
      done();
    });
  });

});

  // xit('fetches all of a users owned books', function (done) {

  // });

  // xit('fetches all of a users borrowed books', function (done) {


  // });

  // xit('fetches all of a users lent books', function (done) {

  // });
