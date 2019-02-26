
IMAGE_NAME=innablr_interview_app
# HOST=127.0.0.1
HOST_PORT=80
CONTAINER_PORT=8080

SHA := $(shell git rev-parse --short HEAD)
HOST := $(if $(HOST),$(HOST),127.0.0.1)
build: dockerbuild docker_deploy
push_image: dockerpush
build_and_push: dockerbuild dockerpush 
pull_and_deploy: dockerpull docker_deploy

docker_login:
	echo "$(DOCKER_PASSWORD)" | docker login -u "$(DOCKER_USERNAME)" --password-stdin

docker_build:
	docker build -t $(IMAGE_NAME):latest .

docker_push: 
	docker_login
	docker tag $(IMAGE_NAME) arun6445/$(IMAGE_NAME):latest
	docker tag $(IMAGE_NAME) arun6445/$(IMAGE_NAME):$(SHA)
	docker push arun6445/$(IMAGE_NAME):latest
	docker push arun6445/$(IMAGE_NAME):$(SHA)

docker_pull:
	docker_login
	docker pull arun6445/$(IMAGE_NAME):$(SHA)
	

docker_deploy:
	docker run -d -p $(HOST):$(CONTAINER_PORT):$(HOST_PORT) ${IMAGE_NAME}

.PHONY:

