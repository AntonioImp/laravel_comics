function caricaContenuto(json){
    console.log(json);
    if(json == "no"){
        alert("Non puoi accedere alla raccolta.");
        window.location.replace("/home");
    } else {
        if(json != null){
            result = json;
            let contenitore = document.querySelector("#contenuto");
            for(let tmp of json){
                let img = document.createElement('img');
                img.src = tmp["copertina"];

                let title = document.createElement('h1');
                title.textContent = "Capitolo #" + tmp["capitolo"];

                let elimina = document.createElement('img');
                elimina.src = "../images/elimina.png";
                elimina.setAttribute("class", "del");
                elimina.addEventListener("click", eliminaContenuto);

                let div = document.createElement('div');
                div.setAttribute("class", "raccolta");
                div.setAttribute("data-issue-id", tmp["id"]);
                div.appendChild(img);
                div.appendChild(elimina);
                div.appendChild(title);

                div.addEventListener("click", mostraContenuto);
                div.addEventListener("mouseover", mostraElimina);
                div.addEventListener("mouseout", nascondiElimina);

                contenitore.appendChild(div);
            }
        }
    }
}

function mostraContenuto(event){
    for(let tmp of result){
        if(tmp["id"] == event.currentTarget.dataset.issueId){
            scelta = tmp;

            let div = document.createElement('div');

            let img = document.createElement('img');
            img.src = tmp["copertina"];
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
            content2.textContent = tmp["nome"];
            title2.appendChild(content2);
            div.appendChild(title2);

            let title3 = document.createElement('h1');
            let content3 = document.createElement('p');
            title3.textContent = "Numero capitolo: ";
            content3.textContent = tmp["capitolo"];
            title3.appendChild(content3);
            div.appendChild(title3);

            let title4 = document.createElement('h1');
            let content4 = document.createElement('p');
            title4.textContent = "Data pubblicazione: ";
            content4.textContent = tmp["uscita"];
            title4.appendChild(content4);
            div.appendChild(title4);

            let title5 = document.createElement('h1');
            let content5 = document.createElement('p');
            title5.textContent = "Nome del volume a cui appartiene: ";
            content5.textContent = tmp["volume"];
            title5.appendChild(content5);
            div.appendChild(title5);

            let title6 = document.createElement('h1');
            let content6 = document.createElement('p');
            title6.textContent = "Descrizione: ";
            content6.textContent = tmp["descrizione"];
            title6.appendChild(content6);
            div.appendChild(title6);

            let contenitore = document.querySelector("#modal-view");
            document.body.classList.add("no-scroll");
            contenitore.appendChild(div);
            contenitore.classList.remove("hidden");

            break;
        }
    }
}

function mostraElimina(event){
    let del = document.querySelectorAll(".del");
    for(let tmp of del){
        if(tmp.parentElement == event.currentTarget){
            tmp.id = "initial";
        }
    }
}

function nascondiElimina(event){
    let del = document.querySelectorAll(".del");
    for(let tmp of del){
        if(tmp.parentElement == event.currentTarget){
            tmp.id = "";
        }
    }
}

function eliminaContenuto(event){
    event.stopPropagation();
    let ok = confirm("Sicuro di voler eliminare il contenuto?");
    if(ok){
        eliminazioneContenuto(event.currentTarget.parentElement);
    }
}

function eliminazioneContenuto(contenuto){
    request('/elimina', 'idCap=' + contenuto.dataset.issueId + '&idRacc=' + contenuto.parentElement.dataset.archiveId, esitoEliminazione);
}

function esitoEliminazione(esito){
    if(esito != 1){
        alert("Errore durante l'eliminazione... Operazione annullata.");
    }
    window.location.reload();
}

function removeModal(event){
    document.body.classList.remove("no-scroll");
    event.currentTarget.classList.add("hidden");
    event.currentTarget.innerHTML = "";
}

let id = document.querySelector("#contenuto").dataset.archiveId;
fetch('/carica/' + id).then(response => response.json()).then(caricaContenuto);
document.querySelector("#modal-view").addEventListener("click", removeModal);
