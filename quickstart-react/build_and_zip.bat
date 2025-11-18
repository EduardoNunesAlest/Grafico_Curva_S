@echo off
REM Script para build e zip do projeto Curva S
REM Autor: Alest
REM Data: 2025-11-17

echo.
echo ============================================================
echo   CURVA S - BUILD E ZIP PARA MONDAY.COM
echo ============================================================
echo.

REM Verificar se Python está instalado
python --version >nul 2>&1
if errorlevel 1 (
    echo [ERRO] Python nao encontrado!
    echo Por favor, instale Python 3.x
    echo Download: https://www.python.org/downloads/
    pause
    exit /b 1
)

REM Executar script Python
python build_and_zip.py

if errorlevel 1 (
    echo.
    echo [ERRO] Build falhou!
    pause
    exit /b 1
)

echo.
echo [SUCESSO] Build e ZIP concluidos!
echo.
pause
