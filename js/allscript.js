window.addEventListener('load', function () {
	                                new FastClick(document.body);
									$.mobile.defaultPageTransition = 'none';
							//		$.mobile.toolbar.prototype.options.tapToggle = false;
									$.mobile.page.prototype.options.domCache = false;
                                    }, false);
/* Script for when App Resume Reload App */
document.addEventListener("resume", onResume, false);

/* code for backbutton for home page */
document.addEventListener("deviceready",AfterDeviceReadyForReload, false);


function AfterDeviceReadyForReload() 
{
	reloadnews();
}

$(document).live('pagebeforeshow', function() 
{
	if($.mobile.activePage.attr('id')=="home")
		{
		}
});

function checkConnection()						/* Function Check Internet Connection */
{
	    var connectionStatus = navigator.onLine ? 'online' : 'none';
		return connectionStatus;
}
function onBackKeyDown() 
{	
	$(document).live('pageshow', function() 
	{	 
		if($.mobile.activePage.attr('id')=="home")
		{	
			 $('.loading').show();
   			 $('body').addClass('bodyloading');
			 $('body').bind('touchmove', function(e){e.preventDefault()});

		}
	});
	$(document).live('pageaftershow', function() 
	{	
	if($.mobile.activePage.attr('id')=="home")
		{	
			  			$('.loading').hide();
						$('body').removeClass('bodyloading');
						$('body').unbind('touchmove');

		} 
	});
	 
	if($.mobile.activePage.is('#home')){
		//actionBarSherlockTabBar.hide();
      // navigator.app.exitApp();
	  	device.exitApp();
    }
    else
	{
		//checkConnection();
        navigator.app.backHistory();
	
    }	
}



function onResume() {
		
		/* $('.loading').show();
   		 $('body').addClass('bodyloading');
		$('body').bind('touchmove', function(e){e.preventDefault()});

    	// checkConnection(); 							/* Check Internet Connection */
		// reloadnews();
}
function gotohome()
{
    $('.loading').show();
    $('body').addClass('bodyloading');
	$('body').bind('touchmove', function(e){e.preventDefault()});
  // checkConnection();
    $.mobile.changePage( "#home", {});
	$('.loading').hide();
	$('body').removeClass('bodyloading');
	$('body').unbind('touchmove');
}

$(".reloadhome").live('click',function(){
    $('.loading').show();
    $('body').addClass('bodyloading');
	$('body').bind('touchmove', function(e){e.preventDefault()});

	//checkConnection();
    reloadnews();
});

// this will reload newsslider every 5 mins
window.setInterval(function(){
 		if($.mobile.activePage.attr('id')=="home")
		{
			//reloadnews();
		}
},300000);
	/* code end for reload app */
	/* code for news type list append for sorting ul li */	
$(function() {
			$( ".coutrylistul" ).sortable();
			$( ".coutrylistul" ).disableSelection();
});
	
function initPushwoosh()
{
    var pushNotification = window.plugins.pushNotification;
 
    //set push notifications handler
    document.addEventListener('push-notification', function(event) {
        var title = event.notification.title;
        var userData = event.notification.userdata;
                                 
        if(typeof(userData) != "undefined") {
            console.warn('user data: ' + JSON.stringify(userData));
        }
                                     
//       alert("Init--------->"+title);
    });
 
    //initialize Pushwoosh with projectid: "GOOGLE_PROJECT_ID", appid : "PUSHWOOSH_APP_ID". This will trigger all pending push notifications on start.
    pushNotification.onDeviceReady({ projectid:google_project_id, appid :push_woosh_id });
 
    //register for pushes
    pushNotification.registerDevice(
        function(status) {
            var pushToken = status;
            console.warn('push token: ' + pushToken);
        },
        function(status) {
            console.warn(JSON.stringify(['failed to register ', status]));
        }
    );
}
function init() {
    document.addEventListener("deviceready", initPushwoosh, true);
 
    //rest of the code
}
document.addEventListener('push-notification', function(event) {
    var title = event.notification.title;
    var userData = event.notification.userdata;
 
    console.warn('user data: ' + JSON.stringify(userData));
    alert("News Updated :-->"+title);
});
	