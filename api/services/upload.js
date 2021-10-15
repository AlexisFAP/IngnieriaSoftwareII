const express = require('express');
const router = express.Router()

router.post('/upload',(req, res) => {
    if(req.files){
        
        //console.log(req.files);
        let file = req.files.file
        let ruta = "D:/Users/Alexis/Documents/Web/IngSoftII/api/uploads/"
        file.mv(ruta+file.name, function (err) {
            if(err){
                res.send(err)
            }else{
                res.send('Archivo subido')
            }
        })
    }
})

module.exports = router