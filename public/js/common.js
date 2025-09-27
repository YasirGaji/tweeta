$("#postTextarea").keyup(event => {
  var textbox = $(event.target)
  var value = textbox.val().trim()


  var submitButton = $('#submitPostButton');

  if (submitButton.lenght == 0) return alert("No submit button found");

  if (value == "") {
    submitButton.prop('disabled', true);
    return;
  }

  submitButton.prop('disabled', false);
})

$("#submitPostButton").click(() => {
  var button = $(event.target);
  var textbox = $("#postTextarea");

  var data = {
    content: textbox.val()
  }

  $.post("/api/posts", data, (postData, status, xhr) => {

    // if (xhr.status != 201) {
    //   alert("Could not post tweet");
    //   return;
    // }

    // location.reload();

    var html = createPostHtml(postData);
    $('.postsContainer').prepend(html);
    textbox.val("");
    button.prop('disabled', true);
  })
})

function createPostHtml(postData) {
  return postData.content
}
