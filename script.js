fluid.defaults("theNamespace.helloWorld", {
    gradeNames: ["fluid.viewComponent"],
    model: {
        message: "Don't want to say Hello World"
    },
    modelListeners: {
        message: "{that}.sayHello"
    },
    selectors: {
        messageArea: ".flc-messageArea",
    },
    listeners: {
        "onCreate.displayHello": "{that}.displayHello"
    },
    invokers: {
        // Creates a function on the component
        // referred to by name 'sayHello'
        sayHello: {
            // The value of "funcName" is the full name of
            // a free function
            funcName: "theNamespace.helloWorld.consoleHello",
            // Configures the arguments to pass to the function
            args: ["{that}.model.message"]
        },
        displayHello: {
            "this": "{that}.dom.messageArea",
            method: "html",
            args: ["{that}.model.message"]
        }
    }
});

theNamespace.helloWorld.consoleHello = (message) => {
    console.log(message);
    $('.flc-messageArea').html(`<h3 style="color:red;">${message}</h3>`);
}

$(document).ready(() => {
    var helloWorld = theNamespace.helloWorld(".helloWorld", {});
})
