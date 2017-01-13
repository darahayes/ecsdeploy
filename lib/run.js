const ecsDeploy = require('./deploy')

module.exports = function run (program) {
  if (!program.taskDefinition || !program.service || !program.cluster) {
    console.log('Incorrect arguments')
    return program.help()
  }
  ecsDeploy({
    taskDefinition: program.taskDefinition,
    service: program.service,
    cluster: program.cluster
  })
}
