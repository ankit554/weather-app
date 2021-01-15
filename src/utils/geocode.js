const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYW5raXRkYWlkYW5rYTU1NCIsImEiOiJja2pzOW5ydngzbXFnMnNxbzI3aWk5MmhhIn0.BL5h-Kmjn9m_cjgEmcIsoA';

    request({ url : url, json : true}, (error, { body }={}) => {
        if(error){
            callback('Unable to connect to Weather Services!', undefined);
        } else if(body.features.length === 0) {
            callback('Unable to fetch the loaction. Try another search.', undefined);
        } else {
            callback(undefined, {
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location : body.features[0].place_name
            });
        }
    })
}

module.exports = geocode;