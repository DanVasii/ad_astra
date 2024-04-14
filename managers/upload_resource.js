const pool = require("./mysql");
// const multer = require('multer');
const path = require('path');

// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, '/uploads/');
//     },
//     filename: function(req, file, cb) {
//         const uniqueName = Date.now() + '-' + file.originalname;
//         cb(null, uniqueName);
//     }
// });

// const upload = multer({ storage: storage }).array('files', 5);

function uploadSharedResource(resource_object, userId, files) {

    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject();
            } else {
                const { content } = resource_object;
                console.log(content);
                console.log(userId);
                connection.query("INSERT INTO shared_resources (user_id, content) VALUES (?, ?)", [userId, content], (error, result, fields) => {
                    if (error) {
                        connection.release();
                        reject();
                    } else {
                        const resourceId = result.insertId;
                        const fileNames = files.map(file => file.filename);

                        connection.query("INSERT INTO resource_files (resource_id, file_name) VALUES (?, ?)", [fileNames.map(fileName => [sharedResourceId, fileName])], (error, results, fields) => {
                            if (error) {
                                connection.release();
                                reject();
                            } else {
                                connection.release();
                                resolve();
                            }
                        });
                    }
                });
            }
        });
    });
}

// function uploadResourceManager(req, res) {
//     upload(req, res, function(err) {
//         if (err) {
//             return res.status(400).json({ message: "File upload failed", error: err });
//         }

//         const resource_object = {
//             userId: req.body.userId, // Assuming userId is sent in the request body
//             content: req.body.content, // Assuming content is sent in the request body
//             files: req.files
//         };

//         uploadSharedResource(resource_object)
//             .then(() => {
//                 res.status(200).json({ message: "Resource shared successfully" });
//             })
//             .catch(() => {
//                 res.status(500).json({ message: "Error sharing resource" });
//             });
//     });
// }

module.exports = {
    uploadSharedResource
}
