let username = document.querySelector("#username")
let password = document.querySelector("#password")
let logInBtn = document.querySelector("#Sign_in")

let getUsername = localStorage.getItem("username")
let getpassword = localStorage.getItem("password")



logInBtn.addEventListener("click" , function(e){
    e.preventDefault()
        if(username.value === "" , password.value === ""){
            alert("Please fill data")
        }
        else{
            if(getUsername && getUsername.trim() === username.value.trim() && getpassword === password.value.trim() ){
                setTimeout(() => {
                    window.location = "index.html"
                }, 1500)
            }
            else{
                alert("There's something wrong.")
            }
        }
        
    
})
