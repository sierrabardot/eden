import supabase from '../config/supabase';
import { getLocationData } from './locations-service';

export async function getSavedLocations() {
    try {
        const {
            data: { user },
        } = await supabase.auth.getUser();
        const { data: userInteractions, error } = await supabase
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
    try {
        if (!locationId) {
            const location = await addLocation(apiId);
            console.log(location);
        }
        const { data, error } = await supabase
            .from('user_interactions')
            .update({ is_favourite: value })
            .eq('id', locationId)
            .select();
        return data;
    } catch (error) {
        console.error(error);
        throw new Error('Unable to update favourites: ', error.message);
    }
}

export async function updateWishList(value, apiId, locationId = null) {
    try {
        if (!locationId) {
            const location = await addLocation(apiId);
            console.log(location);
        }
        const { data, error } = await supabase
            .from('user_interactions')
            .update({ is_wishlist: value })
            .eq('id', locationId)
            .select();
        return data;
    } catch (error) {
        console.error(error);
        throw new Error('Unable to update wishlist: ', error.message);
    }
}

export async function addLocation(apiId, interactionType) {
    const locationData = await getLocationData(apiId);
    try {
        const { data, error } = await supabase
            .from('locations')
            .insert({
                lat: locationData.lat,
                lng: locationData.lng,
                type_ids: locationData.type_ids,
                description: locationData.description,
                api_id: locationData.id,
            })
            .select();
        if (error) {
            console.log(error);
        }
        const userInteraction = await addLocationToUserInteraction(
            data[0],
            interactionType
        );
    } catch (error) {
        console.error(error);
    }
}

async function addLocationToUserInteraction(location, interactionType) {
    try {
        const {
            data: { user },
        } = await supabase.auth.getUser();
        const interactionData = {
            user_id: user.id,
            location_id: location.id,
            [`is_${interactionType}`]: true,
        };
        const { data, error } = await supabase
            .from('user_interactions')
            .insert(interactionData)
            .select();

        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
    }
}