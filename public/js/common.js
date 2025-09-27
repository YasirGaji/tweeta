$('#postTextarea').keyup((event) => {
  var textbox = $(event.target);
  var value = textbox.val().trim();

  var submitButton = $('#submitPostButton');

  if (submitButton.lenght == 0) return alert('No submit button found');

  if (value == '') {
    submitButton.prop('disabled', true);
    return;
  }

  submitButton.prop('disabled', false);
});

$('#submitPostButton').click(() => {
  var button = $(event.target);
  var textbox = $('#postTextarea');

  var data = {
    content: textbox.val(),
  };

  $.post('/api/posts', data, (postData, status, xhr) => {
    // if (xhr.status != 201) {
    //   alert("Could not post tweet");
    //   return;
    // }

    // location.reload();

    var html = createPostHtml(postData);
    $('.postsContainer').prepend(html);
    textbox.val('');
    button.prop('disabled', true);
  });
});

function createPostHtml(postData) {
  const postedBy = postData.postedBy;
  const displayName = `${postedBy.firstName} ${postedBy.lastName}`;
  const timestamp = postData.createdAt;
  const date = new Date(timestamp);
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return `
    <div class='post'>
      <div class='mainContentContainer'>
        <div class='userImageContainer'>
          <img src='${postedBy.profilePic}'>
        </div>

        <div class='postContentContainer'>
          <div class='header'>
            <a href='/profile/${postedBy.username}' class='displayName'>${displayName}</a>
            <span class='username'>@${postedBy.username}</span>
            <span class='date'>${formattedDate}</span>
          </div>

          <div class='postBody'>
            <span>${postData.content}</span>
          </div>

          <div class='postFooter'>
            <div class='postButtonContainer'>
                <button>
                  <i class='far fa-comment'></i>
                </button>
            </div>
            <div class='postButtonContainer'>
                <button>
                  <i class='fas fa-retweet'></i>
                </button>
            </div>
            <div class='postButtonContainer'>
                <button>
                  <i class='far fa-heart'></i>
                </button>
            </div>
            <div class='postButtonContainer'>
                <button>
                  <i class='fas fa-share'></i>
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
