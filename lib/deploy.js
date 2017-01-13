'use strict'
const aws = require('aws-sdk')
const ecs = new aws.ECS({region: process.env.AWS_REGION})

function ecsDeploy (task, service, cluster) {
  ecs.registerTaskDefinition(task, (err, response) => {
    if (err) {
      throw err
    }
    var taskDef = response.taskDef
    console.log('Registered New Task Definition')
    console.log(JSON.stringify(taskDef, null, 2))

    var serviceParams = {
      service: service,
      cluster: cluster,
      taskDefinition: taskDef.taskDefinitionArn
    }
    ecs.updateService(serviceParams, (err, response) => {
      if (err) {
        throw err
      }
      console.log('Updated Service')
      console.log(response)
    })
  })
}

module.exports = ecsDeploy
