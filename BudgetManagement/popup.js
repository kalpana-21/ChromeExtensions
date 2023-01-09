$(function(){

chrome.storage.sync.get(['limit','total'], function(budget) {
    $('#total').text(budget.total);
    $('#limit').text(budget.limit);
})

$('#spend').click(function(){

    chrome.storage.sync.get(['limit','total'],function(budget){

    var newTotal = 0;
    if(budget.total)
    {
         newTotal += parseInt(budget.total);
    }
    var amount = $('#amount').val();
       
    if(amount)
    {
         newTotal += parseInt(amount);
     }

    chrome.storage.sync.set({'total': newTotal},function(){
        if(amount && newTotal >= budget.limit){
            var notifLimit = {
                type: 'basic',
                iconUrl: 'money48.png',
                title: 'Limit Reached',
                message: 'You crossed the budget limit!'
            };
            chrome.notifications.create('limitNotification', notifLimit);
        }
    });
    $('#total').text(newTotal);
    $('#amount').val('');

    });

});

});