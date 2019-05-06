//David Acevedo
//A01196678
//Lab 9

const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const {ListPosts} = require('./model');

//get request of all blog posts
router.get('/blog-posts', (req, res, next) => {

    let infoOfAllPosts = ListPosts.get();

    if (infoOfAllPosts) {
        res.status(200).json({
            message: 'Successfully sent the list of blog posts',
            status: 200,
            posts: infoOfAllPosts
        })
    } else {
        res.status(500).json({
            message: 'Internal server error.',
            status: 500
        }).send("Finish");
    }
});

//get by author
router.get('/blog-posts/:author', (req, res, next) => {

    let author = req.params.author

    if (!author) {
        res.status(406).json({
            message: 'No author specified',
            status: 406
        });
        next();
    }

    let postsByAuthor = ListPosts.getByAuthor(author);

    if (postsByAuthor.length === 0) {
        res.status(404).json({
            message: `Posts by ${author} not found`,
            status: 404
        });
        next();
    } else {
        res.status(200).json({
            message: `Posts by ${author} found`,
            posts: postsByAuthor
        });
        next();
    }
});

//post request
router.post('/blog-posts', (req, res, next) => {
    let requiredFields = ["title", "content", "author", "publishDate"];

    //Validate that we receive both of the params
    //Send error with status 406 "Missing fields"
    for (let i = 0; i < requiredFields.length; i++) {
        let currentField = requiredFields[i];

        if (!(currentField in req.body)) {
            res.status(406).json({
                message: `Missing field ${currentField} in body.`,
                status: 406
            });
            next();
        }
    }

    let objectToAdd = {
        id: uuid.v4(),
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        publishDate: req.body.publishDate
    }

    ListPosts.push(objectToAdd)

    res.status(201).json({
        message: "Post added",
        status: 201
    });
    next();
});

//delete request
router.delete('/blog-posts/:id', (req, res, next) => {
    
    if (!req.body.id) {
        res.status(406).json({
            message: 'Missing field id in body.',
            status: 406
        }).send("Finish");
        next();
    }
    
    
    if (!req.params.id) {
        res.status(406).json({
            message: 'Missing field id in params.',
            status: 406
        }).send("Finish");
        next();
    }

    if (req.params.id != req.body.id) {
        res.status(406).json({
            message: `ID '${req.body.id}' in body different than ID '${req.params.id}' in params.`,
            status: 406
        }).send("Finish");
        next();
    }

    let id = req.params.id
    if (ListPosts.deletePost(id)) {
        return res.status(200).json({
            message: 'Successfully deleted post',
            status: 204
        })
        next();
    } else {
        res.status(404).json({
            message: 'Post was not found',
            status: 404
        });
        next();
    }
});

//put request
router.put('/blog-posts/:id', (req, res) => {

    let id = req.params.id

    if (!(id)) {
        res.status(406).json({
            message: 'Missing field id in params.',
            status: 406
        });
        next();
    }

    if (req.body.length == 0) {
        res.status(404).json({
            message: 'Empty body.',
            status: 404
        }).send("Finish");
        next();
    }

    if (ListPosts.putPost(req.body,id)) {
        return res.status(200).json({
            message: `Valid keys from post with id: '${id}' were successfully updated.`,
            status: 204
        })
        next();
    } else {
        res.status(404).json({
            message: 'Post was not found',
            status: 404
        });
        next();
    }
});

module.exports = router;