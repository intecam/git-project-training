# PROJETO-GIT-GAO


# 🧾 📌 Comandos Git mais usados

| Comando | Descrição | Exemplo |
|--------|-----------|---------|
| `git init` | Inicia um novo repositório Git local | `git init` |
| `git clone [URL]` | Clona um repositório remoto para sua máquina | `git clone https://github.com/usuario/repositorio.git` |
| `git status` | Mostra o status atual dos arquivos (modificados, adicionados etc.) | `git status` |
| `git add [arquivo]` | Adiciona arquivos ao "staging area" para o próximo commit | `git add index.html` |
| `git add .` | Adiciona todos os arquivos modificados ao staging | `git add .` |
| `git commit -m "mensagem"` | Cria um commit com os arquivos que foram adicionados | `git commit -m "Adicionado novo layout"` |
| `git log` | Mostra o histórico de commits | `git log` |
| `git branch` | Lista as branches existentes no projeto | `git branch` |
| `git branch [nome]` | Cria uma nova branch | `git branch nova-feature` |
| `git checkout [nome]` | Troca para outra branch | `git checkout main` |
| `git checkout -b [nome]` | Cria e troca para uma nova branch | `git checkout -b feat-hyan` |
| `git merge [branch]` | Faz o merge da branch indicada na branch atual | `git merge feat-hyan` |
| `git push` | Envia os commits da branch atual para o repositório remoto | `git push` |
| `git push -u origin [branch]` | Envia a branch para o repositório remoto e define o rastreamento | `git push -u origin feat-hyan` |
| `git pull` | Baixa atualizações do repositório remoto e faz merge com sua branch atual | `git pull` |
| `git remote -v` | Mostra os repositórios remotos configurados | `git remote -v` |
| `git config --global user.name` | Mostra ou define o nome do usuário globalmente | `git config --global user.name "Seu Nome"` |
| `git config --global user.email` | Mostra ou define o e-mail globalmente | `git config --global user.email "seu@email.com"` |
| `git stash` | Guarda temporariamente mudanças não commitadas | `git stash` |
| `git stash pop` | Recupera mudanças guardadas no stash | `git stash pop` |
