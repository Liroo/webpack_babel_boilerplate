console.log(`%cWebsite made by Studio Push 💿 (https://studio-push.com/) 💿`, 'font-family: Raleway, Georgia;font-size: 20px; color: black');

import '../style/index.scss';

import $ from 'jquery';
window.jQuery = $;
window.$ = $;


$(function () {

  $('#studio-push_link').hover(function() {
    $('body').addClass('background-studio-push');
  }, function() {
      $('body').removeClass('background-studio-push');
  });

  $('#liroo_link').hover(function () {
    $('body').addClass('background-liroo');
  }, function () {
    $('body').removeClass('background-liroo');
  });

});