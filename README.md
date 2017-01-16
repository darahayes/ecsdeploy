# ECS Deploy

A very simple tool that **uses pipes** to update tasks on existing services in Amazon ECS

## Use as a CLI tool

```bash
npm install -g ecsdeploy
```

Pipe the task definition JSON string into the `ecsdeploy` command. Use `-c` and `-s` to specify the cluster and service.

```bash
cat taskDef.json | ecsdeploy -s myService -c myCluster

{ taskDefinition: 'arn:aws:ecs:eu-west-1:12345678909:task-definition/myTestTaskDef:26',
  service: 'arn:aws:ecs:eu-west-1:12345678909:service/myService',
  cluster: 'arn:aws:ecs:eu-west-1:12345678909:cluster/myCluster' }
```

where `taskDef.json` is the following:

```
{
  "family": "myTestTaskDef",
  "containerDefinitions": [
    {
      "memoryReservation": "300",
      "essential": true,
      "name": "myContainer",
      "image": "nginx:latest",
      "cpu": "300"
    }
  ]
}
```

### Why Pipes?
Let's say we have a CI/CD pipeline for AWS ECS. We generally create the task definition JSON during the build process because every build has different outputs such as image tags, environment variables etc.

So whatever tool you use to create that task definition, just pipe the output straight into `ecsdeploy.`
