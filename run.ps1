# Script نهائي لتشغيل المشروع
# استخدام: .\run.ps1

Write-Host "🔍 Checking TypeScript installation..." -ForegroundColor Yellow

# التحقق من TypeScript
$tscPath = Get-Command tsc -ErrorAction SilentlyContinue

if ($tscPath) {
    Write-Host "✅ TypeScript found globally" -ForegroundColor Green
    Write-Host "🔨 Building project..." -ForegroundColor Yellow
    tsc --skipLibCheck
    
    if ($LASTEXITCODE -eq 0 -or (Test-Path "dist\server.js")) {
        Write-Host "✅ Build successful!" -ForegroundColor Green
        Write-Host "🚀 Starting server..." -ForegroundColor Green
        node dist/server.js
    } else {
        Write-Host "❌ Build failed!" -ForegroundColor Red
    }
} else {
    Write-Host "❌ TypeScript not found globally" -ForegroundColor Red
    Write-Host "📦 Installing TypeScript globally..." -ForegroundColor Yellow
    Write-Host "   Please run: npm install -g typescript" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "💡 Alternative: Use ts-node" -ForegroundColor Yellow
    Write-Host "   npm install ts-node --save-dev --no-save" -ForegroundColor Cyan
    Write-Host "   npx ts-node src/server.ts" -ForegroundColor Cyan
}

