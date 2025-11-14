# Build stage
FROM golang:1.21-alpine AS builder

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .

# Build the binary
RUN CGO_ENABLED=0 GOOS=linux go build -o /app/main ./cmd/api/main.go

# Final stage
FROM alpine:latest

WORKDIR /app

COPY --from=builder /app/main .
# Se tiver migrations, copie-as também
# COPY --from=builder /app/migrations ./migrations

# Expose port
EXPOSE 8080

# Command to run the executable
CMD ["./main"]