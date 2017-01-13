#!/usr/bin/env node
'use strict'
const program = require('commander')
const run = require('./lib/run')

program
  .version('0.0.1')
  .description('Deploy a task definition to a given ECS cluster')
  .option('-t --task [taskDefinition]', 'The task definition to create')
  .option('-s, --service [service]', 'The service to update')
  .option('-c --cluster [cluster]', 'The cluster the service is defined in')
  .parse(process.argv)

if (!process.stdin.isTTY) {
  var pipe = ''
  process.stdin.setEncoding('utf8')
  process.stdin.on('data', (chunk) => { pipe += chunk })
  process.stdin.on('end', () => {
    program.taskDefinition = pipe.trim()
    run(program)
  })
} else {
  run(program)
}
