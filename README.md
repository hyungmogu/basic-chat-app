# Chat Application

## Running server on localhost

### Step 1 - install dependencies

### Step 2 - Starting Redis Server on localhost
```
docker run -p 6379:6379 -d redis:2.8
```

### Step 3 - Enter pipenv virtual environment

$ chat-application/backend
```
python3 -m pipenv shell
```

### Step 4 - Start server

$ chat-application/backend
```
python manage.py runserver
```