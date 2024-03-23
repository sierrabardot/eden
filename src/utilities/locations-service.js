const BASE_URL = 'https://fallingfruit.org/api/0.3';
const API_KEY = import.meta.env.VITE_APP_API_KEY;

export async function getAddress(lat, lng) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${
        import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY
    }`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.results[0].formatted_address;
    } catch (error) {
        console.error(error);
        throw new Error('Unable to fetch address.');
    }
}

export async function getLocationData(id) {
    const url = `${BASE_URL}/locations/${id}?api_key=${API_KEY}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw new Error('Unable to fetch location data.');
    }
}

export async function getPlantNames(ids) {
    try {
        const plantNames = await Promise.all(
            ids.map(async (id) => {
                const url = `${BASE_URL}/types/${id}?api_key=${API_KEY}`;
                const response = await fetch(url);
                const data = await response.json();
                return [data.scientific_names[0], data.common_names.en[0]];
            })
        );
        return plantNames;
    } catch (error) {
        console.error(error);
        throw new Error('Unable to fetch plant types.');
    }
}

export async function getNearbyLocations(userLocation, range = 10) {
    const [minLat, maxLat, minLng, maxLng] = findBounds(userLocation, range);
    const url = `${BASE_URL}/locations?bounds=${minLat},${minLng}|${maxLat},${maxLng}&center=${userLocation.lat},${userLocation.lng}&limit=30&offset=0&api_key=${API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
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

    const minLat = (userLocation.lat - latDiff).toFixed(4);
    const maxLat = (userLocation.lat + latDiff).toFixed(4);
    const minLng = (userLocation.lng - lngDiff).toFixed(4);
    const maxLng = (userLocation.lng + lngDiff).toFixed(4);

    return [minLat, maxLat, minLng, maxLng];
}
