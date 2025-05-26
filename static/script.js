const citySelect = document.getElementById('cities');
const cityName = document.getElementById('city-name');
const prayerTimesContainer = document.getElementById('prayer-times');

const cities = [
    { name: "Москва", latitude: 55.7558, longitude: 37.6173 },
    { name: "Санкт-Петербург", latitude: 59.9343, longitude: 30.3351 },
    { name: "Новосибирск", latitude: 55.0084, longitude: 82.9357 },
    { name: "Екатеринбург", latitude: 56.8389, longitude: 60.6057 },
    { name: "Казань", latitude: 55.8304, longitude: 49.0661 },
];

let layoutForCities = '';

for (let i = 0; i < cities.length; i++) {
    layoutForCities += `<option value="${i}">${cities[i].name}</option>`
}

citySelect.insertAdjacentHTML('afterbegin', layoutForCities)

function displayPrayerTimes(city) {
    const date = new Date();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    let url = `https://api.aladhan.com/v1/timings?latitude=${city.latitude}&longitude=${city.longitude}&method=2&month=${month}&year=${year}`

    fetch(url)
        .then(response => response.json())
        .then(function (data) {
            const timings = data.data.timings;

            const prayers = {
                "Фаджр (утренняя)": timings.Fajr,
                "Восход": timings.Sunrise,
                "Зухр (полуденная)": timings.Dhuhr,
                "Аср (предвечерняя)": timings.Asr,
                "Магриб (вечерняя)": timings.Maghrib,
                "Иша (ночная)": timings.Isha,
            };

            prayerTimesContainer.innerHTML = '';

            let layoutForPrayerTime = '';

            for (let [name, time] of Object.entries(prayers)) {
                layoutForPrayerTime += `<div class="prayer-time"><h3>${name}</h3><p>${time}</p></div>`
            }

            prayerTimesContainer.insertAdjacentHTML('afterbegin', layoutForPrayerTime)
        })
}

citySelect.addEventListener('change', () => {
    const selectedCity = cities[citySelect.value];
    //cityName.textContent = selectedCity.name;
    displayPrayerTimes(selectedCity);
});

displayPrayerTimes(cities[0]);

setInterval(() => {
    const selectedCity = cities[citySelect.value];
    displayPrayerTimes(selectedCity);
}, 24 * 60 * 60 * 1000);