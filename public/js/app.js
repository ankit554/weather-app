const weatherForm = document.querySelector('form');
const searchItem = document.querySelector('input');
const message1 = document.querySelector('#msg-1');
const message2 = document.querySelector('#msg-2');

const fetchWeather = (address) => {
    fetch('/weather?address='+ address)
    .then((res) => {
        res.json()
        .then((data) => {
            if(data.error) {
                message1.textContent = data.error;
            } else {
                message1.textContent = data.location;
                message2.textContent = `${data.forecast.Weather} today. It is currently ${data.forecast.Temperature} degrees out.`;
            } 
        })
    })
}

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = searchItem.value;

    message1.textContent = 'Loading...';
    message2.textContent = '';
    
    fetchWeather(location);
})



