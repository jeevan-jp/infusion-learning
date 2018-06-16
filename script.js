fluid.defaults("fluidTutorial.helloWorld.consoleHello", {
    gradeNames: ["fluid.modelComponent"],
    // We define a default message here so that
    // this component is fully independent and
    // could be used on its own
    model: {
        message: "Hello, Console World!"
    },
    modelListeners: {
        message: "{that}.sayHello"
    },
    invokers: {
        sayHello: {
            funcName: "fluidTutorial.helloWorld.consoleHello.sayHello",
            // Here, "{that}" means the context of the current
            // component configuration (consoleHello)
            args: ["{that}.model.message"]
        }
    }
});

// We'll update the name of the associated function at the same time.
fluidTutorial.helloWorld.consoleHello.sayHello = function (message) {
    console.log(message);
};

// The web page hello functionality is now defined as a separate component.
fluid.defaults("fluidTutorial.helloWorld.displayHello", {
    gradeNames: ["fluid.viewComponent"],
    // We define a default message here so that
    // this component is fully independent and
    // could be used on its own
    model: {
        message: "Hello, Web Page World!"
    },
    selectors: {
        messageArea: ".flc-messageArea"
    },
    modelListeners: {
        message: "{that}.displayHello"
    },
    invokers: {
        displayHello: {
            "this": "{that}.dom.messageArea",
            method: "html",
            args: ["{that}.model.message"]
        }
    }
});

fluid.defaults("fluidTutorial.helloWorld", {
    gradeNames: ["fluid.modelComponent"],
    model: {
        message: "Hello, World!"
    },
    listeners: {
        "onCreate.announceSelf": {
            "this": "console",
            method: "log",
            args: ["The helloWorld Component is ready"]
        }
    },
    components: {
        consoleHello: {
            type: "fluidTutorial.helloWorld.consoleHello",
            options: {
                model: {
                    message: "{helloWorld}.model.message"
                }
            }
        },
        displayHello: {
            type: "fluidTutorial.helloWorld.displayHello",
            container: ".helloWorld",
            options: {
                model: {
                    message: "{helloWorld}.model.message"
                }
            }
        }
    }
});

// fluidTutorial.helloWorld.consoleHello = (message) => {
//     console.log(message);
// }

$(document).ready(()=> {
    var helloWorld = fluidTutorial.helloWorld({
        model: {
            message: "Hello, restructured component world!"
        }
    });
    
    helloWorld = fluidTutorial.helloWorld.consoleHello({});

    setTimeout(() => {
        helloWorld = fluidTutorial.helloWorld.displayHello('.helloWorld', {});
    }, 2000);
});
