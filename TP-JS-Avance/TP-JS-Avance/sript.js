// ============================================
// TP JAVASCRIPT AVANCÉ - TOUS LES EXERCICES
// ============================================

console.log("=== TP JAVASCRIPT AVANCÉ - DÉBUT ===\n");

// ============================================
// PARTIE 1 - SYNTAXE MODERNE ES6+
// ============================================

console.log("=== PARTIE 1 - SYNTAXE MODERNE ES6+ ===\n");

// Exercice 1 - Variables et portée
console.log("--- Exercice 1 - Variables et portée ---");
{
    // Déclaration des variables
    var variableVar = "Je suis une var";
    let variableLet = "Je suis une let";
    const variableConst = "Je suis une const";
    
    console.log("1. Variables déclarées:");
    console.log("   variableVar:", variableVar);
    console.log("   variableLet:", variableLet);
    console.log("   variableConst:", variableConst);
    
    // Démonstration de la portée dans un bloc
    console.log("\n2. Démo portée dans un bloc {}:");
    if (true) {
        var varDansBloc = "var accessible hors bloc";
        let letDansBloc = "let seulement dans bloc";
        const constDansBloc = "const seulement dans bloc";
        
        console.log("   Dans le bloc - varDansBloc:", varDansBloc);
        console.log("   Dans le bloc - letDansBloc:", letDansBloc);
        console.log("   Dans le bloc - constDansBloc:", constDansBloc);
    }
    
    console.log("   Hors bloc - varDansBloc:", varDansBloc); // Accessible
    // console.log(letDansBloc); // Erreur: non accessible
    // console.log(constDansBloc); // Erreur: non accessible
    
    // Question piège: réaffectation d'une const
    console.log("\n3. Question piège - réaffectation const:");
    try {
        // variableConst = "Nouvelle valeur"; // Décommentez pour voir l'erreur
        console.log("   ❌ Impossible de réaffecter une const");
    } catch (error) {
        console.log("   ✅ Erreur attendue:", error.message);
    }
    
    // Mais on peut modifier le contenu d'un objet/tableau const
    console.log("\n4. Modification d'objet/tableau const:");
    const tableauConst = [1, 2, 3];
    tableauConst.push(4);
    console.log("   Tableau const modifié:", tableauConst);
    
    const objetConst = { nom: "Alice" };
    objetConst.nom = "Bob";
    console.log("   Objet const modifié:", objetConst);
}

// Exercice 2 - Fonctions fléchées
console.log("\n--- Exercice 2 - Fonctions fléchées ---");

// Fonction classique
function sommeClassique(a, b) {
    return a + b;
}

// Fonction fléchée standard
const sommeFlechee = (a, b) => {
    return a + b;
};

// Fonction fléchée avec return implicite
const sommeImplicite = (a, b) => a + b;

console.log("1. Comparaison des syntaxes:");
console.log("   sommeClassique(5, 3) =", sommeClassique(5, 3));
console.log("   sommeFlechee(5, 3) =", sommeFlechee(5, 3));
console.log("   sommeImplicite(5, 3) =", sommeImplicite(5, 3));

// Différence avec 'this'
console.log("\n2. Différence avec 'this':");
const personne = {
    nom: "Pierre",
    direNomClassique: function() {
        return "Je m'appelle " + this.nom;
    },
    direNomFlechee: () => {
        return "Je m'appelle " + this.nom; // this n'est pas lié à l'objet
    }
};

console.log("   Méthode classique:", personne.direNomClassique());
console.log("   Méthode fléchée:", personne.direNomFlechee());

// Exercice 3 - Destructuring
console.log("\n--- Exercice 3 - Destructuring ---");

const user = { name: "Noor", age: 10, city: "Tunis" };

// Destructuring d'objet
const { name, age } = user;
console.log("1. Destructuring d'objet:");
console.log("   const { name, age } = user;");
console.log("   Résultat: name =", name, ", age =", age);

// Destructuring avec renommage
const { name: nomUtilisateur, city: ville } = user;
console.log("\n2. Destructuring avec renommage:");
console.log("   const { name: nomUtilisateur, city: ville } = user;");
console.log("   Résultat: nomUtilisateur =", nomUtilisateur, ", ville =", ville);

