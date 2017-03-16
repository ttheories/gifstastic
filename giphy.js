$(function(){
	populateButtons(flowerArr, 'searchButton', '#buttonArea');
	console.log("Page Loaded");
})

var flowerArr =["roses", "tulips", "orchids", "daisies"];
		
function populateButtons(flowerArr,classToAdd,areaToAddTo){
		$(areaToAddTo).empty();

			for(var i = 0; i<flowerArr.length; i++){
    		 var a =$('<button>');
    		 a.addClass(classToAdd);
    		 a.attr('data-type',flowerArr[i]);
    		 a.text(flowerArr[i]);
    		 $(areaToAddTo).append(a); 		
    	}
    }
    	$(document).on('click', '.searchButton', function() {
    		var type = $(this).data('type');
    		var queryURL = 'http://api.giphy.com/v1/gifs/search?q='+type+'&api_key=dc6zaTOxFJmzC&limit=10';
    		$.ajax({url:queryURL, method:'GET'})
    		.done(function(response){
    			for (var i=0; i <response.data.length; i++){
    				var searchDiv = $('<div class="searchitem">');
    				var rating = response.data[i].rating;
    				var p = $('<p>').text('Rating:'+ rating);
    				var animated=response.data[i].images.fixed_height.url;
    				var still = response.data[i].images.fixed_height_still.url;
    				var image=$('<img>');
    				image.attr('src', still);
    				image.attr('data-still', still);
    				image.attr('data-animated', 'animated');
    				image.attr('data-state', 'still');
    				image.addClass('searchImage');
    				searchDiv.append(p);
    				searchDiv.append(image);
    				$('#searchArea').append(searchDiv);
    			}
    		})

    				$(document).on('click', 'searchImage', function(){
    					var state=$(this).attr('data-state');
    						if (state=='still'){
    							$(this).attr('src', $(this).data('animated'));
    							$(this).attr('data-state', 'animated');
    						}
    						else {
    							$(this).attr('src', $(this).data('still'));
    							$(this).attr('data-state', 'still');
    						}
    				})
    		

    		$('#addSearch').on('click', function(){
    			var newSearch=$('.input').eq(0).val();
    			flowerArr.push(newSearch);
    			populateButtons(flowerArr, 'searchButton', '#buttonArea');
    			return false;
    		})

    	})