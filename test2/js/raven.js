
$(document).ready(function() {
  var context,
      bufferLoader;


  function init() {
	   console.log('init start');
       // Fix up prefixing
       window.AudioContext = window.AudioContext || window.webkitAudioContext;
       context = new AudioContext();

       bufferLoader = new BufferLoader(
           context,
           [
           'music/voice01.ogg',
           'music/Poe_take01.ogg'
           ],
           finishedLoading
           );

       bufferLoader.load();
	   console.log('init end');
  }

  function finishedLoading(bufferList) {
	   console.log('finishedLoading start');
       // Create two sources and play them both together.
       var source1 = context.createBufferSource();
       var source2 = context.createBufferSource();
       source1.buffer = bufferList[0];
       source2.buffer = bufferList[1];

       source1.connect(context.destination);
       source2.connect(context.destination);
       source2.start(0);

       window.setTimeout(function () {
           source1.start(0);
       }, 5000);
	   console.log('finishedLoading end');
  }


  $(".book").click(init);
  $(".book").balloon({
  contents: '<div class="trigger" >The Book!</div>'
   });

   //lights!
   var fLight = $(".flashlight .center"),
       fLightTop = $(".flashlight .top"),
       fLightLeft = $(".flashlight .left"),
       fLightRight = $(".flashlight .right"),
       fLightBottom = $(".flashlight .bottom"),
       fLightHalfHeight = fLight.height() / 2,
       fLightHalfWidht = fLight.width() / 2;
    $(document).mousemove(function(e){
      fLight.css({
        top: (e.pageY - fLightHalfHeight) + "px",
        left: (e.pageX - fLightHalfWidht) + "px"
      });
        fLightTop.css({
            top: (e.pageY - fLightTop.height() - fLightHalfHeight),
            left: (e.pageX - fLightTop.width() / 2)
        });
        fLightLeft.css({
            top: (e.pageY - fLightLeft.height() / 2),
            left: (e.pageX - fLightLeft.width() - fLightHalfWidht)
        });
        fLightBottom.css({
            top: (e.pageY + fLightHalfHeight),
            left: (e.pageX - fLightBottom.width() / 2)
        });
        fLightRight.css({
            top: (e.pageY - fLightLeft.height() / 2),
            left: (e.pageX + fLightHalfWidht)
        });
    });

});


