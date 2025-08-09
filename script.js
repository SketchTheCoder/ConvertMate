const BASE_URL = "https://hexarate.paikama.co/api/rates/latest"
const dropdowns = document.querySelectorAll(".dropdown select");
let btn = document.querySelector("#Exchange");
let fromcurr = document.querySelector(".from select")
let tocurr = document.querySelector(".to select")
let msg = document.querySelector(".msg");
for (let select of dropdowns) {
    for (currcode in countryList) {
        let newoption = document.createElement("option");
        newoption.innerText = currcode;
        newoption.value = currcode;
        if (select.name == "from" && currcode == "USD") {
            newoption.selected = "selected";
        }
        else if (select.name == "To" && currcode == "INR") {
            newoption.selected = "selected";
        }
        select.append(newoption);
    }
    select.addEventListener("change", (evt) => {
        updateflag(evt.target);
    })
}
const updateflag = (element) => {
    let currcode = element.value;
    let countrycode = countryList[currcode];
    let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;
}
btn.addEventListener("click", async (evt) => {
    evt.preventDefault();//stop default events
    let amnt = document.querySelector(".amount input");
    let amntvalue = amnt.value;
    if (amntvalue === "" || amntvalue < 1) {
        amntvalue = 1;
        amnt.value = "1";
    }


    const from = fromcurr.value;
    const to = tocurr.value;
    const URL = `${BASE_URL}/${from}?target=${to}`;
    let response = await fetch(URL);
    let result = await response.json();
    let midRate=result.data?.mid;
 const converted = (amntvalue * midRate).toFixed(2);
    msg.innerText = `${amntvalue} ${from} = ${converted} ${to}`;
})

