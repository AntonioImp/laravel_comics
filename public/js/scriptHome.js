function aggiungiRaccolta(event){
    event.stopPropagation();
    document.querySelector("#nomeRaccolta").classList.remove("hidden");
}

function nascondiAggiunta(){
    document.querySelector("#nomeRaccolta").classList.add("hidden");
    let input = document.querySelector("input");
    input.value = "";
    input.classList.remove("red");
    document.querySelector("#errore").textContent = "";
}

function confermaNome(){
    let nome = document.querySelector("#nomeRaccolta input").value;
    console.log(nome);
    if(nome != "" && nome != null && nome.trim() != ""){
        request('/store', 'nome=' + nome, gestioneNuovaRaccolta);
    } else {
        document.querySelector("input").classList.add("red");
        document.querySelector("#errore").textContent = "Nome della raccolta non valido";
    }
}

function gestioneNuovaRaccolta(ris){
    if(ris == -1){
        document.querySelector("input").classList.add("red");
        document.querySelector("#errore").textContent = "Nome della raccolta già usato";
    } else if(ris == -2){
        document.querySelector("input").classList.add("red");
        document.querySelector("#errore").textContent = "Errore aggiunta raccolta";
    } else {
        imageURL = ris['imageURL'];
        nomeRaccolta = ris['nomeRaccolta'];
        idRaccolta = ris['idRaccolta'];

        let img = document.createElement('img');
        img.src = imageURL;

        let elimina = document.createElement('img');
        elimina.src = "../images/elimina.png";
        elimina.setAttribute("class", "del");
        elimina.addEventListener("click", eliminaRaccolta);

        let title = document.createElement('h1');
        title.textContent = nomeRaccolta;

        let div = document.createElement('div');
        div.setAttribute("class", "raccolta");
        div.setAttribute("data-archive-id", idRaccolta);
        div.appendChild(img);
        div.appendChild(elimina);
        div.appendChild(title);

        div.addEventListener("click", mostraRaccolta);
        div.addEventListener("mouseover", mostraElimina);
        div.addEventListener("mouseout", nascondiElimina);

        contenitore = document.querySelector("#contenuto");
        contenitore.insertBefore(div, contenitore.firstChild);

        document.querySelector("#nomeRaccolta").classList.add("hidden");
        let input = document.querySelector("input");
        input.value = "";
        input.classList.remove("red");
        document.querySelector("#errore").textContent = "";
    }
}

function caricaHome(res){
    console.log(res);
    if(res != null){
        let contenitore = document.querySelector("#contenuto");
        for(let tmp of res){
            let img = document.createElement('img');
            img.src = tmp["immagine"];

            let elimina = document.createElement('img');
            elimina.src = "images/elimina.png";
            elimina.setAttribute("class", "del");
            elimina.addEventListener("click", eliminaRaccolta);

            let title = document.createElement('h1');
            title.textContent = tmp["nome"];

            let div = document.createElement('div');
            div.setAttribute("class", "raccolta");
            div.setAttribute("data-archive-id", tmp["id"]);
            div.appendChild(img);
            div.appendChild(elimina);
            div.appendChild(title);

            div.addEventListener("click", mostraRaccolta);
            div.addEventListener("mouseover", mostraElimina);
            div.addEventListener("mouseout", nascondiElimina);

            contenitore.insertBefore(div, contenitore.firstChild);
        }
    }
}

//mostra il simbolo del cestino per l'eliminazione
function mostraElimina(event){
    let del = document.querySelectorAll(".del");
    for(let tmp of del){
        if(tmp.parentElement == event.currentTarget){
            tmp.id = "initial";
        }
    }
}

//nasconde il simbolo del cestino per l'eliminazione
function nascondiElimina(event){
    let del = document.querySelectorAll(".del");
    for(let tmp of del){
        if(tmp.parentElement == event.currentTarget){
            tmp.id = "";
        }
    }
}

function eliminaRaccolta(event){
    event.stopPropagation();
    let ok = confirm("Sicuro di voler eliminare la raccolta?");
    if(ok){
        request('/delete', 'id=' + event.currentTarget.parentElement.dataset.archiveId, esito);
    }
}

function esito(esito){
    console.log(esito);
    if(esito == 1)
        window.location.reload();
    else
        alert("Errore nell'eliminazione della raccolta.");
}

function mostraRaccolta(event){
    window.location.href = "/raccolta/" + event.currentTarget.dataset.archiveId;
}

//event listener legati all'aggiunta della raccolta
document.querySelector("#creazioneRaccolta").addEventListener("click", aggiungiRaccolta);
document.querySelector("html").addEventListener("click", nascondiAggiunta);
document.querySelector("button").addEventListener("click", confermaNome);

request('/load', '', caricaHome);
