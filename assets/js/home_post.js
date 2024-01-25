{
    //method to submit the form data for new postusing ajax
    let createPost = function(){
        let newPostForm = $('#new-post-form');
        newPostForm.submit(function(event){
            event.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                    let newPost = newPostDom(data.data.post)
                    $('#post-list-container>ul').prepend(newPost)
                    deletePost($(' .delete-post-button', newPost));
                }, error: function(error){
                    console.log(error.responseText)
                }
            })
        })
    }
    // createPost();


    //method to create a post in DOM
    let newPostDom = function(post){
        return $(`<li id="post-${post._id}">
            <p>
                <small>
                    <a class="delete-post-button" id="delete-button" href="/posts/destroy/${post._id}">
                        <i class="fa-solid fa-trash"></i>
                    </a>
                    </small>
                    ${post.content}
                <br>
                <small>
                ${post.user.name}
                </small>
            </p>

            <div class="post-comments">
                <form action="/comments/create" method="POST">
                    <input type="text" name="content" placeholder="Type here to add comment..." required>
                    <input type="hidden" name="post" value= "${post._id }">
                    <input type="submit" value="Add comment">
                </form>


                <div class="post-comments-list">
                    <ul id="post-comment-${post._id}">
                        
                    </ul>
                </div>

            </div>

        </li>`)
    }



    //method to delete post from dom
    let deletePost = function( deleteLink){
        $(deleteLink).click( function(e){
            e.preventDefault();
            
            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                },error: function(error){
                    console.log(error.responseText);
                }
            })
        })
    }



    createPost();
}