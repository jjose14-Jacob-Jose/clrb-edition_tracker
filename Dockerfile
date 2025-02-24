FROM maven:3.9-amazoncorretto-17-alpine AS build
COPY pom.xml .
COPY src ./src
RUN mvn clean install

FROM ringcentral/jdk:17
WORKDIR /app
COPY --from=build /target/CLRB-Edition_Tracker-1.0-SNAPSHOT.jar .
EXPOSE 8080
CMD ["java", "-jar", "CLRB-Edition_Tracker-1.0-SNAPSHOT.jar"]