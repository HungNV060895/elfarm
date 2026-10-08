"use strict";

//menu header
$('.js-mobile').on('click', function () {
  $(this).toggleClass("js-mobile--close");
  $("html").toggleClass("js-locked");
  $(".header-nav").fadeToggle();
});
$('.header-nav__menu-hasub').on('click', function () {
  $(this).toggleClass("active");
  $(this).next("ul").slideToggle();
});
$(window).on('load resize', function () {
  if ($(window).width() > 1024) {
    $(".header-nav").removeAttr("style");
    $(".js-mobile").removeClass("js-mobile--close");
    $("html").removeClass("js-locked");
  }
});

// $(document).on("click", function(){
// 	$("aa").hide();
// });

$(window).scroll(function () {
  if ($(this).scrollTop() > 10) {
    $("#backtop").addClass("active");
  } else {
    $("#backtop").removeClass("active");
  }
});

//matchHeight
jQuery(function ($) {
  $('.mh').matchHeight();
});

// link anchor
if (window.location.hash) scroll(0, 0);
setTimeout(function () {
  scroll(0, 0);
}, 1);
$(function () {
  var headerHeight = $('#header').outerHeight();
  var urlHash = location.hash;
  if (urlHash) {
    $('body,html').stop().scrollTop(0);
    setTimeout(function () {
      var target = $(urlHash);
      var position = target.offset().top - headerHeight;
      $('body,html').stop().animate({
        scrollTop: position
      }, 1000);
    }, 100);
  }
});
$(function () {
  $('.js-anchor[href^="#"]').click(function () {
    var headerHeight = $("#header").outerHeight();
    var speed = 800;
    var href = jQuery(this).attr("href");
    var target = jQuery(href == "#" || href == "" ? 'html' : href);
    var position = target.offset().top - headerHeight;
    $('body,html').animate({
      scrollTop: position
    }, speed, 'swing');
    return false;
  });
});
$(window).on('load', function () {
  if (window.location.hash === '#product-list') {
    var headerHeight = $("#header").outerHeight();
    var target = $('#product-list');
    if (target.length) {
      var position = target.offset().top - headerHeight;
      $('html, body').scrollTop(position);
    }
  }
});

//siider-home
$('.js-mv-slider').slick({
  dots: false,
  focusOnSelect: true,
  pauseOnHover: false,
  infinite: true,
  speed: 500,
  fade: true,
  autoplay: true,
  cssEase: 'linear'
});
$('.process-steps__slider').slick({
  dots: true,
  focusOnSelect: true,
  pauseOnHover: false,
  infinite: true,
  speed: 500,
  fade: true,
  autoplay: true,
  cssEase: 'linear'
});
$('.kiseki-gallery').slick({
  dots: false,
  focusOnSelect: true,
  pauseOnHover: false,
  infinite: true,
  speed: 500,
  fade: true,
  autoplay: true,
  cssEase: 'linear'
});
$('.biomass-galerry').slick({
  dots: false,
  focusOnSelect: true,
  pauseOnHover: false,
  infinite: true,
  speed: 500,
  fade: true,
  autoplay: true,
  cssEase: 'linear'
});

//js-support-slider
$('.js-support-slider').slick({
  dots: true,
  arrows: false,
  focusOnSelect: true,
  pauseOnHover: false,
  infinite: true,
  speed: 500,
  fade: true,
  autoplay: true,
  cssEase: 'linear'
});

//js-mv-kiseki-slider
$('.js-mv-kiseki-slider').slick({
  dots: false,
  arrows: true,
  focusOnSelect: true,
  pauseOnHover: false,
  infinite: true,
  speed: 500,
  fade: true,
  autoplay: false,
  cssEase: 'linear'
});

//fade
$(window).on('scroll load assessFeatureHeaders', function () {
  var scrollTop = $(window).scrollTop();
  var appearenceBuffer = 60;
  var windowBottom = scrollTop + $(window).height() - appearenceBuffer;
  $('body').toggleClass('scrolled-down', scrollTop > 0);
  $(`.js-scrollin:not(.active), .js-fade-left-top:not(.active), .js-fade-right-bottom:not(.active)`).filter(function () {
    var offset = $(this).offset().top;
    var height = $(this).outerHeight();
    return offset + height >= scrollTop && offset <= windowBottom;
  }).addClass('active');
  $(".top-news").css("height", $(".top-news").height());
  $(".top-about").css("height", $(".top-about").height());
});

//backtop
jQuery(document).ready(function ($) {
  $(window).on("scroll", function () {
    if ($(".top-movie").length && $(window).scrollTop() > $(".top-movie").offset().top - $(window).outerHeight()) {
      $(".top-about__custom").addClass("fixed");
    } else {
      $(".top-about__custom").removeClass("fixed");
    }
  });
  $(window).on("scroll", function () {
    if ($(".top-news").length && $(window).scrollTop() > $(".top-news").offset().top - 122) {
      $(".top-news__custom").addClass("fixed");
    } else {
      $(".top-news__custom").removeClass("fixed");
    }
  });
  $(window).on("scroll", function () {
    if ($(window).scrollTop() > $("#footer").offset().top - $(window).outerHeight() + 180) {
      $("#backtop").addClass("fixed");
    } else {
      $("#backtop").removeClass("fixed");
    }
  });
  $('#backtop').click(function () {
    $('body,html').animate({
      scrollTop: 0
    }, 500);
    return false;
  });
});
$('.contact-check--main input[type="checkbox"]').prop('disabled', true);
//custom scrollbar
$(document).ready(function () {
  $(".js-mCustomScrollbar").mCustomScrollbar({
    scrollbarPosition: "inside",
    scrollInertia: 300,
    callbacks: {
      onTotalScroll: function () {
        // Khi cuộn tới cuối, enable checkbox và button
        $('.contact-check input[type="checkbox"]').prop('disabled', false);
        $('.contact-btns button').prop('disabled', false);
        $('.contact-check--main').addClass('on');
        // $('.contact-btns .c-btn__03').addClass('on');
      }
    }
  });
});
$('.contact-check--main input[type="checkbox"]').change(function () {
  if (this.checked) {
    $('.contact-btns--main .c-btn__03').addClass('on');
  } else {
    $('.contact-btns--main .c-btn__03').removeClass('on');
  }
});

