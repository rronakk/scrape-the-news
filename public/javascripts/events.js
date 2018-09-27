$(document).ready(function() {

    $("#street-scrape").on("click", function(event) {
        event.preventDefault();
        $.ajax({
            method: "get",
            url: "/scrape"
        }).then(function(data) {
            location.reload();
        });

    });
});