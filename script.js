

// function myMap() {
//     var mapProp= {
//   center: new google.maps.LatLng(25.1862919,55.2788043),
//   zoom:17,
//     };
//
//     var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
//
//     var marker = new google.maps.Marker({
//   position: new google.maps.LatLng(25.1862919,55.2788043),
//   animation:google.maps.Animation.BOUNCE,
//     });
//
//     marker.setMap(map);
//
// }

async function initMap() {
    // Request needed libraries.
    const { Map, InfoWindow } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary(
  "marker",
    );
    const map = new google.maps.Map(document.getElementById("googleMap"), {
  zoom: 15,
  center: { lat: 25.2048, lng: 55.2708 },
  mapId: "googleMap",
    });

    const infoWindow = new google.maps.InfoWindow({
  content: "",
  disableAutoPan: true,
    });
    // Create an array of alphabetical characters used to label the markers.
    // const labels = "";
    // Add some markers to the map.
    const markers = locations.map((positions, i) => {
  const pinGlyph = new google.maps.marker.PinElement({
// glyph: label,
glyphColor: "white",
  });
  const position = {lat: positions.lat, lng: positions.lng};
  const marker = new google.maps.marker.AdvancedMarkerElement({
position,
content: pinGlyph.element,
title: positions.name,

  });

  var contentString =
'<div id="content">' +
'<div id="siteNotice">' +
"</div>" +
'<h4 id="firstHeading" class="firstHeading">'+ positions.name +'</h4>' +
'<div id="bodyContent">' +
"<p>Area: "+ positions.area +"<p>" +
"<p>Price: "+ positions.price.toLocaleString() +" AED<p>" +
"<p><b>Arabc vison Properties</b><p>" +
"</div>" +
"</div>";

  // markers can only be keyboard focusable when they have click listeners
  // open info window when marker is clicked
  marker.addListener("click", () => {
infoWindow.setContent(contentString);
infoWindow.open(map, marker);
  });

  infoWindow.setContent(contentString);
  infoWindow.open(map, marker);

  // markers[0].addListener("mouseover", () => {
  //     infoWindow.open(map, markers[0]);
  // });

  // markers[0].addListener("mouseout", () => {
  //     infoWindow.close();
  // });

  return marker;
    });

    // Add a marker clusterer to manage the markers.
    // new MarkerClusterer({ markers, map });
    new markerClusterer.MarkerClusterer({ markers, map });
}

const locations = [
    {
  lat: 0,
  lng: 0,
  name: "Jabal-ali Palm - Riviera Azure - Apartments",
  area: "Jabal ali palm",
  price: "1634000"
    },
];

// initMap();
  
  


  

// (function($) {
//     $(function() {
//   //  open and close nav
//   // $('#fc-navbar-toggle').click(function() {
//   //     $('nav .fc-nav-list').slideToggle();
//   // });

//   // // Hamburger toggle
//   // $('#fc-navbar-toggle').on('click', function() {
//   //     this.classList.toggle('active');
//   // });

//   // // If a link has a dropdown, add sub menu toggle.
//   // $('nav ul li a:not(:only-child)').click(function(e) {
//   //     $(this).siblings('.fc-navbar-dropdown').slideToggle("slow");
//   //     // Close dropdown when select another dropdown
//   //     $('.fc-navbar-dropdown').not($(this).siblings()).hide("slow");
//   //     e.stopPropagation();
//   // });

//   // Click outside the dropdown will remove the dropdown class
//   // $('html').click(function() {
//   //     console.log('clicked ...')
//   //     $('.navbar-dropdown').hide();
//   // });
//     });
// })(jQuery);

// Click outside the dropdown will remove the dropdown class
// $(document).ready(function () {
//     $(document).click(function (event) {
//   console.log('clicked ...')
//   if (!$(event.target).closest('.fc-navbar-dropdown').length) {
//       $('.fc-navbar-dropdown').hide();
//   }
//     });
// });

// navbar toggle
if (window.outerWidth < 760) {
    $('.fc-nav-list li').on('mousedown', function() {
  $(this).nextAll('li').toggle();
    });
}

// navbar show/hide
$(document).ready(function() {
    // Open dropdown on hover
    $('.fc-nav-item.fc-dropdown').hover(function() {
  // $(this).addClass('show');
  // $(this).find('.dropdown-menu').addClass('show');
  $(this).find('.fc-navbar-dropdown').show();
    }, function() {
  // $(this).removeClass('show');
  // $(this).find('.dropdown-menu').removeClass('show');
  $(this).find('.fc-navbar-dropdown').hide();
    });
});

