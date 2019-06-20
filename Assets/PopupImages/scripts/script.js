$(function(){
    $(".displayed-image").click(function(){
        $("#myModal").css("display", "block");
        let displayImgSrc = $(this).attr("src");
        $("#modal-image").attr("src", displayImgSrc);
    });

    $(".close").click(function(){
        $("#myModal").css("display", "none");
    });
});