// Destructuring avec valeurs par défaut
const { name: nom2, country = "Tunisie" } = user;
console.log("\n3. Destructuring avec valeur par défaut:");
console.log("   const { name: nom2, country = 'Tunisie' } = user;");
console.log("   Résultat: nom2 =", nom2, ", country =", country);

// Destructuring de tableau
const nombres = [10, 20, 30, 40, 50];
const [premier, deuxieme, ...reste] = nombres;
console.log("\n4. Destructuring de tableau:");
console.log("   const [premier, deuxieme, ...reste] = [10, 20, 30, 40, 50];");
console.log("   Résultat: premier =", premier, ", deuxieme =", deuxieme, ", reste =", reste);

// Exercice 4 - Spread Operator
console.log("\n--- Exercice 4 - Spread Operator ---");

// Fusion de tableaux
const tableau1 = [1, 2, 3];
const tableau2 = [4, 5, 6];
const tableauFusionne = [...tableau1, ...tableau2];
console.log("1. Fusion de tableaux:");
console.log("   const tableauFusionne = [...tableau1, ...tableau2];");
console.log("   Résultat:", tableauFusionne);

// Copie d'objet
const original = { a: 1, b: 2, c: 3 };
const copie = { ...original };
const copieModifiee = { ...original, b: 20, d: 4 };
console.log("\n2. Copie et modification d'objet:");
console.log("   original =", original);
console.log("   copie =", copie);
console.log("   copieModifiee =", copieModifiee);
console.log("   L'original reste inchangé:", original);

// Spread avec des paramètres de fonction
function afficherArguments(...args) {
    console.log("\n3. Spread avec paramètres de fonction:");
    console.log("   Nombre d'arguments:", args.length);
    console.log("   Arguments:", args);
}
afficherArguments(1, 2, 3, 4, 5);

// ============================================
// PARTIE 2 - OBJETS, CLASSES, TABLEAUX
// ============================================

console.log("\n\n=== PARTIE 2 - OBJETS, CLASSES, TABLEAUX ===");

// Exercice 5 - Objet simple
console.log("\n--- Exercice 5 - Objet simple ---");

// Création d'un objet livre
const livre = {
    titre: "Le Petit Prince",
    auteur: "Antoine de Saint-Exupéry",
    annee: 1943,
    
    // Méthode classique
    getInfo: function() {
        return `${this.titre} par ${this.auteur} (${this.annee})`;
    },
    
    // Méthode avec syntaxe raccourcie ES6
    getDescription() {
        return `"${this.titre}" - un chef-d'œuvre de ${this.auteur}`;
    },
    
    // Getter
    get infoComplete() {
        return `Titre: ${this.titre}, Auteur: ${this.auteur}, Année: ${this.annee}`;
    }
};

console.log("1. Objet livre créé:");
console.log("   livre.getInfo():", livre.getInfo());
console.log("   livre.getDescription():", livre.getDescription());
console.log("   livre.infoComplete:", livre.infoComplete);

// Création d'un autre livre
const livre2 = Object.assign({}, livre, {
    titre: "L'Étranger",
    auteur: "Albert Camus",
    annee: 1942
});
console.log("\n2. Second livre créé avec Object.assign:");
console.log("   livre2.getInfo():", livre2.getInfo());

// Exercice 6 - Classe ES6
console.log("\n--- Exercice 6 - Classe ES6 ---");

class Etudiant {
    constructor(nom, note) {
        this.nom = nom;
        this.note = note;
    }
    
    // Méthode pour obtenir la mention
    getMention() {
        if (this.note >= 16) {
            return "Très bien";
        } else if (this.note >= 14) {
            return "Bien";
        } else if (this.note >= 10) {
            return "Passable";
        } else {
            return "Échec";
        }
    }
    
    // Méthode pour afficher les détails
    afficherDetails() {
        return `${this.nom} : ${this.note}/20 - ${this.getMention()}`;
    }
    
    // Méthode statique
    static comparerNotes(etudiant1, etudiant2) {
        return etudiant2.note - etudiant1.note;
    }
}

// Instanciation de 3 étudiants
const etudiants = [
    new Etudiant("Noor", 18),
    new Etudiant("Karim", 12),
    new Etudiant("Leila", 8),
    new Etudiant("Mehdi", 15),
    new Etudiant("Sara", 9)
];

