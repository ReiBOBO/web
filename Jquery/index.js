$("h1").css("color", "yellow");
$("h1").css("font-size", "12rem");
$("h1").on("click", function(event){
    $("h1").css("color", "purple");
});
$(document).keydown(function(event){
    $("body h1").text(event.key);

})

$("button").on("click", function(){
    $("h1").slideUp().slideDown().animate({
        opacity : 0.5
    });
})
