# Use an official Maven image as the base image
FROM maven:3.8.4-openjdk-11-slim AS build

# Copy the Maven project files to the container
COPY pom.xml .
COPY src ./src

# Build the Maven project (this will download dependencies and compile the code)
RUN mvn clean install

#FROM openjdk:11-jdk
#COPY target/CLRB-Edition_Tracker-1.0-SNAPSHOT.jar /app/CLRB-Edition_Tracker-1.0-SNAPSHOT.jar
#EXPOSE 8080
#CMD ["java", "-jar", "/app/CLRB-Edition_Tracker-1.0-SNAPSHOT.jar"]

# Use a lightweight JRE image as the final image
FROM openjdk:11-jre-slim

# Set the working directory in the container
WORKDIR /app

# Copy the JAR file from the build stage to the final image
COPY --from=build /target/CLRB-Edition_Tracker-1.0-SNAPSHOT.jar .

# Expose the port on which your application listens (if needed)
EXPOSE 8080

# Command to run the JAR file when the container starts
CMD ["java", "-jar", "CLRB-Edition_Tracker-1.0-SNAPSHOT.jar"]
