
function getlatestnews()
{
	var html="";
	var counter=1;

		$.ajax({
		dataType: "json",
		cache:false,
		url: LatestNewsJson,
		success: function(data){
					if(data!="" && data!="[]" && data.length!=0)
					{

						html+='<div id="owl-demo" class="owl-carousel owl-theme latestnewssider ">';
						$.each(data.posts, function(i, data){
						
										 html+='<div class="item latestnews">';
										 html+='<div onclick="latestnewsdetailpage('+i+')"><span class="red bold">Latest: </span>';
										 var shorttitle=data.content.replace(/(<([^>]+)>)/ig,"");
										    if(shorttitle!=null && shorttitle.length>80)
                                        {
                                            var shorttitle=shorttitle.substring(0,77)+"...";
                                        }
                                        else
                                        {
                                         
                                        }
									//	alert(shorttitle);
										 html+=shorttitle;
										 html+='</div></div>';
										 counter=counter+1;
									
				
					});  // for each end for data
					html+='</div>';
                    $('.latestnewssliderdynamic').html(''); 
					$('.latestnewssliderdynamic').html(html);    /* this apppen all the news slider  in div */
				
			  
					setTimeout(function()
					{
							$('.latestnewssliderdynamic #owl-demo').owlCarousel({
							navigation:false,
							navigationText:false,
							pagination:false,
							slideSpeed : 100,
							paginationSpeed : 100,
							singleItem:true,
							autoPlay:true,
							rewindNav:true,
							touchDrag:false,
							transitionStyle : "fade"
						}); 	
						
					},100);
				  $(".home .ui-content").css("margin-top", "49px");	
		}	
		else
		{
            $("#home .ui-content").css("margin-top", "-3px");	
		}	
	},error: function(e){
			
			}
			}); /* Json CAll End Here */// JavaScript Document
	
	
} /*Latest News End Here*/
function appendnewsslider()
{
	$('.loading').show();
	$('body').addClass('bodyloading');
	$('body').bind('touchmove', function(e){e.preventDefault()});
	
	var html="";
	var categoryname="";
	getslider=[];								//  empty array
		var checkValues = $('input:checkbox.countrylistchekbox:checked').map(function() {
				categoryname = $(this).parent().text();
				getslider.push($.trim(categoryname));
		});	
	
	if(window.localStorage.getItem("json")==null || window.localStorage.getItem("json")=="")
	{
			$.ajax({
					dataType: "json",
					url: homeJson,
					cache:false,
					success: function(data){
						
						/* Code  For store Last_update time and laast json into local data */
					window.localStorage.setItem('json_last_updated', JSON.stringify(data));
					window.localStorage.setItem('json', JSON.stringify(data));
					localData = JSON.parse(window.localStorage.getItem('json'));
					appendnewssliderdata(localData,1);
					
			},error: function(e){
				alert("Did not get News Feeds please reload again....");
				$('.loading').hide();
                $('body').removeClass('bodyloading');
				$('body').unbind('touchmove');
				
			}
			}); /* Json CAll End Here */// JavaScript Document
	}
	else
	{
		localData = JSON.parse(window.localStorage.getItem('json'));
		var status=checkConnection();
        //var status="none";

		if(status=="none")
		{
            appendnewssliderdata(localData,0);
		}
		else
		{
			appendnewssliderdata(localData,1);
		}
	}
} //function end

