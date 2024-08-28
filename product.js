let productList = document.getElementById('productList');
let cartList = document.getElementById('cartList');

// class define 
// product 
class Product{
    constructor(productName, productPrice) {
        this.name = productName.textContent;
        this.price = productPrice.textContent;
    }
}

// cart class 
class cart{
    static addToCart(product) {
        let tr = document.createElement('tr');
        tr.innerHTML=`
        <td>${product.name}</td>
        <td>${product.price}</td>
        <td><a class='button' href='#'>Remove</a></td>`;
        cartList.appendChild(tr);
    }

    static removeFromCart(e) {
        if (e.target.hasAttribute('href')) {
            let par = e.target.parentElement.parentElement;
            store.removeFromLocal(e.target.parentElement.previousElementSibling.previousElementSibling.textContent.trim());
            par.remove();
        }
        e.preventDefault();
    }
}

// localStore class 
class store{
    static getCartList() {
        let products;
        if (localStorage.getItem('products') === null) {
            products=[]
        }
        else {
            products = JSON.parse(localStorage.getItem('products'));
        }
        products.sort((x, y) => {
            let X = x.name.toLowerCase(),
                Y = y.name.toLowerCase();
            if (X < Y) return -1;
            if (X > Y) return 1;
            return 0;

        })
        return products;
    }

    static addToLocal(product) {
        let products = this.getCartList();
        products.push(product);
        localStorage.setItem('products', JSON.stringify(products));
    }

    static showFromLocal() {
        let products = this.getCartList();
        products.forEach((product) => {
            cart.addToCart(product);
        })
    }

    // deleting by name
    // if multiple product added to cart with same name
    // and if you want to delete a single product from 
    // your cart then the deleting process will start from top to bottom
    static removeFromLocal(productName) {
        let products = this.getCartList();
        for (let i = 0; i < products.length; i++){
            if (products[i].name == productName) {
                products.splice(i, 1);
                break;
            }
        }
        localStorage.setItem('products', JSON.stringify(products));
    }
}


// add event listener 
productList.addEventListener('click', loadProduct);
cartList.addEventListener('click', cart.removeFromCart);
document.addEventListener('DOMContentLoaded', store.showFromLocal());

// function define 
function loadProduct(e) {
    if (e.target.hasAttribute('href')) {
        let par = e.target.parentElement.parentElement;
        let product=new Product(par.children[0].cloneNode(true), par.children[1].cloneNode(true));
        cart.addToCart(product);
        store.addToLocal(product);
   }
    e.preventDefault();
}