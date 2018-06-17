var helloWorld;

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
    gradeNames: ["fluid.textToSpeech", "fluidTutorial.helloWorld.sayHello"],
    invokers: {
        sayHello: {
            "func": "{that}.queueSpeech",
            args: ["{that}.model.message"]
        }
    }
});

fluid.defaults("fluidTutorial.helloWorld", {
    gradeNames: ["fluid.modelComponent"],
    model: {
        message: "Hello, World"
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
        },
        reverseSpeakHello: {
            type: "fluidTutorial.helloWorld.speakHello",
            options: {
                // We use what is referred to as the "explicit"
                // model relay style here, one that is more verbose
                // but allows us many more options, including
                // passing the relayed input through a transforming
                // function
                modelRelay: {
                    // A keyword name for the relay rule
                    messageReverse: {
                        singleTransform: {
                            // The input value whose changes this
                            // relay rule should coordinate
                            //
                            // In this case, an IoC reference to the
                            // 'message' value of the parent component
                            input: "{helloWorld}.model.message",
                            // The function to call to transform
                            // the input
                            type: "fluidTutorial.helloWorld.reverseString"
                        },
                        // The target point on the component model
                        // where the transformed value will be relayed
                        target: "message"
                    }
                }
            }
        }

    }
});

// This new function reverses and returns a string
fluidTutorial.helloWorld.reverseString = function (str) {
    return str.split("").reverse().join("");
};

$(document).ready(()=> {
    helloWorld = fluidTutorial.helloWorld({
        model: {
            message: "Hello, world!"
        }
    });
});
