const proxyquire = require('proxyquire')
const tape = require('tape')
const awsStub = require('./stub/aws')
const ecsDeploy = proxyquire('../lib/deploy.js', awsStub)
const taskDef = require('./data/taskDef')

tape('ecsDeploy runs with correct arguments', (test) => {
  test.plan(3)
  var opts = {
    taskDefinition: JSON.stringify(taskDef)
  }
  ecsDeploy(opts, (err, result) => {
    test.error(err, 'No error is present')
    test.ok(result, 'A result has come back')
    test.deepEqual(result, {
      taskDefinition: 123,
      service: 456,
      cluster: 789
    })
  })
})

tape('ecsDeploy throws when invalid JSON is supplied', (test) => {
  test.plan(1)
  var opts = 'some: bad: JSON'
  test.throws(() => {
    ecsDeploy(opts)
  })
})
