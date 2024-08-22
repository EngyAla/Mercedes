let user = document.querySelector("#user")
let user_info = document.querySelector("#user_info")
let links = document.querySelector(".links")
let logOut = document.querySelector("#logOut")


if(localStorage.getItem("username")){
    links.remove()
    user.style.display = "flex"
    user_info.innerHTML = localStorage.getItem("username")
}

logOut.addEventListener("click",function(){
    localStorage.clear()
    setTimeout(() =>{
        window.location = "register.html"
    }, 1500)
})

let allProducts = document.querySelector(".products")
let products = [
    {
        id : 1,
        imageUrl : "photo/IMG-20240807-WA0017.jpg" ,
        className : "product_items1 yourCartItem",
        title : "Mercedes-Benz G-class / $300,000",
    },
    {
        id : 2,
        imageUrl : "photo/IMG-20240807-WA0013.jpg" ,
        className : "product_items2 yourCartItem",
        title : "Steering wheel knob / $10,000"
        
    },
    {
        id : 3,
        imageUrl : "photo/WhatsApp Image 2024-08-07 at 03.03.25_ff4416a8.jpg" ,
        title : "Mercedes-Benz C-Class AMG / $120,000",
        className : "product_items3 yourCartItem"
    },
    {
        id : 4,
        imageUrl : "photo/IMG-20240807-WA0016.jpg" ,
        title : "Mercedes-Benz SL-Class / $590,000",
        className : "product_items4 yourCartItem"
    },
    {
        id : 5,
        imageUrl : "photo/IMG-20240807-WA0014.jpg" ,
        title : "Mercedes-Benz EQS AMG / $450,000",
        className : "product_items5 yourCartItem"
    },
    {
        id : 6,
        imageUrl : "photo/IMG-20240807-WA0008.jpg" ,
        title : "Entrance guard / $30,000",
        className : "product_items6 yourCartItem"
    },
]

let searchBar = document.querySelector("#searchBar")
searchBar.addEventListener("keyup", function(ele){
    let searchData = ele.target.value.toUpperCase()
    console.log(searchData)
    let filterData = products.filter((item) =>{
        return(
            item.title.toLocaleUpperCase().includes(searchData)
        )
    })
    displaySearch(filterData)
})

function displaySearch(products){
    // لازم افضي مكان ال container وبعدين اعرض منتجات ال search
    allProducts.innerHTML = "";
    allProducts.innerHTML = products.map((item) => {
        return `
        <div class="product_items ${item.className}">
                    <p class="product_item_p">${item.title}</p>
                    <img src="${item.imageUrl}" alt="" class="product_item_img" width="400px" height="500px">
                    <div class="product_item_action">
                        <button class="product_item_btn" onclick = "addToCart(${item.id})" data-id= ${item.id}>Add to cart <i class="fa-solid fa-arrow-right btn_icon"></i></button>
                        <i class="fa-regular fa-heart fav" onclick = "addToFav(${item.id})">></i> 
                    </div>
                </div>
        `
    }).join("")
}


function drawProducts(){
    allProducts.innerHTML = products.map((item) => {
        return `
        <div class="product_items ${item.className}">
                    <p class="product_item_p">${item.title}</p>
                    <img src="${item.imageUrl}" alt="" class="product_item_img" width="400px" height="500px">
                    <div class="product_item_action">
                        <button class="product_item_btn" onclick = "addToCart(${item.id})" data-id= ${item.id}>Add to cart <i class="fa-solid fa-arrow-right btn_icon"></i></button>
                        <i class="fa-regular fa-heart fav" onclick = "addToFav(${item.id})">></i> 
                    </div>
                </div>
        `
    }).join("")
}
drawProducts()


////////////////////////////////////////////////////////////////////////////////////////////////////////

let cart_icon = document.querySelector("#cart_icons")
let cartTap = document.querySelector("#cart_tap")
cart_icon.addEventListener("click" ,function(){
    console.log("ok")
    if(cartTap.style.transform === "translateX(0%)"){
        cartTap.style.transform = "translateX(100%)"
    }else{
        cartTap.style.transform = "translateX(0%)"
    }
})


////////////////////////////////////////////////////////////////////////////////////////////////////////////

let cartTap_item = document.querySelector(".cartTap_item")
let item_p = document.querySelector(".item_p")
let item_img = document.querySelector(".item_img")

let counter = 0
let num_of_products_hack = document.querySelector(".num_of_products_hack")


