# PowerShell script لتشغيل Backend
# استخدام: .\run-dev.ps1

Write-Host "🚀 Starting Backend Server..." -ForegroundColor Green

# محاولة استخدام tsx
if (Test-Path "node_modules\tsx") {
    Write-Host "Using tsx..." -ForegroundColor Yellow
    node --loader tsx/esm src/server.ts
} else {
    # إذا لم يكن tsx متاحاً، بناء المشروع أولاً
    Write-Host "Building project first..." -ForegroundColor Yellow
    npx tsc
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Starting server..." -ForegroundColor Green
        node dist/server.js
    } else {
        Write-Host "❌ Build failed!" -ForegroundColor Red
    }
}

