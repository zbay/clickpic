$("#newPicSubmit").on("click", function(){
    $("#newPicError").attr("style", "display:none");
    $("#newPicNonexistent").attr("style", "display:none");
    $("#newPicSuccess").attr("style", "display:none");
    console.log($("[name=title]").val());
    console.log($("[name=url]").val());
    
    if($("[name=title]").val().length > 0 && $("[name=url]").val().length > 0){
        if(supportedFormat){
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
        }
        else{
             $("#newPicNonexistent").attr("style", "display:block");
        }
    }
    else{
        $("#newPicError").attr("style", "display:block");
    }
});
function supportedFormat(){
    var theURL = $("[name=url]").val();
    console.log(theURL.slice(-4));
        if((theURL.slice(-4) == ".jpg") || (theURL.slice(-5) == ".jpeg") || (theURL.slice(-4) == ".jpe") || (theURL.slice(-4) == ".jif")
            || (theURL.slice(-4) == ".jfi") || (theURL.slice(-5) == ".jfif") || (theURL.slice(-4) == ".png") || (theURL.slice(-4) == ".gif")
            || (theURL.slice(-4) == ".bmp") || (theURL.slice(-4) == ".dib") || (theURL.slice(-4) == ".svg") || (theURL.slice(-5) == ".svgz")
            || (theURL.slice(-5) == ".apng") || (theURL.slice(-4) == ".ico") || (theURL.slice(-4) == ".jpe")){
                return true
        }
        else{
            return false;
        }
}