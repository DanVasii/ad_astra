var crumbs, content;

window.addEventListener("load", function(){
    crumbs = document.querySelectorAll(".crumbs .crumb");
    content = document.querySelectorAll(".content_container--tray .content");
    next(1);
})

function set_active(index){
    crumbs[index-2] !== undefined && crumbs[index-2].classList.remove("active");
    crumbs[index-1] !== undefined && crumbs[index-1].classList.add("active");

    document.querySelector(".content_container--tray").style.transform = `translateX(-${(index-1)*100}%)`;

}

function next(index){
    if (index == 4) {
       //upload
       upload();
    } else {
        set_active(index);
    }
}

function upload(){
    let data = {
        // Gather data from the input fields
        univ_name: document.querySelector("#univ_name").value,
        oras: document.querySelector("#oras").value,
        judet: document.querySelector("#judet").value,
        specializari: [],
        resurse: []
    };

    // Gather specializari
    document.querySelectorAll("#specializariFields input").forEach((input) => {
        data.specializari.push(input.value);
    });

    document.querySelectorAll("#res .resource").forEach((res) => {
        let inputs = res.querySelectorAll("input");

        data.resurse.push([inputs[0].value, inputs[1].value]);
    });

    // Send the request 
    axios.post("/univerisities/add", data)
        .then((response)=>{
            console.log(response);
            // Show success message
            set_active(4);

            setTimeout(()=>{
                window.location.href = "/";
            },1200);
        })
        .catch((err)=>{
            // Show error message
            set_active(5);
        });
}

function addSpecializareField() {
    let node = document.querySelector("#add_special").content.cloneNode(true);

    document.querySelector("#specializariFields").appendChild(node);
}


function add_res(){
    let node = document.querySelector("#res_node").content.cloneNode(true);

    document.querySelector("#res").appendChild(node);
}