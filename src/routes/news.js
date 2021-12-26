const express = require('express')
const router = express.Router()
const News = require('../models/news')
const func = require('../functions/functions')

router.get('/', async (req, res) => {
    try {
        const news = await News.find() 
        res.json(news)
    } catch(err) {
        res.status(500).json({ message: err.message })
    }
})

/*router.get('/:id', getNews, (req, res) => {
    res.json(res.news)
})*/

router.get('/:theme', async(req, res) => {
    theme = req.params.theme
    try {
        const newsByTheme = await News.find({'theme': theme});
        res.json(newsByTheme)
    } catch(err) {
        res.status(500).json({ message: err.message })
    }
});

router.post('/', async (req, res) => {
    const news = new News({
        link: req.body.link,
        imageUrl: req.body.imageUrl,
        title: req.body.title,
        description: req.body.description,
        theme: req.body.theme
    })

    try {
        const newNews =  await news.save()
        res.status(201).json(newNews)

    } catch (err) {
        res.status(400).json({message: err.message})
    }
    
})

router.post("/casper", async (request, response) => {
    
    var intentName = request.body.queryResult.intent.displayName
    
    if (intentName == 'Esportes' || intentName == 'Politica' || 
    intentName == 'Entretenimento' || intentName == 'Famosos') {

        const newsByTheme = await News.find({ 'theme': intentName });
        const tenNews = newsByTheme.slice(0,10);

        if(tenNews.length == 0) {
            let res = func.noNews()
            response.json(res)
        } else {
            let res = func.carousel(tenNews)
            response.json(res)        
        }
    } 

    
});

router.patch('/:id', getNews, async (req, res) => {
    if (req.body.link != null) {
        res.news.link = req.body.link
    }
    if (req.body.imageUrl != null) {
        res.news.imageUrl = req.body.imageUrl
    }
    if (req.body.title != null) {
        res.news.title = req.body.title
    }
    if (req.body.description != null) {
        res.news.description = req.body.description
    }
    if (req.body.theme != null) {
        res.news.theme = req.body.theme
    }

    try {
        const updatedNews = await res.news.save()
        res.json(updatedNews)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
      
})

router.delete('/:id', getNews, async (req, res) => {
    try {
        await res.news.remove()
        res.json({ message: "Deleted News"})
        res.status(200)
    } catch (err) {
        res.status(500).json( { message: err.message })
    }
})

async function getNews(req, res, next) {
    let news
    try {
        news = await News.findById(req.params.id)
        if (news == null) {
            return res.status(404).json({ message: 'Cannot find News'})
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.news = news
    next()
}

module.exports = router