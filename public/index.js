// document.onreadystatechange = () => {
//     if (document.readyState === 'complete') {
//         alert('Please type in your city name to get desired Weather Details!');
//     }
//   };

$(window).on("load",function(){
    $(".loader-wrapper").delay(1000).fadeOut("slow");
});