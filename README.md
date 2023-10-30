# Get Summary Holdings 

Java Spring Boot project to calculate summary of editions. 

Production URL: https://editiontracker.azurewebsites.net

## Running the project with:
### Java.
1. Open command prompt in the project directory. 
2. In command prompt building project using the command: `mvn clean install`
3. Once build is successful, go the target folder: `cd target` 
4. Run the project: `java -jar CLRB-Edition_Tracker-1.0-SNAPSHOT.jar`
5. Access project in your browser at the URL: [http://localhost:8080/](http://localhost:8080/)

#### Prerequisites for running with Java:
1. [Java Development Kit (JDK)](https://www.oracle.com/java/technologies/downloads/).
2. [Apache Maven](https://maven.apache.org/download.cgi).

### Docker
1. Open command in the project directory. 
2. Build the Docker image: `docker build -t clrb-edition-tracker:latest .`
3. Run the Docker image: `docker run -p 8080:8080 clrb-edition-tracker:latest`
4. Access project in your browser at the URL: [http://localhost:8080/](http://localhost:8080/)

#### Prerequisites for running with Docker:
1. [Docker Desktop](https://www.docker.com/products/docker-desktop/)


##### Trivia

Edition Tracker was the original name of the project. It was later renamed to 'Get Summary Holdings'.