@echo off
chcp 65001 >nul
echo ========================================================
echo   LOAMLAB CONNECTION FIXER
echo   土窟設計 - 連線修復工具
echo ========================================================
echo.
echo 正在嘗試強制同步... (請在跳出的視窗完成登入)
echo.

:: 1. Ensure remote is correct
git remote remove origin 2>nul
git remote add origin https://github.com/shenqi1016/loam-lab.git

:: 2. Force push local version to cloud (Overwrite remote)
git push -u origin main --force

echo.
echo ========================================================
echo   執行完成！
echo   如果看到上方有顯示 "branch main -> main" 或 "100%"，
echo   代表連線已成功建立。
echo.
echo   以後請直接使用 'update_site.bat' 即可！
echo ========================================================
pause
