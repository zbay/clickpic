$(".deleteButton").on("click", function(){
    var thisButton = $(this);
    $("#deletePicSuccess").attr("style", "display:none");
        $.ajax({
        url: "/deletePic",
        method: "POST",
        data: {"deleteID": thisButton.val()},
        success: function(){
            thisButton.parent().remove();
            $("#deletePicSuccess").attr("style", "display:block");
        }
    });   
});