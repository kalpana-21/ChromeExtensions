var contextMenuItem = {
    "id": "spendMoney",
    "title": "SpendMoney",
    "contexts": ["selection"]
};
chrome.contextMenus.create(contextMenuItem);

//function to check an integer
function isInt(value) {
    return !isNaN(value) && 
           parseInt(Number(value)) == value && 
           !isNaN(parseInt(value, 10));
  }

//To handle when the amount on any webpage has been selected on clicking the contextmenu
chrome.contextMenus.onClicked.addListener(function(clickData){

    //If the item that has been selected in contextMenu is spendMoney and text has been selected
    if(clickData.menuItemId == "spendMoney" && clickData.selectionText){
        //if the text selected is an integer
        if(isInt(clickData.selectionText)){
            chrome.storage.sync.get(['limit','total'], function(budget){

                var newTotal = 0;
                if(budget.total){
                    newTotal += parseInt(budget.total);
                }

                newTotal += parseInt(clickData.selectionText);
                chrome.storage.sync.set({'total':newTotal}, function(){

                    if(newTotal >= budget.limit){
                        var notifLimit = {
                            type: 'basic',
                            iconUrl: 'money48.png',
                            title: 'Limit Reached',
                            message: 'You crossed the budget limit!'
                        };
                        chrome.notifications.create('limitNotification', notifLimit);
                    }
                });

            });
        }

    }

});

//for displaying the total amount as a badge
chrome.storage.onChanged.addListener(function(changes, storageName){
    chrome.action.setBadgeText({"text": changes.total.newValue.toString()});
});