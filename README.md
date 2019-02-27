# innablr_interview_app

This repo exposes the 2 endpoints:
1. root endpoint (/) - this returns the hello world application.
2. status endpoint (/status) - this returns the data in JSON format

# pre-requisites

* Travis
* docker-engine
* Node js
* Make

This project creates the docker images of the Node JS application and push it to Docker Hub using my credentials that are encrypted.
In order to use your own credentials, please run the following command and update the secret in `.travis.yml` file

```
travis encrypt DOCKER_USERNAME=<your_username>
travis encrypt DOCKER_PASSWORD=<your_password>
```

## Details
This project exposes the local host endpoints. You may set `$HOST` environment variable to specific domain/IP address or it is default to 127.0.0.1
The port exposed is 8080

Endpoints URL:

http://127.0.0.1:8080/ 

http://127.0.0.1:8080/status

When you make any changes to the GIT Repo and push the code to master branch, the Travis CI pipeline is triggered which build the environment and deploy the application inside the docker container.
