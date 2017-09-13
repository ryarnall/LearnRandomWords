var minLength = 1;
var maxLength = 10;
getWord();

$("#newWordButton").click(getWord);


function urlBuilder(charMin, charMax) {
	return 'http://api.wordnik.com:80/v4/words.json/randomWord?hasDictionaryDef=true&excludePartOfSpeech=noun-plural&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1' +
	`&minLength=${charMin}&maxLength=${charMax}` + 
	'&api_key=79e1b1a5b4587cfb7366919304e0717faf9cd20a3203831bc';
}

function getWord() {
	$.ajax({
	  url: urlBuilder(minLength, maxLength),
	  dataType: 'jsonp',
	  success: function( resp ) {
	  	console.log(minLength, maxLength);

	    $( '#theWord').text( resp.word );

	    $.ajax({
  		url: `http://api.wordnik.com:80/v4/word.json/${resp.word}/definitions?limit=200&includeRelated=false$sourceDictionaries=webster&useCanonical=false&includeTags=false&api_key=79e1b1a5b4587cfb7366919304e0717faf9cd20a3203831bc`,
  		dataType: 'jsonp',
  		success: function( resp ) {
    			$( '#theDefinition').text( resp[0].text );
		  },
		  error: function( req, status, err ) {
		    console.log( 'something went wrong', status, err );
		  }
			});
	  },
	  error: function( req, status, err ) {
	    console.log( 'something went wrong', status, err );
  	}
	});
}


$("#shortWordButton").click(function() {
	minLength = 1;
	maxLength = 4;
})

$("#mediumWordButton").click(function() {
	minLength = 5;
	maxLength = 9;
})

$("#longWordButton").click(function() {
	minLength = 10;
	maxLength = -1;
})