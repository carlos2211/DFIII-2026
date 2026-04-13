# ── Etapa 1: Build ────────────────────────────────────────
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline -B
COPY src ./src
RUN mvn package -DskipTests

# ── Etapa 2: Ejecución ────────────────────────────────────
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /app/target/pedidos-service-0.0.1-SNAPSHOT.jar app.jar

# ⚠️ Copia tu Wallet dentro de la carpeta del proyecto antes del build
COPY Wallet_dbfullstack3 /app/Wallet_dbfullstack3

EXPOSE 8082
ENTRYPOINT ["java", "-jar", "app.jar"]
