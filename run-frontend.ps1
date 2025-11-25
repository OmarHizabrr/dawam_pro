# PowerShell script لتشغيل Frontend
# استخدام: .\run-frontend.ps1

Write-Host "🚀 Starting Frontend Server..." -ForegroundColor Green

Set-Location frontend

if (Test-Path "node_modules") {
    npm run dev
} else {
    Write-Host "Installing dependencies first..." -ForegroundColor Yellow
    npm install
    npm run dev
}

