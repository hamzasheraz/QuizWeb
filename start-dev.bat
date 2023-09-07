@echo off

:: Start Django backend server
cd /d C:\path\to\task3
start "Django Server" python manage.py runserver

:: Start React frontend development server

cd frontend
npm start
