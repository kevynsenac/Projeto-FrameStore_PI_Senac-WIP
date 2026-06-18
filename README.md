Planejamento:
- Implementar lógica backend com NodeJS
- Implementar lógica de banco de dados com SQL
- Criar páginas de carrinho e pontos, e aplicar seus devidos redirecionamentos nas páginas
- Jogar jogos para DB e aplicar lógica no homepage e perfil para puxar os jogos de lá
- Fazer lógica de saldos para adiquirir jogos para perfil
- Criar lógica para pontos e uso (adquirir e trocar por descontos/cupons)
- Melhorar frontend em geral

-> Table PERFIL:
id:
nome: (display no perfil, homepage)
email: (para logar)
senha: (para logar)
carrinho: (jogos adicionados ao carrinho, pegar id)
saldo: (quanto dinheiro tem)
pontos: (quanto pontos tem)
biblioteca: (jogo comprados, pegar id)

-> Table JOGOS:
id: 
titulo: (nome do jogo)
preco: (preco cheio, se tiver algo na colum de desconto, devera ser feito o calculo para não ter cobraca errada)
desconto: (porcentagem para display na homepage ou null para sem desconto)
platform: (Steam, PlayStation, Xbox ou Mobile)
capa: (imagem para perfil e homepage)
gallery: (imagens para display ao acessar aba do jogo)

-> Table CUPONS:
id:
nome:
tipo: (por enquanto, só cupom)
desconto: (quanto de desconto aplica na hora da compra)
pontos: (quantos pontos custa)
usuarios: (quem tem esse cupom, por id)
