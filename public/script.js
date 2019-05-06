function displayResults(data) {
    $('.blogs').empty();
    console.log(data)
    for (let i = 0; i < data.posts.length; i++) {
        $('.blogs').append(`<li> ID: ${data.posts[i].id} <br> Title: ${data.posts[i].title} <p> ${data.posts[i].content} </p> Author ${data.posts[i].author} <br> Publish Date: ${data.posts[i].publishDate} <br> </li>`);
    }
}


function fetchBlogs() {
    let url = '/blog-posts/';

    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw Error("Something went wrong.");
            }
        })
        .then(responseJSON => displayResults(responseJSON))
        .catch(err => {
            console.log(err);
        });

}

function createBlog(bTitle, bAuthor, bContent) {
    let url = '/post/';
    let settings = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: bTitle,
            content: bContent,
            author: bAuthor
        })
    };

    fetch(url, settings)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw Error("Something went wrong.");
            }
        })
        .then(responseJSON => {
            console.log(responseJSON);
            alert("Blog added")
        })
        .catch(err => {
            console.log(err);
        });
}

function updateBlog(bTitle, bAuthor, bContent, bID) {
    let url = '/update/' + blogID;
    let settings = {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: blogID,
            post: {
                id: bID,
                title: bTitle,
                author: bAuthor,
                content: bContent
            }
        })
    };

    fetch(url, settings)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw Error("Something went wrong.");
            }
        })
        .then(responseJSON => {
            console.log(responseJSON);
            alert("Blog updated")
        })
        .catch(err => {
            console.log(err);
        });
}

function deleteBlog(bID) {
    let url = '/delete/' + blogID;
    let settings = {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: bID
        })
    };

    console.log(settings)

    fetch(url, settings)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw Error("Something went wrong.");
            }
        })
        .then(responseJSON => {
            console.log(responseJSON);
            alert("Blog deleted")
        })
        .catch(err => {
            console.log(err);
        });
}

function watchForm() {
    $('.get').on('submit', function(e) {
        e.preventDefault();
        fetchBlogs();
    });

    $('.create').on('submit', function(e) {
        e.preventDefault();
        let title = $('#bTitle').val();
        let author = $('#bAuthor').val();
        let content = $('#bContent').val();
        createBlog(title, author, content);
    });

    $('.update').on('submit', function(e) {
        e.preventDefault();
        let title = $('#ubTitle').val();
        let author = $('#ubAuthor').val();
        let content = $('#ubContent').val();
        let id = $('#ublogID').val();
        updateBlog(title, author, content, id);
    });

    $('.delete').on('submit', function(e) {
        e.preventDefault();
        let id = $('#bID').val();
        deleteBlog(id);
    });
}

$(watchForm);