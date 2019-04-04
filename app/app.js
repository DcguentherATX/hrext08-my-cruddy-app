var loadLocalStorage = function () {
	var keys = Object.keys(localStorage)
	var htmlString = '';
	for (var i = 0; i < keys.length; i++) {
		htmlString += `<tr><td>${keys[i]}</td><td>${localStorage[keys[i]]}</td></tr>`;
	}
	$('tbody').html(htmlString)
};

var updateStatusLabel = function(message) {
	$('#statusLabel').text('Status: ' + message);
}

 //jQuery document ready initialization stuff
 ////button and form event handlers
 // logic for determining action probably needs to go in the event handler
$(document).ready(function() {
	loadLocalStorage();
	$(".about").addClass('hidden');
	$(".project").addClass('hidden');
	$(".something").addClass('hidden');

	$('#btn-create').on('click', function(e) {
		var key = $('#name').val();
		var value = $('#value').val();
		var tortilla = $('input[name="tortilla"]:checked').val();
		var protein = $('input[name="protein"]:checked').val();
		var toppings = $('input[name="toppings"]:checked').serialize();
		var salsa = $('input[name="salsa"]:checked').val();
		var tops = removeToppings(toppings);

		var arr = JSON.stringify(value + ': ' + 'Grilled ' + protein + ' topped with ' + tops + ' on a '
			 + tortilla + ' tortilla with a drizzle of ' + salsa + ' salsa');
		var keyExists = localStorage.getItem(key) !== null;

		if (keyExists) {
			updateStatusLabel('key already exists, please use update button instead! :D');
		} else if (key === '') {
			updateStatusLabel('invalid input, you fool!')
		} else {
			createEntry(key, arr);
			updateStatusLabel('key created - ' + key);
		}

		loadLocalStorage();
	});

	$('#btn-update').on('click', function(e) {
		var key = $('#name').val();
		var value = $('#value').val();
		var tortilla = $('input[name="tortilla"]:checked').val();
		var protein = $('input[name="protein"]:checked').val();
		var toppings = $('input[name="toppings"]:checked').serialize();
		var salsa = $('input[name="salsa"]:checked').val();
		var tops = removeToppings(toppings);

		var arr = JSON.stringify(value + ': ' + 'Grilled ' + protein + ' topped with ' + tops + ' on a '
			 + tortilla + ' tortilla with a drizzle of ' + salsa + ' salsa');
		var existingValue = localStorage.getItem(key)
		var keyExists = existingValue !== null;

		if (value === existingValue) {
			updateStatusLabel('key not updated - that value already exists silly! xD')
		} else if (keyExists) {
			updateEntry(key, arr);
			updateStatusLabel('key updated - ' + key);
		} else if (key === '') {
			updateStatusLabel('invalid input, you fool!')
		} else {
			updateStatusLabel('key doesn\'t exist, please use create button instead! :D');
		}		
		
		loadLocalStorage();		
	});

	$('#btn-delete').on('click', function(e) {
		var key = $('#name').val();
		var value = $('#value').val();
		var keyExists = localStorage.getItem(key) !== null;

		if (keyExists) {
			removeEntry(key);
			updateStatusLabel('key removed - ' + key);
		} else if (key === '') {
			updateStatusLabel('invalid input, you fool!')
		} else {
			updateStatusLabel('key doesn\'t exist, nothing removed. :|');
		}

		loadLocalStorage();
	});	

	$('#btn-clear').on('click', function() {
		var result = confirm('Are you sure you want to clear all entries?');
		if (result) {
			clearEntry();
	   	}
	});

	var count = 0;
	$('#about').on('click', function() {
		$(".about").removeClass('hidden');

		if (count === 0) {
		  	$(".about").slideDown();
		  	count = 1;
	    } else {
			$('.about').slideToggle();
			}
	});
	var tally = 0;
	$('#project').on('click', function() {
		$(".project").removeClass('hidden');

		if (tally === 0) {
		  	$(".project").slideDown();
		  	tally = 1;
	    } else {
			$('.project').slideToggle();
		}
	});

	var total = 0;
	$('#something').on('click', function() {
		$(".something").removeClass('hidden');

		if (total === 0) {
		  	$(".something").slideDown();
		  	total = 1;
	    } else {
			$('.something').slideToggle();
		}
	});
});
/*



When an input element is given a name, that name becomes a property of the owning form element's HTMLFormElement.elements property. That means if you have an input whose name is set to guest and another whose name is hat-size, the following code can be used:

let form = document.querySelector("form");
let guestName = form.elements.guest;
let hatSize = form.elements["hat-size"];
*/

/*
PAGE CONTENT STUFF
*/
//something to update the table every time localStorage changes

//localStorage stuff
//https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
////create new entry
//localStorage.setItem(key, value)
var removeToppings = function(str) {
  var spl = str.split('&');
  var topArr = [];
  
  for (var i = 0; i < spl.length; i++) {
    topArr.push(spl[i].slice(9));
  }
  return topArr.join(' ');
};


var createEntry = function(key, value) {
	return localStorage.setItem(key, value);
}

////Update existing entry
//localStorage.setItem(key, value)
var updateEntry = function(key, value) {
	return localStorage.setItem(key, value);
}

////delete existing entry
//localStorage.removeItem(key)
var removeEntry = function(key) {
	return localStorage.removeItem(key);
}

var clearEntry = function() {
	return localStorage.clear();
}
