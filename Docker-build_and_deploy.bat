REM This files builds a Docker image and runs it.

REM Delete all Docker images.
docker rmi --force $(docker images -q)

REM Command to build a docker image with name 'clrb-edition-tracker-image' and tag 'latest'.
docker build -t clrb-edition-tracker-image:latest .

REM Command run the docker image 'clrb-edition-tracker-image:latest' on the port 8080.
docker run -p 8080:8080 clrb-edition-tracker-image:latest