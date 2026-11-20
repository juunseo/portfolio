@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo 포트폴리오 편집 모드를 시작합니다. 끝내려면 이 창을 닫거나 Ctrl+C
python scripts\serve.py
if errorlevel 1 pause
