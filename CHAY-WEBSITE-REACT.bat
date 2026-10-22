@echo off
setlocal
chcp 65001 >nul
cd /d "%~dp0"
title KIEN TRUC JHOUSE - KHOI DONG WEBSITE REACT

echo.
echo  ================================================
echo           KIEN TRUC JHOUSE - REACT
 echo  ================================================
echo.
echo  Thu muc du an: %cd%
echo.

where node >nul 2>&1
if errorlevel 1 (
  echo  [LOI] Khong tim thay Node.js.
  echo  Cai Node.js LTS tu https://nodejs.org/
  echo  Dong va mo lai cua so sau khi cai dat.
  goto :error
)
where npm >nul 2>&1
if errorlevel 1 (
  echo  [LOI] Khong tim thay npm.
  echo  Hay cai lai Node.js LTS, sau do thu lai.
  goto :error
)

echo  [OK] Node.js:
node -v
echo  [OK] npm:
call npm -v
echo.

if not exist "node_modules\vite\bin\vite.js" (
  echo  Dang cai thu vien, lan dau can co internet...
  call npm install --no-audit --no-fund
  if errorlevel 1 (
    echo.
    echo  [LOI] npm install that bai. Kiem tra mang, antivirus,
    echo  hoac chup lai thong bao loi o phia tren.
    goto :error
  )
)

echo.
echo  ================================================
echo  Khoi dong may chu website...
echo  Khi thay "VITE ready", mo Chrome va truy cap:
echo.
echo        http://127.0.0.1:5173/
echo.
echo  QUAN TRONG: DUNG DONG CUA SO DEN NAY.
echo  Muon tat website, bam Ctrl+C.
echo  ================================================
echo.
call npm run dev -- --host 127.0.0.1 --port 5173 --strictPort

echo.
echo  [THONG BAO] May chu website da dung.
echo  Neu ban khong chu dong tat, chup lai loi phia tren.
goto :error

:error
echo.
echo  Nhan phim bat ky de dong cua so...
pause >nul
endlocal
exit /b 1
