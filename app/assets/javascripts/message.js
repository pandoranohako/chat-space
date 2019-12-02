$(function(){ 
  function buildHTML(message){
  if (message.image) {
    var html = 
    `<div class="message" data-message-id=${message.id}>
    <div class="upper-info">
    <div class="upper-info__talker"> 
    ${message.talker}
    </div>
    <div class="upper-info__date">
      ${message.date}
      </div>
        </div>
      <div class="message__text">
      <p class="message__text__content">
      ${message.content}
      </p>
      </div>
      <img src=${message.image} >
    </div>`
  } else {
    var html =   
    `<div class="message" data-message-id=${message.id}>
    <div class="upper-info">
    <div class="upper-info__talker"> 
    ${message.talker}
    </div>
    <div class="upper-info__date">
      ${message.date}
      </div>
        </div>
      <div class="message__text">
      <p class="message__text__content">
      ${message.content}
      </p>
      </div>
    </div>`
  return html;
  };
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
});