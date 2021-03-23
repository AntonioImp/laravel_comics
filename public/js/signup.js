function userCheck(){
    fetch("user/" + elem.value).then(response => response.text()).then(results);
}

function results(result){
    console.log(result);
    if(result == 0){
        elem.classList.remove('green');
        elem.classList.add('red');
        if(danger == 0){
            let span = document.createElement('span');
            span.setAttribute("id", "userUsed");
            span.setAttribute("role", "alert");
            span.setAttribute("class", "invalid-feedback view");
            span.textContent = "The username has already been taken.";
            document.querySelector('#add').appendChild(span);
            danger = 1;
        }
    } else if(result == 1){
        elem.classList.remove('red');
        elem.classList.add('green');
        if(danger == 1){
            let tmp = document.querySelector('#userUsed');
            tmp.parentElement.removeChild(tmp);
            danger = 0;
        }
    } else {
        elem.classList.remove('red');
        elem.classList.remove('green');
        if(danger == 1){
            let tmp = document.querySelector('#userUsed');
            tmp.parentElement.removeChild(tmp);
            danger = 0;
        }
    }
}

let danger = 0;
let elem = document.querySelector("#username");
elem.addEventListener("blur", userCheck);
