Add-Type -AssemblyName System.Drawing

function Create-RoundedRectanglePath {
    param(
        [System.Drawing.RectangleF]$rect,
        [float]$radius
    )
    $path = New-Object System.Drawing.Drawing2D.GraphicsPath
    $diameter = $radius * 2
    
    $path.AddArc($rect.X, $rect.Y, $diameter, $diameter, 180, 90)
    $path.AddLine($rect.X + $radius, $rect.Y, $rect.Right - $radius, $rect.Y)
    $path.AddArc($rect.Right - $diameter, $rect.Y, $diameter, $diameter, 270, 90)
    $path.AddLine($rect.Right, $rect.Y + $radius, $rect.Right, $rect.Bottom - $radius)
    $path.AddArc($rect.Right - $diameter, $rect.Bottom - $diameter, $diameter, $diameter, 0, 90)
    $path.AddLine($rect.Right - $radius, $rect.Bottom, $rect.X + $radius, $rect.Bottom)
    $path.AddArc($rect.X, $rect.Bottom - $diameter, $diameter, $diameter, 90, 90)
    $path.AddLine($rect.X, $rect.Bottom - $radius, $rect.X, $rect.Y + $radius)
    $path.CloseFigure()
    return $path
}

$size = 1024
$bmp = New-Object System.Drawing.Bitmap($size, $size, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g = [System.Drawing.Graphics]::FromImage($bmp)

$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g.Clear([System.Drawing.Color]::Transparent)

# 1. Background Rounded Badge (Squircle)
$margin = 20.0
$badgeRect = New-Object System.Drawing.RectangleF($margin, $margin, ($size - 2 * $margin), ($size - 2 * $margin))
$badgeRadius = 220.0
$badgePath = Create-RoundedRectanglePath $badgeRect $badgeRadius

# Gradient for Background: Deep Rich Teal (#14464D brand color)
$bgBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
    (New-Object System.Drawing.PointF(0, 0)),
    (New-Object System.Drawing.PointF(0, $size)),
    ([System.Drawing.Color]::FromArgb(255, 24, 82, 90)),
    ([System.Drawing.Color]::FromArgb(255, 12, 45, 50))
)
$g.FillPath($bgBrush, $badgePath)

# Premium Gold Rim Accent
$borderPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(90, 245, 175, 45), 4.5)
$g.DrawPath($borderPen, $badgePath)

# Ambient Radial Light behind the bridge
$radialPath = New-Object System.Drawing.Drawing2D.GraphicsPath
$radialPath.AddEllipse(162, 162, 700, 700)
$pgh = New-Object System.Drawing.Drawing2D.PathGradientBrush($radialPath)
$pgh.CenterColor = [System.Drawing.Color]::FromArgb(40, 245, 165, 30)
$pgh.SurroundColors = @([System.Drawing.Color]::FromArgb(0, 20, 70, 77))
$g.FillPath($pgh, $badgePath)

# 2. Bridge Geometry Scaling
$scale = 26.5
$offsetX = ($size - (32.0 * $scale)) / 2.0
$offsetY = (($size - (32.0 * $scale)) / 2.0) - 2.0

function ScaleX([float]$x) { return $offsetX + ($x * $scale) }
function ScaleY([float]$y) { return $offsetY + ($y * $scale) }

# Color: Warm Marigold Gold Gradient
$goldBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
    (New-Object System.Drawing.PointF(0, (ScaleY 7))),
    (New-Object System.Drawing.PointF(0, (ScaleY 27))),
    ([System.Drawing.Color]::FromArgb(255, 245, 185, 55)), # Radiant Gold Top
    ([System.Drawing.Color]::FromArgb(255, 205, 134, 24))  # Rich Deep Marigold Bottom
)

# Pens
$penBase = New-Object System.Drawing.Pen($goldBrush, (2.4 * $scale))
$penBase.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
$penBase.EndCap = [System.Drawing.Drawing2D.LineCap]::Round

$penPillars = New-Object System.Drawing.Pen($goldBrush, (2.3 * $scale))
$penPillars.StartCap = [System.Drawing.Drawing2D.LineCap]::Flat
$penPillars.EndCap = [System.Drawing.Drawing2D.LineCap]::Flat

$penCaps = New-Object System.Drawing.Pen($goldBrush, (1.4 * $scale))
$penCaps.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
$penCaps.EndCap = [System.Drawing.Drawing2D.LineCap]::Round

# Cable Pen with warm opacity
$cableColor = [System.Drawing.Color]::FromArgb(180, 235, 175, 45)
$penCable = New-Object System.Drawing.Pen($cableColor, (1.2 * $scale))
$penCable.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
$penCable.EndCap = [System.Drawing.Drawing2D.LineCap]::Round

