
// initialize client with app credentials
SC.initialize({
   client_id: "vxWJmIzXFGZU8weWlPIg",
  redirect_uri: 'http://www.johnheery.com/sc/callback.html'
});

$("#connect").live("click", function(){
    SC.connect(function(){
	
	$("#connect").hide();
	$("#intro").hide();
	
	
      SC.get("/me", function(me){
      
		//user details
		$myuserName = (me.username);
		$myName = ('Welcome, ' + me.username); 
		$myImage = me.avatar_url;
		$fullname = (me.full_name);
		$city =(me.city);
		$country = (me.country);
		$meSubDetail = ($fullname + ', ' + $city + ', ' + $country);
		
		//track details
		$trackCount = ('You have uploaded ' + me.track_count +' tracks');
		$noOfTracks =( me.track_count);
		
		//follower details
		$noOfFollowers =('You have ' + me.followers_count +' followers');
		$follow  =( me.followers_count);
		
		//like details
		$likes = ('Your tracks have been liked ' + me.public_favorites_count +' times');
		$noLikes =(me.public_favorites_count);
		
		//appends and displays
		
		$('.welcomeText').append($myName);
		$(".welcomeImg").attr(
		{src: $myImage
		});
		$('.subDetailText').append($meSubDetail);
	
	
		$('#welcome').slideDown("slow",function() {
				resultAdjust();
				showTracks();
				showFollowers();
				showLikes();
				showDowns();
				showPlays();
		});
		
		
		$('.trackCount').append($trackCount);
		$('.noOfTracks').append($noOfTracks);
		
		$('.followers').append($noOfFollowers);
		$('.noOfFollowers').append($follow);
		
		$('.likes').append($likes);
		$('.noLikes').append($noLikes);
		
		function resultAdjust() {
			$('#results').addClass("adjust");
			}
		function showTracks() {
			$('#tracks').slideDown("slow");
			
			for (i=1; i<=$noOfTracks;i++){		
				
				$('<img />').attr({'src' : 'img/cloud.png', 'id' : 'img' +[i]}).
				load (function () {
				$("#trackGfx").append($(this));	
				});
				
			}
			
		}
			
			
		function showFollowers () {
			$('#follow').slideDown("slow");
		}
		
		function showLikes () {
			$('#likesDiv').slideDown("slow");
			}
			
		function showDowns () {
			$('#downsDiv').slideDown("slow");
			}	
		
		function showPlays () {
			$('#playsDiv').slideDown("slow");
			}	
		
      });
	  
	  $totalDownloads =0;
	  $totalPlays = 0;
	  
	  SC.get("/me/tracks", function(tracks){
		//alert ('tracks called');
		$noOfTracks = tracks.length; //length of the tracks array
			//alert ($noOfTracks);
			
			for (i=0; i<=$noOfTracks;i++){
			
			$noOfDownloads = tracks[i].download_count;
			$totalDownloads += $noOfDownloads;
			
			$noOfPlays = tracks[i].playback_count;
			$totalPlays += $noOfPlays;
			
			
				//should be using a return function here really...
				if (i==$noOfTracks-1) {
				$myDownloads = ('Total number of downloads :  ' + $totalDownloads); 
				$('.downs').append($myDownloads);
				$('.noDowns').append($totalDownloads);
			
				$myPlays = ('Total number of plays :  ' + $totalPlays); 
				
				$('.plays').append($myPlays);
				$('.noPlays').append($totalPlays);
				}
			
			}
			
			
		});
		
			
	  
    });
  });
  
