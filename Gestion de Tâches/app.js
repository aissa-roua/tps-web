// app.js - Application de Gestion de Tâches

// Étape 2 : Variables et message de bienvenue
let tasks = [];
let taskIdCounter = 1;

// Message de bienvenue dans la console
console.log("Bienvenue dans l'application de gestion de tâches !");
console.log("FST - Département Informatique - TP JavaScript");

// Étape 3-4 : Récupération des éléments DOM
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const searchInput = document.getElementById('searchInput');
const clearAllBtn = document.getElementById('clearAllBtn');
const clearCompletedBtn = document.getElementById('clearCompletedBtn');
const totalTasksElement = document.getElementById('totalTasks');
const completedTasksElement = document.getElementById('completedTasks');
const pendingTasksElement = document.getElementById('pendingTasks');
const emptyState = document.getElementById('emptyState');

// Étape 9 : Chargement des tâches depuis le localStorage
function loadTasksFromLocalStorage() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        // Trouver l'ID le plus élevé pour continuer l'incrémentation
        if (tasks.length > 0) {
            taskIdCounter = Math.max(...tasks.map(task => task.id)) + 1;
        }
        updateStats();
        renderTasks();
    }
}

// Étape 9 : Sauvegarde des tâches dans le localStorage
function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Étape 5-6 : Fonction pour créer un élément de tâche
function createTaskElement(task) {
    const li = document.createElement('li');
    li.className = 'task-item';
    li.dataset.id = task.id;
    
    if (task.completed) {
        li.classList.add('completed');
    }
    
    li.innerHTML = `
        <div class="task-content">
            <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
            <span class="task-text ${task.completed ? 'completed' : ''}">${task.text}</span>
        </div>
        <div class="task-actions">
            <button class="task-btn complete-btn">
                <i class="fas ${task.completed ? 'fa-undo' : 'fa-check'}"></i>
                ${task.completed ? 'Rétablir' : 'Terminer'}
            </button>
            <button class="task-btn edit-btn">
                <i class="fas fa-edit"></i> Modifier
            </button>
            <button class="task-btn delete-btn">
                <i class="fas fa-trash-alt"></i> Supprimer
            </button>
        </div>
    `;
    
    // Étape 4 : Ajout des événements
    const checkbox = li.querySelector('.task-checkbox');
    const completeBtn = li.querySelector('.complete-btn');
    const deleteBtn = li.querySelector('.delete-btn');
    const editBtn = li.querySelector('.edit-btn');
    const taskText = li.querySelector('.task-text');
    
    // Événement pour la checkbox
    checkbox.addEventListener('change', function() {
        toggleTaskCompletion(task.id);
    });
    
    // Événement pour le bouton Terminer/Rétablir
    completeBtn.addEventListener('click', function() {
        toggleTaskCompletion(task.id);
    });
    
    // Événement pour le bouton Supprimer
    deleteBtn.addEventListener('click', function() {
        deleteTask(task.id);
    });
    
    // Événement pour le bouton Modifier
    editBtn.addEventListener('click', function() {
        editTask(task.id, taskText);
    });
    
    return li;
}

// Étape 6 : Fonction pour ajouter une tâche
function addTask() {
    const text = taskInput.value.trim();
    
    if (text === '') {
        alert('Veuillez saisir une tâche !');
        return;
    }
    
    // Étape 8 : Création d'un objet tâche
    const newTask = {
        id: taskIdCounter++,
        text: text,
        completed: false,
        createdAt: new Date().toISOString()
    };
    
    // Étape 7 : Ajout au tableau
    tasks.push(newTask);
    
    // Étape 9 : Sauvegarde dans le localStorage
    saveTasksToLocalStorage();
    
    // Réinitialiser le champ de saisie
    taskInput.value = '';
    
    // Mettre à jour l'affichage
    updateStats();
    renderTasks();
    
    // Message de confirmation
    console.log(`Tâche ajoutée : "${text}"`);
}

// Étape 6 : Fonction pour supprimer une tâche
function deleteTask(id) {
    // Étape 7 : Filtrer le tableau pour supprimer la tâche
    tasks = tasks.filter(task => task.id !== id);
    
    // Étape 9 : Sauvegarde dans le localStorage
    saveTasksToLocalStorage();
    
    // Mettre à jour l'affichage
    updateStats();
    renderTasks();
    
    console.log(`Tâche ${id} supprimée`);
}

