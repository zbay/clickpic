var $grid = $('.grid').masonry({
  itemSelector: '.grid-item',
  percentPosition: true,
  columnWidth: '.grid-sizer'
});
// after each image loads
$grid.imagesLoaded().progress( function() {
  $grid.masonry();
});   

    $(window).load(function() { 
        
    $("img").each(function(){ 
      var image = $(this); 
      if(image.context.naturalWidth == 0 || image.readyState == 'uninitialized'){  
         $(image).attr("src", "/static/img/broken-link.png").attr("alt", "Broken link. No image retrieved.");
      } 
     }); 
     });