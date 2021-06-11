# Getting Started

To start the frontend and backend in one command, cd into the project and run the following. (You will need docker running on your machine)

```bash
docker-compose up --build
```

If you do not want to build but just run the containers run

```bash
docker-compose up
```

You can also run individual containers by adding the container name. For example

```bash
docker-compose up --build frontend
```

```bash
docker-compose up frontend
```
