@echo off
setlocal
set "NODEDIR=C:\Program Files\nodejs"
if not exist "%NODEDIR%\node.exe" (
  echo Node.js not found at %NODEDIR%.
  exit /b 1
)
set "PATH=%NODEDIR%;%PATH%"
set "npm_config_cache=%~dp0.npm-cache"
cd /d "%~dp0"
if not exist "node_modules" (
  call "%NODEDIR%\npm.cmd" install
  if errorlevel 1 exit /b 1
)
call "%NODEDIR%\npm.cmd" run build
