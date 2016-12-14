/*
 **
 **Custom Javascript and jQuery
 **
 **
 */
//NProgress Start
NProgress.start();
$(document).ready(function() {
    //NProgress done
    NProgress.done();
    //SideNav init
    $('.button-collapse').sideNav({
        menuWidth: 240, // Default is 240
        edge: 'left', // Choose the horizontal origin
        closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
        draggable: true // Choose whether you can drag to open on touch screens
    });
    //Dropdown init
    $('.dropdown-button').dropdown({
        inDuration: 300,
        outDuration: 225,
        constrain_width: false, // Does not change width of dropdown to that of the activator
        hover: false, // Activate on hover
        gutter: 0, // Spacing from edge
        belowOrigin: true, // Displays dropdown below the button
        alignment: 'left' // Displays dropdown with edge aligned to the left of button
    });
    //Material Select init
    $('select').material_select();
    //Profile form change
    $('#profile').change(function() {
        $('#profile_cancel').toggleClass('disabled');
        $('#profile_update').toggleClass('disabled');
    });
    //Add new user
    $('#add_new_user').click(function(){
      $(this).addClass('disabled');
      $('#add_user_form').slideDown();
    });
});
