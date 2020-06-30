const express = require('express');
const router = express.Router();
const Wiki = require('../models/wiki');
const Page = require('../models/page');
const PageHistory = require('../models/pagehistory');

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

router.get('/pageedit/:id', async (req, res) => {
    const { id } = req.params;
    const page = await Page.findById(id);
    res.render('pageedit', {
        page
    });
});
router.post('/pageedit/:id', async (req, res) => {
    const { id } = req.params;
    await Page.update({ _id: id }, req.body);
    const resultPage = await Page.findById(id);

    await PageHistory.update(
        { pageId: id },
        {
            $push: {
                history: {
                    title: resultPage.title,
                    creatorUsername: resultPage.creatorUsername,
                    updateDate: new Date(),
                    content: resultPage.content,
                    optionalMessage: resultPage.optionalMessage
                }
            }
        }
    );
    res.redirect('/');
});

router.get('/pagehistory/:id', async (req, res) => {
    const { id } = req.params;
    const history = await PageHistory.find({ pageId: id }).populate('page');
    res.render('pagehistory', {
        history
    });
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

async function addPageToWiki(page) {
    console.log(page);
    page.updateDate = new Date();
    const newPage = new Page(page);
    const resultPage = await newPage.save();

    await Wiki.update(
        { _id: page.wikiId },
        { $push: { pages: resultPage._id } }
    );

    const newHistory = new PageHistory({
        pageId: resultPage._id,
        page: resultPage._id,
        history: [{
            title: resultPage.title,
            creatorUsername: resultPage.creatorUsername,
            updateDate: new Date(),
            content: resultPage.content,
            optionalMessage: 'Created'
        }]
    });
    await newHistory.save();
}

module.exports = router;