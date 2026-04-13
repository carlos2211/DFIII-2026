FROM amazoncorretto:21-alpine
WORKDIR /app
COPY target/libreria-0.0.1-SNAPSHOT.jar app.jar
COPY Wallet_dbfullstack3 /app/Wallet_dbfullstack3
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]