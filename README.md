# Simple webapplication built using django and react.

<p>This application demostrate simple features of e-commerce platform.<p>

To run this application you can follow following steps:

```
git clone https://github.com/code002-ZeroTwo/c2cecom.git
```

then cd to c2cecom with:

### Setup Backend

```
cd c2cecom
```

Install reqired packages for backend with:

```
pip install requirement.txt
```

Run django server with:

```
python manage.py runserver
```

With this you have backend server running at [127.0.0.1:8000](127.0.0.1:8000)

To create superuser you can:

```
python manage.py createsuperuser
```
follow along and you will have user account with admin privileges.

visit admin panel at [127.0.0.1:8000/admin](127.0.0.1:8000/admin)

### Setup frontend

Now to run react application(frontend) you need to have node installed in your machine.you can install it from [here](https://nodejs.org/)

change directory to react application, in this case with:

```
cd frontend2
```

Install dependencies with:

```
npm install
```

This might take some time.

Now start React application with:

```
npm start
```

This will start a development server, and the app will be accessible in your web browser at http://localhost:3000 (unless the port has been configured differently).

