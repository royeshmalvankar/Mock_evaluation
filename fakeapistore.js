let fakedata = document.getElementById("data");
let category = document.getElementById("category");
let search = document.getElementById("search");
let prc = document.getElementById("prc");


let getdata= async(URL) =>
{
    let res = await fetch(URL);
    let data = await res.json();
    showdata(data);
}

let showdata = (data) =>
{
    fakedata.innerHTML = null;
    data.forEach((el) => {
        let div = document.createElement("div");
        div.setAttribute("class","product");
        let img = document.createElement("img");
        img.src = el.image;
        let name = document.createElement("h1");
        name.innerText = el.title;
        let price = document.createElement("h3");
        price.innerText = `$${el.price}`;

        div.append(img,name,price);
        fakedata.append(div);
    });
}
let sortdata = async() =>
{
    let res = await fetch(`https://fakestoreapi.com/products`);
    let data = await res.json();
    if(prc.value == "asc")
    {
        data.sort((a,b) => a.price - b.price); 
        return showdata(data);
        
    }
    else if (prc.value == "desc")   
    {
        data.sort((a,b) => b.price - a.price); 
        return showdata(data);
    }
    else
    {
        showdata(data);
    }
}

let categorydata = async() =>
{
    let res = await fetch(`https://fakestoreapi.com/products/${category.value}`);
    let data = await res.json();
    showdata(data);
}

let searchdata = async() =>
{
    let res = await fetch(`https://fakestoreapi.com/products`);
    let data = await res.json();
    let filterdata= data.filter((el) => el.title.toLowerCase().substring(0,search.value.length) == search.value.toLowerCase());
    console.log(filterdata);
    showdata(filterdata);
   
}

getdata(`https://fakestoreapi.com/products`);