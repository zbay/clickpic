$("#newPicSubmit").on("click", function(){
    $("#newPicError").attr("style", "display:none");
    $("#newPicNonexistent").attr("style", "display:none");
    $("#newPicSuccess").attr("style", "display:none");
    console.log($("[name=title]").val());
    console.log($("[name=url]").val());
    
    if($("[name=title]").val().length > 0 && $("[name=url]").val().length > 0){
        $.ajax({
            url: $("[name=url]").val(),
            method: "HEAD",
            success: function(){
                $.ajax({
                url: "/newPic",
                method: "POST",
                data: {"title": $("[name=title]").val(), "url": $("[name=url]").val()},
                success: function(){
                    $("[name=title]").val("");
                    $("[name=url]").val("");
                    $("#newPicSuccess").attr("style", "display:block");
                }
                });        
            },
            error: function(){
                console.log("That link doesn't exists!");
                $("#newPicNonexistent").attr("style", "display:block;");
            }
        });
    }
    else{
        $("#newPicError").attr("style", "display:block");
    }
});