@echo off
cd /d "%~dp0"
title Portfolio editor
echo Starting portfolio editor. Close this window to stop.
echo.
where python >nul 2>nul
if %errorlevel%==0 (
  python scripts\serve.py
) else (
  py -3 scripts\serve.py
)
echo.
echo Editor stopped. Press any key to close this window.
pause >nul
