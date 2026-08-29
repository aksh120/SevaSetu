$chromePath = "C:\Program Files\Google\Chrome\Application\chrome.exe"
if (-not (Test-Path $chromePath)) {
    $chromePath = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
}

$htmlFile1 = Resolve-Path "scripts\render-logo.html"
$outputPng1 = (Resolve-Path "public").Path + "\logo.png"

$htmlFile2 = Resolve-Path "scripts\render-logo-text.html"
$outputPng2 = (Resolve-Path "public").Path + "\logo-with-tagline.png"

Write-Host "Rendering logo 1..."
& $chromePath --headless --disable-gpu --screenshot="$outputPng1" --window-size=1024,1024 --default-background-color=00000000 "$htmlFile1"

Write-Host "Rendering logo 2..."
& $chromePath --headless --disable-gpu --screenshot="$outputPng2" --window-size=1024,1024 --default-background-color=00000000 "$htmlFile2"

Write-Host "Render complete!"