# Step 1: Draw Suspension Cables (Underneath)
$p0 = New-Object System.Drawing.PointF((ScaleX 9.0), (ScaleY 11.5))
$cp1 = New-Object System.Drawing.PointF((ScaleX 11.3), (ScaleY 15.0))
$cp2 = New-Object System.Drawing.PointF((ScaleX 13.6), (ScaleY 16.7))
$p3 = New-Object System.Drawing.PointF((ScaleX 16.0), (ScaleY 16.7))
$g.DrawBezier($penCable, $p0, $cp1, $cp2, $p3)

$p4 = New-Object System.Drawing.PointF((ScaleX 23.0), (ScaleY 11.5))
$cp3 = New-Object System.Drawing.PointF((ScaleX 18.4), (ScaleY 16.7))
$cp4 = New-Object System.Drawing.PointF((ScaleX 20.7), (ScaleY 15.0))
$g.DrawBezier($penCable, $p3, $cp3, $cp4, $p4)

# Step 2: Draw Vertical Pillars (Flat ends meet flush with base and lintel caps)
$g.DrawLine($penPillars, [float](ScaleX 9), [float](ScaleY 25.5), [float](ScaleX 9), [float](ScaleY 11.5))
$g.DrawLine($penPillars, [float](ScaleX 16), [float](ScaleY 25.5), [float](ScaleX 16), [float](ScaleY 8.0))
$g.DrawLine($penPillars, [float](ScaleX 23), [float](ScaleY 25.5), [float](ScaleX 23), [float](ScaleY 11.5))

# Step 3: Draw Base Beam (Round ends)
$g.DrawLine($penBase, [float](ScaleX 4), [float](ScaleY 25.5), [float](ScaleX 28), [float](ScaleY 25.5))

# Step 4: Draw Lintel Top Crossbars (Round ends)
$g.DrawLine($penCaps, [float](ScaleX 6.5), [float](ScaleY 11.5), [float](ScaleX 11.5), [float](ScaleY 11.5))
$g.DrawLine($penCaps, [float](ScaleX 13.5), [float](ScaleY 8.0), [float](ScaleX 18.5), [float](ScaleY 8.0))
$g.DrawLine($penCaps, [float](ScaleX 20.5), [float](ScaleY 11.5), [float](ScaleX 25.5), [float](ScaleY 11.5))

# Save to public/logo.png
$outputPath = "c:\Users\apratim.nishant\Documents\GitHub\SevaSetu\public\logo.png"
$bmp.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)

Write-Host "Generated crisp $size x $size PNG logo at $outputPath"

# Also generate transparent version
$bmpTrans = New-Object System.Drawing.Bitmap($size, $size, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$gt = [System.Drawing.Graphics]::FromImage($bmpTrans)
$gt.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$gt.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$gt.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$gt.Clear([System.Drawing.Color]::Transparent)

$gt.DrawBezier($penCable, $p0, $cp1, $cp2, $p3)
$gt.DrawBezier($penCable, $p3, $cp3, $cp4, $p4)
$gt.DrawLine($penPillars, [float](ScaleX 9), [float](ScaleY 25.5), [float](ScaleX 9), [float](ScaleY 11.5))
$gt.DrawLine($penPillars, [float](ScaleX 16), [float](ScaleY 25.5), [float](ScaleX 16), [float](ScaleY 8.0))
$gt.DrawLine($penPillars, [float](ScaleX 23), [float](ScaleY 25.5), [float](ScaleX 23), [float](ScaleY 11.5))
$gt.DrawLine($penBase, [float](ScaleX 4), [float](ScaleY 25.5), [float](ScaleX 28), [float](ScaleY 25.5))
$gt.DrawLine($penCaps, [float](ScaleX 6.5), [float](ScaleY 11.5), [float](ScaleX 11.5), [float](ScaleY 11.5))
$gt.DrawLine($penCaps, [float](ScaleX 13.5), [float](ScaleY 8.0), [float](ScaleX 18.5), [float](ScaleY 8.0))
$gt.DrawLine($penCaps, [float](ScaleX 20.5), [float](ScaleY 11.5), [float](ScaleX 25.5), [float](ScaleY 11.5))

$outputTrans = "c:\Users\apratim.nishant\Documents\GitHub\SevaSetu\public\logo-mark-transparent.png"
$bmpTrans.Save($outputTrans, [System.Drawing.Imaging.ImageFormat]::Png)

$g.Dispose()
$gt.Dispose()
$bmp.Dispose()
$bmpTrans.Dispose()

Write-Host "Generated transparent mark at $outputTrans"
