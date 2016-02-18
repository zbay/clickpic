    var $container = jQuery('#masonry-grid');
    $container.masonry({
    columnWidth: 250,
    itemSelector: '.grid-item'
    });
    
    $(window).load(function() { 
    $("img").each(function(){ 
      var image = $(this); 
      if(image.context.naturalWidth == 0 || image.readyState == 'uninitialized'){  
         $(image).attr("src", "/static/img/broken-link.png").attr("alt", "Broken link. No image retrieved.");
      } 
     }); 
     });