console.log("1. Liste des étudiants:");
etudiants.forEach((etudiant, index) => {
    console.log(`   ${index + 1}. ${etudiant.afficherDetails()}`);
});

// Tri des étudiants par note
console.log("\n2. Étudiants triés par note (décroissant):");
const etudiantsTries = [...etudiants].sort(Etudiant.comparerNotes);
etudiantsTries.forEach((etudiant, index) => {
    console.log(`   ${index + 1}. ${etudiant.afficherDetails()}`);
});

// Exercice 7 - Tableaux avancés
console.log("\n--- Exercice 7 - Tableaux avancés ---");

const notes = [12, 5, 17, 9, 20, 14, 3, 16];
console.log("Tableau de notes initial:", notes);

// 1. Calcul de la moyenne avec reduce
const sommeNotes = notes.reduce((accumulateur, note) => accumulateur + note, 0);
const moyenne = sommeNotes / notes.length;
console.log("\n1. Calcul de la moyenne:");
console.log("   Moyenne =", moyenne.toFixed(2));

// 2. Tri en ordre décroissant
const notesTriees = [...notes].sort((a, b) => b - a);
console.log("\n2. Tri décroissant:");
console.log("   Notes triées:", notesTriees);

// 3. Filtrage des notes ≥10
const notesSuperieures10 = notes.filter(note => note >= 10);
console.log("\n3. Filtrage des notes ≥10:");
console.log("   Notes ≥10:", notesSuperieures10);

// Méthodes supplémentaires
console.log("\n4. Méthodes supplémentaires:");

// Map: conversion des notes en mentions
const mentions = notes.map(note => {
    if (note >= 16) return "TB";
    if (note >= 14) return "B";
    if (note >= 10) return "P";
    return "E";
});
console.log("   Mentions correspondantes:", mentions);

// Find: première note supérieure à 15
const premiereNoteSup15 = notes.find(note => note > 15);
console.log("   Première note > 15:", premiereNoteSup15);

// Some: au moins une note > 18 ?
const aNoteExcellente = notes.some(note => note > 18);
console.log("   Au moins une note > 18?", aNoteExcellente);

// Every: toutes les notes sont-elles positives ?
const toutesPositives = notes.every(note => note >= 0);
console.log("   Toutes les notes sont positives?", toutesPositives);

// ============================================
// PARTIE 3 - ASYNCHRONISME ET API
// ============================================

console.log("\n\n=== PARTIE 3 - ASYNCHRONISME ET API ===");

// Exercice 8 - Promesse simple
console.log("\n--- Exercice 8 - Promesse simple ---");

// Fonction qui simule une attente
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

console.log("1. Simulation de téléchargement:");

// Version avec .then()
console.log("   Début du téléchargement...");

wait(2000)
    .then(() => {
        console.log("   Téléchargement terminé après 2 secondes!");
        console.log("   Fin");
        return "contenu_du_fichier.txt";
    })
    .then(fichier => {
        console.log(`   Fichier reçu: ${fichier}`);
    })
    .catch(error => {
        console.error("   Erreur:", error);
    });

// Version avec async/await
async function telechargerFichier() {
    console.log("\n2. Téléchargement avec async/await:");
    console.log("   Début...");
    
    try {
        await wait(2000);
        console.log("   Terminé après 2 secondes!");
        return "fichier_async.txt";
    } catch (error) {
        console.error("   Erreur:", error);
        throw error;
    }
}

// Appel de la fonction async
setTimeout(async () => {
    const fichier = await telechargerFichier();
    console.log(`   Résultat: ${fichier}`);
}, 2500);

// Exercice 9 - Fetch + async/await
console.log("\n--- Exercice 9 - Fetch + async/await ---");

async function recupererPosts() {
    console.log("Récupération des posts depuis l'API...");
    
    try {
        // Utilisation de fetch pour récupérer les données
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        
        // Vérification du statut de la réponse
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
        
        // Conversion de la réponse en JSON
        const posts = await response.json();
        
        // Affichage des titres des 5 premiers posts
        console.log("\nTitres des 5 premiers posts:");
        posts.slice(0, 5).forEach((post, index) => {
            console.log(`${index + 1}. ${post.title}`);
        });
        
        // Retourner les 5 premiers posts
        return posts.slice(0, 5);
        
    } catch (error) {
        console.error("Erreur lors de la récupération:", error);
        return [];
    }
}

