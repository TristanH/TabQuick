var tabSaver = {

    groupName: "",

    //Does all of the required actions of the app
    begin: function () {
        //Returns the ID of the bookmark folder where tabs are saved. Creates the folder if it doesn't exist.
        chrome.storage.sync.get('TabQuickID',
            function (result) {
                if (typeof result.TabQuickID === "undefined") //add in checking if the ID's bookmark exists here
                    tabSaver.createMainFolder();

                else {
                    console.log("Got tabquickid, it is: " + result.TabQuickID);
                    tabSaver.saveTabs(result.TabQuickID);
                }
            });
    },

    createMainFolder: function () {
        chrome.bookmarks.create({
                'parentId': '1',
                'title': 'Saved Tabs'
            },
            function (result) {
                chrome.storage.sync.set({
                    'TabQuickID': result.id
                });
                console.log('Created tabquick folder and saved in storage, its ID is ' + result.id);
                tabSaver.saveTabs(result.id);
            });
    },

    saveTabs: function (folderID) {
        console.log("Got to saveTabs, folderID is " + folderID);
        chrome.bookmarks.create({
            'parentId': folderID.toString(),
            'title': this.groupName
        }, function (result) {
            chrome.tabs.query({},
                function (allTabs) {
                    tabSaver.addTabsTo(allTabs, result.id);
                }
            );
        });;
    },

    addTabsTo: function (allTabs, pID) {

        tabSaver.createRec(0, allTabs, pID);

    },

    createRec: function (index, allTabs, pID) {
        if (index >= allTabs.length)
            return;
        else
            chrome.bookmarks.create({
                'parentId': pID,
                'title': allTabs[index].title,
                'url': allTabs[index].url
            }, function (created) {
                tabSaver.createRec(index + 1, allTabs, pID);
            });

    }

};