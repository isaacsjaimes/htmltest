class Activity {
    constructor(id, title, description, imgUrl) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.imgUrl = imgUrl;
    }
}

class Repository {
    constructor() {
        this.activities = [];
    }

    getAllActivities() {
        return this.activities;
    }

    createActivity(id, title, description, imgUrl) {
        const activity = new Activity(id, title, description, imgUrl);
        this.activities.push(activity);
    }

    deleteActivity(id) {
        this.activities = this.activities.filter(activity => activity.id !== id);
    }
}

const activityRepository = new Repository();

function displayActivities() {
    const activitiesContainer = document.getElementById('activitiesContainer');
    activitiesContainer.innerHTML = '';

    activityRepository.getAllActivities().forEach(activity => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <h3>${activity.title}</h3>
            <p>${activity.description}</p>
            <img src="${activity.imgUrl}" alt="${activity.title}" style="max-width: 100%;">
            <button onclick="deleteActivity(${activity.id})">Eliminar</button>
        `;
        activitiesContainer.appendChild(card);
    });
}

function createActivity() {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const imgUrl = document.getElementById('imgUrl').value;

    if (title === '' || description === '' || imgUrl === '') {
        alert('Por favor, completa todos los campos.');
        return;
    }
    
    const id = Date.now();

    activityRepository.createActivity(id, title, description, imgUrl);

    displayActivities();

    document.getElementById('activityForm').reset();
}

function deleteActivity(id) {
    activityRepository.deleteActivity(id);
    displayActivities();
}

displayActivities();