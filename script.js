$(function(){
    var userInput = $('#userinput');
    $('.user_interation #sendButton').on('click', function(e){
        e.preventDefault();
       sendRequest(); 
    });

    function sendRequest(){
        $('.result').attr({
            "style": "display: block;"
        });

        var id = $('#id');
        var username = $('#login');
        var bio = $('#bio');
        var image = $('#myimage');
        var url = $('#url');

        $.ajax({
            type: 'GET',
            url: `https://api.github.com/users/${userInput.val()}`,
            success: function(data){
                $('.error_message').attr({
                    "style": 'display: none;'
                });
                id.html(data.id);
                username.html(data.login);
                bio.html(data.bio ? data.bio : "The user has no bio description.");
                image.attr("src", data.avatar_url);
                url.html(`<a href="${data.html_url}" target="_blank">${data.html_url}</a>`);
            },
            error: function(e){
                console.log("Algo deu errado na requisição:\n", e.responseJSON.message);
                
                $('.result').attr({
                    "style": "display: none;"
                });
                $('.error_message').attr({
                    "style": 'display: flex;'
                });
            }
        });

        $('.user_interation input[type=text]').val("");
    };
});