// +page.server.ts
import { UAParser } from 'ua-parser-js';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ request, fetch }) => {
	const userAgent = request.headers.get('user-agent') || 'Unknown UA';
	const language = request.headers.get('accept-language') || 'Unknown';
	const ip = request.headers.get('x-forwarded-for') || '127.0.0.1'; // fallback

	const parser = new UAParser(userAgent);
	const ua = parser.getResult();

	let geo = null;
	try {
		const geoRes = await fetch(`https://ipapi.co/${ip}/json/`);
		geo = await geoRes.json();
	} catch (e) {
		geo = { error: 'Geo lookup failed' };
	}

	return {
		ip,
		language,
		ua: {
			browser: ua.browser.name,
			version: ua.browser.version,
			os: ua.os.name,
			osVersion: ua.os.version,
			device: ua.device.type || 'desktop',
			engine: ua.engine.name
		},
		geo
	};
};
