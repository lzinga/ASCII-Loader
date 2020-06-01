# Ascii Loader
After a while searching for a simple ASCII loader and failing, I quickly made one. Is this one perfect? No. Will it break? Probably.

You can view a demo of it located at the link below which will allow you to adjust each setting and see the changes.

[View Demo](https://lzinga.github.io/ASCII-Loader/)

## Config

```javascript
// Creates a default progress bar with the default options.
var progressbar = new AsciiProgress("progressbar")

// Creates a progress bar with an options object passed in.
var progressbar = new AsciiProgress("progressbar", options)
```

#### Default Options
```javascript
{
    openCharacter: "[",
    loadedCharacter: "#",
    backgroundCharacter: " ",
    closeCharacter: "]",

    showComment: true,
    startingComment: " ",
    commentLocation: "bottom",

    length: 60,
    value: 0,
    completeAt: 100,

    showPercent: true,
    percentDecimalPlaces: 2,
    percentLocation: "middle",
}
```

#  Methods

```javascript
// Sets the current comment value.
progressbar.setComment("Loading images...")

// Sets the current value out of the completeAt. Hitting the
// completeAt value will be 100%. so 10 here with a completeAt of 100 will be 10%.
progressbar.setValue(10)
```


# Events
These events will be included in the options argument of `new AsciiProgress`
```javascript
{
    // Will execute upon creation of new AsciiProgress
    onStart: function() {
        console.log("The progress bar has been created.")
    },

    // Will execute every time setValue method is called.
    onUpdate: function(value, completeAt, percent) {
        console.log("The value has been updated.")
    },

    // When the progress bar reaches 100% this event is called.
    onComplete: function () {
        console.log("The progress bar has reached 100%")
    }
}
```