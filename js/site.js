function Site() {
    // Send a toast notification.
    this.toast = function(message){
        var toast = $('#toast')[0];
        toast.text = message;
        toast.show();
    }
    // Make a call to the api.
    this.api = function(action, data, callback){
        var baseURL = "";
        // var baseURL = "http://mwtn.uk/git/coder8/site/";
        $.post(
            baseURL + "api.py/" + action,
            data,
            callback
        );
    }
    // Turns an element filled with markdown into HTML
    this.markdown = function(id){
        var md = new showdown.Converter();
        var text = $(id).text();
        $(id).html(md.makeHtml(text));
    }
    this.route = function(path){
        document.querySelector('app-router').go(path);
    }
    this.userAuthed = function(){
        // this is not totally secure, but it's impossible to make authenitcated
        // requests without a valid session token
        if ($.cookie('session') == undefined){
            return false;
        }
        else {
            return true;
        }
    }
    this.notify = function(title, text, buttons){
        $('#notification').empty();
        var buttonDiv = $('<div/>')
            .attr('id', 'buttons')
        ;
        for (var i in buttons) {
            var button = buttons[i];
            buttonDiv.append(
                $('<a/>')
                    .addClass('waves-effect')
                    .addClass('waves-light')
                    .addClass('btn')
                    .addClass(button[1])
                    .text(button[0])
                    .click(button[2])
            );
        }
        $('#notification').append(
            $('<h2/>')
                .text(title),
            $('<p/>')
                .text(text),
            buttonDiv
        );
    }
    this.notify_toggle = function(){
        $('#notification')[0].toggle();
    }
    this.navbar_mode = function(mode){
        $('#nav-mobile').empty();
        if (mode == "unauthed"){
            $('#nav-mobile').append(
                $('<li/>')
                    .attr('id', 'register-button')
                    .text("Register")
                    .click(
                        function() {
                            site.route('/register');
                        }
                    )
            );
            var w = $('#register-button').width() + 21;
            $('#register-button').css({"width": w});
            $('#nav-mobile').append(
                $('<li/>')
                    .attr('id', 'login-button')
                    .text("Login")
                    .click(
                        function() {
                            site.route('/login');
                        }
                    )
            );
            var w = $('#login-button').width() + 21;
            $('#login-button').css({"width": w});
        }
        else if (mode = 'authed') {
            // add welcome message
            $('#nav-mobile').append(
                $('<li/>')
                    .attr('id', 'user-div')
                    .text(
                        "Hello, " + $.cookie('userName')
                    )
            );
            // fix padding (Because we don't know how long the username is)
            var w = $('#user-div').width() + 21;
            $('#user-div').css({"width": w});
            // on mouse over, show logout button
            $('#user-div')
              .mouseover(function(){
                $('#user-div')
                  .text("Logout")
                  .click(function(){
                    $.removeCookie('session');
                    $.removeCookie('userID');
                    $.removeCookie('userName');
                    $('#user-div').empty();
                    $('#user-div').off();
                    site.route('/');
                  })
                ;
              })
              .mouseout(function(){
                $('#user-div')
                  .text("Hello, " + $.cookie('userName'))
                  .off('click')
                ;
              })
            ;
            // Show 'my account' button
            $('#nav-mobile').append(
                $('<li/>')
                    .attr('id', 'my-account')
                    .text(
                        "My Account"
                    )
                    .css('padding-right', '15px')
                    .click(function(){
                        site.route('/my-account');
                    })
            );
        }
    }
}
var site = new Site()
