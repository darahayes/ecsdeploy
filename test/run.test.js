const proxyquire = require('proxyquire')
const tape = require('tape')

const run = proxyquire('../lib/run.js', {
  './deploy': (opts, callback) => {
    callback(null, {deployed: true})
  }
})

tape('run.js calls the deploy function', (test) => {
  test.plan(2)
  var opts = {
    taskDefinition: 'myTask',
    service: 'myService',
    cluster: 'myCluster'
  }
  run(opts, (err, result) => {
    test.error(err, 'no error is present')
    test.equal(result.deployed, true, 'deploy function has been called')
  })
})

tape('run.js will not call the deploy function if arguments are wrong', (test) => {
  test.plan(2)
  var opts = {
    taskDefinition: 'myTask',
    cluster: 'myCluster'
  }
  run(opts, (err, result) => {
    test.ok(err, 'an error occurred')
    test.equal(err.message, 'invalid args', 'invalid args error')
  })
})
