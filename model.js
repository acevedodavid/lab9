//David Acevedo
//A01196678
//Lab 9

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var postsSchema = new mongoose.Schema({
    id: {type: String, required: true, unique: true},
    title: {type: String, required: true},
    content: {type: String, required: true},
    author: {type: String, required: true},
    publishDate: {type: String, required: true}
});

let Posts = mongoose.model('Posts', postsSchema);


const ListPosts = {
	get : function() {
		return Posts.find()
        .then(posts => {
                return posts;
            })
            .catch(err => {
                throw new Error(err);
            });
	},
    push : function(newPost) {
        return Posts.create(newPost)
			.then(post => {
				return post;
			})
			.catch(err => {
				 throw new Error(err);
			});
    },
    getByAuthor : function(author) {
        return Posts.find({author: author})
            .then(post => {
                return post;
            })
            .catch(err => {
                throw new Error(err);
            });
    },
    deletePost : function(id) {
        return Posts.findOneAndRemove({id: id})
            .then(post => {
                return post;
            })
            .catch(err => {
                throw new Error(err);
            });
    },
    putPost : function(id,body) {
        return Posts.findByOneAndUpdate({id: id}, {$set: body})
            .then(sport => {
                return sport;
            })
            .catch(err => {
                throw new Error(err);
            }); 
    }
}

module.exports = {ListPosts};