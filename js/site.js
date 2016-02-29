function Site() {
    // Send a toast notification.
    this.toast = function(message){
        Materialize.toast(message, 4000);
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
    // Adds content to a modal notification.
    // title: the title string
    // text: The html contents of the modal
    // buttons: a list of buttons
    // button[0]: button text
    // button[1]: button colour
    // button[2]: button click callback
    this.notify = function(title, text, buttons){
        $('#notify-modal .modal-footer').empty();
        for (var i in buttons) {
            var button = buttons[i];
            $('#notify-modal .modal-footer').append(
                $('<a/>')
                    .addClass('waves-effect')
                    .addClass('waves-light')
                    .addClass('btn')
                    .addClass(button[1])
                    .text(button[0])
                    .click(button[2])
            );
        }
        $('#notify-modal .modal-content').empty();
        $('#notify-modal .modal-content').append(
            $('<h3/>')
                .text(title),
            $('<p/>')
                .html(text)
        );
    }
    this.modal_open = false;
    this.notify_toggle = function(){
        if (this.modal_open){
            $('#notify-modal').closeModal();
            this.modal_open = false;
        }
        else {
            $('#notify-modal').openModal();
            this.modal_open = true;
        }
    }
}
var site = new Site()
