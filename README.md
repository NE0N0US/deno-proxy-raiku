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
http://localhost:8000/?url=<url>[&headers=<json_object>][&delheaders=<json_array>][&resheaders=<json_object>][&delresheaders=<json_array>][&status=<status_code>][&statustext=<status_message>][&timeout=<milliseconds>]
```

### URL Parameters
- `url`: original resource URL
- `headers`: request headers to overwrite
- `delheaders`: names of request headers to delete (in addition to: `['Cache-Control', 'Pragma', 'If-Modified-Since', 'If-None-Match', 'Host', 'Origin', 'Referer']`)
- `resheaders`: response headers to overwrite (in addition to: `{'Access-Control-Allow-Origin': '*'}`)
- `delresheaders`: names of response headers to delete
- `status`: response status code to overwrite
- `statustext`: response status message to overwrite
- `timeout`: milliseconds to abort request after
