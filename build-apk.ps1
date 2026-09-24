# Build script for Rio Languages APK
param(
  [string]$BuildType = "assembleDebug"
)

$ErrorActionPreference = "Stop"

Write-Host "==============================================" -ForegroundColor Cyan
Write-Host "BAT DAU DONG GOI APK (RIO LANGUAGES)" -ForegroundColor Cyan
Write-Host "==============================================" -ForegroundColor Cyan

$sourceDir = "G:\English app"
$androidProjectDir = "G:\EngMasterAndroid"
$assetsWwwDir = "G:\EngMasterAndroid\app\src\main\assets\www"
$jdkDir = "G:\tools\jdk17"

if (-not (Test-Path "$jdkDir\bin\javac.exe")) {
    Write-Error "Khong tim thay JDK tai $jdkDir"
}
Write-Host "[+] Da tim thay JDK 17: $jdkDir" -ForegroundColor Green

Write-Host "[*] Dang dong bo tai nguyen Web..." -ForegroundColor Yellow

if (-not (Test-Path $assetsWwwDir)) {
    New-Item -ItemType Directory -Path $assetsWwwDir -Force | Out-Null
}

Copy-Item -Path "$sourceDir\index.html" -Destination "$assetsWwwDir\index.html" -Force
if (Test-Path "$sourceDir\manifest.json") {
    Copy-Item -Path "$sourceDir\manifest.json" -Destination "$assetsWwwDir\manifest.json" -Force
}
foreach ($sub in @('css', 'js', 'data', 'assets')) {
    $targetSub = "$assetsWwwDir\$sub"
    if (-not (Test-Path $targetSub)) { New-Item -ItemType Directory -Path $targetSub -Force | Out-Null }
    Copy-Item -Path "$sourceDir\$sub\*" -Destination "$targetSub\" -Recurse -Force
}

Write-Host "[+] Dong bo tai nguyen thanh cong!" -ForegroundColor Green

# Generate launcher icons
if (Test-Path "$sourceDir\update_icons.ps1") {
    & "$sourceDir\update_icons.ps1"
}

# Run Gradle or Direct APK Packaging
$buildSuccess = $false
Push-Location $androidProjectDir
try {
    Write-Host "[*] Dang thu bien dich bang Gradle ($BuildType)..." -ForegroundColor Yellow
    $cmd = "set JAVA_HOME=$jdkDir&& gradlew.bat clean $BuildType"
    cmd.exe /c $cmd
    if ($LASTEXITCODE -eq 0) {
        $buildSuccess = $true
        Write-Host "[+] Gradle bien dich thanh cong!" -ForegroundColor Green
    } else {
        Write-Warning "Gradle exit code $LASTEXITCODE. Chuyen sang che do dong goi truc tiep vao APK..."
    }
} catch {
    Write-Warning "Khong the chay Gradle: $_"
} finally {
    Pop-Location
}

if (-not $buildSuccess) {
    Write-Host "[*] Dang cap nhat tai nguyen vao ban APK..." -ForegroundColor Yellow
    
    $tempBuildDir = Join-Path $env:TEMP ("rio_apk_build_" + (Get-Random))
    New-Item -ItemType Directory -Path $tempBuildDir -Force | Out-Null
    
    $rawApk = Join-Path $tempBuildDir "rio_raw.apk"
    $baseApk = "G:\English app\Rio-Languages-v2.0.apk"
    
    if (-not (Test-Path $baseApk)) {
        $baseApk = "G:\EngMasterOut\app\outputs\apk\debug\app-debug.apk"
    }
    
    Copy-Item $baseApk $rawApk -Force
    
    # Cap nhat assets/ vao rawApk bang jar.exe
    Push-Location "G:\EngMasterAndroid\app\src\main"
    try {
        & "$jdkDir\bin\jar.exe" uf $rawApk "assets"
    } finally {
        Pop-Location
    }
    
    # Ky va zipalign bang uber-apk-signer (ho tro day du v1, v2, v3 chuan Android)
    $signerJar = "G:\tools\uber-apk-signer.jar"
    if (-not (Test-Path $signerJar)) {
        Write-Host "Dang tai uber-apk-signer..." -ForegroundColor Yellow
        Invoke-WebRequest -Uri "https://github.com/patrickfav/uber-apk-signer/releases/download/v1.3.0/uber-apk-signer-1.3.0.jar" -OutFile $signerJar -UseBasicParsing
    }
    
    $signedOutDir = Join-Path $tempBuildDir "signed"
    New-Item -ItemType Directory -Path $signedOutDir -Force | Out-Null
    
    Write-Host "[*] Dang ky va zipalign APK (v1, v2, v3)..." -ForegroundColor Cyan
    & "$jdkDir\bin\java.exe" -jar $signerJar --apks $rawApk --out $signedOutDir --allowResign
    
    $newSignedApk = (Get-ChildItem -Path $signedOutDir -Filter "*.apk" | Select-Object -First 1).FullName
    if (-not $newSignedApk -or -not (Test-Path $newSignedApk)) {
        Write-Error "Dong goi va ky APK that bai!"
    }
    
    $destOutDir = "G:\EngMasterOut\app\outputs\apk\debug"
    if (-not (Test-Path $destOutDir)) { New-Item -ItemType Directory -Path $destOutDir -Force | Out-Null }
    $finalDebugApk = Join-Path $destOutDir "app-debug.apk"
    Copy-Item $newSignedApk $finalDebugApk -Force
    
    Remove-Item $tempBuildDir -Recurse -Force -ErrorAction SilentlyContinue
    Write-Host "[+] Dong goi va ky APK thanh cong!" -ForegroundColor Green
}

# Copy APKs sang tat ca cac file dich
if (Test-Path "$sourceDir\copy_apk.ps1") {
    & "$sourceDir\copy_apk.ps1"
}
