@echo off
setlocal
set "NODEDIR=C:\Program Files\nodejs"
if not exist "%NODEDIR%\node.exe" (
  echo Node.js not found at %NODEDIR%.
  echo Install Node.js LTS from https://nodejs.org/
  exit /b 1
)
set "PATH=%NODEDIR%;%PATH%"
set "npm_config_cache=%~dp0.npm-cache"
cd /d "%~dp0"
if not exist "node_modules" (
  echo Installing dependencies...
  call "%NODEDIR%\npm.cmd" install
  if errorlevel 1 exit /b 1
)
echo Starting Vite on http://127.0.0.1:5173
call "%NODEDIR%\npm.cmd" run dev -- --host 127.0.0.1 --port 5173
