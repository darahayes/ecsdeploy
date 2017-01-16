const ecsDeploy = require('./deploy')

module.exports = function run (opts, callback) {
  if (!opts.taskDefinition || !opts.service || !opts.cluster) {
    return callback(new Error('invalid args'))
  }
  ecsDeploy({
    taskDefinition: JSON.parse(opts.taskDefinition),
    service: opts.service,
    cluster: opts.cluster
  }, callback)
}
