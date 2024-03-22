import supabase from '../config/supabase';
import { getLocationData } from './locations-service';

export async function getSavedLocations() {
    try {
        const {
            data: { user },
        } = await supabase.auth.getUser();
        const { data: userInteractions, error } = await supabase
            .from('user_interactions')
            .select('*')
            .eq('user_id', user.id);
        return userInteractions;
    } catch (error) {
        console.error('Error fetching user interactions: ', error.message);
        throw new Error(error.message);
    }
}

export async function updateFavourite(value, locationId = null) {
    try {
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

export async function addLocationToFavourites(id) {
    try {
        const {
            data: { user },
        } = await supabase.auth.getUser();
        const { data, error } = await supabase
            .from('user_interactions')
            .insert({
                user_id: user.id,
                loc_id: id,
                is_favourite: true,
            })
            .select();
        const locationData = await getLocationData(id);
        const newLocation = {
            ...data[0],
            locationData,
        };
        console.log(newLocation);
        return newLocation;
    } catch (error) {
        console.error(error);
    }
}