// Appel de la fonction (avec un délai pour que l'Exercice 8 s'affiche d'abord)
setTimeout(async () => {
    const posts = await recupererPosts();
    console.log(`\n${posts.length} posts récupérés avec succès`);
    
    // ============================================
    // PARTIE 4 - MINI-PROJET INTERACTIF
    // ============================================
    
    console.log("\n\n=== PARTIE 4 - MINI-PROJET INTERACTIF ===");
    console.log("--- Gestionnaire d'Étudiants ---");
    
    // Réutilisation de la classe Etudiant définie plus haut
    
    // Liste d'étudiants pour le mini-projet
    const gestionEtudiants = {
        etudiants: [
            new Etudiant("Alice", 18),
            new Etudiant("Bob", 12),
            new Etudiant("Charlie", 15)
        ],
        
        // Ajouter un étudiant
        ajouterEtudiant(nom, note) {
            const nouvelEtudiant = new Etudiant(nom, note);
            this.etudiants.push(nouvelEtudiant);
            console.log(`✅ Étudiant ajouté: ${nouvelEtudiant.afficherDetails()}`);
            return nouvelEtudiant;
        },
        
        // Supprimer un étudiant par index
        supprimerEtudiant(index) {
            if (index >= 0 && index < this.etudiants.length) {
                const etudiantSupprime = this.etudiants.splice(index, 1)[0];
                console.log(`❌ Étudiant supprimé: ${etudiantSupprime.nom}`);
                return etudiantSupprime;
            }
            return null;
        },
        
        // Calculer les statistiques
        getStatistiques() {
            if (this.etudiants.length === 0) {
                return {
                    nombre: 0,
                    moyenne: 0,
                    max: 0,
                    min: 0,
                    tauxReussite: 0
                };
            }
            
            const notes = this.etudiants.map(e => e.note);
            const somme = notes.reduce((acc, note) => acc + note, 0);
            const moyenne = somme / notes.length;
            const max = Math.max(...notes);
            const min = Math.min(...notes);
            const reussite = (notes.filter(n => n >= 10).length / notes.length * 100);
            
            return {
                nombre: this.etudiants.length,
                moyenne: parseFloat(moyenne.toFixed(2)),
                max,
                min,
                tauxReussite: parseFloat(reussite.toFixed(1))
            };
        },
        
        // Afficher tous les étudiants
        afficherTous() {
            console.log("\n📊 Liste des étudiants:");
            if (this.etudiants.length === 0) {
                console.log("   Aucun étudiant");
            } else {
                this.etudiants.forEach((etudiant, index) => {
                    console.log(`   ${index + 1}. ${etudiant.afficherDetails()}`);
                });
            }
        },
        
        // Afficher les statistiques
        afficherStatistiques() {
            const stats = this.getStatistiques();
            console.log("\n📈 Statistiques:");
            console.log(`   Nombre d'étudiants: ${stats.nombre}`);
            console.log(`   Moyenne de la classe: ${stats.moyenne}/20`);
            console.log(`   Meilleure note: ${stats.max}/20`);
            console.log(`   Moins bonne note: ${stats.min}/20`);
            console.log(`   Taux de réussite: ${stats.tauxReussite}%`);
        }
    };
    
    // Démonstration du mini-projet
    console.log("\n1. État initial:");
    gestionEtudiants.afficherTous();
    gestionEtudiants.afficherStatistiques();
    
    console.log("\n2. Ajout de nouveaux étudiants:");
    gestionEtudiants.ajouterEtudiant("David", 8);
    gestionEtudiants.ajouterEtudiant("Eva", 19);
    
    console.log("\n3. État après ajout:");
    gestionEtudiants.afficherTous();
    gestionEtudiants.afficherStatistiques();
    
    console.log("\n4. Suppression d'un étudiant:");
    gestionEtudiants.supprimerEtudiant(1); // Supprime Bob
    
    console.log("\n5. État final:");
    gestionEtudiants.afficherTous();
    gestionEtudiants.afficherStatistiques();
    
    console.log("\n=== TP JAVASCRIPT AVANCÉ - TERMINÉ ===");
    console.log("🎉 Tous les exercices ont été complétés avec succès !");
    
}, 3000); // Délai pour permettre l'affichage des promesses