$(function(){

    chrome.storage.sync.get('limit', function(budget){
        $('#limit').val(budget.limit);
    })

    $('#saveLimit').click(function(){
        var limit = $('#limit').val();
        if(limit){
             chrome.storage.sync.set({'limit':limit},function(){
                close();
             });
            }
    });

    $('#resetTotal').click(function(){
        chrome.storage.sync.set({'total':0}, function(){
            var totalNotif = {
                type: 'basic',
                iconUrl: 'money48.png',
                title: 'Total has been reset',
                message: 'The total has been reset to zero'

            };
            chrome.notifications.create('totalNotification',totalNotif);
        });
    });

});