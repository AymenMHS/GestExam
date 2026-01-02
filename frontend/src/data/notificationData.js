// Sample notification data matching the database structure
// CREATE TABLE Notifications (
//     id INT PRIMARY KEY AUTO_INCREMENT,
//     user_id INT NOT NULL,
//     titre VARCHAR(255) NOT NULL,
//     message TEXT NOT NULL,
//     type_notification ENUM('surveillance', 'reclamation', 'publication', 'examen', 'systeme') NOT NULL,
//     reference_id INT,
//     lue BOOLEAN DEFAULT FALSE,
//     date_notification DATETIME DEFAULT CURRENT_TIMESTAMP,
// )

export const sampleNotifications = [
    {
        id: 1,
        user_id: 1,
        titre: "Nouvelle affectation de surveillance",
        message: "Vous avez été assigné à la surveillance de l'examen d'Algorithmique 1 le 18/12/2024 à 8h30 en salle A101.",
        type_notification: "surveillance",
        reference_id: 45,
        lue: false,
        date_notification: "2025-12-04T01:30:00"
    },
    {
        id: 2,
        user_id: 1,
        titre: "Réclamation d'étudiant",
        message: "L'étudiant Ahmed Benali (ID: 12345) a soumis une réclamation concernant la note de l'examen de Base de Données.",
        type_notification: "reclamation",
        reference_id: 78,
        lue: false,
        date_notification: "2024-12-03T23:15:00"
    },
    {
        id: 3,
        user_id: 1,
        titre: "Nouvelle publication - Planning Examen",
        message: "Le planning des examens du semestre 1 a été publié. Consultez-le dans la section Publications.",
        type_notification: "publication",
        reference_id: 23,
        lue: true,
        date_notification: "2024-12-03T18:45:00"
    },
    {
        id: 4,
        user_id: 1,
        titre: "Modification d'examen",
        message: "L'examen de Réseaux Informatiques prévu le 15/12/2024 a été reporté au 20/12/2024 à 10h00.",
        type_notification: "examen",
        reference_id: 56,
        lue: false,
        date_notification: "2024-12-03T16:20:00"
    },
    {
        id: 5,
        user_id: 1,
        titre: "Maintenance système programmée",
        message: "Une maintenance du système est prévue le 05/12/2024 de 2h00 à 4h00. Le système sera temporairement indisponible.",
        type_notification: "systeme",
        reference_id: null,
        lue: true,
        date_notification: "2024-12-03T14:00:00"
    },
    {
        id: 6,
        user_id: 1,
        titre: "Changement de salle",
        message: "Votre surveillance pour l'examen de Mathématiques a été déplacée de la salle B203 à la salle A105.",
        type_notification: "surveillance",
        reference_id: 67,
        lue: true,
        date_notification: "2024-12-03T11:30:00"
    },
    {
        id: 7,
        user_id: 1,
        titre: "Nouvel examen créé",
        message: "Un nouvel examen de Programmation Web a été créé pour le 22/12/2024. Vérifiez les détails dans la section Examens.",
        type_notification: "examen",
        reference_id: 89,
        lue: false,
        date_notification: "2024-12-03T09:10:00"
    },
    {
        id: 8,
        user_id: 1,
        titre: "Résultats d'examen publiés",
        message: "Les résultats de l'examen de Systèmes d'Exploitation ont été publiés et sont disponibles pour consultation.",
        type_notification: "publication",
        reference_id: 34,
        lue: true,
        date_notification: "2024-12-02T15:45:00"
    },
    {
        id: 9,
        user_id: 1,
        titre: "Réclamation traitée",
        message: "La réclamation de l'étudiant Sara Amrani concernant l'examen d'Analyse a été traitée et résolue.",
        type_notification: "reclamation",
        reference_id: 91,
        lue: true,
        date_notification: "2024-12-02T10:20:00"
    },
    {
        id: 10,
        user_id: 1,
        titre: "Mise à jour système",
        message: "Le système a été mis à jour avec de nouvelles fonctionnalités. Consultez la documentation pour plus d'informations.",
        type_notification: "systeme",
        reference_id: null,
        lue: false,
        date_notification: "2024-12-01T08:00:00"
    }
];
