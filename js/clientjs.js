var netStatus;
var LocalStorageSliderArray = new Array("Headlines");
var topnews="Headlines";
var html="";
var countrylist="";
var detailpage="";
var news_count='-1';		// this count will define how many news you want for each category..like you can give 5,10,15 etc.. '-1' meanse all news
var latest_news_count=5;		// this count will define how many new latest news you want in latest news slider in home page 
var listentext='Here is the Text';
var homeJson="http://excellentwebworld.com/news/?json=get_all_categories_posts&news_count="+news_count;
var LatestNewsJson="http://excellentwebworld.com/news/?json=get_recent_posts&count="+latest_news_count;	// this was will used for get latest news
//var homeJson="newtest.json";
//var LatestNewsJson="latestnews.json";	// this was will used for get latest news
var count=0;
var getslider=new Array(); 							// this variable will use to get data from localStorage.
var localData;										// store local json data temp.
var google_project_id="170866488518";			// replace this id with your project id which you get from google
var push_woosh_id="8C4C5-96F2B";		// our pushwoosh replace this id with your push woosh id which you will get from pushwoosh when you register your app in pushwoosh
//var push_woosh_id="49E7D-5A824";		// client pushwoosh replace this id with your push woosh id which you will get from pushwoosh when you register your app in pushwoosh

/***********************************************Setting  For Read News */////////////////////////////////////////
var amplitude ="100";
var pitch="50";
var speed="140";
var wordgap=0;
var variant ="m1";
/********* You Can Change Diffrent Voice Type(Variant) From Below**
var variant ="f2";
var variant ="f3";
var variant ="f4";
var variant ="f5";
//var variant ="f1";
var variant ="m2";
var variant ="m3";
var variant ="m4";
var variant ="m5";
var variant ="m6";
var variant ="m7";
var variant ="croak";
var variant ="klatt";
var variant ="klatt2";
var variant ="croak3";
var variant ="croak4";
var variant ="whisper";
var variant ="whisperf";
*/