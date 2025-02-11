# Proxy

## Install Deno
```bash
npm i -g deno
```

## Start
```bash
deno run --allow-net main.ts <port>
```

## Deploy
[Deno Deploy](https://deno.com/deploy)

## Usage
```url
http://localhost:8000/?url=<url>[&headers=<json_object>][&delheaders=<json_array>][&resheaders=<json_object>][&delresheaders=<json_array>][&timeout=<milliseconds>]
```

### URL Parameters
- `url`: original resource URL
- `headers`: request headers to overwrite
- `delheaders`: names of request headers to delete (default: `['Referer']`)
- `resheaders`: response headers to overwrite (default: `{'Access-Control-Allow-Origin': '*'}`)
- `delresheaders`: names of response headers to delete
- `timeout`: milliseconds to abort request after
