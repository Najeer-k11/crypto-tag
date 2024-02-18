

class DataItem{
    constructor(name,price,dateAdded,maxSupply){
        this.name = name ;
        this.price = price ;
        this.dateAdded = dateAdded;
        this.maxSupply = maxSupply;
    }
}



async function fetchData() {
    const apiUrl = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=20&CMC_PRO_API_KEY=cc99ef77-1ee7-4713-87b5-e424aabc1fcb';

    try{
        const res = await fetch(apiUrl) ;
        if(!res.ok){
            return [] ;
        }
        var dui = res.json() ;
        var data = [] ;
        console.log(dui);
        dui.data.forEach(element => {
            var cryptoItem = new DataItem(
                element.name,
                element.quote.price,
                element.dateAdded,
                element.maxSupply
            );
            data.push(cryptoItem) ;
        });
        return data ;
    }catch{
        return [] ;
    }
}   

window.addEventListener('DOMContentLoaded',() => {

    

    const tbody = document.getElementById('tbd') ;
    
    let data = [] ;

    data = fetchData() ;


    for(let i = 0 ; i < data.length ; i++){
            tbody.innerHTML += `
            <tr>
                <td>${i}</td>
                <td>${data[i].name}</td>
                <td>${data[i].price}</td>
                <td>${data[i].maxSupply}</td>
            </tr>
        ` ;
    }
})