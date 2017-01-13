# ECS Deploy

A very simple tool that **uses pipes** to update tasks on existing services in Amazon ECS

## Use as a CLI tool

Pipe the task definition JSON string into the `ecsdeploy` command. Use `-c` and `-s` to specify the cluster and service.

```bash
cat taskDef.json | ecsdeploy -s myService -c myCluster

Task Definition: arn:aws:ecs:eu-west-1:123456789098:task-definition/myTaskDef:17
Service: arn:aws:ecs:eu-west-1:156233825351:service/myService
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

So whatever tool you use create that task definition, just pipe the output straight into `ecsdeploy.`
