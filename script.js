let aCrypto='USD', bCrypto='RUB';
let inpt = document.querySelectorAll('.card-input');
let firstCardEl = document.querySelectorAll(".first-card button");
let secondCardEl = document.querySelectorAll(".second-card button");
let moneyByValue = document.querySelectorAll(".money");
let oneMoney = document.querySelectorAll(".money-text");
let error = document.getElementById("error");

inpt[0].focus();

firstCardEl.forEach(x=>x.addEventListener('click', ()=>{
    aCrypto=x.innerText;
    firstCardEl.forEach(x=>{x.classList.remove("active"); x.parentElement.style.backgroundColor = "#fff"});
    x.classList.add("active");
    x.parentElement.style.backgroundColor = "#833AE0";
    if(aCrypto==bCrypto)
    {
        inpt[0].value!=null ? inpt[1].value = inpt[0].value : inpt[0].value = inpt[1].value;
    }
    else{
        if(bCrypto)
        {
            error.innerText="";
            getCryptoValue(aCrypto,bCrypto,inpt[0].value, 0);
        }
        else
            error.innerText="Please, select cryptos!";
    }
}))

secondCardEl.forEach(x=>x.addEventListener('click', ()=>{
    bCrypto=x.innerText;
    secondCardEl.forEach(x=>{x.classList.remove("active"); x.parentElement.style.backgroundColor = "#fff"});
    x.classList.add("active");
    x.parentElement.style.backgroundColor = "#833AE0";
    if(aCrypto==bCrypto)
    {
        inpt[0].value!=null ? inpt[1].value = inpt[0].value : inpt[0].value = inpt[1].value;
    }
    else{
        if(aCrypto)
        {
            error.innerText="";
            getCryptoValue(aCrypto,bCrypto, inpt[1].value , 1);
        }
        else
            error.innerText="Please, select cryptos!";
    }
}))

inpt.forEach(function (item, index){
    item.addEventListener("keyup", ()=>{
        if(!aCrypto || !bCrypto)
        error.innerText="Please, select cryptos!";
        else if(aCrypto==bCrypto)
        {
            inpt[0].value!=null ? inpt[1].value = inpt[0].value : inpt[0].value = inpt[1].value;
        }
        else
        {
            getCryptoValue(aCrypto,bCrypto,item.value, index);
            error.innerText="";
        }
    })
})

function getCryptoValue(base, target, value, inputId)
{
    let requestURL = `https://api.exchangerate.host/latest?base=${base}&symbols=${target}`;
    let request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    console.log("Request Sended!");
    request.onload = function() {
    let response = request.response;
    oneMoney[0].innerText = `1 ${base} = ${response.rates[target]} ${target}`;
    oneMoney[1].innerText = `1 ${target} = ${1/response.rates[target]} ${base}`;
    inputId == 0 ? moneyByValue[1].value = `${value*response.rates[target]}` : moneyByValue[0].value = `${value*response.rates[target]}`;
    }
}