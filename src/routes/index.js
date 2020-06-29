const express = require('express');
const router = express.Router();
const Wiki = require('../models/wiki');

router.get('/', async (req, res) => {
    const wikis = await Wiki.find().populate("pages");  
    res.render('index', {
        wikis
    });
})

router.post('/add' , async (req, res) => {
    const wiki = new Wiki(req.body);
    await wiki.save();
    res.redirect('/');
    console.log(req.body)
});

router.get('/delete/:id' , async (req, res) => {
    const { id } = req.params;
    await Wiki.remove({_id: id});
    res.redirect('/');
    console.log(req.params)
});

router.get('/turn/:id', async (req, res) => {
    const { id } = req.params;
    const wiki = await Wiki.findById(id);
    wiki.status = !wiki.status;
    await wiki.save();
    res.redirect('/');    
});

router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const wiki = await Wiki.findById(id);
    res.render('edit', {
        wiki
    }); 
});
router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    await Wiki.update({_id: id }, req.body);
    res.redirect('/');    
    
});


module.exports = router;