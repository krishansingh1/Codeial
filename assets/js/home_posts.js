{
  //method to submit the form data for new post using AJAX
  let createPost = function () {
    let newpostForm = $("#new-post-form");

    newpostForm.submit(function (e) {
      e.preventDefault();

      $.ajax({
        type: "post",
        url: "/posts/create",
        data: newpostForm.serialize(),
        success: function (data) {
          let newPost = newPostDom(data.data.post);
          $("#post-list-container>ul").prepend(newPost);
          deletePost($(" .delete-post-button", newPost));

          new PostComments(data.data.post._id);
          
          new Noty({
            theme: "relax",
            text: "Post published!",
            type: "success",
            layout: "topRight",
            timeout: 1500,
          }).show();
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
      <span id="delete_btn">
      <small>
        <a class="delete-post-button" href="/posts/destroy/${post._id}"
        ><i class="fa-solid fa-trash-can"></i
        ></a>
      </small>  
      </span>
      ${post.content}
      <br />
      <small id="style_name">
      ${post.user.name} 
      </small>

    <div class="post-comments">      
      <form id="post-${post._id}-comment-form" action="/comments/create" method="post">
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
        url: $(deleteLink).prop("href"),
        success: function (data) {
          $(`#post-${data.data.post_id}`).remove();
          new Noty({
            theme: "relax",
            text: "Post Deleted",
            type: "success",
            layout: "topRight",
            timeout: 1500,
          }).show();
        },
        error: function (error) {
          console.log(error.responseText);
        },
      });
    });
  };

  let convertPostsToAjax = function () {
    $("#posts-list-container>ul>li").each(function () {
      let self = $(this);
      let deleteButton = $(" .delete-post-button", self);
      deletePost(deleteButton);

      // get the post's id by splitting the id attribute
      let postId = self.prop("id").split("-")[1];
      new PostComments(postId);
    });
  };

  createPost();
  convertPostsToAjax();
}
