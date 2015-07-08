'use strict'

const Redis = require('ioredis')
const assert = require('assert')
const Queue = require('..')
const redis = new Redis()

describe('redis.q', function() {
  describe('basic', function() {
    const queue = new Queue({
      name: 'queuetest',
      redis: redis,
      type: 'json'
    })

    it('push', function() {
      return queue.push({
        message: 'push'
      })
      .then(function() {
        return queue.push({
          message: 'push'
        })
      })
    })

    it('set', function() {
      return queue.set(1, {
        message: 'set'
      })
    })

    it('index', function() {
      return queue
        .index(1)
        .then(function(data) {
          return assert.equal(data.message, 'set')
        })
    })

    it('pushl - array', function() {
      return queue.pushl([{
        message: 'pushl - array'
      }, {
        message: 'pushl - array'
      }])
    })

    it('pushl - multi params', function() {
      return queue.pushl({
        message: 'pushl - multi params'
      }, {
        message: 'pushl - multi params'
      })
    })

    it('trim', function() {
      return queue
        .len()
        .then(function(size) {
          assert.equal(size, 6)
          return queue.trim(1, size - 1)
        })
        .then(function() {
          return queue.len()
        })
        .then(function(size) {
          return assert.equal(size, 5)
        })
    })

    it('len', function() {
      return queue
        .len()
        .then(function(size) {
          return assert.equal(size, 5)
        })
    })

    it('range', function() {
      return queue
        .range(0, 3)
        .then(function(data) {
          assert.equal(data.length, 4)
          assert.deepEqual(data[0], {
            message: 'set'
          })
          assert.deepEqual(data[1], {
            message: 'pushl - array'
          })
          assert.deepEqual(data[3], {
            message: 'pushl - multi params'
          })

          return queue.trim(4, 4)
        })
    })

    it('pop', function() {
      return queue
        .pop()
        .then(function(data) {
          return assert.deepEqual(data, {
            message: 'pushl - multi params'
          })
        })
    })
  })
})
