'use strict'

const isArray = Array.isArray
const slice = [].slice

class Queue {
  constructor(opts) {
    opts = opts || {}

    /**
     * base queue
     *   - push: right
     *   - pop: left
     */

    this.type = opts.type
    this.redis = opts.redis
    this.name = opts.name || 'queue' + Math.random().toString().slice(2, 6)
  }

  push(data) {
    data = normalize(data)

    return this.redis
      .rpush(this.name, data)
  }

  pushl(args) {
    if (!isArray(args)) {
      args = slice.apply(arguments)
    }

    for (let i = 0; i < args.length; i++) {
      args[i] = normalize(args[i])
    }

    args = [this.name].concat(args)

    return this.redis
      .rpush.apply(this.redis, args)
  }

  set(index, data) {
    data = normalize(data)

    return this.redis
      .lset(this.name, index, data)
  }

  trim(start, end) {
    return this.redis
      .ltrim(this.name, start, end)
  }

  range(start, end) {
    let self = this

    return this.redis
      .lrange(this.name, start, end)
      .then(function(list) {
        return parse(self.type, list)
      })
  }

  pop() {
    let self = this

    return this.redis
      .lpop(this.name)
      .then(function(data) {
        return parse(self.type, data)
      })
  }

  index(i) {
    let self = this

    return this.redis
      .lindex(this.name, i)
      .then(function(data) {
        return parse(self.type, data)
      })
  }

  len() {
    return this.redis
      .llen(this.name)
  }
}

function normalize(data) {
  if (typeof data === 'object') {
    data = JSON.stringify(data)
  }

  return data
}

function parse(type, data) {
  if (type === 'json') {

    if (isArray(data)) {
      for (let i = 0; i < data.length; i++) {
        data[i] = JSON.parse(data[i])
      }
    } else {
      data = JSON.parse(data)
    }
  }

  return data
}

module.exports = Queue
