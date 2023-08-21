const pageLoaded = () => {
    // code to execute when the page loads
}
document.addEventListener("DOMContentLoaded", pageLoaded)
const donutList = [
    {
        id:1,
        image: "assets/donut1.jpg" ,
        name: "Plum-Filled Ponchiki" ,
        description: "Soft,round donut filled with a fresh plum jelly and dusted with cake sugar.",
        price: "4.5"
    },

    {
        id:2,
        image: "assets/donut2.jpg",
        name: "Lemon Meringue Doughnut",
        description: "A delightfully zesty,lemon-flavoured donut wiht a lemon meringue topping.",
        price: "4.5"
    },
     {
        id:3,
        image: "assets/donut3.jpg",
        name: "D'Ohnut",
        description: "A classic vanilla donut with pink icing and colorful sprinkles.Every kid's favourite!",
        price: "4.5"

     },

     {
        id:4,
        image:"assets/donut4.jpg",
        name: "S'mores Doughnut",
        description: "Filled with hous-made marshmallow cream and sprinkled with graham cracker crumbs.",
        price: "4.5"
     }

]

const donuts = document.querySelector("#donut-list")
const renderYourItems = document.querySelector("#your-items")
const totalDiv = document.querySelector("#total")
const discountDiv = document.querySelector("#discount")



const renderDonut = () => {
    donutList.forEach((donut) => {
        donuts.innerHTML += 
        `
       
           <div>   
            <img src="${donut.image}" class="imgLarge">
                <div class="items">
                    <p class="name">${donut.name}</p>
                    <p class="description">
                    ${donut.description}
                    </p>
                    <button class="button" onClick="addYourItem(${donut.id})" >ADD TO CART</button>
                </div>
         </div> 
`
    })
}

renderDonut()


let item = []

//DISPLAY ITEM TO YOUR ITEM
const addYourItem = (id) => {
    if(item.some((yourItems) => yourItems.id === id)){
            changeQuantity("plus",id)
    }else {
        const yourItems = donutList.find((donut) => donut.id === id)
        item.push({
            ...yourItems,
             Quantity: 1,
            })
        
    }
    updateItem()
  
}


const updateItem = () => {
    renderItems()
    calculation()
}



const calculation = () => {
let subtotal = 0
let tax = 0
let total = 0
let discount = 0
let discountSubTotal = 0
let discountTotal = 0

    item.forEach((item) => {
         subtotal += item.Quantity * item.price
         tax += 0.13 * subtotal
         total += subtotal + tax

         discount += subtotal * 0.1 
         discountSubTotal += subtotal - discount
         discountTotal += tax + discountSubTotal
  
    })
        if(item.Quantity > 6){

            discountDiv.innerHTML = `
            <p class="red">Discount Price: $${discount.toFixed(2)}</p>
            <p>Subtotal:<span class="blue">$${discountSubTotal.toFixed(2)}</span></p>
            <p>Tax:<span class="blue">$${tax.toFixed(2)}</span></p>
            <p>Total:<span class="blue">$${discountTotal.toFixed(2)}</span></p>
            ` 
        }else {
            totalDiv.innerHTML = 
            `
            <p>Subtotal: <span class="blue">$${subtotal.toFixed(2)}</span></p>
            <p>Tax: <span class="blue">$${tax.toFixed(2)}</span></p>
            <p>Total:<span class="blue">$${total.toFixed(2)}</span> </p>
            `
        }
       return{
        ...item,
       }
      
}

const renderItems = () => {
    renderYourItems.innerHTML = ""
    item.forEach((donut) =>{
        renderYourItems.innerHTML +=
         `
        <div>
         <p>${donut.name}</p>
         <p>QUANTITY:${donut.Quantity}</p>
        </div>
        ` 
    })
}

const changeQuantity = (action,id) => {
    item = item.map((item) => {
        let Quantity = item.Quantity;
        if(item.id === id){
            if(action === "plus"){
                Quantity++
            }
        }
        return{
            ...item,
            Quantity

        }
    })
}

