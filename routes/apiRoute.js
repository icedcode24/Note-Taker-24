const router = require('express').Router();
const fs = require('fs')
router.get('/notes', (req, res)=>{
 let results = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'))
 res.json(results)
})
router.post('/notes', (req, res)=>{
    
})
router.delete('/notes', (req, res)=>{
    
})
module.exports = router