function appendnewssliderdata(data,statusbit)
{
		$('.loading').show();
		$('body').addClass('bodyloading');
		$('body').bind('touchmove', function(e){e.preventDefault()});
		
		var html="";
		var categoryname="";
				window.localStorage.setItem("slider",getslider); // it will add the checkbox select from local
				$.each(getslider, function(index, value) {
					$.each(data, function(i, data){	
						if(data.category)
						{
							 if(data.category.title==$.trim(value) && data.posts.length>=1)
							 {
									html+='<div class="sliderheader">'+data.category.title+'</div>';
									html+='<div id="owl-demo" class="owl-carousel newssider">';
									$.each(data.posts, function(i, news)
									{
                                        if(news.title!=null && news.title.length>40)
                                        {
                                            var shorttitle=news.title.substring(0,37)+"...";
                                        }
                                        else
                                        {
                                            var shorttitle=news.title;
                                        }
										
										html+='<div class="item blackbg"  onclick="getdetail('+data.category.id+','+i+')">';
										if(news.thumbnail)
										{
										html+='<img class="lazyOwl" data-src="'+news.thumbnail+'" alt="EWW News" />';
										}
										else
										{
											html+='<img class="lazyOwl" src="images/noimage.jpg" />';
										}
										html+='<p class="sliderdescription"><a>'+shorttitle+'</a></p></div>';
									});
									html+='<div class="item blackbg"></div><div class="item blackbg"></div>';
									html+='</div>';
														/* Code For Create News Slider on Home Page END */			
							}
						}			//category if end here
					});  // end for each fo getSlider
				
			});// for each finish
		
			$('.topnewssliderdiv').html(''); 
			$('.newssliderdiv').html('');    /* this apppen all the news slider  in div */
			$('.newssliderdiv').html(html);    /* this apppen all the news slider  in div */
			$('.newssliderdiv #owl-demo').each(function() {
				$(this).owlCarousel({
							lazyLoad : true,
							itemsTablet:[768,4],
							itemsMobile:[568,3],
							itemsDesktopSmall:[979,5],
							itemsDesktop:[1199,6],
							navigation:false,
							navigationText:false,
							pagination:false,
                                     slideSpeed : 300
						}); 
						
			});

			window.localStorage.setItem("slider",getslider);
			$('.loading').hide();
			$('body').removeClass('bodyloading');
			$('body').unbind('touchmove');
			$.mobile.changePage( "#home", {});
					
	
}


