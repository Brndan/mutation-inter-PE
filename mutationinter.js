function calculmutation() {
    document.getElementById('aAfficher').style.display = 'none';
    document.getElementById('resultat').style.display = 'none';
    /* */

    // -------- declaration des valeurs de reference pour les points  -------------

    // situation familiale
    const pt_situation_familiale_rapprochement_conjoint = 150;
    const pt_situation_familiale_annees_de_separation = {0  : 0,
                                                         0.5: 25,
                                                         1  : 50,
                                                         1.5: 75,
                                                         2  : 200,
                                                         2.5: 425,
                                                         3  : 350,
                                                         3.5: 375,
                                                         4  : 450 };
    const pt_situation_familiale_residences_professionnelles = {"none"                        : 0,
                                                                "academies_non_limitrophes"   : 80};
    const pt_situation_familiale_par_enfants_a_charge = 50;
    const pt_situation_personnelle_affectation_education_prioritaire = {"none"        : 0,
                                                                        "rep+"        : 90,
                                                                        "rep"         : 45,
                                                                        "cla"         : 27};
    const pt_situation_personnelle_situation_medicale = {"none"                           : 0,
                                                         "demande_speciale_handicap"      : 800,
                                                         "obligation_emploi"              : 100  };
    //const pt_situation_personnelle_ATP_par_annee = 50;
    //const pt_situation_personnelle_ATP_nb_max_annee = 4;
    // voeux spécifiques
    const pt_voeux_voeu_preferentiel_par_annee_consecutive = 5;
    const cimm = 600;


    /* -------------------------
                 CALCUL
       --------------------------   */


    // Partie commune
    let pt_partie_commune = 0;
    let pts_echelon = parseInt(document.getElementById("echelon").value,10)
    let pts_anciennete = 0;
    let anciennete = parseInt(document.getElementById("anciennete_poste").value,10);
    
    // À partir d'un décompte de 3 ans d'ancienneté : pts = (x -3) × 2
    if (anciennete >= 3) {
        pts_anciennete += (anciennete - 3) * 2;
    }
    // Et ajout de 10 pts par tranche pleine de 5 ans
    if (anciennete - 3 >=5) {
        pts_anciennete += Math.floor((anciennete -3)/5) * 10;
    }

    pt_partie_commune = pts_echelon + pts_anciennete;

    // Situation familiale
    let pt_situation_familiale = 0;

    // rapprochement de conjoint
    if (document.getElementById("bonification_familiale").value == "rapprochement_conjoint") {
        pt_situation_familiale += pt_situation_familiale_rapprochement_conjoint;
    }

    // enfants
    let enfants = parseInt(document.getElementById("enfants_a_charge").value,10);
    pt_situation_familiale += pt_situation_familiale_par_enfants_a_charge * enfants;
    
    // séparation
    let annees_separation = document.getElementById("annees_separation").value;
    pt_situation_familiale += parseInt(pt_situation_familiale_annees_de_separation[annees_separation],10);
    console.log(pt_situation_familiale);

    // académies non-limitrophes
    pt_situation_familiale += pt_situation_familiale_residences_professionnelles[document.getElementById("residences_professionnelles").value];
    

    // Situation personnelle et administrative

    let pt_situation_personnelle = 0;

    //rep/rep+
    pt_situation_personnelle += pt_situation_personnelle_affectation_education_prioritaire[document.getElementById("education_prioritaire").value];

    // Handicap
    pt_situation_personnelle += pt_situation_personnelle_situation_medicale[document.getElementById("situation_medicale").value];


    // Vœu exprimé

    let pt_voeu = 0;

    // Vœu préférentiel
    let nb_annees_voeu_preferentiel = parseInt(document.getElementById("voeu_preferentiel").value,10) -1;
    if (nb_annees_voeu_preferentiel > 0) {
        pt_voeu += pt_voeux_voeu_preferentiel_par_annee_consecutive * nb_annees_voeu_preferentiel;
    }

    //CIMM
    if (document.getElementById("voeu_cimm").checked) {
        pt_voeu += cimm;
    }

    // Somme totale 
    let pt_total = pt_partie_commune + pt_situation_familiale + pt_situation_personnelle + pt_voeu;

    //Affichage du résultat
    document.getElementById("pt_partie_commune").innerHTML = pt_partie_commune + " pts";
    document.getElementById("pt_situation_familiale").innerHTML = pt_situation_familiale + " pts";
    document.getElementById("pt_situation_personnelle").innerHTML = pt_situation_personnelle + " pts";
    document.getElementById("pt_voeu").innerHTML = pt_voeu + " pts";
    document.getElementById("pt_total").innerHTML = pt_total + " pts";


    document.getElementById('aAfficher').style.display = 'block';
    document.getElementById('resultat').style.display = 'block';
};

// Afficher les menus  et les div nécessaires
function showFormItem(it, displaybool) {
    var vis = displaybool ? "block" : "none";
    document.getElementById(it).style.display = vis;
};

function showFormItemWhen(it, selectorId, optionValues) {
    var vis = "none";
    if (optionValues.includes(document.getElementById(selectorId).value) ) {
        vis = "block";
    } else {
        vis = "none";
    }
    document.getElementById(it).style.display = vis;
};
