@echo off
cd FlossTrackerApp

if "%1%" == "-b" (
    cd react_app
    call npm run build
    cd ..
)

start /B python manage.py runserver
cd ..