function getdetail(categoryid,newsid)
{
	$('.loading').show();
	$('body').addClass('bodyloading');
	$('body').bind('touchmove', function(e){e.preventDefault()});

		localData = JSON.parse(window.localStorage.getItem('json'));
	    getdetaildata(categoryid,newsid,localData);


	
}
function getdetaildata(categoryid,newsid,data)
{
 
		$.mobile.changePage('#detailpage');
		var detailpage="";
		$.each(data, function(i, data){
						if(data.category)
						{
						if(categoryid==data.category.id)
						{
														/* Code For Create News Detail Page START */
								detailpage+='<div class="categorytitle"><div class="">'+data.category.title+'</div><div class="slider_nevigation right"></div></div>';
						   detailpage+='<div id="owl-demo" class="owl-carousel latestnewssider">';	
						   $.each(data.posts, function(i, news)
							 {
										detailpage+='<div class="subslider"><div style="font-size:0;width:25px;" class="socialshare"><a href="'+news.url+'"></a></div><div class="newstitle">'+news.title+'</div>';
										detailpage+='<div class="datetime">'+news.date+'</div>';
										detailpage+='<div class="description">'+news.content+'</div>';
										detailpage+='</div>';
									
							
							}); // for each data.posts
							detailpage+='</div>';
						} // end if
						}// if end of category
						/* Code For Create News Detail Page START */
				}); // for each data
				
				
	        	$('.detailpage .slider').html('');	
				$('.detailpage .slider').html(detailpage);	
		
			setTimeout(function(){
						/* Slider code for detail page:*/
			var owl=$(".detailpage .slider #owl-demo");
							owl.owlCarousel({
							navigation:true,
						/*	paginationSpeed : 1000,*/
							singleItem : true,
							autoHeight : true,
							touchDrag:false,
							rewindNav:false,
							transitionStyle:"fade",
							addClassActive:true
							
			});
			$(".owl-next").click(function(){

								var bindurl=$("#owl-demo .owl-item.active .socialshare a").attr('href');
								$("#detailpage .edit.share a").unbind('click.myEvents');
								$("#detailpage .edit.share a").bind('click.myEvents',function(){
									window.plugins.socialsharing.share("Message and link", null, null,bindurl);
								});
  		    });
			$(".owl-prev").click(function(){
								var bindurl=$("#owl-demo .owl-item.active .socialshare a").attr('href');
								$("#detailpage .edit.share a").unbind('click.myEvents');
								$("#detailpage .edit.share a").bind('click.myEvents',function(){
									window.plugins.socialsharing.share("Message and link", null, null,bindurl);
								});

  		    });
			
	setTimeout(function(){
                    owl.trigger('owl.jumpTo',newsid);
                    var bindurl=$("#owl-demo .owl-item.active .socialshare a").attr('href');
                    $("#detailpage .edit.share a").unbind('click.myEvents');
    				$("#detailpage .edit.share a").bind('click.myEvents',function(){
                window.plugins.socialsharing.share("Message and link", null, null,bindurl);
        });
								
					  
				},2600);	
                       $('.loading').hide();
                       $('body').removeClass('bodyloading');
                       $('body').unbind('touchmove');
			},1500);			
	
		 
}	
function reloadnews()
{

	$('.loading').show();
	$('body').addClass('bodyloading');
	$('body').bind('touchmove', function(e){e.preventDefault()});
	var html="";
	var categoryname="";
	getslider=[];								//  empty array
		//window.localStorage.setItem("slider",getslider);			// it will remove all the checkbox select from local
		$.ajax({
		dataType: "json",
		url: homeJson,
		cache:false,
		success: function(data){

			$('.loading').show();
			$('body').addClass('bodyloading');
			$('body').bind('touchmove', function(e){e.preventDefault()});
			
	        storedatalocally(data);   /* call function for  store live data to local */
			
									
			reloadnewsdata(localData);		/* craete html for home page  */
		},error: function(e){
				alert("Either Internet is Very slow or Not availble to Get Data.....");
				if(window.localStorage.getItem("json")!=null && window.localStorage.getItem("json")!="")
				{
					 			   localData = JSON.parse(window.localStorage.getItem('json'));
								   if(window.localStorage.getItem("slider")==null || window.localStorage.getItem("slider")=="")
									{	
											$.each(localData,function(i, data){
												window.localStorage.setItem("slider",data.category.title);
												getslider.push(window.localStorage.getItem("slider"));
											});
											window.localStorage.setItem("slider",getslider);
									}
									else
									{
											getslider=window.localStorage.getItem("slider").split(',');

											
									}

				reloadnewsdata(localData);
				
				}
				else
				{
					$('.loading').hide();
					$('body').removeClass('bodyloading');
					$('body').unbind('touchmove');
				}
							
			}
			}); /* Json CAll End Here */// JavaScript Document
	
	


} //end reload function]


 function  storedatalocally(data)
{
 /* Code  For store Last_update time and laast json into local data */
                    window.localStorage.setItem('json_last_updated', JSON.stringify(data));
					window.localStorage.setItem('json', JSON.stringify(data));
					localData = JSON.parse(window.localStorage.getItem('json'));
					
								  if(window.localStorage.getItem("slider")==null || window.localStorage.getItem("slider")=="")
									{	
											
											$.each(data, function(i, data){
												if(data.category)
												{
												window.localStorage.setItem("slider",data.category.title);
												getslider.push(window.localStorage.getItem("slider"));
												}
											});
											window.localStorage.setItem("slider",getslider);
									}
									else
									{
											getslider=window.localStorage.getItem("slider").split(',');
									
											
									}


							
							window.localStorage.setItem("slider",getslider);
							getslider=window.localStorage.getItem("slider").split(',');
				
					
}

