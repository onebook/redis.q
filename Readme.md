[![NPM version][npm-img]][npm-url]
[![Build status][travis-img]][travis-url]
[![Test coverage][coveralls-img]][coveralls-url]
[![License][license-img]][license-url]
[![Dependency status][david-img]][david-url]

### redis.q

* use redis sdk [ioredis](https://github.com/luin/ioredis)
* Promise API

### Usage

* .push(data)
* .pushl(list)
* .set(index, data)
* .trim(start, end)
* .range(start, end)
* .pop()
* .index(index)
* .len()

```js
const Redis = require('ioredis')
const Queue = require('redis.q')
const redis = new Redis()
const queue = new Queue({
  name: 'queuetest',
  redis: redis,
  type: 'json'
})

queue.push({
  message: 'push'
})
.then(function() {
  return queue.push({
    message: 'push'
  })
})
```

### License
MIT

[npm-img]: https://img.shields.io/npm/v/redis.q.svg?style=flat-square
[npm-url]: https://npmjs.org/package/redis.q
[travis-img]: https://img.shields.io/travis/onebook/redis.q.svg?style=flat-square
[travis-url]: https://travis-ci.org/onebook/redis.q
[coveralls-img]: https://img.shields.io/coveralls/onebook/redis.q.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/onebook/redis.q?branch=master
[license-img]: https://img.shields.io/badge/license-MIT-green.svg?style=flat-square
[license-url]: http://opensource.org/licenses/MIT
[david-img]: https://img.shields.io/david/onebook/redis.q.svg?style=flat-square
[david-url]: https://david-dm.org/onebook/redis.q
