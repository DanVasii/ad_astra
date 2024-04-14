
var crumbs, content;

window.addEventListener("load", function(){
    crumbs = document.querySelectorAll(".crumbs .crumb");
    content = document.querySelectorAll(".content_container--tray .content");
    next(1);
})

function set_active(index){
    crumbs[index-2] !== undefined && crumbs[index-2].classList.remove("active");
    crumbs[index-1] !== undefined && crumbs[index-1].classList.add("active");
}

function next(index){
    if(index == 3){
        load_univs();
    }

    if (index == 4){
        //upload 
        upload();
    }else{
        set_active(index);
    }

    document.querySelector(".content_container--tray").style.transform = `translateX(-${(index-1)*100}%)`;
}

function upload(){
    let data = {};

    data.nume = document.querySelector("#user_nume").value;
    data.prenume = document.querySelector("#user_prenume").value;
    data.birth = document.querySelector("#user_birth").value;
    data.judet = document.querySelector("#user_judet").value;
    data.oras = document.querySelector("#user_oras").value;
    data.phone = document.querySelector("#user_phone").value;
    data.email = document.querySelector("#user_email").value;
    data.about = document.querySelector("#user_about").value;
    data.poss = document.querySelector("#user_pass").value;
    data.experiences = [];

    //add experinces 
    Array.from(document.querySelectorAll("#exps .experience_container")).forEach((exp)=>{
        let inputs = exp.querySelectorAll("input");

        data.experiences.push({
            name: inputs[0].value,
            start: inputs[1].value,
            end: inputs[2].value 
        })
    })

    data.highschool = document.querySelector("#user_highs").value;
    if (document.querySelectorAll(".univ.active").length == 0)
    {
        //error
    }else{
        data.univ_id = document.querySelectorAll(".univ.active")[0].dataset.id;

        //send the request 
        axios.post("/register", data).then((response)=>{
            set_active(4);
            setTimeout(()=>{
                window.location.href = "/";
            },1200)
        }).catch((err)=>{
            set_active(5);
        })

    }

}

function add_exp(){
    let node = document.querySelector("#exp_new").content.cloneNode(true);

    document.querySelector("#exps span")?.remove();
    document.querySelector("#exps").appendChild(node);
}

function remove_exp(node){
    node.parentNode.remove();
    
    if (document.querySelectorAll("#exps .experience_container").length == 0)
    {
        let span = document.createElement("span");
        span.textContent = "Nu sunt experiente adaugate";
        document.querySelector("#exps").appendChild(span);
    }
}

function load_univs(){
    axios.get("/univerisities/get_all").then((response)=>{
        let {data} = response;
        let frag = document.createDocumentFragment();

        data.forEach((elem)=>{
            let node = document.createElement("div"), b = document.createElement("b"), span = document.createElement("span");
            node.dataset.id = elem.id;
            node.className = "univ";
            b.textContent = elem.univ_name;
            span.textContent = elem.dep_name;

            node.onclick = ()=>{
                try{
                    document.querySelector(".univ.active").classList.remove('active');
                }catch(e){

                }
                node.classList.toggle("active");
            }

            node.appendChild(b);
            node.appendChild(span);
            frag.appendChild(node);
        })

        document.querySelector(".univs").appendChild(frag);
    }).catch((err)=>{
        console.log(err);
    })
}

function search_univ(input){
    let search = input.value;

    Array.from(document.querySelectorAll(".univs .univ")).forEach((elem)=>{
        let text = elem.textContent;

        if (!text.includes(search) && !elem.classList.contains("active"))
        {
            elem.style.display = "none";
        }else{
            elem.style.display = "flex";
        }
    })
}