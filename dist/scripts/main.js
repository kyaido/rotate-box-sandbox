



// ----------------------------------------------------------------------------
// init
// ----------------------------------------------------------------------------
$(function () {
  
  $('.js-section').each(function() {
    var target  = $(this).find('.js-sectionTarget');
    var trigger = $(this).find('.js-sectionTrigger');
    // event
    trigger.on('click', function(e) {
      e.preventDefault();
      target.toggleClass('is-rotated');
    }); 
  });
  
});