fluid.defaults("theNamespace.helloWorld", {
    gradeNames: ["fluid.modelComponent"],
    model: {
        message: "Don't want to say Hello World"
    },
    modelListeners: {
        message: "{that}.sayHello"
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
    helloWorld = theNamespace.helloWorld();

    setTimeout(()=>{
        helloWorld.applier.change("message", "Hello, brave new Infusion world!");
        setTimeout(()=>{
            helloWorld.applier.change("message", "Goodbye! See you again soon.");
        }, 2000);
    }, 2000);
})
// Enable visible log messages in the console
// fluid.setLogging(true);
// Create an instance of the component
// var myComponent = examples.tinyComponent();