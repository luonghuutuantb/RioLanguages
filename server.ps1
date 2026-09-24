$http = [System.Net.HttpListener]::new()
$http.Prefixes.Add("http://localhost:5500/")
$http.Start()
Write-Host "Server started at http://localhost:5500/"
$basePath = "g:\English app"
while ($http.IsListening) {
    try {
        $context = $http.GetContext()
        $req = $context.Request
        $res = $context.Response
        $rawPath = $req.Url.LocalPath.TrimStart('/').Replace('/', '\')
        if ([string]::IsNullOrEmpty($rawPath)) { $rawPath = "index.html" }
        $localPath = [System.IO.Path]::Combine($basePath, $rawPath)
        if ([System.IO.File]::Exists($localPath)) {
            $ext = [System.IO.Path]::GetExtension($localPath).ToLower()
            $contentType = switch ($ext) {
                ".html" { "text/html; charset=utf-8" }
                ".js"   { "application/javascript; charset=utf-8" }
                ".css"  { "text/css; charset=utf-8" }
                ".png"  { "image/png" }
                ".jpg"  { "image/jpeg" }
                ".jpeg" { "image/jpeg" }
                ".svg"  { "image/svg+xml" }
                default { "application/octet-stream" }
            }
            $res.ContentType = $contentType
            $bytes = [System.IO.File]::ReadAllBytes($localPath)
            $res.ContentLength64 = $bytes.Length
            $res.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $res.StatusCode = 404
        }
        $res.OutputStream.Close()
    } catch {
        # ignore client disconnects
    }
}
