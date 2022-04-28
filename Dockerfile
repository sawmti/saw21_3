FROM openjdk:15-alpine
ARG JAR_FILE=wikidataApi/target/*.jar
COPY ${JAR_FILE} app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app.jar"]