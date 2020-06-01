window.onload = function() {


    var progress1 = new AsciiProgress('progress-bar', {
        commentLocation: "top",
        showComment: true,
        completeAt: 600,
        onComplete: function(){
            progress1.setComment("Progress Bar #1 Complete")
        }
    });
    setInterval(function () {
        progress1.setValue(progress1.value += 10)

        if(progress1.percent <= 10){
            progress1.setComment("Loading under 10")
        } else if (progress1.percent <= 20){
            progress1.setComment("Loading under 20")
        }

    }, 100)



    var progress2 = new AsciiProgress('progress-bar2', {
        commentLocation: "bottom",
        startingComment: "Waiting for call to start.",
        showComment: true,
        completeAt: 600,
        onComplete: function(){
            progress.setComment("Resetting in 5 seconds.")
            setTimeout(function(){
                progress.setValue(0)
            }, 5000)
        }
    });













}