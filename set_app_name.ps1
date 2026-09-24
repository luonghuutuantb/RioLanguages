$content = @"
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <string name="app_name">Rio Languages</string>
</resources>
"@
[System.IO.File]::WriteAllText("G:\EngMasterAndroid\app\src\main\res\values\strings.xml", $content, [System.Text.Encoding]::UTF8)
Write-Host "strings.xml updated successfully!" -ForegroundColor Green
