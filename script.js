fluid.defaults("fluidTutorial.helloWorld.sayHello", {
    gradeNames: ["fluid.modelComponent"],
    model: {
        message: "Hello, world!"
    },
    modelListeners: {
        message: "{that}.sayHello"
    },
    invokers: {
        sayHello: "fluid.notImplemented"
    }
});

fluid.defaults("fluidTutorial.helloWorld.consoleHello", {
    gradeNames: ["fluidTutorial.helloWorld.sayHello"],
    invokers: {
        sayHello: {
            "funcName": "fluidTutorial.helloWorld.consoleHello.sayHello",
            args: ["{that}.model.message"]
        }
    }
});

fluidTutorial.helloWorld.consoleHello.sayHello = function (message) {
    console.log(message);
};

fluid.defaults("fluidTutorial.helloWorld.displayHello", {
    gradeNames: ["fluidTutorial.helloWorld.sayHello", "fluid.viewComponent"],
    selectors: {
        messageArea: ".flc-messageArea"
    },
    invokers: {
        sayHello: {
            "this": "{that}.dom.messageArea",
            method: "html",
            args: ["{that}.model.message"]
        }
    }
});


fluid.defaults("fluidTutorial.helloWorld.speakHello", {
    // This component has all of the characteristics of sayHello,
    // except for its implementation in the invoker
    // We also "mix in" the fluid.textToSpeech component to give it
    // the capability to access the browser's text to speech interface
    gradeNames: ["fluid.textToSpeech", "fluidTutorial.helloWorld.sayHello"],
    invokers: {
        sayHello: {
            // This style of Invoker allows us to refer to another
            // existing invoker using IoC references - in this case the
            // "queueSpeech" invoker that we have access to from mixing
            // in the fluid.textToSpeech grade
            "func": "{that}.queueSpeech",
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
        },
        speakHello: {
            type: "fluidTutorial.helloWorld.speakHello",
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
