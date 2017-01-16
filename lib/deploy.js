'use strict'
const aws = require('aws-sdk')
const ecs = new aws.ECS({region: process.env.AWS_REGION})

function ecsDeploy (opts, callback) {
  ecs.registerTaskDefinition(JSON.parse(opts.taskDefinition), (err, response) => {
    if (err) return callback(err)
    opts.taskDefinition = response.taskDefinition.taskDefinitionArn

    ecs.updateService(opts, (err, response) => {
      if (err) return callback(err)
      callback(null, {
        taskDefinition: response.service.taskDefinition,
        service: response.service.serviceArn,
        cluster: response.service.clusterArn,
      })
    })
  })
}

module.exports = ecsDeploy
