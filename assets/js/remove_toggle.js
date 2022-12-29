class ToggleRemove {
    constructor(ele) {
        this.friends = ele
        this.toggler = $(this.friends)[0].lastElementChild.children
        console.log('2323', this.toggler)
        this.add(this.friends)
    }

    add(friends) {
        $(this.toggler).click(function (e) {
            e.preventDefault();
            let self = this;
            $.ajax({
                type: 'post',
                url: $(self).attr('href'),
                success: function (data) {
                    friends.remove();
                    let text = 'Friend removed ';
                    new Noty({
                        theme: 'semanticui',
                        text: text,
                        type: 'error',
                        timeout: 400,
                        layout: 'topRight'
                    }).show();
                    let otherUser = data.data.otherUser
                    $('#totalusers').prepend($(`<div class="users" id="user-${otherUser._id}">
                    <div id="users-img-box">
                        <div id="users-img">
                            <img src="${otherUser.avatar}"  alt="">
                        </div>
                        <p><a href="/home/profile/${otherUser._id}">${otherUser.first}  ${otherUser.last}</a></p>
                    </div>
                    <div id="add-box">
                        <a class="toggle-add"  href="#">
                            <span>Add</span>
                        </a>
                    </div>
                </div>
                `))
                }
                ,
                error(err) {
                    console.log('err:::', err);
                }
            });
        });
    }

}