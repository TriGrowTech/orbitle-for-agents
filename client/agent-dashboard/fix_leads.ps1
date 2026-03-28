$file = 'src\app\components\Leads.tsx'
$lines = Get-Content $file
$clean = $lines[0..534] + $lines[781..930]
Set-Content $file -Value $clean -Encoding UTF8
Write-Host "Done: $($clean.Length) lines written"