// Header - on hover show full number
$(document).ready(function() {
    // Save the initial text content
    // console.log("Script is running!");
    var initialText = $('.partial-number').text();
    // console.log('initialText:' + initialText);

    $('.fc-custom-nav-number').hover(
  function() {
$('.partial-number').text('');
// Change the text on hover
$('.partial-number').text('+971 50 927 6515');
// console.log('hover...');
  },
  function() {
$('.partial-number').text('');
// Change the text back when the mouse leaves
$('.partial-number').text(initialText);
  }
    );
});

// Lead Submit
$(document).ready(function() {
    $('.submitButton').click(function() {
  
  event.preventDefault();

  let submitButton = $(this);
  submitButton.prop('disabled', true);

  let $loader = $(this).find('.loading')
  $loader.show();
  
  // Find the parent form of the clicked button
  var $form = $(this).closest('.ajax-form');
  // console.log($form);
  $form.find('.error-message').text('');

  // Serialize the form data within this specific form
  var formData = $form.serialize();

  // Add CSRF token to the form data
  formData += '&_token=bb550LBM6cVJZN6jJIzY1wB6hL57ctBnFDNn8xIY';

  // Perform Ajax request
  $.ajax({
type: "POST",
url: "https://fandcproperties.ae/submit-lead-via-api", // replace with your route
data: formData,
success: function(response) {
    // Handle the success response
    console.log(response);

    $form[0].reset();
    $form.find('.form-control').val('');
    
    submitButton.prop('disabled', false);
    $loader.hide();

    $('.show-success-msg').text('');
    $('.show-success-msg').text('Thank You! Your request successfully submitted.');
    setTimeout(function() {
  $('.show-success-msg').text('');
    }, 2000);
},
error: function(xhr) {
    
    $form.find('.error-message').text('');
    submitButton.prop('disabled', false);
    $loader.hide();

    if (xhr.responseJSON && xhr.responseJSON.errors) {
  var errors = xhr.responseJSON.errors;
  $.each(errors, function(field, errorMessages) {
var $errorContainer = $form.find('#' + field + '-error');
$errorContainer.text(errorMessages[0]);
  });
    }

}
  });
    });
});


var desktopInputForm = document.querySelector("#desktopInputPhone");
window.intlTelInput(desktopInputForm, {
    autoInsertDialCode: true,
    autoPlaceholder: "on",
    formatOnDisplay: false,
    initialCountry: "ae",
    separateDialCode: true,
    utilsScript: "assets/tel-plugin/js/utils.js"
});

$("input[name='country_code']").val("+971");

desktopInputForm.addEventListener("countrychange", function() {
    let countryCode = $(this).prev('.iti__flag-container').find('.iti__selected-dial-code').text();
    console.log('cc: ' + countryCode);
    $("input[name='country_code']").val(countryCode);
});

var dreamSectionInputPhone = document.querySelector("#dreamSectionInputPhone");
window.intlTelInput(dreamSectionInputPhone, {
    autoInsertDialCode: true,
    autoPlaceholder: "on",
    formatOnDisplay: false,
    initialCountry: "ae",
    separateDialCode: true,
    utilsScript: "assets/tel-plugin/js/utils.js"
});

$("input[name='country_code']").val("+971");

dreamSectionInputPhone.addEventListener("countrychange", function() {
    let countryCode = $(this).prev('.iti__flag-container').find('.iti__selected-dial-code').text();
    console.log('dreamSectionInputPhone cc: ' + countryCode);
    $("input[name='country_code']").val(countryCode);
});

var mobileInputForm = document.querySelector("#mobileInputPhone");
window.intlTelInput(mobileInputForm, {
    autoInsertDialCode: true,
    autoPlaceholder: "on",
    formatOnDisplay: false,
    initialCountry: "ae",
    separateDialCode: true,
    utilsScript: "assets/tel-plugin/js/utils.js"
});

$("input[name='country_code']").val("+971");

// mobileInputForm.addEventListener("countrychange", function() {
//     var countryCode2 = $(".inner-form .iti__selected-dial-code").text();
//     console.log('contryCode: ' + countryCode2);
//     $("input[name='country_code']").val(countryCode2);
// });

