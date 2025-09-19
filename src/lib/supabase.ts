// supabase.ts
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, SUPABASE_ADMIN_SECRET } from '$env/static/private';

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
export const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_ADMIN_SECRET);

// Define a type to represent your row
export type ConnectionData = {
	ip: string;
	browser: string;
	os: string;
	device: string;
	engine: string;
	country: string;
	region: string;
	city: string;
	location: string;
	org: string;
	screen: string;
	platform: string;
	timezone: string;
	language: string;
	memory: string;
	cpu: string;
	touch: string;
};

export async function insertConnection(data: ConnectionData) {
	const { error, data: inserted } = await supabaseAdmin.from('connections').insert([data]);

	if (error) {
		console.error('Failed to insert connection:', error.message);
		return { success: false, error };
	}

	return { success: true, data: inserted };
}