function reloadnewsdata(data)
{
//    var statusbit=checkConnection();
	 var statusbit=1;
	$('.loading').show();
	$('body').addClass('bodyloading');
	$('body').bind('touchmove', function(e){e.preventDefault()});
	html="";
	var categoryname="";
	countrylist="";
			//	window.localStorage.setItem("slider",getslider); // it will add the checkbox select from local
				$.each(data, function(i, data)				/*category news list */
					 {
						if(data.category)
						{
							 countrylist+='<li';
							if(data.category.title==topnews)
							{
									 countrylist+=' class="defaultselected" ';
							}
							 countrylist+='><label for="checkbox_mini_'+i+'">'+data.category.title+'</label>';
							 countrylist+='<input data-theme="a" name="checkbox_mini_'+i+'"';
					
							 if(jQuery.inArray(data.category.title,getslider)!="-1")
							 {
									countrylist+=' checked="checked" ';	 
							 }
							 if(data.category.title==topnews)
							 {
									countrylist+=' disabled="disabled" ';	 
							 }
							 countrylist+='id="checkbox_mini_'+i+'" class="custom countrylistchekbox" data-mini="true" type="checkbox"></li>';
						} //if condition of undefined
					 }); // for each loop
						$.each(getslider, function(index, value) {
							
							$.each(data, function(i, data)
						 	{	
								if(data.posts)
								{
									  if(data.category.title==$.trim(value) && data.posts.length>=1)
									 {
										/* Code For Create News Slider on Home Page START */
											html+='<div class="sliderheader">'+data.category.title+'</div>';
											html+='<div id="owl-demo" class="owl-carousel newssider">';
											$.each(data.posts, function(i, news)
											{
												if(news.title!=null && news.title.length>40)
												{
												var shorttitle=news.title.substring(0,37)+"...";
												}
												else
												{
													var shorttitle=news.title;
												}
				
												html+='<div class="item blackbg"  onclick="getdetail('+data.category.id+','+i+')">';
												if(news.thumbnail)
												{
												html+='<img class="lazyOwl" data-src="'+news.thumbnail+'" alt="EWW News" />';
												}
												else
												{
													html+='<img class="lazyOwl" data-src="images/noimage.jpg" alt="EWW News" />';
												}
												html+='<p class="sliderdescription"><a>'+shorttitle+'</a></p></div>';
												
											});
											html+='<div class="item blackbg"></div><div class="item blackbg"></div>';
											html+='</div>';					 /* Code For Create News Slider on Home Page END */		
									   
										}  	/*If condition End*/
								}
									
							});
				
				});  // end for each fo getSlider

					$('.topnewssliderdiv').html(''); 
					$('.newssliderdiv').html(html);    /* this apppen all the news slider  in div */
					$('.coutrylistul').html('');
					$('.coutrylistul').html(countrylist);
					$('.countrylistchekbox').each(function(){
						$(this).checkboxradio({ theme: "a" });
						//var $target = $(event.target);  
					});
				
				setTimeout(function()
				{
						$('.newssliderdiv #owl-demo').each(function() {
						$(this).owlCarousel({
							lazyLoad : true,
							itemsTablet:[768,4],
							itemsMobile:[568,3],
							itemsDesktopSmall:[979,5],
							itemsDesktop:[1199,6],
							navigation:false,
							navigationText:false,
							pagination:false
						}); 	
					});
				},500);
					
					getlatestnews(); // this will call latest news slider
					
					$('.loading').hide();
					$('body').removeClass('bodyloading');
					$('body').unbind('touchmove');
				
				
				window.localStorage.setItem("slider",getslider);
	
}
function latestnewsdetailpage(newsid)    /* function to show latest news detail page */
{

     detailpage="";
	 $('.loading').show();
	 $('body').addClass('bodyloading');
     $('body').bind('touchmove', function(e){e.preventDefault()});
	 $.mobile.changePage('#detailpage');		
	
	var firstnews="";
	var newshtml="";
		
	$.ajax({
		dataType: "json",
		url: LatestNewsJson,
		cache:false,
		success: function(data){	
     	/* Code For Create News Detail Page START */
							detailpage+='<div class="categorytitle"><div class="">TOP NEWS</div><div class="slider_nevigation right"></div></div>';
        	   				detailpage+='<div id="owl-demo" class="owl-carousel latestnewssider">';
								
						   $.each(data.posts, function(i, news)
							 {
																		
										detailpage+='<div class="subslider"><div class="newstitle">'+news.title+'</div>';
										detailpage+='<div class="datetime">'+news.date+'</div>';
										detailpage+='<div class="description">'+news.content+'</div>';
										detailpage+='</div>';
									
							
							}); // for each data.News

							detailpage+='</div>';
						
						/* Code For Create News Detail Page END */
					
		
		        $('.detailpage .slider').html("");	
				$('.detailpage .slider').html(detailpage);	

				 setTimeout(function(){
				var owl=$(".detailpage .slider #owl-demo");
						owl.owlCarousel({
							navigation:true,
							singleItem : true,
							autoHeight : true,
							touchDrag:false,
							rewindNav:false,
							transitionStyle:"fade",
                                        slideSpeed : 300

						});
						
                  		owl.trigger('owl.jumpTo',newsid);
					    $('.loading').hide();
						$('body').removeClass('bodyloading');
						$('body').unbind('touchmove');

				},1000);			
		
						/* Slider code for detail page:*/
	
						
					
	}
	});  
	
}


