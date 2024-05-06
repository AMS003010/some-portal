FROM golang:1.22-alpine3.19

WORKDIR /app

COPY . .

RUN go get 

RUN go mod tidy

EXPOSE 5000
CMD [ "go", "run", "main.go" ]
