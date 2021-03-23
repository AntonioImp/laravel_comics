function search(event) {
    let child = document.querySelectorAll(".raccolta");
    for(let tmp of child){
        tmp.parentNode.removeChild(tmp);
    }
    event.preventDefault();
    request('/doSearch', 'text=' + event.currentTarget.testo.value, results);
}

function results(json){
    console.log(json);
    let res = document.querySelector("#emptyRes");
    if(json["number_of_page_results"] == 0){
        res.textContent = "Non sono presenti risultati per la ricerca effettuata.";
    } else if(json == -1){
        res.textContent = "Errore ricerca.";
    } else {
        result = json["results"];
        res.textContent = "";
        let contenitore = document.querySelector("#contenuto");
        for(let tmp of json["results"]){
            let img = document.createElement('img');
            img.src = tmp["image"]["super_url"];

            let title = document.createElement('h1');
            title.textContent = "Capitolo #" + tmp["issue_number"];

            let div = document.createElement('div');
            div.setAttribute("class", "raccolta");
            div.setAttribute("data-issue-id", tmp["id"]);
            div.appendChild(img);
            div.appendChild(title);

            div.addEventListener("click", mostraContenuto);

            contenitore.appendChild(div);
        }
        request('/raccolteUtente', '', elencoRaccolte);
    }
}

//salva le raccolte dell'utente per inserirle come opzioni del select
function elencoRaccolte(res){
    raccolte = res;
}

function mostraContenuto(event){
    for(let tmp of result){
        if(tmp["id"] == event.currentTarget.dataset.issueId){
            scelta = tmp;

            let div = document.createElement('div');

            let img = document.createElement('img');
            img.src = tmp["image"]["super_url"];
            div.appendChild(img);

            let title1 = document.createElement('h1');
            let content1 = document.createElement('p');
            title1.textContent = "ID: ";
            content1.textContent = tmp["id"];
            title1.appendChild(content1);
            div.appendChild(title1);

            let title2 = document.createElement('h1');
            let content2 = document.createElement('p');
            title2.textContent = "Nome: ";
            content2.textContent = tmp["name"];
            title2.appendChild(content2);
            div.appendChild(title2);

            let title3 = document.createElement('h1');
            let content3 = document.createElement('p');
            title3.textContent = "Numero capitolo: ";
            content3.textContent = tmp["issue_number"];
            title3.appendChild(content3);
            div.appendChild(title3);

            let title4 = document.createElement('h1');
            let content4 = document.createElement('p');
            title4.textContent = "Data pubblicazione: ";
            content4.textContent = tmp["cover date"];
            title4.appendChild(content4);
            div.appendChild(title4);

            let title5 = document.createElement('h1');
            let content5 = document.createElement('p');
            title5.textContent = "Nome del volume a cui appartiene: ";
            content5.textContent = tmp["volume"]["name"];
            title5.appendChild(content5);
            div.appendChild(title5);

            let title6 = document.createElement('h1');
            let content6 = document.createElement('p');
            title6.textContent = "Descrizione: ";
            if(tmp["description"] != null)
                content6.textContent = tmp["description"].replace(/(<([^>]+)>)/ig, '');
            else {
                content6.textContent = "Descrizione non disponibile.";
                scelta["description"] = "Descrizione non disponibile.";
            }
            title6.appendChild(content6);
            div.appendChild(title6);

            let title7 = document.createElement('h1');
            let p = document.createElement('p');
            p.setAttribute("id", "errore");
            title7.appendChild(p);
            div.appendChild(title7);

            let cont = document.createElement('div');
            cont.classList.add("aggiuntaContenuto");

            let sel = document.createElement('select');
            sel.id = "raccolte";
            cont.appendChild(sel);
            let option = document.createElement("option");
            option.value = "Seleziona una raccolta";
            option.text = "Seleziona una raccolta";
            sel.appendChild(option);
            if(raccolte != null)
                for(let tmp2 of raccolte){
                    option = document.createElement("option");
                    option.value = tmp2["nome"];
                    option.text = tmp2["nome"];
                    sel.appendChild(option);
                }
            sel.addEventListener("click", stop);

            let button = document.createElement('button');
            button.textContent = "Aggiungi alla raccolta";
            button.addEventListener("click", aggiungiARaccolta);
            cont.appendChild(button);
            div.appendChild(cont);

            let contenitore = document.querySelector("#modal-view");
            document.body.classList.add("no-scroll");
            contenitore.appendChild(div);
            contenitore.classList.remove("hidden");

            break;
        }
    }
}

function stop(event){
    event.stopPropagation();
}

function removeModal(event){
    document.body.classList.remove("no-scroll");
    event.currentTarget.classList.add("hidden");
    event.currentTarget.innerHTML = "";
}

function aggiungiARaccolta(event){
    let nome = document.querySelector("#raccolte").value;
    if(nome != "Seleziona una raccolta"){
        let ok = confirm("Sicuro di voler aggiungere il contenuto alla raccolta?");
        if(ok){
            let data = "raccolta="+nome+"&id="+scelta["id"]+"&descrizione="+scelta["description"]+"&uscita="+
                scelta["cover_date"]+"&copertina="+scelta["image"]["super_url"]+"&capitolo="+scelta["issue_number"]+"&nome="+
                scelta["name"]+"&volume="+scelta["volume"]["name"];
            request('/aggiungi', data, esito);
        }
    } else {
        event.stopPropagation();
        document.querySelector("#errore").textContent = "Prima di procedere seleziona una raccolta";
    }
}

function esito(res){
    console.log(res);
    let fb = document.querySelector("#emptyRes");
    fb.textContent = "";
    if(res == 1)
        fb.textContent = "Contenuto aggiunto con successo.";
    else if(res == -2)
        fb.textContent = "Errore inserimento raccolta.";
    else
        fb.textContent = "Il contenuto fa già parte della raccolta.";
}

let result = "";
let scelta = "";
let raccolte = "";
document.forms["search_data"].addEventListener("submit", search);
document.querySelector("#modal-view").addEventListener("click", removeModal);
