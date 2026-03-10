$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$nodeDir = 'C:\Program Files\nodejs'
$nodeExe = Join-Path $nodeDir 'node.exe'
$npmCmd = Join-Path $nodeDir 'npm.cmd'

if (-not (Test-Path $nodeExe) -or -not (Test-Path $npmCmd)) {
  Write-Host "Node.js not found at $nodeDir. Reinstall Node.js and rerun this script." -ForegroundColor Yellow
  exit 1
}

$env:Path = "$nodeDir;$env:Path"
$env:npm_config_cache = Join-Path $projectRoot '.npm-cache'

Set-Location $projectRoot

if (-not (Test-Path (Join-Path $projectRoot 'node_modules'))) {
  Write-Host "Installing dependencies..." -ForegroundColor Cyan
  & $npmCmd install
  if ($LASTEXITCODE -ne 0) {
    Write-Host "Dependency install failed." -ForegroundColor Red
    exit $LASTEXITCODE
  }
}

Write-Host "Starting Vite dev server on http://127.0.0.1:5173 ..." -ForegroundColor Green
& $npmCmd run dev -- --host 127.0.0.1 --port 5173
