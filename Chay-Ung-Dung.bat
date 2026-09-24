@echo off
title Khoi Dong Rio Languages
echo ========================================================
echo   DANG KHOI DONG RIO LANGUAGES (WEB TEST)
echo ========================================================
echo.
echo 1. Dang khoi chay may chu web cuc bo (ho tro day du Micro & Am thanh)...
start /b powershell -ExecutionPolicy Bypass -File "server.ps1"
timeout /t 2 >nul
echo 2. Dang mo ung dung tren trinh duyet...
start http://localhost:5500/
echo.
echo ========================================================
echo   Ung dung da duoc mo tai http://localhost:5500/
echo   Ban co the dong cua so nay sau khi dung xong.
echo ========================================================
pause
