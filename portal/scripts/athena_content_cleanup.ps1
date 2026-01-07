$ErrorActionPreference = "Stop"

$root = Resolve-Path ..\content\advanced-private-equity-associate
$files = Get-ChildItem -LiteralPath $root -Recurse -File -Filter *.md

function TitleFromFilename([string]$base) {
  $t = $base -replace "^\d+\-",""
  $t = $t -replace "-", " "
  $parts = $t -split "\s+"
  $out = @()
  foreach ($p in $parts) {
    if ($p -match "^(ic|vdr|loi|spa|tam|sam|som|kpi|qoe)$") { $out += $p.ToUpper(); continue }
    if ($p.Length -le 2) { $out += $p.ToUpper(); continue }
    $out += ($p.Substring(0,1).ToUpper() + $p.Substring(1))
  }
  return ($out -join " ").Trim()
}

foreach ($f in $files) {
  $text = Get-Content -LiteralPath $f.FullName -Raw -Encoding UTF8

  # Remove any YAML-ish block (--- ... ---) anywhere IF it contains title:
  $m = [regex]::Match($text, "(?s)(\r?\n|^)\s*---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n")
  if ($m.Success) {
    $fm = $m.Groups[2].Value
    $titleMatch = [regex]::Match($fm, "(?m)^\s*title:\s*(.+?)\s*$")
    if ($titleMatch.Success) {
      $before = $text.Substring(0, $m.Index)
      $after  = $text.Substring($m.Index + $m.Length)
      $text = ($before.TrimEnd() + "`n`n" + $after.TrimStart())
      $text = $text.TrimEnd() + "`n"
    }
  }

  $lines = $text -split "`r?`n"

  # Find first non-empty line
  $firstIdx = -1
  for ($i=0; $i -lt $lines.Count; $i++) {
    $ln = $lines[$i]
    if ($ln -ne $null -and $ln.Trim().Length -gt 0) { $firstIdx = $i; break }
  }
  if ($firstIdx -lt 0) { continue }

  $hasTopH1 = ($lines[$firstIdx].Trim() -match "^#\s+")
  if (-not $hasTopH1) {
    # Try to steal the first later H1 as title
    $title = $null
    $h1Idx = -1
    for ($j=$firstIdx; $j -lt $lines.Count; $j++) {
      $ln = $lines[$j]
      if ($ln -ne $null -and $ln.Trim() -match "^#\s+(.+)\s*$") {
        $title = $Matches[1].Trim()
        $h1Idx = $j
        break
      }
    }

    if ($title -eq $null -or $title.Trim().Length -eq 0) {
      $title = TitleFromFilename $f.BaseName
    } else {
      if ($h1Idx -ge 0) { $lines[$h1Idx] = "" }
    }

    $prefix = @("# $title", "")
    $lines = $prefix + $lines
  }

  # Normalize spacing
  $text2 = ($lines -join "`n")
  $text2 = [regex]::Replace($text2, "\r?\n{3,}", "`n`n")

  # Ensure a divider after the Checklist block
  if ($text2 -match "(?ms)^##\s+Checklist\s*$") {
    $text2 = [regex]::Replace(
      $text2,
      "(?ms)(^##\s+Checklist\s*$\r?\n(?:- \[ \].*\r?\n)+)(?!\r?\n*---\s*\r?\n)",
      "`$1`n---`n`n"
    )
  }

  # Collapse accidental double dividers
  $text2 = [regex]::Replace($text2, "(?m)^\s*---\s*$\r?\n^\s*---\s*$", "---")

  Set-Content -LiteralPath $f.FullName -Encoding UTF8 -Value ($text2.TrimEnd() + "`n")
}

"OK: cleanup complete."
