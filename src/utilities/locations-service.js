import db from '../config/dbClient';

const API_URL = 'https://fallingfruit.org/api/0.3';
const API_KEY = import.meta.env.VITE_APP_API_KEY;

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

export async function getNearbyLocations(userLocation, range) {
    try {
        const [minLat, maxLat, minLng, maxLng] = findBounds(
            userLocation,
            range
        );
        const url = `${API_URL}/locations/bounds=${minLat},${minLng}|${maxLat},${maxLng}&center=${userLocation.lat},${userLocation.lng}&limit=500&offset=0&api_key=${API_KEY}`;
        console.log(url);
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
}

function findBounds(userLocation, range) {
    const latDiff = range / 111.32;
    const lngDiff =
        range / (111.32 * Math.cos(userLocation.lat * (Math.PI / 180)));

    const minLat = userLocation.lat - latDiff;
    const maxLat = userLocation.lat + latDiff;
    const minLng = userLocation.lng - lngDiff;
    const maxLng = userLocation.lng + lngDiff;
    return [minLat, maxLat, minLng, maxLng];
}