//add more field
$('.js-block-add').on('click', function () {
  const parent = $(this).parent();
  const field = parent.find('.js-block-ct').clone();

  // Remove class js-block-ct
  field.removeClass('js-block-ct');

  // Remove required and error spans
  field.find('.required').remove();
  field.find('.error').remove();

  // Clear input values
  field.find('input, select, textarea').val('');

  // Remove cloned custom dropdown
  field.find('.custom-dropdown').remove();
  field.find('select').show();
  $(this).before(field);

  // Initialize custom dropdown for new js-select elements
  field.find('.js-select').each(function () {
    initCustomDropdown($(this));
  });
});

//custom dropdown
// function initCustomDropdown($this){
//     // Check if already initialized
//     if($this.find('.custom-dropdown').length > 0){
//         return;
//     }

//     var $select = $this.find('select');
//     var $options = $select.find('option');

//     // Ẩn select gốc
//     $select.hide();

//     // Tạo custom dropdown
//     var $dropdown = $('<div class="custom-dropdown"></div>');
//     var $selected = $('<div class="custom-dropdown__selected"></div>');
//     var $optionList = $('<ul class="custom-dropdown__list"></ul>');

//     // Set initial text
//     var firstOption = $options.eq(0);
//     $selected.text(firstOption.text());

//     // Thêm các options vào list
//     $options.each(function(index){
//         var $option = $(this);
//         var optionText = $.trim($option.text());
//         var optionValue = $option.attr('value') || '';
//         var $li = $('<li></li>')
//             .addClass('custom-dropdown__item')
//             .attr('data-value', optionValue)
//             .attr('data-index', index)
//             .attr('data-text', optionText)
//             .html(optionText);
//         $optionList.append($li);
//     });

//     $dropdown.append($selected);
//     $dropdown.append($optionList);
//     $this.append($dropdown);

//     // Thêm class is-active cho phần tử được selected ban đầu
//     var initialIndex = $select.prop('selectedIndex');
//     $optionList.find('.custom-dropdown__item[data-index="' + initialIndex + '"]').addClass('is-active');

//     // Xử lý click để mở/đóng dropdown
//     $selected.on('click', function(e){
//         e.stopPropagation();
//         $('.custom-dropdown').not($dropdown).removeClass('is-open');
//         $dropdown.toggleClass('is-open');
//     });

//     // Xử lý chọn option
//     $optionList.off('click').on('click', '.custom-dropdown__item', function(e){
//         e.preventDefault();
//         e.stopPropagation();

//         var $item = $(this);
//         var value = $item.attr('data-value');
//         var text = $item.attr('data-text');
//         var index = $item.attr('data-index');

//         // Cập nhật giá trị
//         $selected.empty().html(text);
//         $select.prop('selectedIndex', index).trigger('change');

//         // Đóng dropdown
//         $dropdown.removeClass('is-open');

//         // Xóa active class
//         $optionList.find('.custom-dropdown__item').removeClass('is-active');
//         $item.addClass('is-active');
//     });

//     // Hàm cập nhật custom dropdown khi select thay đổi
//     function updateCustomDropdown(){
//         var selectedIndex = $select.prop('selectedIndex');
//         var $selectedItem = $optionList.find('.custom-dropdown__item[data-index="' + selectedIndex + '"]');
//         if($selectedItem.length > 0){
//             var selectedText = $selectedItem.attr('data-text');
//             $selected.empty().html(selectedText);
//             $optionList.find('.custom-dropdown__item').removeClass('is-active');
//             $selectedItem.addClass('is-active');
//         }
//     }

//     // Lắng nghe sự kiện change từ select gốc (từ YubinBango hoặc code khác)
//     $select.on('change', function(){
//         updateCustomDropdown();
//     });

//     // Sử dụng MutationObserver để theo dõi khi YubinBango thay đổi select
//     if(window.MutationObserver){
//         var observer = new MutationObserver(function(mutations){
//             updateCustomDropdown();
//         });

//         observer.observe($select[0], {
//             childList: true,
//             subtree: true
//         });
//     }

//     // Theo dõi thay đổi của tất cả các select trong document (backup solution)
//     setInterval(function(){
//         var selectedIndex = $select.prop('selectedIndex');
//         var currentText = $selected.text();
//         var $matchingItem = $optionList.find('.custom-dropdown__item[data-index="' + selectedIndex + '"]');
//         if($matchingItem.length > 0 && $matchingItem.attr('data-text') !== currentText){
//             updateCustomDropdown();
//         }
//     }, 100);
// }

// $(document).ready(function(){
// 	$('.js-select').each(function(){
// 		initCustomDropdown($(this));
// 	});

// 	// Đóng dropdown khi click bên ngoài
// 	$(document).on('click', function(){
// 		$('.custom-dropdown').removeClass('is-open');
// 	});
// });

//js-accordion-trigger
$('.js-accordion-trigger').on('click', function () {
  $(this).toggleClass('is-active');
  $(this).next('.js-accordion-content').slideToggle();
});