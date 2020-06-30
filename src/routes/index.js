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

router.get('/wikidetail/:id', async (req, res) => {
    const { id } = req.params;
    const wiki = await Wiki.findById(id).populate('pages');
    res.render('wikidetail', {
        wiki
    });
});
router.post('/addpage', async (req, res) => {
    await addPageToWiki(req.body);
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

router.get('/pageedit/:id', async (req, res) => {
    const { id } = req.params;
    const page = await Page.findById(id);
    res.render('pageedit', {
        page
    });
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

async function addPageToWiki(page) {
    console.log(page);
    const newPage = new Page(page);
    const resultPage = await newPage.save();

    await Wiki.update(
        { _id: page.wikiId },
        { $push: {pages: resultPage._id } }
    );
}


//update page, updatea la page y en el  historial agrega ese estado, hace copia. 
//borrage page, borrar historial ? 
//esta bien si paso una id nomas de repo ? 







module.exports = router;