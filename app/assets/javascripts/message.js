$(function(){ 
    function buildHTML(message){
    var content = message.content ? `${ message.content }` : "";
    
    var image  = message.image ? `<img p.class="message__text__image" 
    src="${ message.image }">` : "";
    
    var html = `<div class="message" data-message-id="${message.id}">
    <div class="message__upper-info">
      <div class="message__upper-info__talker"> 
        ${message.user_name}
      </div>

      <div class="message__upper-info__date">
      ${message.created_at}
      </div>
        </div>

      <div class="message__text">
      <p class="message__text__content">
      ${content}
      </p>
      </div>
        ${image}
    </div>`
  return html;
}
$('.new_message').on('submit', function(e){
  e.preventDefault();
  var formData = new FormData(this);
  var url = $(this).attr('action')
  $.ajax({
    url: url,
    type: "POST",
    data: formData,
    dataType: 'json',
    processData: false,
    contentType: false
   })
    .done(function(data){
      console.table(data)
      var html = buildHTML(data);
      $('.messages').append(html);	
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      $('form')[0].reset();
    })
    
    .fail(function(data){
      alert('error');
    })

    .always(function(data){
      $('.form__submit').prop('disabled', false);
    })
})
var reloadMessages = function() {
  if(window.location.href.match(/\/groups\/\d+\/messages/)){
    last_message_id = $('.message:last').data('message-id') ; 
    $.ajax({
      url: 'api/messages',
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages){ 
      var insertHTML='';
        messages.forEach(function(message){
          insertHTML = buildHTML(message);
          $('.messages').append(insertHTML);
          $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
        });
    })
    .fail(function(){
      alert("error")
    
    });
  }
};
setInterval(reloadMessages, 7000);
});


