# Dra. Sabrina Soylla

Landing estática em HTML, CSS e JavaScript. Sem API, banco de dados ou instalação de dependências.

## Abrir localmente

Execute `./Iniciar.command`, ou `python3 -m http.server 8081 --directory dist` e abra http://localhost:8081.

## Publicar na Vercel

Envie esta pasta ao GitHub e importe o repositório. O arquivo `vercel.json` define `dist` como diretório de saída. Preset: Other. Root Directory: ./ . Não há comando de build nem variáveis de ambiente.

## Contato

Edite `dist/config.js` para cadastrar o WhatsApp real (país + DDD + número) e o CRO confirmado. WhatsApp configurado com o número informado: +55 69 9219-8982. Instagram do modelo: @drasabrinasoylla. CRO não exibido até confirmação.

## Imagens

Todas as 31 fotos recebidas estão em `dist/assets/photos`, preservadas sem alteração. A referência visual está em `referencias/modelo.jpeg`. Duplicatas são mantidas nos arquivos, mas não na galeria. A galeria tem 26 registros, filtros e visualização integral; seis registros são apresentados por vez. A associação dos grupos deve ser conferida pela cliente antes de publicar. A imagem IMG_7456 tem o título solicitado “Botox para Sorriso Gengival”.

Os blocos de clínica e filosofia foram adaptados com conteúdo editorial: não foram inventadas fotos de instalações nem usado o modelo de baixa resolução como foto real. Fontes armazenadas localmente. Sem trackers, cookies de analytics ou formulário de coleta.

## Estrutura

- dist/index.html: conteúdo
- dist/styles.css: layout e responsividade
- dist/app.js: menu, filtros e visualização de fotos
- dist/gallery.js: catálogo das fotos
- dist/config.js: contatos

## Verificação

Checagem de sintaxe JavaScript, referências locais e servidor HTTP. Navegador integrado indisponível nesta sessão; revisão visual em navegador real ainda necessária.
