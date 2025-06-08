# Stage 1: Build the JAR using Gradle and Java 21
FROM gradle:8.4-jdk21 AS builder

# Copy project source into the container
COPY --chown=gradle:gradle . /home/gradle/project
WORKDIR /home/gradle/project

# Build the project without running tests (avoid DB/Kafka errors)
RUN gradle build -x test --no-daemon

# Stage 2: Run the built JAR with Java 21 runtime
FROM eclipse-temurin:21-jdk

# App directory
WORKDIR /app

# Copy the JAR from the builder stage
COPY --from=builder /home/gradle/project/build/libs/*.jar app.jar

# Run the app
ENTRYPOINT ["java", "-jar", "app.jar"]