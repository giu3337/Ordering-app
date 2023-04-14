// Restaurant App 

import { menuArray } from './data.js'

const orderArray = []




document.addEventListener('click', function (e) {
    if (e.target.dataset.addBtn) {
        addItemToOrder(e.target.dataset.addBtn)   
    }else if (e.target.classList.contains('remove-order')) {
        const index = e.target.dataset.orderIndex
        deleteOrder(index)
    }else if (e.target.id === 'complete-order-btn') {
        renderPayingModal()
    }else if (e.target.id === 'pay-btn') {
         e.preventDefault()
         renderThankYouModal()
    }
})



function addItemToOrder(itemId) {
    const targetMenuObj = menuArray.filter(function (menu) {
        return menu.id == itemId
    })[0]
    
    document.getElementById('your-order-modal').style.display = 'block'
    
    orderArray.push(targetMenuObj);
    renderOrder()

}


function getHtmlMenu() {
    let menuhtml = ''
    menuArray.forEach( menu => {
        menuhtml += `
        <div class="container-items box-size">
            <img class="icon-size" src="${menu.image}" alt="${menu.name}-icon">
                <div class="item-container">
                <h3>${menu.name}</h3>
                <p class="ingredients">${menu.ingredients}</p>
                <p class="price">${menu.price}</p>
                </div>
            <button id="add-btn" data-add-btn="${menu.id}">+</button>
       </div>

       `
       
       
    })

    
    return menuhtml
    
}

function renderPayingModal() {
    document.getElementById('container-app').classList.add('container-app-after-pay')
    document.getElementById('pay-modal').style.display = 'block'
    
}

function renderOrder() {
    let orderHtml = ''
    let orderTotal = 0
    orderArray.forEach((order,index) => {
          orderHtml += `
            <div class="modal-container">
                <p class="modal-style reduce-space">${order.name}  <button class="remove-order" data-order-index="${index}">remove</button></p> 
                <p class="modal-style-number reduce-number">$${order.price}</p>  
            </div>` 

            orderTotal += order.price
    });

    document.getElementById('order-items').innerHTML = orderHtml
    document.getElementById('modal-style-number-total').innerHTML = `$${orderTotal}`
}

const doneOrderModal = document.getElementById('done-order-modal')
function renderThankYouModal() {
    document.getElementById('container-app').classList.remove('container-app-after-pay')
    document.getElementById('your-order-modal').style.display = 'none'
    document.getElementById('pay-modal').style.display = 'none'
    doneOrderModal.style.display = 'block';
    
  

    
    
}

const payingForm = document.getElementById('paying-form')
payingForm.addEventListener('click', function (e) {
    const payingFormData = new FormData(payingForm)
    const name = payingFormData.get('fullName')

    doneOrderModal.innerHTML = `
    <p class="done-order-text">Thanks, ${name}! Your order is on its way!</p>
    `

    setTimeout(() => {
        
    }, 1500);
    
})

function deleteOrder(index) {
    orderArray.splice(index, 1);
    renderOrder();
}



 


    


function renderMenu(){
    document.getElementById('container-menu').innerHTML = getHtmlMenu()
 }
 renderMenu()





// rate

// const stars = document.querySelectorAll('.star');

// stars.forEach(function(star) {
//   star.addEventListener('click', function() {
//     stars.forEach(function(s) {
//       s.classList.remove('selected');
//     });
//     this.classList.add('selected');
//     const rating = this.getAttribute('data-value');
//     sendRating(rating);
//   });
// });
