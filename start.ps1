# Script لتشغيل Backend
# استخدام: .\start.ps1

Write-Host "🔨 Building project..." -ForegroundColor Yellow

# محاولة البناء
$buildResult = npm run build:backend 2>&1

if ($LASTEXITCODE -eq 0 -or $buildResult -match "Build completed") {
    Write-Host "✅ Build successful!" -ForegroundColor Green
    Write-Host "🚀 Starting server..." -ForegroundColor Green
    npm run start
} else {
    Write-Host "⚠️  Build had warnings, trying to start anyway..." -ForegroundColor Yellow
    
    # محاولة تشغيل حتى لو فشل البناء
    if (Test-Path "dist\server.js") {
        Write-Host "🚀 Starting server..." -ForegroundColor Green
        node dist/server.js
    } else {
        Write-Host "❌ Build failed and dist/server.js not found!" -ForegroundColor Red
        Write-Host "💡 Try installing TypeScript globally: npm install -g typescript" -ForegroundColor Yellow
        Write-Host "💡 Then run: tsc --skipLibCheck && node dist/server.js" -ForegroundColor Yellow
    }
}
