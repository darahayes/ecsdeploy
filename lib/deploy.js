'use strict'
const aws = require('aws-sdk')
const ecs = new aws.ECS({region: process.env.AWS_REGION})

function ecsDeploy (opts) {
  ecs.registerTaskDefinition(JSON.parse(opts.taskDefinition), (err, response) => {
    if (err) {
      throw err
    }
    console.log('Task Definition:', response.taskDefinition.taskDefinitionArn)
    opts.taskDefinition = response.taskDefinition.taskDefinitionArn

    ecs.updateService(opts, (err, response) => {
      if (err) {
        throw err
      }
      console.log('Service:', response.service.serviceArn)
    })
  })
}

module.exports = ecsDeploy
