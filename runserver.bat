@echo off
cd FlossTrackerApp

if "%1%" == "-build" (
    cd react_app
    call npm run build
    cd ..
)

start /B python manage.py runserver
cd ..