import { UAParser } from 'ua-parser-js';
import type { PageServerLoad } from '../$types';
import { getConnections } from '$lib/supabase';

export const load: PageServerLoad = async () => {
	const connections = await getConnections();
	return {
		connections
	};
};
