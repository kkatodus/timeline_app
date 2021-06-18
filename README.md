# Getting Started

## Start the backend

First, to get the backend of this project started, cd into the root directory of this project and run the following command:

```bash
docker-compose up --build db backend
```

Then log into the backend docker container and run the two commands below:

```bash
python manage.py makemigrations api
python manage.py migrate api
```

This should initiate your database with the models we are using.

(Optionally you can create a superuser to log into the admin site of django. To do this, run the command below in the backend docker container)

```bash
python manage.py createsuperuser
```

Now the backend should be ready to accept connections from the react frontend

## Start the frontend

As port 8000 in the backend docker container is mapped to the port 8000 of your local machine, you do not have to use docker to activate the frontend of this project.
Simply cd into the frontend directory of this project and run the following commmands.

```bash
npm install
npm start
```

This should start your react frontend at port 3000
