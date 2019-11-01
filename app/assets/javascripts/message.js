$(function() {
  function buildHTML(message) {
    var html =  `
                  <div class="message" data-message-id='${message.id}'>
                    <div class="upper-message">
                      <div class="upper-message__user-name">
                        ${message.user_name}
                      </div>
                      <div class="upper-message__date">
                        ${message.data}
                      </div>
                    </div>
                    <div class="lower-message">
                      <p class="lower-message__content">
                        ${message.content}
                      </p>
                      ${image}
                    </div>
                  </div>
                `
    return html;
  }

  var reloadMessages = function() {
    last_message_id = $('.message:last').data('messade-id');
    $.ajax({
      url: 'api/messages',
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      var insertHTML = '';
      messages.forEach(function (message) {
        insertHTML = buildHTML(message);
        $('.messages').append(insertHTML);
      })
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる

      //メッセージが入ったHTMLを取得

      //メッセージを追加

    })
    .fail(function() {
      alert('自動更新に失敗しました');
    });
  };
  setInterval(reloadMessages, 5000);
});
