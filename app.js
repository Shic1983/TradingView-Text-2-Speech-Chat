/*
---------------------------------------------
Text 2 Speech for the TradingView Trollbox.
Github page: https://github.com/ntom/TradingView-Text-2-Speech-Chat 
---------------------------------------------

Instructions:
Open chrome developer console (crt+shift+j)
Go to 'Console' tab
Paste in contents of this file

---------------------------------------------

Bugs:
Sometimes after alot of activity will crash the chrome window

---------------------------------------------

Improvements to be done: 
HTML5 Audio object instead of this crappy <embed>
Queuing system with some propagation.. maybe a kill the queue on a queue limit when chat is firing away.

---------------------------------------------
*/

var translateURL = "http://translate.google.com/translate_tts";

 
function play_sound(msg){
        $("#sound").remove();
        var sound = $("<embed id='sound' type='audio/mpeg' />");
        sound.attr('src', "https://translate.google.com/translate_tts?ie=UTF-8&tl=en&q="+encodeURIComponent(msg));
        sound.attr('loop', false);
        sound.attr('hidden', true);
        sound.attr('autostart', true);
        $('body').append(sound);
}

function mutationHandler (mutationRecords) {
    mutationRecords.forEach(function (mutation) {
        if (mutation.type == "childList"
            &&  typeof mutation.addedNodes == "object"
            &&  mutation.addedNodes.length
        ) {
            for (var i = mutation.addedNodes.length-1 ;  i >= 0;  i--) {
                var node = mutation.addedNodes[i];
                if (node.nodeType === 1) {
                    if (node.classList.contains ("ch-item")) {
                    	var el = $(node);
                        // process_chat_item(node, true);
                        var author = el.find('.ch-item-author a').text();
                        var txt = el.find('.ch-item-text').text();
                        var msg = author+' said: '+txt;
                        play_sound(msg);
                    } 
                }
            }
        }
    } );
}

var MutationObserver = window.MutationObserver;
var myObserver       = new MutationObserver (mutationHandler);

var obsConfig        = {
    childList: true, attributes: true,
    subtree: true,   attributeFilter: ['class']
};
myObserver.observe (document, obsConfig);
