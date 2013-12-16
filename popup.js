
var tabSaver = {

	//Does all of the required actions of the app
  begin: function() {
  
  //Returns the ID of the bookmark folder where tabs are saved. Creates the folder if it doesn't exist.
	 chrome.storage.sync.get('TabQuickID',
		function(result){
			if(result==undefined)
				this.createMainFolder();
			else{
				console.log("Got tabquickid, it is: " + result.TabQuickID); 
				console.log(result);
				this.saveTabs(result.TabQuickID);
				}
		});
  },
   
  createMainFolder: function() {
	chrome.bookmarks.create({
						 'parentId' : '1',
						 'title': 'Saved Tabs'
                         },
						 function(result){
							chrome.storage.sync.set({'TabQuickID' : result.id});
							console.log('Created tabquick folder and saved in storage, its ID is'+ result.id);
							this.saveTabs(result.id);
						 });
  },
  
  saveTabs: function (folderID){

  }
  

};

// Run our kitten generation script as soon as the document's DOM is ready.
document.addEventListener('DOMContentLoaded', function () {
  tabSaver.begin();
});
