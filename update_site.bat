@echo off
:: Force UTF-8 encoding
chcp 65001 >nul

echo ========================================================
echo   LOAMLAB SITE UPDATER
echo   Syncing to GitHub and Vercel...
echo ========================================================
echo.

:: 0. Configure Git Identity (Auto-fix for first time run)
git config user.email "loamlab@example.com"
git config user.name "Loam Lab"

:: 1. Add all changes
echo [1/3] Scanning for changes...
git add .

:: 2. Commit changes
echo [2/3] Saving...
git commit -m "Update site content"

:: 3. Make sure branch exists and Push
echo [3/3] Uploading to Cloud...
git branch -M main
git push -u origin main

echo.
echo ========================================================
echo   SUCCESS! 
echo   Your site is updating. Please wait 30s and refresh.
echo ========================================================
timeout /t 10
