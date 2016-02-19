$("img").on('error', function () {
     $(this).attr("src", "/static/img/broken-link.png");                                              
});

var $grid = $('.grid').masonry({
  itemSelector: '.grid-item',
  percentPosition: true,
  columnWidth: '.grid-sizer'
});
// after each image loads
$grid.imagesLoaded().progress( function() {
  $grid.masonry();
});   