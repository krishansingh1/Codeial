{
  //method to submit the form data for new post using AJAX
  let createPost = function () {
    let newpostForm = $("#new-post-form");

    newpostForm.submit(function (e) {
      e.preventDefault();

      $.ajax({
        type: "Post",
        url: "/posts/create",
        data: newpostForm.serialize(),
        success: function (data) {
          let newPost = newPostDom(data.data.post);
          $("#post-list-container>ul").prepend(newPost);
          deletePost($(" .delete-post-button", newPost));
        },
        error: function (error) {
          console.log(error.responseText);
        },
      });
    });
  };

  //method to create a post in the DOM

  let newPostDom = function (post) {
    return $(`
    <li id="post-${post._id}">
    ${post.content}
    <br />
    <small> ${post.user.name} </small>
    
    <span id="delete_btn">
      <a class="delete-post-button" href="/posts/destroy/${post._id}"
        ><i class="fa-solid fa-trash-can"></i
      ></a>
    </span>

    <div class="post-comments">
      
      <form action="/comments/create" id="new-comment-form" method="post">
        <input
          type="text"
          name="content"
          placeholder="Type here to comment..."
          required
        />
        <input type="hidden" name="post" value="${post._id}" />
        <input type="submit" value="Add Comment" />
      </form>
    
      <div class="comment-list">
        <ul id="post-comment-${post._id}">
        
        </ul>
      </div>
    </div>
  </li>
  `);
  };

  //method to delete the post from the DOM
  let deletePost = function (deleteLink) {
    $(deleteLink).click(function (e) {
      e.preventDefault();

      $.ajax({
        type: "get",
        url: $(dataLink).prop("href"),
        success: function (data) {
          $(`#post-${data.data.post._id}`).remove();
        },
        error: function (error) {
          console.log(error.responseText);
        },
      });
    });
  };

  createPost();
}
