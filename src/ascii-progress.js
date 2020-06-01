// Create an immediately invoked functional expression to wrap our code
(function () {

    // Define our constructor 
    this.AsciiProgress = function () {

        // Define option defaults 
        var defaults = {
            openCharacter: "[",
            loadedCharacter: "#",
            backgroundCharacter: " ",
            closeCharacter: "]",

            showComment: true,
            startingComment: " ",
            commentLocation: "bottom",

            length: 60,
            value: 0,
            completeAt: 150,

            showPercent: true,
            percentDecimalPlaces: 2,
            percentLocation: "middle",
        }

        // Create options by extending defaults with the passed in arugments
        if (arguments[0] && typeof arguments[1] === "object") {
            this.options = extendDefaults(defaults, arguments[1]);
        } else {
            this.options = defaults
        }

        if(this.options.onStart){
            this.options.onStart()
        }

        // Create global element references
        this.parent = document.getElementById(arguments[0])
        this.parent.innerHTML = ""

        this.progressElement = this.parent.appendChild(document.createElement("div"))
        
        if(this.options.showComment){
            this.commentElement = document.createElement("div")
            if(this.options.commentLocation === "top"){
                this.parent.prepend(this.commentElement)
            } else {
                this.parent.appendChild(this.commentElement)
            }
        }


        this.percent = 0
        this.value = this.options.value

        init.call(this)
    }

    // Public Method
    AsciiProgress.prototype.setComment = function (comment){
        if(this.options.showComment){
            this.commentElement.innerHTML = comment
        }
    }

    AsciiProgress.prototype.setValue = function (amount) {

        if(this.value > this.options.completeAt){
            return
        }
        this.value = amount
        this.percent = (this.value / this.options.completeAt) * 100

        redraw.call(this, amount)

        if(this.percent >= 100 && this.options.onComplete){
            this.options.onComplete()
        }
    }

    // Private Methods
    function init() {

        this.parent.style.display = "inline-block"
        this.progressElement.style.whiteSpace = "pre-wrap"
        if(this.options.showComment){
            this.commentElement.style.textAlign = "center"
        }

        this.setComment(this.options.startingComment)
        this.setValue(this.options.value)

    }

    function redraw(amount) {
        var amountPerBlock = this.options.completeAt / this.options.length
        var blocks = Math.ceil(this.value / amountPerBlock);

        this.progressElement.innerText = ""
        this.progressElement.innerText += this.options.openCharacter
        for (var i = 0; i < blocks; i++) {
            this.progressElement.innerText += this.options.loadedCharacter
        }
        for (var i = 0; i < this.options.length - blocks; i++) {
            this.progressElement.innerText += this.options.backgroundCharacter
        }
        this.progressElement.innerText += this.options.closeCharacter


        if(this.options.showPercent){
            var middle = this.progressElement.innerText.length / 2
            this.progressElement.innerText = this.progressElement.innerText.slice(0, middle) + " " + this.percent.toFixed(this.options.percentDecimalPlaces).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + "% " + this.progressElement.innerText.slice(middle)
        }
    }


    function extendDefaults(source, properties) {
        var property;
        for (property in properties) {
            if (properties.hasOwnProperty(property)) {
                source[property] = properties[property];
            }
        }
        return source;
    }


}());

