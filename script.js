fluid.defaults("theNamespace.helloWorld", {
    gradeNames: ["fluid.modelComponent"],
    model: {
        message: "Don't want to say Hello World"
    },
    listeners: {
        "onCreate.onn": "{that}.sayHello"
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
        }
    }
});

theNamespace.helloWorld.consoleHello = (message) => {
    console.log(message);
    $('.flc-messageArea').html(`<h3 style="color:red;">${message}</h3>`);
}

$(document).ready(() => {
    theNamespace.helloWorld({});
});
// Enable visible log messages in the console
// fluid.setLogging(true);
// Create an instance of the component
// var myComponent = examples.tinyComponent();