$(document).ready(function() {

  $('.ui.dropdown')
    .dropdown();

  $('#openMenu').click(function() {
    $('.ui.sidebar').sidebar('toggle');
  })

  $('.autumn')
    .transition('fade up')
    // this is now fade up in
    .transition('fade up')


  // using context
  $(' .ui.sidebar')
    .sidebar({
      context: $(' .bottom.segment')
    })
    .sidebar('attach events', ' .menu .item');

});
