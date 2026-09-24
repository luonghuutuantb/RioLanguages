Add-Type -AssemblyName System.Drawing

$srcLogo = "G:\English app\assets\images\rio_logo.png"
if (-not (Test-Path $srcLogo)) {
    Write-Error "Cannot find source logo: $srcLogo"
    exit 1
}

$resDir = "G:\EngMasterAndroid\app\src\main\res"

$densities = @(
    @{ Folder = "mipmap-mdpi"; Size = 48 },
    @{ Folder = "mipmap-hdpi"; Size = 72 },
    @{ Folder = "mipmap-xhdpi"; Size = 96 },
    @{ Folder = "mipmap-xxhdpi"; Size = 144 },
    @{ Folder = "mipmap-xxxhdpi"; Size = 192 }
)

$srcImg = [System.Drawing.Image]::FromFile($srcLogo)

foreach ($item in $densities) {
    $folderPath = Join-Path $resDir $item.Folder
    if (-not (Test-Path $folderPath)) {
        New-Item -ItemType Directory -Path $folderPath -Force | Out-Null
    }
    
    $sz = $item.Size
    
    # 1. Square Launcher Icon
    $destBmp = New-Object System.Drawing.Bitmap($sz, $sz, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($destBmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    $g.Clear([System.Drawing.Color]::Transparent)
    
    $g.DrawImage($srcImg, 0, 0, $sz, $sz)
    $g.Dispose()
    
    $outPath = Join-Path $folderPath "ic_launcher.png"
    $destBmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $destBmp.Dispose()
    
    # 2. Round Launcher Icon (Circular mask)
    $roundBmp = New-Object System.Drawing.Bitmap($sz, $sz, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $gRound = [System.Drawing.Graphics]::FromImage($roundBmp)
    $gRound.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $gRound.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $gRound.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $gRound.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    $gRound.Clear([System.Drawing.Color]::Transparent)
    
    $path = New-Object System.Drawing.Drawing2D.GraphicsPath
    $path.AddEllipse(0, 0, $sz, $sz)
    $gRound.SetClip($path)
    $gRound.DrawImage($srcImg, 0, 0, $sz, $sz)
    $path.Dispose()
    $gRound.Dispose()
    
    $outRoundPath = Join-Path $folderPath "ic_launcher_round.png"
    $roundBmp.Save($outRoundPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $roundBmp.Dispose()
    
    Write-Host "Generated $($item.Folder) ($sz x $sz): ic_launcher.png & ic_launcher_round.png" -ForegroundColor Green
}

$srcImg.Dispose()
Write-Host "All Android launcher icons updated successfully from $srcLogo!" -ForegroundColor Cyan
