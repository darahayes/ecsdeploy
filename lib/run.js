const ecsDeploy = require('./deploy')
const fs = require('fs')
const path = require('path')
const jsonParse = require('fast-json-parse')

module.exports = function run (opts, callback) {
  if ((!opts.taskDefinition && !opts.taskFile) || !opts.service || !opts.cluster) {
    return callback(new Error('invalid args'))
  }

  opts.taskDefinition = opts.taskFile
    ? parseTaskDef(fs.readFileSync(path.resolve(process.cwd(), opts.taskFile), 'utf8'))
    : parseTaskDef(opts.taskDefinition)

  ecsDeploy({
    taskDefinition: opts.taskDefinition,
    service: opts.service,
    cluster: opts.cluster
  }, callback)
}

function parseTaskDef (taskDefinition) {
  var parsed = jsonParse(taskDefinition)
  if (parsed.err) {
    throw parsed.err
  }
  return parsed.value
}
