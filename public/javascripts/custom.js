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
    $(".button-collapse").sideNav();
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

});
