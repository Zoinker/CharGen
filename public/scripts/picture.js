document.addEventListener('DOMContentLoaded',function() {
    Picture.init();
});

var Picture = (function() {
    var canvas;
    var ctx;
    var race;
    var selectedRace;
    var images;

    function init() {
        canvas=document.getElementById('picture');
        ctx=canvas.getContext("2d");

        race=document.getElementById('race').nextElementSibling;

        requestPreloads();
    }

    var g_images = {};


    function requestPreloads() {

        var requiredImages = {
            Elf   : "images/elf.png",
            Orc  : "images/orc.png",
            Human   : "images/men.png"
        };

        imagesPreload(requiredImages, g_images, preloadDone);
    }

    var g_sprites = {};

    function preloadDone() {
        g_sprites.Elf =new Sprite(g_images.Elf);
        g_sprites.Orc =new Sprite(g_images.Orc);
        g_sprites.Human =new Sprite(g_images.Human);


        //when preload is done eventListener is added
        race.addEventListener('change',raceChange);
        selectedRace=race.options[race.selectedIndex].text;
        g_sprites[selectedRace.toString()].drawAt(ctx,0,0);
    }


    function raceChange(){
        selectedRace=race.options[race.selectedIndex].text;
        clearCanvas(ctx);
        g_sprites[selectedRace.toString()].drawAt(ctx,0,0);

    }

    function clearCanvas (ctx) {
        var prevfillStyle = ctx.fillStyle;
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = prevfillStyle;
    }

    return {
        init: init
    };
})();