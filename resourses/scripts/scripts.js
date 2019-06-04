$(document).ready(() => {
  var a = 0;
  var socet = io('https://chat222222.herokuapp.com');
  // socet.on('Users',(users) =>{
  // $('.header').html(`${users}`);
  // });

  socet.on('connect', function () {
    socet.on('users_count', function (users) {
      $(".header .online").html(`
Users online  ${users}
`);

    })

    $.post('/Chat/getName', (name) => {
      console.log(name);

     
    });
  })
  socet.on('send_message', (send) => {
    $('#container #messages').append(`<div class=" friends alert alert-success" role="alert">
${send.name}  :  ${send.message}
</div>`);
  


  });

  $('#send').click(() => {

    var text = $("#text").val();
    $.post('/Chat/getName', function (name) {
      $.post('/Chat/WriteMessages', { message: text, name: name }, (res) => {
        console.log(res);
      })
    })

    $('#container #messages').append(`<div class="you alert alert-primary" role="alert">
Я  :  ${text};
  </div>`)
    var cont = document.querySelector('#container');
    console.log(cont.scrollHeight);

    document.querySelector('#container').scrollTo(0, cont.scrollHeight);
    $("#text").val('');
    $.post('/Chat/getName', (name) => {

      socet.emit('get_message', { message: text, name: name });
    });




  });


})
