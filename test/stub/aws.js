module.exports = {
  'aws-sdk': {
    ECS: function ECS (opts) {
      return {
        registerTaskDefinition: (opts, callback) => {
          var response = {
            taskDefinition: {
              taskDefinitionArn: 123
            }
          }
          callback(null, response)
        },
        updateService: (opts, callback) => {
          var response = {
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
