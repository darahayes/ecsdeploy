module.exports = {
  'aws-sdk': {
    ECS: function ECS (opts) {
      return {
        registerTaskDefinition: (opts, callback) => {
          let response = {
            taskDefinition: {
              taskDefinitionArn: 123
            }
          }
          callback(null, response)
        },
        updateService: (opts, callback) => {
          let response = {
            service: {
              taskDefinition: 123,
              serviceArn: 456,
              clusterArn: 789
            }
          }
          callback(null, response)
        }
      }
    }
  }
}
