## CookRoo: A recipe sharing platform

### App users can do the following:
- View Recipes:
    - View All Recipes
    - View Individual Recipes in detail
- Search and Filter Recipes
    - Search Recipe by name or category
    - Filter by ingredients, cooking duration, dietary preferences, and difficulty level
- User generated content:
    - Create and post personal recipes

### Backend Server
- [Optional] Install dependencies ```pip install -r requirements.txt```
- Set up database and update config.ini with db details
- Make migrations ```python manage.py makemigrations```
- Make schema ```python manage.py migrate```
- Run tests ```python manage.py test```
- Run server ```python manage.py runserver```

### Frontend Server
- [Optional] Install dependencies ```npm install```
- Update backend IP in API.js
- Run server ```npm start```

### Cloud Deployment
This has been detailed out in 'CloudDeployment.md'