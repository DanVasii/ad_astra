window.addEventListener("load",()=>{
    document.querySelector("#login_form").addEventListener("submit",(ev)=>{
        ev.preventDefault();

        let email = document.querySelector("#email").value;
        let pass = document.querySelector("#password").value;
        console.log(email);
        console.log(pass);
        axios.post("/login", {email, pass}).then((response)=>{
            console.log(response);
            window.location.href = "/dashboard";
        }).catch((err)=>{
            console.log(err);
            alert("Parola gresita");
        })
    })
})