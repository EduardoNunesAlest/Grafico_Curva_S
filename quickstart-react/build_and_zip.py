#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para build e zip do projeto Curva S Monday App
Autor: Alest
Data: 2025-11-17
"""

import os
import sys
import subprocess
import shutil
import zipfile
from datetime import datetime
from pathlib import Path

# Configurar encoding UTF-8 para Windows
if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')
    sys.stderr.reconfigure(encoding='utf-8')

# Configurações
PROJECT_DIR = Path(__file__).parent
BUILD_DIR = PROJECT_DIR / "build"
DIST_DIR = PROJECT_DIR / "dist"
ZIP_NAME = f"curva-s-monday-app-{datetime.now().strftime('%Y%m%d-%H%M%S')}.zip"
ZIP_PATH = DIST_DIR / ZIP_NAME

# Cores para terminal
class Colors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKCYAN = '\033[96m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'

def print_step(message):
    """Imprime mensagem de passo"""
    print(f"\n{Colors.OKBLUE}{Colors.BOLD}▶ {message}{Colors.ENDC}")

def print_success(message):
    """Imprime mensagem de sucesso"""
    print(f"{Colors.OKGREEN}✓ {message}{Colors.ENDC}")

def print_error(message):
    """Imprime mensagem de erro"""
    print(f"{Colors.FAIL}✗ {message}{Colors.ENDC}")

def print_warning(message):
    """Imprime mensagem de aviso"""
    print(f"{Colors.WARNING}⚠ {message}{Colors.ENDC}")

def run_command(command, shell=True):
    """Executa comando e retorna resultado"""
    try:
        result = subprocess.run(
            command,
            shell=shell,
            cwd=PROJECT_DIR,
            capture_output=True,
            text=True,
            check=True
        )
        return True, result.stdout
    except subprocess.CalledProcessError as e:
        return False, e.stderr

def clean_build():
    """Limpa diretórios de build anteriores"""
    print_step("Limpando builds anteriores...")
    
    if BUILD_DIR.exists():
        shutil.rmtree(BUILD_DIR)
        print_success(f"Removido: {BUILD_DIR}")
    
    if DIST_DIR.exists():
        shutil.rmtree(DIST_DIR)
        print_success(f"Removido: {DIST_DIR}")
    
    DIST_DIR.mkdir(exist_ok=True)
    print_success("Diretórios limpos")

def check_dependencies():
    """Verifica se node_modules existe"""
    print_step("Verificando dependências...")
    
    node_modules = PROJECT_DIR / "node_modules"
    if not node_modules.exists():
        print_warning("node_modules não encontrado. Instalando dependências...")
        success, output = run_command("npm install")
        if success:
            print_success("Dependências instaladas")
        else:
            print_error("Erro ao instalar dependências")
            print(output)
            return False
    else:
        print_success("Dependências OK")
    
    return True

def build_project():
    """Executa build do projeto"""
    print_step("Executando build de produção...")
    
    success, output = run_command("npm run deploy:build")
    
    if success:
        print_success("Build concluído com sucesso")
        return True
    else:
        print_error("Erro no build")
        print(output)
        return False

def create_zip():
    """Cria arquivo ZIP do build"""
    print_step("Criando arquivo ZIP...")
    
    if not BUILD_DIR.exists():
        print_error(f"Diretório build não encontrado: {BUILD_DIR}")
        return False
    
    # Criar ZIP
    with zipfile.ZipFile(ZIP_PATH, 'w', zipfile.ZIP_DEFLATED) as zipf:
        # Adicionar todos os arquivos do build
        for root, dirs, files in os.walk(BUILD_DIR):
            for file in files:
                file_path = Path(root) / file
                arcname = file_path.relative_to(BUILD_DIR)
                zipf.write(file_path, arcname)
                print(f"  + {arcname}")
    
    # Verificar tamanho
    size_mb = ZIP_PATH.stat().st_size / (1024 * 1024)
    print_success(f"ZIP criado: {ZIP_NAME}")
    print_success(f"Tamanho: {size_mb:.2f} MB")
    print_success(f"Local: {ZIP_PATH}")
    
    return True

def create_manifest():
    """Cria arquivo monday-code-config.json (manifest do Monday.com)"""
    print_step("Criando monday-code-config.json...")
    
    manifest_path = BUILD_DIR / "monday-code-config.json"
    
    manifest = {
        "name": "Curva S",
        "short_description": "Análise de Curva S para projetos",
        "long_description": "Visualização de curvas S para análise comparativa de progresso planejado vs real. Permite configurar mapeamento de colunas, filtrar por grupos e visualizar desvios entre planejado e realizado.",
        "version": "1.0.1",
        "icon": "https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/remote_mondaycom_static/uploads/VladMystetskyi/4d3d2b69-9a2b-43d8-b6d3-4f3d5e8e7c6a_chart-line.png",
        "permissions": {
            "scopes": [
                "boards:read",
                "groups:read",
                "columns:read",
                "items:read",
                "boards:write"
            ]
        },
        "features": {
            "board_view": {
                "main_view": {
                    "url": "index.html",
                    "supported_layouts": ["main_view"]
                }
            }
        }
    }
    
    import json
    with open(manifest_path, 'w', encoding='utf-8') as f:
        json.dump(manifest, f, indent=2, ensure_ascii=False)
    
    print_success(f"monday-code-config.json criado em {manifest_path}")
    return True

def print_summary():
    """Imprime resumo final"""
    print(f"\n{Colors.HEADER}{Colors.BOLD}{'='*60}{Colors.ENDC}")
    print(f"{Colors.HEADER}{Colors.BOLD}  BUILD E ZIP CONCLUÍDOS COM SUCESSO!{Colors.ENDC}")
    print(f"{Colors.HEADER}{Colors.BOLD}{'='*60}{Colors.ENDC}\n")
    
    print(f"{Colors.OKGREEN}📦 Arquivo ZIP:{Colors.ENDC}")
    print(f"   {ZIP_PATH}\n")
    
    print(f"{Colors.OKGREEN}📋 Próximos passos:{Colors.ENDC}")
    print(f"   1. Acesse: https://monday.com/developers/apps")
    print(f"   2. Selecione seu app ou crie um novo")
    print(f"   3. Vá para 'Build' → 'Upload'")
    print(f"   4. Faça upload do arquivo: {ZIP_NAME}")
    print(f"   5. Configure as permissões necessárias")
    print(f"   6. Publique a versão\n")
    
    print(f"{Colors.OKGREEN}📚 Documentação:{Colors.ENDC}")
    print(f"   - DEPLOYMENT_GUIDE.md - Guia completo de deploy")
    print(f"   - QUICK_START.md - Guia rápido de uso")
    print(f"   - CURVA_S_README.md - Documentação completa\n")

def main():
    """Função principal"""
    print(f"\n{Colors.HEADER}{Colors.BOLD}{'='*60}{Colors.ENDC}")
    print(f"{Colors.HEADER}{Colors.BOLD}  CURVA S - BUILD E ZIP PARA MONDAY.COM{Colors.ENDC}")
    print(f"{Colors.HEADER}{Colors.BOLD}{'='*60}{Colors.ENDC}")
    
    try:
        # 1. Limpar builds anteriores
        clean_build()
        
        # 2. Verificar dependências
        if not check_dependencies():
            return 1
        
        # 3. Build do projeto
        if not build_project():
            return 1
        
        # 4. Criar manifest se necessário
        create_manifest()
        
        # 5. Criar ZIP
        if not create_zip():
            return 1
        
        # 6. Resumo
        print_summary()
        
        return 0
        
    except KeyboardInterrupt:
        print_error("\n\nOperação cancelada pelo usuário")
        return 1
    except Exception as e:
        print_error(f"\n\nErro inesperado: {str(e)}")
        import traceback
        traceback.print_exc()
        return 1

if __name__ == "__main__":
    exit(main())
