$(".caret" ).click(function() {
    if ($(this).css("transform") == 'none'){
        $(this).css({
            "transform": "rotate(180deg)"
        });
    } else {
        $(this).css({
            "transform": "",
        });
    }
});