mobileInputForm.addEventListener("countrychange", function() {
    let countryCode = $(this).prev('.iti__flag-container').find('.iti__selected-dial-code').text();
    console.log('mobileInputForm cc: ' + countryCode);
    $("input[name='country_code']").val(countryCode);
});

var inputModalForm = document.querySelector("#phone-number-1");
window.intlTelInput(inputModalForm, {
    autoInsertDialCode: true,
    autoPlaceholder: "on",
    formatOnDisplay: false,
    initialCountry: "ae",
    separateDialCode: true,
    utilsScript: "assets/tel-plugin/js/utils.js"
});

$("input[name='country_code']").val("+971");

inputModalForm.addEventListener("countrychange", function() {
    let countryCode = $(this).prev('.iti__flag-container').find('.iti__selected-dial-code').text();
    console.log('inputModalForm cc: ' + countryCode);
    $("input[name='country_code']").val(countryCode);
});

var projectPhoneInput = document.querySelector("#project-phone");
window.intlTelInput(projectPhoneInput, {
    autoInsertDialCode: true,
    autoPlaceholder: "on",
    formatOnDisplay: false,
    initialCountry: "ae",
    separateDialCode: true,
    utilsScript: "assets/tel-plugin/js/utils.js"
});
$("input[name='country_code']").val("+971");
projectPhoneInput.addEventListener("countrychange", function() {
    let countryCode = $(this).prev('.iti__flag-container').find('.iti__selected-dial-code').text();
    console.log('projectPhoneInput cc: ' + countryCode);
    $("input[name='country_code']").val(countryCode);
});

// var swiper = new Swiper(".detailPageThumbsSlider", {
//   loop: true,
//   spaceBetween: 5,
//   slidesPerView: 6,
//   freeMode: true,
//   watchSlidesProgress: true,
// });
// var swiper2 = new Swiper(".detailPageGallerySlider", {
//   loop: true,
//   spaceBetween: 5,
//   navigation: {
//     nextEl: ".swiper-button-next",
//     prevEl: ".swiper-button-prev",
//   },
//   thumbs: {
//     swiper: swiper,
//   },
// });

var swiper;
var swiper2;

if (window.innerWidth < 768) {

    // Hide thumbnail on mobile
    $('.detailPageThumbsSlider').hide();
    swiper = new Swiper(".detailPageThumbsSlider", {
  loop: true,
  spaceBetween: 5,
  slidesPerView: 2, // Show 2 slides in mobile view
  freeMode: true,
  watchSlidesProgress: true,
    });

    swiper2 = new Swiper(".detailPageGallerySlider", {
  loop: true,
  spaceBetween: 5,
  navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
  },
  thumbs: {
      swiper: swiper,
  },
    });
    
} else {
    swiper = new Swiper(".detailPageThumbsSlider", {
  loop: true,
  spaceBetween: 5,
  slidesPerView: 6, // Show 6 slides in other views
  freeMode: true,
  watchSlidesProgress: true,
    });

    swiper2 = new Swiper(".detailPageGallerySlider", {
  loop: true,
  spaceBetween: 5,
  navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
  },
  thumbs: {
      swiper: swiper,
  },
    });
}


$(document).ready(function() {
    $(".viewAllThumbnailSlider").click(function() {
  $(".detailPageThumbsSlider").show(); // Toggles the display of the content
    });
});

