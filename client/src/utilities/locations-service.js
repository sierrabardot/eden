import db from '../config/dbClient';

export async function fetchUserLocations() {
    const {
        data: { user },
    } = await db.auth.getUser();
    if (user) {
        const { data, error } = await db.from('locations').select('*');
        if (error) {
            console.error('Error fetching locations:', error.message);
        } else {
            console.log('User locations:', data);
            return data;
        }
    }
}
