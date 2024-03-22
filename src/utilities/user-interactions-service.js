import db from '../config/dbClient';
import { getLocationData } from './locations-service';

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
        console.error('Error fetching user interactions: ', error.message);
        throw new Error(error.message);
    }
}

export async function updateFavourite(value, apiId, locationId = null) {
    // if (!locationId) {
    // await addLocation(apiId);
    // }
    try {
        const { error } = await db
            .from('user_interactions')
            .update({ is_favourite: value })
            .eq('id', locationId);
        if (error) {
            throw error;
        }
        console.log('Favourite updated successfully');
    } catch (error) {
        console.error(error);
        throw new Error('Unable to update favourite: ', error.message);
    }
}

export async function updateWishList(value, apiId, locationId = null) {
    if (!locationId) {
        console.log('this location does not exist on the db');
    }
    try {
        const { error } = await db
            .from('user_interactions')
            .update({ is_wishlist: value })
            .eq('id', locationId);
        if (error) {
            throw error;
        }
        console.log('Wishlist updated successfully');
    } catch (error) {
        console.error(error);
        throw new Error('Unable to update wishlist: ', error.message);
    }
}

async function addLocation(apiId) {
    const locationData = await getLocationData(apiId);
    console.log(locationData);
    const location = {
        lat: locationData.lat,
    };
    try {
        const { data, error } = await db.from('locations').insert({ location });
    } catch (error) {
        console.error(error);
    }
}
