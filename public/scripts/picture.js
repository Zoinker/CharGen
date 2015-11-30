"use strict";

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

    function Sprite(image,sx, sy, width, height) {
        this.image = image;
        this.sx = sx || 0;
        this.sy = sy || 0;
        this.width = width || image.width;
        this.height = height || image.height;
        this.scale = 0.25;
    }


    Sprite.prototype.drawAt = function (ctx, x, y) {
        ctx.drawImage(this.image,
            this.sx, this.sy, this.width, this.height,
            x, y, this.width, this.height);
    };



    // Multi-Image Preloader

    /*jslint browser: true, devel: true, white: true */
    /*
     0        1         2         3         4         5         6         7         8
     12345678901234567890123456789012345678901234567890123456789012345678901234567890
     */

    // Extend the Image prototype (aka augment the "class")
    // with my asyncLoad wrapper.
    //
    // I prefer this approach to setting onload/onerror/src directly.
    //
    Image.prototype.asyncLoad = function(src, asyncCallback) {

        // Must assign the callback handlers before setting `this.src`,
        // for safety (and caching-tolerance).
        //
        // Uses the same handler for success *and* failure,
        // because they share a lot of the same logic.
        //
        // NB: The failure case can be identified by the "degenerate" nature
        // of the resulting "loaded" image e.g. test for this.width === 0
        //
        this.onload = asyncCallback;
        this.onerror = asyncCallback;

        // NB: The load operation can be triggered from any point
        // after setting `this.src`.
        //
        // It *may* happen immediately (on some browsers) if the image is already
        // in-cache, but will most likely happen some time later when the load has
        // occurred and the resulting event is processesd in the queue.

        console.log("requesting image src of ", src);
        this.src = src;
    };


    // imagereload
    //
    // Horrible stuff to deal with the asynchronous nature of image-loading
    // in the browser...P
    //
    // It requires setting-up a bunch of handler callbacks and then waiting for them
    // *all* to be exectued before finally triggering our own `completionCallback`.
    //
    // Makes use of "closures" to handle the necessary state-tracking between the
    // intermediate callback handlers without resorting to global variables.
    //
    // IN  : `requiredImages` - an object of <name:uri> pairs for each image
    // OUT : `loadedImages` - object to which our <name:Image> pairs will be added
    // IN  : `completionCallback` - will be executed when everything is done
    //
    function imagesPreload(requiredImages,
                           loadedImages,
                           completionCallback) {

        var numImagesRequired,
            numImagesHandled = 0,
            currentName,
            currentImage,
            preloadHandler;

        // Count our `requiredImages` by using `Object.keys` to get all
        // "*OWN* enumerable properties" i.e. doesn't traverse the prototype chain
        numImagesRequired = Object.keys(requiredImages).length;

        // A handler which will be called when our required images are finally
        // loaded (or when the fail to load).
        //
        // At the time of the call, `this` will point to an Image object,
        // whose `name` property will have been set appropriately.
        //
        preloadHandler = function () {

            console.log("preloadHandler called with this=", this);
            loadedImages[this.name] = this;

            if (0 === this.width) {
                console.log("loading failed for", this.name);
            }

            // Allow this handler closure to eventually be GC'd (!)
            //this.onload = null;
            //this.onerror = null;

            numImagesHandled += 1;

            if (numImagesHandled === numImagesRequired) {
                console.log("all preload images handled");
                console.log("loadedImages=", loadedImages);
                console.log("");
                console.log("performing completion callback");

                completionCallback();

                console.log("completion callback done");
                console.log("");
            }
        };

        // The "for..in" construct "iterates over the enumerable properties
        // of an object, in arbitrary order."
        // -- unlike `Object.keys`, it traverses the prototype chain
        //
        for (currentName in requiredImages) {

            // Skip inherited properties from the prototype chain,
            // just to be safe, although there shouldn't be any...

            // I prefer this approach, but JSLint doesn't like "continue" :-(
            //if (!requiredImages.hasOwnProperty(currentName)) { continue; }

            if (requiredImages.hasOwnProperty(currentName)) {

                console.log("preloading image", currentName);
                currentImage = new Image();
                currentImage.name = currentName;

                currentImage.asyncLoad(requiredImages[currentName], preloadHandler);
            }
        }
    }

    return {
        init: init
    };
})();