const request = require('request');

const forecast = (address, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=9f7e6b838bc94eb5e16f7d0eac349266&query=' + encodeURIComponent(address);
    request({ url, json : true}, (error, { body } = {}) => {
        if(error){
            callback('Unable to connect to Weather Services!', undefined);
        } else if(body.error) {
            callback('Unable to fetch the loaction. Try another search.', undefined);
        } else {
            callback(undefined, {
                Weather : body.current.weather_descriptions[0],
                Temperature : body.current.temperature,
                humidity : body.current.humidity
            });
        }
    })
}

module.exports = forecast;