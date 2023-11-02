// JavaScript code for fetching and displaying SpaceX launches
async function fetchSpaceXLaunches() {
    try {
        const response = await fetch('https://api.spacexdata.com/v3/launches?limit=100&launch_success=true&land_success=true&launch_year=2014');
        const launches = await response.json();
        displayLaunches(launches);
    } catch (error) {
        console.error('Error fetching SpaceX launches:', error);
    }
}

function displayLaunches(launches) {
    const launchList = document.getElementById('launch-list');

    launches.forEach(launch => {
        const launchCard = document.createElement('div');
        launchCard.classList.add('launch-card');
        launchCard.innerHTML = `
            <h2>${launch.name}</h2>
            <p><strong>Date:</strong> ${new Date(launch.date_utc).toDateString()}</p>
            <p><strong>Rocket:</strong> ${launch.rocket.name}</p>
            <p><strong>Launch Site:</strong> ${launch.launchpad.name}</p>
        `;
        launchList.appendChild(launchCard);
    });
}

// Fetch SpaceX launches when the page loads
window.addEventListener('load', fetchSpaceXLaunches);
const filterButtons = {
    loadAll: document.getElementById('load-all'),
    loadSuccessful: document.getElementById('load-successful'),
    loadLand: document.getElementById('load-land'),
    load2014: document.getElementById('load-2014'),
};

function fetchSpaceXLaunches(endpoint) {
    try {
        fetch(endpoint)
            .then(response => response.json())
            .then(launches => displayLaunches(launches))
            .catch(error => console.error('Error fetching SpaceX launches:', error));
    } catch (error) {
        console.error('Error fetching SpaceX launches:', error);
    }
}

function displayLaunches(launches) {
    const launchList = document.getElementById('launch-list');
    launchList.innerHTML = ''; // Clear the previous content

    launches.forEach(launch => {
        const launchCard = document.createElement('div');
        launchCard.classList.add('launch-card');
        launchCard.innerHTML = `
            <h2>${launch.mission_name}</h2>
            <p><strong>Date:</strong> ${launch.launch_date_local}</p>
            <p><strong>Rocket:</strong> ${launch.rocket.rocket_name}</p>
            <p><strong>Launch Site:</strong> ${launch.launch_site.site_name}</p>
        `;
        launchList.appendChild(launchCard);
    });
}

// Event listeners for filter buttons
filterButtons.loadAll.addEventListener('click', () => {
    fetchSpaceXLaunches('https://api.spaceXdata.com/v3/launches?limit=100');
});

filterButtons.loadSuccessful.addEventListener('click', () => {
    fetchSpaceXLaunches('https://api.spaceXdata.com/v3/launches?limit=100&launch_success=true');
});

filterButtons.loadLand.addEventListener('click', () => {
    fetchSpaceXLaunches('https://api.spaceXdata.com/v3/launches?limit=100&launch_success=true&land_success=true');
});

filterButtons.load2014.addEventListener('click', () => {
    fetchSpaceXLaunches('https://api.spaceXdata.com/v3/launches?limit=100&launch_success=true&land_success=true&launch_year=2014');
});

// Fetch SpaceX launches with default filter when the page loads
window.addEventListener('load', () => {
    fetchSpaceXLaunches('https://api.spaceXdata.com/v3/launches?limit=100');
});

