# ECS Deploy

[![CircleCI](https://circleci.com/gh/darahayes/ecsdeploy.svg?style=svg)](https://circleci.com/gh/darahayes/ecsdeploy)

A very simple tool to update tasks Amazon ECS services

```bash
npm install -g ecsdeploy
```

## Use as a CLI tool

Let's say we have a task definition file for an ECS service:

```
{
  "family": "myTestTaskDef",
  "containerDefinitions": [
    {
      "memoryReservation": "300",
      "essential": true,
      "name": "myContainer",
      "image": "myApp:latest",
      "cpu": "300"
    }
  ]
}
```

`ecsdeploy` makes it really easy to deploy.

```bash
ecsdeploy -s myService -c myCluster -t myTaskDef.json

{ taskDefinition: 'arn:aws:ecs:eu-west-1:12345678909:task-definition/myTestTaskDef:26',
service: 'arn:aws:ecs:eu-west-1:12345678909:service/myService',
cluster: 'arn:aws:ecs:eu-west-1:12345678909:cluster/myCluster' }
```

It's also possible to pipe the task definition JSON into `ecsdeploy`.

```bash
cat taskDef.json | ecsdeploy -s myService -c myCluster

{ taskDefinition: 'arn:aws:ecs:eu-west-1:12345678909:task-definition/myTestTaskDef:26',
  service: 'arn:aws:ecs:eu-west-1:12345678909:service/myService',
  cluster: 'arn:aws:ecs:eu-west-1:12345678909:cluster/myCluster' }
```

## Use Programmatically

```js
const ecsDeploy = require('ecsdeploy')

var opts = {
  taskDefinition: require('./taskDef.json'),
  service: 'myService',
  cluster: 'myCluster'
}

ecsDeploy(opts, (err, result) => {
  console.log(result)
})
```

### Why is ecsdeploy needed?

I found that many of the hosted build servers (CircleCI, TravisCI, etc.) do not have plugins for ECS deployments.

I wanted a simple solution that could be used on **any build server**  Let's say we have a CI/CD pipeline that deploys services to AWS ECS. We generally render the task definition JSON during the build process because every build has different outputs such as image tags, environment variables etc.

By passing the rendered JSON into `ecsdeploy`, it becomes incredibly simple to kick off deployments in ECS, regardless of the build system you use.
