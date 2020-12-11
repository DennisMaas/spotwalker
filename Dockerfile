FROM openjdk:15-oracle

MAINTAINER Dennis Maas <mail@dennismaas.de>

ADD backend/target/SpotWalker.jar app.jar

EXPOSE 5000

CMD ["sh" , "-c", "java -jar -Dserver.port=5000 -Dspring.data.mongodb.uri=$MONGO_DB_URI app.jar"]
