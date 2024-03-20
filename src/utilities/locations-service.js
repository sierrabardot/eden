import db from '../config/dbClient';

export async function getSavedLocations() {
    try {
        const {
            data: { user },
        } = await db.auth.getUser();
        const { data: userInteractions, error } = await db
            .from('user_interactions')
            .select('*, locations(*)')
            .eq('user_id', user.id);
        return userInteractions;
    } catch (error) {
        console.error('Error fetching user interactions:', error.message);
        throw new Error(error.message);
    }
}
