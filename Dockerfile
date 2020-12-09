FROM openjdk:15-oracle

MAINTAINER Dennis Maas <mail@dennismaas.de>

ADD backend/target/SpotWalker-0.9.jar app.jar

EXPOSE 5000

CMD [ "sh", "-c", "java -jar /app.jar" ]
