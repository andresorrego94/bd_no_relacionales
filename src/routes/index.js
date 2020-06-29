const express = require('express');
const router = express.Router();
const Wiki = require('../models/wiki');
const Page = require('../models/page');
const PageHistory = require('../models/pagehistory');

//https://vegibit.com/mongoose-relationships-tutorial/

router.get('/', async (req, res) => {
    const wikis = await Wiki.find().populate("wiki");
    res.render('index', {
        wikis
    });
})

router.post('/add', async (req, res) => {
    const wiki = new Wiki(req.body);
    await createWiki(req.body);
    res.redirect('/');
    console.log(req.body)
});

router.post('/addpage', async (req, res) => {
    await addPageToWiki('5ef97530f829760ce972526c', req.body);
    res.redirect('/');
    console.log(req.body)
});


router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await Wiki.remove({ _id: id });
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
    await Wiki.update({ _id: id }, req.body);
    res.redirect('/');

});

//FUNCTIONS
async function createWiki(repositoryId) {
    const newWiki = new Wiki(repositoryId);
    const result = await newWiki.save();
    console.log(result);
}

async function addPageToWiki(wikiId, page) {
    const newPage = new Page(page);
    const resultPage = await newPage.save();
    console.log('el id de la pagina insertada es ' + resultPage._id);

    //const wiki = await Wiki.findById(wikiId);
    await Wiki.update(
        { _id: wikiId },
        { $push: {wiki: resultPage._id } }
    );
}




module.exports = router;