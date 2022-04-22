let aCrypto='USD', bCrypto='RUB';
let inpt = document.getElementById("inpt");
let firstCardEl = document.querySelectorAll(".first-card button");
let secondCardEl = document.querySelectorAll(".second-card button");
let moneyByValue = document.querySelectorAll(".money");
let oneMoney = document.querySelectorAll(".money-text");
let error = document.getElementById("error");

inpt.focus();

firstCardEl.forEach(x=>x.addEventListener('click', ()=>{
    aCrypto=x.innerText;
    firstCardEl.forEach(x=>{x.classList.remove("active"); x.parentElement.style.backgroundColor = "#fff"});
    x.classList.add("active");
    x.parentElement.style.backgroundColor = "#833AE0";
    if(bCrypto)
    {
        error.innerText="";
        getCryptoValue(aCrypto,bCrypto,inpt.value); inpt.focus();
    }
    else
    error.innerText="Please, select cryptos!";
}))

secondCardEl.forEach(x=>x.addEventListener('click', ()=>{
    bCrypto=x.innerText;
    secondCardEl.forEach(x=>{x.classList.remove("active"); x.parentElement.style.backgroundColor = "#fff"});
    x.classList.add("active");
    x.parentElement.style.backgroundColor = "#833AE0";
    if(aCrypto)
    {
        error.innerText="";
        getCryptoValue(aCrypto,bCrypto,inpt.value); inpt.focus();
    }
    else
    error.innerText="Please, select cryptos!";
}))

inpt.addEventListener("keyup", ()=>{
    if(!aCrypto || !bCrypto)
    error.innerText="Please, select cryptos!";
    else
    {
        getCryptoValue(aCrypto,bCrypto,inpt.value);
        error.innerText="";
    }
})

function getCryptoValue(base, target, value)
{
    let requestURL = `https://api.exchangerate.host/latest?base=${base}&symbols=${target}`;
    let request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();

    request.onload = function() {
    let response = request.response;
    oneMoney[0].innerText = `1 ${base} = ${response.rates[target]} ${target}`;
    oneMoney[1].innerText = `1 ${target} = ${1/response.rates[target]} ${base}`;
    moneyByValue[1].innerText = `${value*response.rates[target]} ${target}`;
    console.log(`1 ${base} : ` + response.rates[`${target}`] + ` ${target}`);
    console.log(`1 ${target} : ` + 1/response.rates[`${target}`] + ` ${base}`);
    console.log(`${value} ${base} : ` + value*response.rates[`${target}`]);
    }
}