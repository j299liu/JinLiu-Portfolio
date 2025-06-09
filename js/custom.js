$(window).load(function () {

    // preloader
    $('#status').fadeOut(); // will first fade out the loading animation
    $('#preloader').delay(550).fadeOut('slow'); // will fade out the white DIV that covers the website.
    $('body').delay(550).css({
        'overflow': 'visible'
    });


    //  isotope
    var $container = $('.portfolio_container');
    $container.isotope({
        filter: '*',
    });

    $('.portfolio_filter a').click(function () {
        $('.portfolio_filter .active').removeClass('active');
        $(this).addClass('active');

        var selector = $(this).attr('data-filter');
        $container.isotope({
            filter: selector,
            animationOptions: {
                duration: 500,
                animationEngine: "jquery"
            }
        });
        return false;
    });

    // back to top
    var offset = 300,
        offset_opacity = 1200,
        scroll_top_duration = 700,
        $back_to_top = $('.cd-top');

    //hide or show the "back to top" link
    $(window).scroll(function () {
        ($(this).scrollTop() > offset) ? $back_to_top.addClass('cd-is-visible'): $back_to_top.removeClass('cd-is-visible cd-fade-out');
        if ($(this).scrollTop() > offset_opacity) {
            $back_to_top.addClass('cd-fade-out');
        }
    });

    //smooth scroll to top
    $back_to_top.on('click', function (event) {
        event.preventDefault();
        $('body,html').animate({
            scrollTop: 0,
        }, scroll_top_duration);
    });

    // input
    $(".input-contact input, .textarea-contact textarea").focus(function () {
        $(this).next("span").addClass("active");
    });
    $(".input-contact input, .textarea-contact textarea").blur(function () {
        if ($(this).val() === "") {
            $(this).next("span").removeClass("active");
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    fetch("MARCH_on_a_new_datum.html") // Fetch the single project page
        .then(response => response.text())
        .then(html => {
            let parser = new DOMParser();
            let doc = parser.parseFromString(html, "text/html");

            // Find the hero-section element
            let heroSection = doc.querySelector(".hero-section");

            if (heroSection) {
                console.log("Hero section found:", heroSection);

                // Extract the background image from inline style
                let backgroundImage = heroSection.style.backgroundImage;

                // If backgroundImage is empty, get computed style
                if (!backgroundImage || backgroundImage === "none") {
                    backgroundImage = window.getComputedStyle(heroSection).backgroundImage;
                }

                if (backgroundImage && backgroundImage.includes("url")) {
                    // Extract the URL from backgroundImage (format: url("img/MArch/on_a_new_datum/IMG_1142.jpg"))
                    let imageUrl = backgroundImage.match(/url\(["']?(.*?)["']?\)/)[1];
                    console.log("Extracted image URL:", imageUrl);

                    // Update the portfolio image with the extracted URL
                    let projectThumbnail = document.getElementById("project-thumbnail");
                    if (projectThumbnail) {
                        projectThumbnail.src = imageUrl;
                    }
                } else {
                    console.error("No background image found in .hero-section");
                }
            } else {
                console.error(".hero-section not found in MARCH_on_a_new_datum.html");
            }
        })
        .catch(error => console.error("Error fetching project page:", error));
});