// Étape 6 : Fonction pour marquer une tâche comme terminée
function toggleTaskCompletion(id) {
    // Étape 7 : Recherche de la tâche dans le tableau
    const taskIndex = tasks.findIndex(task => task.id === id);
    
    if (taskIndex !== -1) {
        // Inverser l'état de complétion
        tasks[taskIndex].completed = !tasks[taskIndex].completed;
        
        // Étape 9 : Sauvegarde dans le localStorage
        saveTasksToLocalStorage();
        
        // Mettre à jour l'affichage
        updateStats();
        renderTasks();
        
        const status = tasks[taskIndex].completed ? "terminée" : "en cours";
        console.log(`Tâche ${id} marquée comme ${status}`);
    }
}

// Étape 10 : Fonction pour modifier une tâche
function editTask(id, taskTextElement) {
    const newText = prompt('Modifier la tâche :', taskTextElement.textContent);
    
    if (newText !== null && newText.trim() !== '') {
        // Étape 7 : Mise à jour du texte dans le tableau
        const taskIndex = tasks.findIndex(task => task.id === id);
        
        if (taskIndex !== -1) {
            tasks[taskIndex].text = newText.trim();
            
            // Étape 9 : Sauvegarde dans le localStorage
            saveTasksToLocalStorage();
            
            // Mettre à jour l'affichage
            renderTasks();
            
            console.log(`Tâche ${id} modifiée : "${newText}"`);
        }
    }
}

// Étape 7 : Fonction pour afficher les tâches
function renderTasks(filteredTasks = null) {
    // Vider la liste
    taskList.innerHTML = '';
    
    // Déterminer quelles tâches afficher
    const tasksToRender = filteredTasks || tasks;
    
    // Étape 7 : Boucle pour afficher chaque tâche
    if (tasksToRender.length === 0) {
        emptyState.classList.remove('hidden');
        taskList.appendChild(emptyState);
    } else {
        emptyState.classList.add('hidden');
        
        tasksToRender.forEach(task => {
            const taskElement = createTaskElement(task);
            taskList.appendChild(taskElement);
        });
    }
}

// Étape 10 : Fonction pour mettre à jour les statistiques
function updateStats() {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    const pendingTasks = totalTasks - completedTasks;
    
    totalTasksElement.textContent = totalTasks;
    completedTasksElement.textContent = completedTasks;
    pendingTasksElement.textContent = pendingTasks;
}

// Étape 10 : Fonction pour supprimer toutes les tâches
function clearAllTasks() {
    if (tasks.length === 0) {
        alert("Il n'y a aucune tâche à supprimer !");
        return;
    }
    
    if (confirm("Voulez-vous vraiment supprimer toutes les tâches ?")) {
        tasks = [];
        taskIdCounter = 1;
        
        // Étape 9 : Sauvegarde dans le localStorage
        saveTasksToLocalStorage();
        
        // Mettre à jour l'affichage
        updateStats();
        renderTasks();
        
        console.log("Toutes les tâches ont été supprimées");
    }
}

// Étape 10 : Fonction pour supprimer les tâches terminées
function clearCompletedTasks() {
    const completedTasksCount = tasks.filter(task => task.completed).length;
    
    if (completedTasksCount === 0) {
        alert("Il n'y a aucune tâche terminée à supprimer !");
        return;
    }
    
    if (confirm(`Voulez-vous vraiment supprimer les ${completedTasksCount} tâche(s) terminée(s) ?`)) {
        // Étape 7 : Filtrer pour garder seulement les tâches non terminées
        tasks = tasks.filter(task => !task.completed);
        
        // Étape 9 : Sauvegarde dans le localStorage
        saveTasksToLocalStorage();
        
        // Mettre à jour l'affichage
        updateStats();
        renderTasks();
        
        console.log(`${completedTasksCount} tâche(s) terminée(s) supprimée(s)`);
    }
}

// Étape 10 : Fonction pour rechercher des tâches
function searchTasks() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    
    if (searchTerm === '') {
        renderTasks();
        return;
    }
    
    // Étape 7 : Filtrer les tâches selon le terme de recherche
    const filteredTasks = tasks.filter(task => 
        task.text.toLowerCase().includes(searchTerm)
    );
    
    renderTasks(filteredTasks);
}

// Étape 4 : Écouteurs d'événements
addTaskBtn.addEventListener('click', addTask);

// Étape 4 : Ajouter une tâche avec la touche Entrée
taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

// Étape 10 : Écouteurs pour les boutons de suppression
clearAllBtn.addEventListener('click', clearAllTasks);
clearCompletedBtn.addEventListener('click', clearCompletedTasks);

// Étape 10 : Écouteur pour la recherche
searchInput.addEventListener('input', searchTasks);

// Initialisation de l'application
document.addEventListener('DOMContentLoaded', function() {
    // Charger les tâches depuis le localStorage
    loadTasksFromLocalStorage();
    
    // Mettre le focus sur le champ de saisie
    taskInput.focus();
    
    console.log("Application de gestion de tâches initialisée avec succès !");
});