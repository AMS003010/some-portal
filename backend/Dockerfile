FROM golang:1.22-alpine3.19 AS build

WORKDIR /app

COPY go.mod go.sum ./

RUN go mod download 

COPY . .

RUN go build -o main .

FROM alpine:latest

WORKDIR /app

COPY --from=build /app/main .
COPY --from=build /app/servicetoken.json .

CMD ["./main"]