cartTap_item.addEventListener("click", function(event) {
    let itemRow = event.target.closest(".item");
    if (itemRow) {
        let amount = itemRow.querySelector(".amount");
        let quentity = parseInt(amount.textContent);

        if (event.target.classList.contains("minus")) {
            if (quentity > 1) {
                quentity -= 1;
                amount.textContent = quentity;
                counter -= 1
                num_of_products_hack.innerHTML = +(counter)

                let itemToRemove = itemRow
                let indexOFitemToRemove = addedItem.indexOf(itemToRemove)
                addedItem.splice(indexOFitemToRemove,1)
                localStorage.setItem("porductsInCart" , JSON.stringify(addedItem))

            }
            else{
                itemRow.remove()
                counter -= 1
                num_of_products_hack.innerHTML = +(counter)
                let itemToRemove = itemRow
                let indexOFitemToRemove = addedItem.indexOf(itemToRemove)
                addedItem.splice(indexOFitemToRemove,1)
                localStorage.setItem("porductsInCart" , JSON.stringify(addedItem))   
                
            }
        } 
        else if (event.target.classList.contains("positive")) {
            quentity += 1;
            amount.textContent = quentity;
            counter += 1
            num_of_products_hack.innerHTML = +(counter)

            let itemToAdd = itemRow.querySelector(".item_p").textContent.trim()

            let imgToAdd = itemRow.querySelector(".item_img")
            let addedImg = imgToAdd.src
            console.log(imgToAdd.src)
            addedItem.push({title:itemToAdd , imageUrl: addedImg})            
            localStorage.setItem("porductsInCart" , JSON.stringify(addedItem))
        }
    }
});


let addedItem = localStorage.getItem("porductsInCart") ? JSON.parse(localStorage.getItem("porductsInCart")) : []
let favouriteItem = localStorage.getItem("productsInFavourite") ? JSON.parse(localStorage.getItem("productsInFavourite")) : []

if(addedItem){
    addedItem.map((item) => {
        
        cartTap_item.innerHTML += `
        <div class="item">
                <div class="item_name">
                    <p class="item_p">${item.title}</p>
                </div>
                <div class="item_photo">
                    <img src="${item.imageUrl}" class="item_img" width="0" height="0">
                </div>
                <div class="item_price">
                    <p class="price"></p>
                </div>
                <div class="item_quentity">
                    <span class="minus"><</span>
                    <span class="amount">1</span>
                    <span class="positive">></span>
                </div>
            </div>
        `
    })
    counter = addedItem.length
    num_of_products_hack.innerHTML = +(counter)
}

function addToCart(id){
    if(localStorage.getItem("username")){

    let choosenItem = products.find((item) => item.id === id);
    let choosenBtn = document.querySelector(`button[data-id='${id}']`)
    if(choosenBtn){
        // هذا يجعل التحقق أكثر مرونة في حال وجود أي HTML إضافي في النص.   (includes)
        if( choosenBtn.innerHTML.includes("Remove")){
            //  هنا معتبر زرار Remove هوا نفس زرار add  ف بيزود اتنين مره ل  add  مره ل remove
            // فا انا عملت ناقص 2
            counter -= 1
            num_of_products_hack.innerHTML = +(counter)
            choosenBtn.innerHTML = "Add to cart" + `<i class="fa-solid fa-arrow-right btn_icon"></i>`
            
            let indexOFchoosenItem =  addedItem.indexOf(choosenItem)
            addedItem.splice(indexOFchoosenItem,1)
            localStorage.setItem("porductsInCart" , JSON.stringify(addedItem))
        }
        else{
            choosenBtn.innerHTML = "Remove" + `<i class="fa-solid fa-arrow-right btn_icon"></i>`
            cartTap_item.innerHTML +=
        `
        <div class="item">
                <div class="item_name">
                    <p class="item_p">${choosenItem.title}</p>
                </div>
                <div class="item_price">
                    <p class="price"></p>
                </div>
                <div class="item_quentity">
                    <span class="minus"><</span><span class="amount">1</span><span class="positive">></span>
                </div>
            </div>
        `
        counter += 1
        num_of_products_hack.innerHTML = +(counter)

        addedItem = [...addedItem,choosenItem]
        localStorage.setItem("porductsInCart" , JSON.stringify(addedItem))

        }
    }
}else{
    setTimeout(() =>{
        window.location = "register.html"
    }, 1500)
    
}}
// addToCart()


function addToFav(id){
    let choosenFav = products.find((item) => item.id === id)
    console.log(choosenFav)

    favouriteItem = [...favouriteItem , choosenFav]
    localStorage.setItem("productsInFavourite" , JSON.stringify(favouriteItem))
}