fluid.defaults("theNamespace.helloWorld", {
    gradeNames: ["fluid.component"],
    invokers: {
        // Creates a function on the component
        // referred to by name 'sayHello'
        sayHello: {
            // The value of "funcName" is the full name of
            // a free function
            funcName: "theNamespace.helloWorld.consoleHello",
            // Configures the arguments to pass to the function
            args: ["Hello, World!"]
        }
    }
    // listeners: {
    //     "onCreate.logMessage": {
    //         func: "fluid.log",
    //         args: "My tiny component has started up"
    //     }
    // }
});

$(document).ready(() => {
    theNamespace.helloWorld.consoleHello = (message) => {
        console.log(message);
        $('.flc-messageArea').html(`<h3>${message}</h3>`);
    }
    theNamespace.helloWorld({}).sayHello();
})
// Enable visible log messages in the console
// fluid.setLogging(true);
// Create an instance of the component
// var myComponent = examples.tinyComponent();