$candidates = @(
    "G:\EngMasterOut\app\outputs\apk\debug\app-debug.apk",
    "G:\EngMasterAndroid\app\build\outputs\apk\debug\app-debug.apk"
) | Where-Object { Test-Path $_ } | Sort-Object { (Get-Item $_).LastWriteTime } -Descending

if ($candidates.Count -eq 0) {
    Write-Error "APK not found in build outputs"
    exit 1
}
$srcApk = $candidates[0]

$apkItem = Get-Item $srcApk
$apkSizeMB = [math]::Round(($apkItem.Length / 1MB), 2)
Write-Host "Found build output: $srcApk ($apkSizeMB MB)" -ForegroundColor Green

$targets = @(
    "G:\English app\Rio-Languages-v2.0.apk",
    "G:\English app\RioLanguages.apk",
    "G:\English app\EngMaster-Full-v2.0.apk",
    "G:\English app\EngMaster-AI-v1.0.apk",
    "G:\English app\Rio-English-v1.0.apk",
    "G:\English app\hoc tieng anh 1.apk"
)

foreach ($target in $targets) {
    Copy-Item $srcApk $target -Force
    Write-Host "  -> Copied to: $target" -ForegroundColor Cyan
}

Write-Host "All APK files updated successfully!" -ForegroundColor Green
