// var should = require('should')
const assert = require('chai').assert
const request = require('supertest')
const server = require('../../../app')
const ipAddress = require('ip-address')

function testRequest(path, method, reqModifier) {
  method = method || 'get'
  reqModifier = reqModifier || (x => x)

  return reqModifier(
    request(server)[method](path)
    .set('Accept', 'application/json')
  ).expect('Content-Type', /json/)
}


function isValidIp(ip) {
  let ipv6 = new ipAddress.Address6(ip)
  let ipv4 = new ipAddress.Address4(ip)

  return ipv6.isValid() || ipv4.isValid()
}

describe('controllers', function() {

  describe('ip', function() {
    describe('GET /ip', function() {
      it('should return a valid ip', function(done) {
        testRequest('/ip', 'get')
          .expect(200)
          .end(function(err, res) {
            assert.notExists(err)
            assert(isValidIp(res.body.ip))
            done()
          })
      })
    })
  })
})
