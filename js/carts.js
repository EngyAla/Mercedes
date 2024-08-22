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


let porductsInCart = localStorage.getItem("porductsInCart")
let allProducts = document.querySelector(".products")
let totalDiv = document.querySelector(".totalDiv")
let alltoatal = 0

if(porductsInCart){
    let item = JSON.parse(porductsInCart)
    drawyourCart(item)
}

function drawyourCart(products){
    allProducts.innerHTML = products.map((item) => {
        let text = item.title
        let numOnly = text.replace(/\D/g, "")
        alltoatal += +(parseInt(numOnly)) 
        totalDiv.innerHTML = "$" +(alltoatal)
        console.log(alltoatal)
        return `
        <div class="product_items yourCartItem">
            <p class="product_item_p">${item.title}</p>
            <img src="${item.imageUrl}" class="product_item_img" width="400px" height="500px">
                <div class="product_item_action yourCartItem_action">
                    <button class="product_item_btn yourCartItem_btn"  onclick = "removefromCart(${item.id})">Remove<i class="fa-solid fa-arrow-right btn_icon"></i></button>
                    <div class="cart_quentity">
                    <span class="minus" onclick = "removeoneItem(${item.id})"><</span>
                    <span class="amount">1</span>
                    <span class="positive" onclick = "addoneItem(${item.id})">></span>
                </div>
                </div>
        </div>
        `
    }).join("")
}

function removefromCart(id){
    let itemRow = event.target.closest(".product_items")
    if (itemRow) {
        let itemRowTitle = itemRow.querySelector(".product_item_p")
        // console.log(itemRowTitle)
        if(event.target.classList.contains("product_item_btn")){
            itemRow.remove()

            let itemRowText = itemRowTitle.textContent
            let itemRowOnlynum = itemRowText.replace(/\D/g, "")
            // console.log(itemRowOnlynum)
            alltoatal -= +(parseInt(itemRowOnlynum))
            // console.log(alltoatal)
            totalDiv.innerHTML = "$" +(alltoatal)
        }
    }
}

function removeoneItem(id){
    let itemRow = event.target.closest(".product_items")
    // console.log(itemRow)
        if(itemRow){
            let amount = itemRow.querySelector(".amount")
            if(amount.textContent === "1"){
                itemRow.remove()
                let itemRowTitle = itemRow.querySelector(".product_item_p")
                let itemRowText = itemRowTitle.textContent
                let itemRowOnlynum = itemRowText.replace(/\D/g, "")
                alltoatal -= +(parseInt(itemRowOnlynum))
                totalDiv.innerHTML = "$" +(alltoatal)
            }
            else{
                let totalamount = parseInt(amount.innerHTML)
                totalamount -= 1
                amount.innerHTML =  totalamount
                let itemRowTitle = itemRow.querySelector(".product_item_p")
                let itemRowText = itemRowTitle.textContent
                let itemRowOnlynum = itemRowText.replace(/\D/g, "")
                alltoatal -= +(parseInt(itemRowOnlynum))
                totalDiv.innerHTML = "$" +(alltoatal)
            }
        }
}

function addoneItem(id){
    let itemRow = event.target.closest(".product_items")
        if(itemRow){
            let amount = itemRow.querySelector(".amount")
            let totalamount = parseInt(amount.innerHTML)
            totalamount += 1
            amount.innerHTML =  totalamount
            let itemRowTitle = itemRow.querySelector(".product_item_p")
            let itemRowText = itemRowTitle.textContent
                let itemRowOnlynum = itemRowText.replace(/\D/g, "")
                alltoatal += +(parseInt(itemRowOnlynum))
                totalDiv.innerHTML = "$" +(alltoatal)
        }
}



let productsInFavourite = localStorage.getItem("productsInFavourite")
// .swiper-wrapper السبب انها مكنتش بتشتغل مظبوط
let your_fav_product = document.querySelector(".your_fav_product .swiper-wrapper")

if(productsInFavourite){
    let item = JSON.parse(productsInFavourite)
    drawFav(item)
}
function drawFav(products){
    your_fav_product.innerHTML = products.map((item) =>{
        return`
                    <div class="card-item swiper-slide">
                        <div class="card-img">
                            <img src="${item.imageUrl}" class="product_item_img"  width="400px" height="500px">
                        </div>
                    </div>`
    }).join("")

    // داخل الداله drawFav وليس خارجها
    const swiper = new Swiper(".slider-wrapper", {
        slidesPerView: 2,
        spaceBetween: 30,
        loop: true,
        centerSlide: 'true',
        fade: 'true',
        grabCursor: 'true',
        
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
            dynamicBullets: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        breakpoints:{
            0: {
                slidesPerView: 1,
            },
            520: {
                slidesPerView: 1,
            },
            1024: {
                slidesPerView: 2,
            },
        }
    });
}












