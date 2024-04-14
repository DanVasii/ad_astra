const express = require("express");
const app = express();
const path = require("path");
const mustacheExpress = require("mustache-express");
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const axios = require("axios");


// beni added this to, in case it doesn't work:)))
const multer = require('multer');
const secretKey = 'yourSecretKey';

//routers
const univ_router = require("./routers/universities");

//managers  
const account_manager = require("./managers/account");


/// Beni added this from 14 to 27, in case it doesn't work:)))
const upload_resource_manager = require("./managers/upload_resource");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '/uploads/');
    },
    filename: function(req, file, cb) {
        const uniqueName = Date.now() + '-' + file.originalname;
        cb(null, uniqueName);
    }
});

const upload = multer({ storage: storage });



app.engine('html', mustacheExpress());
app.set('views', path.join(__dirname, '/pages'));


app.use("/assets",express.static(path.join(__dirname, "assets")));

app.use(express.json());
app.use(cookieParser());

app.use("/univerisities", univ_router);

app.get("/", (req, res)=>{
    //check for auth cookie 
    const token = req.cookies.auth;
    console.log(token);
    if (!token) {
        res.render("index.html",{login: false});
        return;
    }

    // Verify the JWT
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            res.render("index.html",{login: false});
            return;
        }
        res.render("index.html",{login: true});

    });
})

app.get("/dashboard",verifyToken, (req, res)=>{
    console.log(req.user);
    res.render("dashboard.html");
})

app.get("/register", (req, res)=>{
    res.render("register.html");
})

app.post("/register",(req, res)=>{
    //let {nume, prenume, birth, judet, oras, phone, email, about, experiences, highschool, univ_id} = req.body;

    account_manager.register(req.body).then((response)=>{
        console.log(response);
        res.sendStatus(200);
    }).catch((err)=>{
        res.sendStatus(500);
    })
    
})


app.post("/login",(req, res)=>{
    let {email, pass} = req.body;

    account_manager.login(email, pass).then((user_id)=>{

        const token = jwt.sign({ user_id: user_id }, secretKey);
        res.cookie('auth', token, { httpOnly: true });
        res.sendStatus(200);
    
    }).catch((err)=>{
        res.sendStatus(500);
    })

})



/// in case it doesn't work
app.post('/upload_resource', verifyToken ,upload.any(), (req, res)=>{
    upload(req, res, function(err) {
        if (err) {
            return res.status(400).json({ message: "File upload failed", error: err });
        }
        
        const resource_object = {
            content: req.body.content, // Assuming content is sent in the request body
        };

        uploadSharedResource(resource_object, req.user.user_id, req.files)
            .then(() => {
                res.status(200).json({ message: "Resource shared successfully" });
            })
            .catch(() => {
                res.status(500).json({ message: "Error sharing resource" });
            });
    });
});
///

app.get("/faculty", (req, res)=>{
    res.render("faculty_register.html");
})

app.get("/login", (req, res)=>{
    res.render("login.html");
})

// app.get("/credentials", (req, res)=>{
//     res.render("change_credentials.html");
// })

app.get("/upload_res", verifyToken, (req, res)=>{
    res.render("upload_resource.html");
})

// app.get("/form_types", (req, res)=>{
//     res.render("form_types.html");
// })

app.get("/postari",verifyToken, (req, res) => {
    res.render("posts.html");
})

app.get("/grupa_mea",verifyToken, (req, res) => {

    account_manager.get_grupa(req.user.user_id).then(()=>{
        res.render("grupa_mea.html");
    }).catch(()=>{
        res.render("group.html");
    })
})

app.get("/recomandari", (req, res) => {
    res.render("recomandari.html");
})


app.post("/join_grupa",verifyToken, (req, res)=>{
    account_manager.join_grupa(req.user.user_id).then(()=>{
        res.sendStatus(200);
    }).catch(()=>{
        res.sendStatus(500);
    })
})

function verifyToken(req, res, next) {
    // Check if jwt cookie exists
    const token = req.cookies.auth;
    console.log(token);
    if (!token) {
        return res.sendStatus(401);
    }

    // Verify the JWT
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.sendStatus(401);
        }
        req.user = decoded;
        next();
    });
}

app.get("/log_out", (req, res)=>{
    res.clearCookie("auth");
    res.redirect("/");
})

app.post("/get_recomandari", verifyToken, (req, res)=>{
    axios.get("http://192.168.35.151:5000/classify?id="+req.user.user_id).then((response)=>{
        var arr = [];
        response.data.forEach((elem)=>{
            arr.push(elem.id);  
        })
        account_manager.get_users(arr).then((response)=>{
            res.send(response);
        }).catch((err)=>{
            res.sendStatus(500);
        })
    }).catch((err)=>{
        res.sendStatus(500);
    })
   
})


app.listen(3000, function(){
    console.log("Listening")
})