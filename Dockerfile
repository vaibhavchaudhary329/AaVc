# Use a lightweight base image with Java
FROM openjdk:17-jdk-slim

# Set working directory
WORKDIR /app

# Copy the built JAR file into the container
COPY build/libs/login-0.0.1-SNAPSHOT.jar app.jar

# Expose port (optional, just for documentation)
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]