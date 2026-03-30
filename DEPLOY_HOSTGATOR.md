# Deploy HostGator

Este frontend pode ser publicado na HostGator como site estatico, mantendo a API no Render.

## Premissas

- URL publica do frontend: `https://seu-dominio.com/cantina/`
- API continua no Render.
- A pasta publicada na HostGator sera `public_html/cantina/`

## Variaveis de ambiente

Crie ou ajuste `/.env.production` com a URL da API:

```env
VITE_API_URL=https://cantina-codi-api-2.onrender.com
```

## Build local

Na pasta `cantina-codi-web`:

```bash
npm install
npm run build
```

O build final sera gerado em `dist/`.

## Upload para a HostGator

Envie o conteudo da pasta `dist/` para:

```text
public_html/cantina/
```

Importante:

- Envie tambem o arquivo `.htaccess` gerado no build.
- Nao envie a pasta `dist` inteira como subpasta; envie o conteudo dela.

## Estrutura esperada no servidor

```text
public_html/
  cantina/
    assets/
    index.html
    .htaccess
```

## Observacoes

- O projeto usa `base: '/cantina/'` no Vite.
- O React Router usa `basename: '/cantina/'`.
- O `.htaccess` faz o fallback de SPA para `index.html`, evitando erro 404 ao recarregar rotas como `/cantina/cart` ou `/cantina/dashboard`.
