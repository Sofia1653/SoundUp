# Estágio 1: Build (para compilar e empacotar o JAR)
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app
# Copia todo o conteúdo de backend/
COPY .. .
# Gera o JAR (o nome do artefato é soundup-0.0.1-SNAPSHOT.jar conforme seu pom.xml)
RUN mvn clean package -DskipTests

# Estágio 2: Runtime (imagem leve para execução)
FROM eclipse-temurin:17-jre-focal
WORKDIR /app
# Copia o JAR construído do estágio de build para o diretório atual
COPY --from=build /app/target/soundup-0.0.1-SNAPSHOT.jar app.jar
# Define a porta do Spring
EXPOSE 8080
# Comando para rodar a aplicação
ENTRYPOINT ["java", "-jar", "app.jar"]
