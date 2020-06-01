$(document).ready(function(){
    var progressBar = new AsciiProgress("progressbar") 
    
    function updateProgress(){
        progressBar.setValue(progressBar.value += 1)
    }
    setInterval(updateProgress, 1000)


    $("form :input").change(function() {
        $("form").submit()
      });

    $("#showComment").on("change", function(){
        var val = $("#showComment").val()
        if(val === "true"){
            $("#commentLocation").prop("disabled", false)
            $("#startingComment").prop("disabled", false)
        } else {
            $("#commentLocation").prop("disabled", true)
            $("#startingComment").prop("disabled", true)
        }
    })

    $("#showPercent").on("change", function(){
        var val = $("#showPercent").val()
        if(val === "true"){
            $("#percentLocation").prop("disabled", false)
            $("#percentDecimalPlaces").prop("disabled", false)
        } else {
            $("#percentLocation").prop("disabled", true)
            $("#percentDecimalPlaces").prop("disabled", true)
        }
    })


    $("form")
    .serializer()
    .on("serializer:data", function (e, formData) {

        formData.showComment = $("#showComment").val() == "true"
        formData.showPercent = $("#showPercent").val() == "true"
        formData.onComplete = function (){
            $("#complete").fadeIn();
        }

        formData.onStart = function (){
            $("#complete").fadeOut();
        }


        $("#code").text(JSON.stringify(formData, null, "\t"))
        progressBar = new AsciiProgress("progressbar", formData)
        setInterval(updateProgress, 1000)

    })

})


