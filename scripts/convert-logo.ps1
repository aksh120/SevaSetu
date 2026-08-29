Add-Type -AssemblyName System.Drawing
$src = "C:\Users\apratim.nishant\.gemini\antigravity-ide\brain\0dfc1664-d282-4018-bc87-8b77f5e3fd2e\sevasetu_app_logo_1788014755473.jpg"
$dst = "c:\Users\apratim.nishant\Documents\GitHub\SevaSetu\public\logo.png"

$img = [System.Drawing.Image]::FromFile($src)
$img.Save($dst, [System.Drawing.Imaging.ImageFormat]::Png)
$img.Dispose()
Write-Host "PNG logo saved successfully at $dst"
