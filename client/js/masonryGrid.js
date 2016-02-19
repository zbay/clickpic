var $grid = $('.grid').masonry({
  itemSelector: '.grid-item',
  percentPosition: true,
  columnWidth: '.grid-sizer'
});
// after each image loads
$grid.imagesLoaded().progress( function() {
  $grid.masonry();
});   

$(document).ready(function() {
    $("img").error(function(){
        $(this).remove();
    });
});