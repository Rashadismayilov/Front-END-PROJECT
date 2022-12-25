function GetItems() {
    let basket = JSON.parse(localStorage.getItem('basket'));
    
    if(basket.length === 0) {
        document.getElementById('empty').classList.remove('d-none');
        document.getElementById('btn_delete').classList.add("d-none");
    }
    else{
        document.querySelector('.table').classList.remove('d-none')
        let html = '';
        for(let item of basket) {
            html += `
            <tr>
            <th scope="row">${item.id}</th>
            <td style="width:20%">
            <img src=${item.image} alt="">
            </td>
            <td>${item.name}</td>
            <td>
            <input class="product-count-changer" data-id=${item.id} type="number" min="1" max="10" value=${item.count}>
            </td>
            <td data-id="${item.id}-price"><span data-price=${item.id} class="product-price"> ${item.price}</span>$</td>
            </tr>
            `
        }
    
        document.querySelector('.table tbody').innerHTML = html
    }
}

GetItems();

document.getElementById('btn_delete').onclick = function(){
    localStorage.removeItem('basket')
    location.reload();
}

const productCounter = document.querySelectorAll(".product-count-changer");

productCounter.forEach(pc => pc.addEventListener("change", function(event){
    let basket = JSON.parse(localStorage.getItem('basket'));
    let dataid = pc.getAttribute("data-id");
    let count = event.target.value;

    for (const product of basket) {
        if(product.id == dataid) {
            let productprice = document.querySelectorAll("[data-price]");
            productprice.forEach(n => {
                if(n.getAttribute(`data-price`) == dataid) {
                    n.innerHTML = parseInt(product.price) * count;
                }
            });
        }
    }

    document.getAttribute(`${dataid}-price`).innerHTML = count;
}));