
IMAGE_NAME=innablr_interview_app

SHA := $(shell git rev-parse --short HEAD)

travis: dockerpush 

dockerbuild:
	docker build -t $(IMAGE_NAME):latest .

dockerpush: dockerbuild
	echo "$(DOCKER_PASSWORD)" | docker login -u "$(DOCKER_USERNAME)" --password-stdin
	docker tag $(IMAGE_NAME) arun6445/$(IMAGE_NAME):latest
	docker tag $(IMAGE_NAME) arun6445/$(IMAGE_NAME):$(SHA)
	docker push arun6445/$(IMAGE_NAME):latest
	docker push arun6445/$(IMAGE_NAME):$(SHA)

.PHONY:

