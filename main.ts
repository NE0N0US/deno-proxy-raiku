function tryParse<T = any>(json: string, isValid: (value) => unknown): T | undefined{
	try{
		const value = JSON.parse(json)
		if(isValid(value))
			return value
	}
	catch{}
}

function isArray(value){
	return Array.isArray(value)
}

function isRecord(value){
	return typeof value === 'object' && value && !isArray(value)
}

async function proxy(req: Request){
	const
		reqUrl = new URL(req.url),
		{url, ...params} = Object.fromEntries(reqUrl.searchParams)
	if(!url)
		return new Response(`Missing url parameter. Usage: ${reqUrl.origin}${reqUrl.pathname}?url=<url>[&headers=<json_object>][&delheaders=<json_array>][&resheaders=<json_object>][&delresheaders=<json_array>][&timeout=<milliseconds>]. More at https://github.com/NE0N0US/deno-proxy-raiku`, {status: 400})
	console.log(`${new Date().toISOString()}: ${url} from ${req.headers.get('referer') || req.headers.get('origin')}`)
	const reqHeaders = Object.assign(
		Object.fromEntries(req.headers),
		{'cache-control': undefined, pragma: undefined, 'if-modified-since': undefined, 'if-none-match': undefined, host: undefined, origin: undefined, referer: undefined},
		Object.fromEntries(new Headers(tryParse<Record<string, string>>(params.headers, isRecord)))
	)
	tryParse<string[]>(params.delheaders, isArray)?.forEach(name => delete reqHeaders[name.toLowerCase()])
	try{
		const
			timeout = Math.min(0, Number.isSafeInteger(+params.timeout) ? +params.timeout : 0),
			res = await fetch(url, {...req, headers: new Headers(reqHeaders), signal: timeout ? AbortSignal.timeout(timeout) : undefined}),
			headers = Object.assign(
				Object.fromEntries(res.headers),
				{'access-control-allow-origin': '*'},
				Object.fromEntries(new Headers(tryParse<Record<string, string>>(params.resheaders, isRecord)))
			)
		tryParse<string[]>(params.delresheaders, isArray)?.forEach(name => delete headers[name.toLowerCase()])
		return new Response(res.body, {...res, headers: new Headers(headers)})
	}
	catch(error){
		return new Response(error?.toString() ?? '', {status: 500})
	}
}

const
	portArg = +Deno.args[0],
	port = Number.isSafeInteger(portArg) && portArg >= 0 && portArg <= 65_535 ? portArg : 8_000
try{
	const server = Deno.serve({port}, proxy)
}
catch(error){
	if(error instanceof Deno.errors.AddrInUse)
		console.log(`Port ${port} already in use. It can be specified as the first argument`)
	else
		console.error(error)
}
