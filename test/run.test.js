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
    taskDefinition: JSON.stringify({foo: 'bar'}),
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
    taskDefinition: JSON.stringify({foo: 'bar'}),
    cluster: 'myCluster'
  }
  run(opts, (err, result) => {
    test.ok(err, 'an error occurred')
    test.equal(err.message, 'invalid args', 'invalid args error')
  })
})

tape('run.js throws if invalid taskDefinition JSON is supplied', (test) => {
  test.plan(1)
  var opts = {
    taskDefinition: 'some: bad: JSON',
    service: 'myService',
    cluster: 'myCluster'
  }
  test.throws(() => {
    run(opts)
  })
})
