// var should = require('should')
const assert = require('chai').assert
const request = require('supertest')
const server = require('../../../app')
function testRequest(path, method, reqModifier) {
  method = method || 'get'
  reqModifier = reqModifier || (x => x)

  return reqModifier(
    request(server)[method](path)
    .set('Accept', 'application/json')
  ).expect('Content-Type', /json/)


}

describe('controllers', function() {

  describe('hello_world', function() {
    describe('GET /hello', function() {
      it('should return a default string', function(done) {
        testRequest('/hello', 'get')
          .expect(200)
          .end(function(err, res) {
            assert.notExists(err)
            assert.deepEqual(res.body, {message: 'Hello, stranger!'})
            done()
          })
      })
      it('should accept a name parameter', function(done) {
        testRequest('/hello', 'get', r => r.query({ name: 'Scott'}))
          .expect(200)
          .end(function(err, res) {
            assert.notExists(err)
            assert.deepEqual(res.body, {message: 'Hello, Scott!'})
            done()
          })
      })
    })
  })
})