$(document).ready(function() {
    // When the element with ID "myImage" is clicked
    $(".changeLayout").click(function() {
  var layoutId = $(this).data("layout-id");
  console.log("data-layout-id:", layoutId);

  $.ajax({
    url: "https://fandcproperties.ae/getLayoutDetails" +'/'+ layoutId,
    type: "GET",
    dataType: 'json',
      success: function (result) {
    console.log('res');
    console.log(result);

    let notAvailable = $('#notAvailable').val();
    console.log(notAvailable);

    $('.layout-description').removeClass('active');
    $('.ld-'+layoutId).addClass("active");
    
    console.log('img: ' + result['images'][0]['image_url']);
    if(result['images'][0]['image_url']) {
  $('#featureFloorPlan').attr('src', result['images'][0]['image_url']);
    }else{
  $('#featureFloorPlan').attr('src', notAvailable);
    }

    console.log('3d: ' + result[0]['3d_layout']);
    if(result[0]['3d_layout']) {
  var htmlString = result[0]['3d_layout'];
  console.log('HTML String:', htmlString);

  var tempElement = $('<div></div>').html(htmlString);
  var iframeSrc = tempElement.find('iframe').attr('src');
  console.log('Iframe Src:', iframeSrc);

  $('#notAvailableImage').hide();
  $('#feature3dView').show();
  $('#feature3dView').attr('src', iframeSrc);
    }else{
  $('#feature3dView').hide();
  $('#notAvailableImage').show();
  $('#notAvailableImage').attr('src', notAvailable);
    }

    $('#layout_size').text('');
    if(result[0].total_area && result[0].total_area !== ''){
  $('#layout_size').text(result[0].total_area);
    }else{
  $('#layout_size').text('N/A');
    }
    
    $('#fp-heading').text('');
    $('#3dp-heading').text('');

    $('#layout_no_of_bedrooms').text('');
    if(result[0].no_of_bedrooms && result[0].no_of_bedrooms !== ''){
  $('#layout_no_of_bedrooms').text(result[0].no_of_bedrooms);

  $('#fp-heading').text(result[0].no_of_bedrooms);
  $('#3dp-heading').text(result[0].no_of_bedrooms);
    }else{
  $('#layout_no_of_bedrooms').text('N/A');

  $('#fp-heading').text('N/A');
  $('#3dp-heading').text('N/A');
    }

    $('#layout_no_of_bathrooms').text('');
    if(result[0].no_of_bathrooms && result[0].no_of_bathrooms !== ''){
  $('#layout_no_of_bathrooms').text(result[0].no_of_bathrooms);

  $('#fp-heading').text(result[0].no_of_bathrooms);
  $('#3dp-heading').text(result[0].no_of_bathrooms);
    }else{
  $('#layout_no_of_bathrooms').text('N/A');

  $('#fp-heading').text('N/A');
  $('#3dp-heading').text('N/A');
    }


    $('#update-payment-plan').html('');
    var paymentPlans = result['payment_plans'];
    console.log('pp: ' + paymentPlans);

    if (paymentPlans.length > 0) {
  console.log('Payment Length: ' + paymentPlans.length);

  var $tbody = $('#update-payment-plan');
  
  $.each(paymentPlans, function(index, paymentPlan) {
var $row = $('<tr>');

var propertiesToDisplay = ["milestone", "percentage", "amount"];

$.each(propertiesToDisplay, function(index, propertyName) {

let ppData = paymentPlan[propertyName];
if(ppData && ppData !== ''){
if(propertyName == 'amount'){
var $cell = $('<td class="text-center">').text(ppData + ' AED');
}else if(propertyName == 'percentage'){
var $cell = $('<td class="text-center">').text(ppData + ' %');
}else{
var $cell = $('<td>').text(ppData);
}
}else{

ppData = 'N/A';
if(propertyName == 'amount'){
var $cell = $('<td class="text-center">').text(ppData);
}else if(propertyName == 'percentage'){
var $cell = $('<td class="text-center">').text(ppData);
}else{
var $cell = $('<td>').text(ppData);
}

}



$row.append($cell);
});

$tbody.append($row);
  });
    }

    // Fill the record with N/A When Plan less then 12
    if(paymentPlans.length <= 11){
  var $tbody = $('#update-payment-plan');
  for (var i = paymentPlans.length; i <= 11; i++) {
var $row = $('<tr>');
var columns = 3;
for (var r = 1; r <= columns; r++) {
if(r == 1){
var $cell = $('<td>').text('N/A');
}else{
var $cell = $('<td class="text-center">').text('N/A');
}
$row.append($cell);
}

$tbody.append($row);
  }
    }
    // END Fill the record with N/A

      }
  });
    });
});

