var panelWindowId = 0;

chrome.windows.onRemoved.addListener(function(r) {
 if (panelWindowId==r) {
      panelWindowId = 0;
    }
})


// chrome.storage.local.get("notificationsUpdate19", function(data) {
//     if(data.notificationsUpdate19!="done") {

//           chrome.notifications.onClicked.addListener(function(notificationId, byUser) {
//               chrome.tabs.create({url: "panel.html"});
//           });



//             function createUpdateNotifications(progress, time, text) {
//                notificationTimer = chrome.extension.getBackgroundPage().setTimeout(function(){
                        
//                      var opt = {
//                       type: "progress",
//                       title: "Sticky Notes - Just popped up!",
//                       message: text,
//                       iconUrl: "icon128.png",
//                       progress: progress
//                     }

//                       chrome.notifications.create('notifyUpdate1e', opt, function(id) { console.log("Last error:", chrome.runtime.lastError); });

//                 }, time);
//             }

                 
//             // createUpdateNotifications(0, 100, "\nALWAYS ON TOP");
//             // createUpdateNotifications(47, 600, "\nALWAYS ON TOP");
//             // createUpdateNotifications(80, 900, "\nALWAYS ON TOP");
//             // createUpdateNotifications(100, 1000, "\nALWAYS ON TOP");


//             notificationTimer = chrome.extension.getBackgroundPage().setTimeout(function(){

//                 var opt = {
//                   type: "image",
//                   imageUrl: "updatedImage.jpg",
//                   title: "Sticky Notes - Just popped up!",
//                   iconUrl: "icon128.png",
//                   message: "\nALWAYS ON TOP"
//                   // buttons: [{title: "Awesome", iconUrl: "external.png"},{title: "Awesome", iconUrl: "external.png"}]
//                 };
//                 // chrome.notifications.create('notifyUpdate1e', opt, function(id) { console.log("Last error:", chrome.runtime.lastError); });

//             }, 1200);


//         // chrome.storage.local.set({"notificationsUpdate19": "done"}, function() {
//         //     // console.log("FIRST TIME LOCAL VALUE SUCCESSFULY SYNCED TO REMOTE.");
//         // });        
//     }
// });  
            

chrome.notifications.onClicked.addListener(function(){
    // alert("hb");
})


chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse) {

        console.log("onMessage", request);

        
       
        if (request.directive=="test") {
            console.log("I am test");
            
            // var opt = {
            //   type: "basic",
            //   title: "Sticky Notes - Just popped up!",
            //   message: "Your app has been updated to a newer version. Checkout for the exciting features.",
            //   iconUrl: "icon128.png"
            // };
            //
            // var opt2 = {
            //   type: "progress",
            //   title: "Sticky Notes - Just popped up!",
            //   message: "Exciting times! \n\n...",
            //   iconUrl: "icon128.png",
            //   progress: 42
            // }
            //
            //   chrome.notifications.create('notify2', opt2, function(id) { console.log("Last error:", chrome.runtime.lastError); });
            //   sendResponse({ open: true });

        }

        else if (request.directive=="test2") {

            console.log("I am test 2");


            // var opt2 = {
            //   type: "progress",
            //   title: "Sticky Notes - Just popped up!",
            //   message: "Exciting times! \nYour app has been updated to a newer version.",
            //   iconUrl: "icon128.png",
            //   progress: 100
            // }
            //
            //   chrome.notifications.create('notify2', opt2, function(id) { console.log("Last error:", chrome.runtime.lastError); });
            //   sendResponse({ open: true });

        }



        else if (request.directive=="closeAWindow") {
            sendResponse({ open: false });
            if ((typeof window.awindow != "undefined")) {
                window.awindow.close();
            }
        }
        else if (request.directive=="openAWindow") {
            window.awindow = window.open("/index.html?from=window","SHARE ",'scrollbars=0,height=390,width=190');
            sendResponse({ open: true });
        }

        else if (request.directive=="checkIfPanelIsOpen") {
            if (panelWindowId) {
              sendResponse({ open: true });
            } else {
              sendResponse({ open: false });
            }
                        
        }

        else if (request.directive=="openMePanel") {

            if (panelWindowId) {
                chrome.windows.update(panelWindowId,{focused:true} ,function(r) {
                    console.log(r); 
                })
            } else {
                console.log("panelWindowId", panelWindowId);
                chrome.windows.create({ url: 'index.html', width: 300, height: 400, type: 'panel' }, function(w) {
                  console.log(w);
                  panelWindowId = w.id;
                });
            }

           
            sendResponse({ open: true });
        }

        else if (request.directive=="consolelog") {
            console.log(request.msg);
        }

        else {
            console.log("Unmatched request of '" + request + "' from script to background.js from " + sender);
        }
    }
);