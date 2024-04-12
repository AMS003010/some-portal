FROM golang:1.22-alpine3.19

RUN mkdir /app

COPY . /app

WORKDIR /app

RUN go get -d -v ./...

RUN go build -o api .

EXPOSE 5000
CMD [ "./api" ]
