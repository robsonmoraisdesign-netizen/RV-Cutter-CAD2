@echo off
setlocal
cd /d "%~dp0"
where cargo >nul 2>nul
if errorlevel 1 (
  echo Instale Rust e Visual Studio Build Tools com C++ conforme README.md.
  pause
  exit /b 1
)
set "RUSTFLAGS=-C target-feature=+crt-static"
cargo test --locked --no-default-features
if errorlevel 1 goto failed
cargo build --locked --release
if errorlevel 1 goto failed
echo Executavel gerado em target\release\RV-Cutter-Native.exe
pause
exit /b 0
:failed
echo Compilacao falhou. Confira as mensagens acima.
pause
exit /b 1