$(document).ready(function() {
    function setBoundries(slick, state) {
      if (state === 'default') {
      slick.find('ul.slick-dots li').eq(4).addClass('n-small-1');
      }
    }

    // Slick Selector.
    var slickSlider = $('.custom-slick-slider');
    var maxDots = 4;
    var transformXIntervalNext = -18;
    var transformXIntervalPrev = 18;

    slickSlider.on('init', function(event, slick) {
      $(this).find('ul.slick-dots').wrap("<div class='slick-dots-container'></div>");
      $(this).find('ul.slick-dots li').each(function(index) {
      $(this).addClass('dot-index-' + index);
      });
      $(this).find('ul.slick-dots').css('transform', 'translateX(0)');
      setBoundries($(this), 'default');
    });

    var transformCount = 0;
    slickSlider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
      var totalCount = $(this).find('.slick-dots li').length;
      if (totalCount > maxDots) {
      if (nextSlide > currentSlide) {
  if ($(this).find('ul.slick-dots li.dot-index-' + nextSlide).hasClass('n-small-1')) {
  if (!$(this).find('ul.slick-dots li:last-child').hasClass('n-small-1')) {
transformCount = transformCount + transformXIntervalNext;
$(this).find('ul.slick-dots li.dot-index-' + nextSlide).removeClass(
'n-small-1');
var nextSlidePlusOne = nextSlide + 1;
$(this).find('ul.slick-dots li.dot-index-' + nextSlidePlusOne).addClass(
'n-small-1');
$(this).find('ul.slick-dots').css('transform', 'translateX(' +
transformCount + 'px)');
var pPointer = nextSlide - 3;
var pPointerMinusOne = pPointer - 1;
$(this).find('ul.slick-dots li').eq(pPointerMinusOne).removeClass(
'p-small-1');
$(this).find('ul.slick-dots li').eq(pPointer).addClass('p-small-1');
  }
  }
      } else {
  if ($(this).find('ul.slick-dots li.dot-index-' + nextSlide).hasClass('p-small-1')) {
  if (!$(this).find('ul.slick-dots li:first-child').hasClass('p-small-1')) {
transformCount = transformCount + transformXIntervalPrev;
$(this).find('ul.slick-dots li.dot-index-' + nextSlide).removeClass(
'p-small-1');
var nextSlidePlusOne = nextSlide - 1;
$(this).find('ul.slick-dots li.dot-index-' + nextSlidePlusOne).addClass(
'p-small-1');
$(this).find('ul.slick-dots').css('transform', 'translateX(' +
transformCount + 'px)');
var nPointer = currentSlide + 3;
var nPointerMinusOne = nPointer - 1;
$(this).find('ul.slick-dots li').eq(nPointer).removeClass('n-small-1');
$(this).find('ul.slick-dots li').eq(nPointerMinusOne).addClass('n-small-1');
  }
  }
      }
      }
    });

    $('.custom-slick-slider').slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      dots: true,
      focusOnSelect: true,
      infinite: false,
      speed: 500,
      prevArrow: '<button class="slick-prev" aria-label="Previous" title="Previous"><img src="https://fandcproperties.ae/assets/images/prev-g-arrow.webp"></button>',
      nextArrow: '<button class="slick-next" aria-label="Next" title="Next"><img src="https://fandcproperties.ae/assets/images/next-g-arrow.webp"></button>',
      responsive: [
    {
  breakpoint: 768,
  settings: {
slidesToShow: 1,
slidesToScroll: 1,
// dots: true,
// dotsClass: 'slick-dots-mobile',
// customPaging: function(slider, i) {
//     return '<button>' + (i + 1) + '</button>';
// }
  }
    }
      ],
    });

    $('.custom-slick-slider .slick-prev').click(function(event) {
      event.preventDefault();
      console.log('prev....')
    });
    $('.custom-slick-slider .slick-next').click(function(event) {
      event.preventDefault();
      console.log('next....')
    });
    $('.custom-slick-slider .slick-dots').click(function(event) {
      event.preventDefault();
      console.log('dots....')
    });

});

$('.custom-slick-slider').slick({
   slidesToShow: 4,
  slidesToScroll: 1,
  dots: true,
   focusOnSelect: true,
  infinite: false,
  speed: 500,
 prevArrow: '<button class="slick-prev" aria-label="Previous" title="Previous"><img src="https://fandcproperties.ae/assets/images/prev-g-arrow.webp"></button>',
  nextArrow: '<button class="slick-next" aria-label="Next" title="Next"><img src="https://fandcproperties.ae/assets/images/next-g-arrow.webp"></button>',
 responsive: [
    {
  breakpoint: 768,
   settings: {
 slidesToShow: 1,
slidesToScroll: 1,
dots: true,
dotsClass: 'slick-dots-mobile',
customPaging: function(slider, i) {
    return '<button>' + (i + 1) + '</button>';
 }
   }
      }
  ],
 });
