#!/usr/bin/env node
'use strict'
const program = require('commander')
const ecsDeploy = require('./lib/deploy')

program
  .version('0.0.1')
  .command('deploy [task]')
  .description('Deploy a task definition to a given ECS cluster')
  .option('-s, --service [service]', 'The service to update')
  .option('-c --cluster [cluster]', 'The cluster the service is defined in')
  .action(runDeploy)

program.parse(process.argv)

function runDeploy (task, options) {
  console.log('task:', task)
  console.log('service', options.service)
  console.log('cluster', options.cluster)

  if (!options.service) {
    console.log('Service argument is required')
    process.exit(1)
  }

  if (!options.cluster) {
    console.log('Cluster argument is required')
    process.exit(1)
  }

  ecsDeploy(task, options.service, options.cluster)
}
