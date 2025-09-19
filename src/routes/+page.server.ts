import { UAParser } from 'ua-parser-js';
import type { PageServerLoad } from './$types';
import { insertConnection, type ConnectionData } from '$lib/supabase';

export const load: PageServerLoad = async ({ request, fetch }) => {
	const userAgent = request.headers.get('user-agent') || 'Unknown UA';
	const language = request.headers.get('accept-language') || 'Unknown';
	const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';

	const parser = new UAParser(userAgent);
	const ua = parser.getResult();

	let geo = null;
	try {
		const geoRes = await fetch(`https://ipapi.co/${ip}/json/`);
		geo = await geoRes.json();
	} catch {
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

export const actions = {
	save: async ({ request }) => {
		const formData = await request.formData();
		const raw = formData.get('combinedData');

		if (!raw) return { success: false, error: 'No data provided' };

		let connection: ConnectionData;
		try {
			connection = JSON.parse(raw.toString());
		} catch {
			return { success: false, error: 'Invalid JSON' };
		}

		const result = await insertConnection(connection);

		if (!result.success) {
			return { success: false };
		}

		return { success: true };
	}
};
