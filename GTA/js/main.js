// Variable
const items = document.querySelector('#shop-boxes'),
      shoppingCart = document.querySelector('#cart__content tbody'),
      clearCart = document.querySelector('#clear-cart');


// Listener

eventListener();

function eventListener(){

    // all eventlistener will be added here..

  items.addEventListener('click', addToCart );
   // eventListener for shoppinCart
  shoppingCart.addEventListener('click', removeCart );
   // eventlistener for Clear Cart
   clearCart.addEventListener('click', removeShoppingCart);

   //Document Ready

   document.addEventListener('DOMContentLoaded', getFromLocalStorage);
}

// Function
 
function addToCart(e){
    // prevent Default
  e.preventDefault();

  if(e.target.classList.contains('add-to-cart')){
      
    const item = e.target.parentElement.parentElement;

    getCourseInfo(item);


  }
}
function getCourseInfo(item){
   // create a Template 
    const itemInfo = {
     
        image: item.querySelector('img').src,
        tittle: item.querySelector('h4').textContent,
        price: item.querySelector('.price span').textContent,
        id: item.querySelector('a').getAttribute('data-id')

    };
     addToShoppingCart(itemInfo);
   
}
function addToShoppingCart(item){
 // create <tr>

 const row = document.createElement('tr');
 row.style.fontSize = '9px';
  row.innerHTML = `
   <tr>
      <td><img src="${item.image}" width=60></td>
      <td>${item.tittle}</td>
      <td>${item.price}</td>
      <td>
      <a href="#" class="remove" data-id="${item.id}">X</a>
      </td>

   </tr>

  `;
  shoppingCart.appendChild(row);
  
  storageLocalStorage(item);
}

function removeCart(e){
    // Remove from dom
  if(e.target.classList.contains('remove')){
      e.target.parentElement.parentElement.remove();
      //remove from local storage
      itemId = items.querySelector('a').getAttribute('data-id');
  }
 console.log(itemId);
  removeCourseFromLocalStorage(itemId);

}

function  removeCourseFromLocalStorage(id){
    // remove from local storage
    let itemsLS =  addToLocalStorage();

    itemsLS.forEach(function(itemsLS, index){
         if(itemsLS === id){
            itemsLS.splice(index, 1);
         }
    });

}

function  removeShoppingCart(){

    /* not the preferred way ...
    shoppingCart.innerHTML = '';
*/
    // preferred way...
    while (shoppingCart.firstChild) {
        shoppingCart.removeChild(shoppingCart.firstChild);
    }

    clearFromLocalStorage();
}

// Clear From Local storage

function clearFromLocalStorage(){

    // clear from local storage via Clear cart

    localStorage.clear();
}

function addToLocalStorage(){

    let items;
    const addToLS = localStorage.getItem('items');

    if(addToLS === null){
        courses = [];
    }else{
        courses = JSON.parse(addToLS);
    }

    return courses;
}

function storageLocalStorage(item){
   let items =  addToLocalStorage();
  
   courses.push(item);
    
   localStorage.setItem('items', JSON.stringify(items));


}

function getFromLocalStorage(){
    let itemsLS =  addToLocalStorage();

    itemsLS.forEach(function(item){
        // Create the table row
        const row = document.createElement('tr');
        row.style.fontSize = '9px';
         row.innerHTML = `
          <tr>
             <td><img src="${item.image}" width=60></td>
             <td>${item.tittle}</td>
             <td>${item.price}</td>
             <td>
             <a href="#" class="remove" data-id="${item.id}">X</a>
             </td>
       
          </tr>
       
         `;
         shoppingCart.appendChild(row);
    });
}


