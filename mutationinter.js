function calculmutation() {
    document.getElementById('aAfficher').style.display = 'none';
    document.getElementById('resultat').style.display = 'none';
    /* */

    // -------- declaration des valeurs de reference pour les points  -------------

    // ancienneté de service (echelon)
    const pt_echelon_par_an = 7;
    const pt_echelon_hc_certifies_forfait = 56;
    const pt_echelon_hc_agreges_forfait = 63;
    const pt_echelon_exceptionnel_forfait = 77 ;
    const pt_echelon_max = 98;
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
    //const pt_situation_familiale_autorite_parentale_conjointe = 150.2;
    const pt_situation_familiale_par_enfants_a_charge = 50;
    //const pt_situation_familiale_parent_isole = 150;
    //const pt_situation_familiale_mutation_simultanee = 80; // NB : non cumulable avec les bonifications « rapprochement de conjoint », « parent Isolé », « autorité parentale conjointe », « vœu préférentiel ».
    // situation personnelle et administrative
    const pt_situation_personnelle_entree_metier = 10;
    const pt_situation_personnelle_academie_stage = 0.1;
    const pt_situation_personnelle_stagiaire_ex_contractuel = {1 : 150,
                                                               2 : 150,
                                                               3 : 150,
                                                               4 : 165,
                                                               5 : 180,
                                                               6 : 180,
                                                               7 : 180,
                                                               8 : 180,
                                                               9 : 180,
                                                               10: 180,
                                                               11: 180};
    const pt_situation_personnelle_stagiaire_ex_autre_corps = 1000;
    const pt_situation_personnelle_reintegration = 1000;
    const pt_situation_personnelle_affectation_education_prioritaire = {"none"        : 0,
                                                                        "rep+"        : 90,
                                                                        "rep"         : 45};
    const pt_situation_personnelle_affectation_mayotte_guyane = 100;
    const pt_situation_personnelle_situation_medicale = {"none"                           : 0,
                                                         "demande_speciale_handicap"      : 800,
                                                         "obligation_emploi"              : 100  };
    //const pt_situation_personnelle_ATP_par_annee = 50;
    //const pt_situation_personnelle_ATP_nb_max_annee = 4;
    // voeux spécifiques
    const pt_voeux_voeu_preferentiel_par_annee_consecutive = 5;
    const pt_voeux_voeu_preferentiel_max = 100;
    const cimm = 600;

    // --------   récupération de valeurs clés ---------
    // Récupération des valeurs de la partie communune
    let statut = document.getElementById('statut').value;
    let anciennete_poste = document.getElementById('anciennete_poste').value;
    let classe = document.getElementById('classe').value;
    let echelon = document.getElementById('echelon').value;
    // Récupération des données de situation familiale
    let bonification_familiale = document.getElementById('bonification_familiale').value;
    let annees_de_separation = document.getElementById('annees_separation').value;
    let enfants_a_charge = document.getElementById('enfants_a_charge').value;
    let residences_professionnelles = document.getElementById('residences_professionnelles').value;
    // Récupération des données de situation personnelle
    let entree_metier = document.getElementById('entree_metier').checked;
    let academie_de_stage = document.getElementById('academie_de_stage').checked;
    let contractuel_actif_avant_stage = document.getElementById('contractuel_actif_avant_stage').checked;
    let academie_ex_corps = document.getElementById('academie_ex_corps').checked;
    let reintegration = document.getElementById('reintegration').checked;
    let affection_mayotte_guyane = document.getElementById('affection_mayotte_guyane').checked;
    let education_prioritaire = document.getElementById('education_prioritaire').value;
    let situation_medicale = document.getElementById('situation_medicale').value;
    let sportif_affecte_ATP = document.getElementById('sportif_affecte_ATP').value;

    // Récupération des données de voeux
    let voeu_preferentiel = document.getElementById('voeu_preferentiel').value;
    //let voeu_corse = document.getElementById('voeu_corse').value;
    let voeu_cimm = document.getElementById('voeu_cimm').checked;

    /* -------------------------
                 CALCUL
       --------------------------   */

    let pt_partie_commune = 0;
    let pts_echelon = parseInt(document.getElementById("echelon"),10)
    let pts_anciennete = 0;
    let anciennete = parseInt(document.getElementById("anciennete_poste"),10);
    
    // À partir d'un décompte de 3 ans d'ancienneté : pts = (x -3) × 2
    if (anciennete >= 3) {
        pts_anciennete += (anciennete - 3) * 2;
    }
    // Et ajout de 10 pts par tranche pleine de 5 ans
    if (anciennete - 3 >=5) {
        pts_anciennete += Math.floor((anciennete -3)/5) * 10;
    }


    //Affichage du résultat
    document.getElementById("pt_partie_commune").innerHTML = pt_partie_commune + " pts";
    document.getElementById("ct_partie_commune").innerHTML = ct_partie_commune ;
    document.getElementById("pt_situation_familiale").innerHTML = pt_situation_familiale + " pts";
    document.getElementById("ct_situation_familiale").innerHTML = ct_situation_familiale;
    document.getElementById("pt_situation_personnelle").innerHTML = pt_situation_personnelle + " pts";
    document.getElementById("ct_situation_personnelle").innerHTML = ct_situation_personnelle ;
    document.getElementById("pt_voeu").innerHTML = pt_voeu + " pts";
    document.getElementById("ct_voeu").innerHTML = ct_voeu;
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