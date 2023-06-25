FROM openjdk:11-jdk
COPY target/CLRB-Edition_Tracker-1.0-SNAPSHOT.jar /app/CLRB-Edition_Tracker-1.0-SNAPSHOT.jar
EXPOSE 8080
CMD ["java", "-jar", "/app/CLRB-Edition_Tracker-1.0-SNAPSHOT.jar"]