function gomail(){
	//alert("mail going");
	var extras = {};
	  extras[WebIntent.EXTRA_SUBJECT] = "subject";
	  extras[WebIntent.EXTRA_TEXT] = "body";
	  extras[WebIntent.EXTRA_STREAM]="file:///mnt/sdcard/abc.png";
	  WebIntent.prototype.startActivity({ 
	      action: WebIntent.ACTION_SEND,
	      type: 'application/octet-stream', 
	      extras: extras 
	    }, 
	    function() {
	    	//alert("success");
	    }, 
	    function() {
	      alert('Failed to send email via Android Intent');
	    }
	  ); 
}
function sendemail(subject) 
{   
  var options ={
	       to:[''],
		   subject: subject,
		   body:    '',
		   isHtml:  true }; 
		   var callbackFn = null,
		   options    = options || {};  
		   var defaults = {subject:null,body:null,to:null,cc:null,bcc:null,attachments: null,isHtml:true}
		   for (var key in defaults) { 
		           if (options[key] !== undefined) {  
				              defaults[key] = options[key]; 
				             }  
				   }       
		  cordova.exec(null, null, 'EmailComposer', 'open', [options]);     
 } // composeMail End
 
function success(r)
{
//alert(JSON.stringify(r));
}
function fail(r)
{
//alert(JSON.stringify(r));
}
function textTospeech()
{

	

	listentext=$('.owl-item.active .description').text().replace(/(<([^>]+)>)/ig,"");
	alert("Now App is Starting Reading...");
	meSpeak.speak(listentext, { amplitude:amplitude, wordgap:wordgap, pitch: pitch, speed: speed, variant:variant},function(){alert("News Reading Finish...");$('.ttsmaster').html('<a class="tts" onclick="textTospeech();" data-theme="" data-icon=""><img src="images/ear.png"></a>');}); 
	$('.ttsmaster').html('<a class="tts" onclick="stopSpeech();" data-theme="" data-icon=""><img src="images/stop.png"></a>');

						
	return false;

// 	window.plugins.tts.speak("The TTS service is ready", function(){alert("success");}, function(){alert("fail");});
}
function stopSpeech()
{
	meSpeak.stop(); 
	$('.ttsmaster').html('<a class="tts" onclick="textTospeech();" data-theme="" data-icon=""><img src="images/ear.png"></a>');
	return true;
}