/**
 * Basic First grade reading algorithm.
 *
 * @author Dan Schrimpsher <https://github.com/dschrimpsher>
 */


var jsonld = require('jsonld');

var book1 = "Spot is a dog.Jimmy is a boy.Joan is a girl.Spot has a ball.Jimmy has a pen.Dog is a animal.Boy is a person.Girl is a person.";
var knowledge = [];
var count = 0;

var sentences = book1.split('.');
console.log(sentences);
sentences.forEach(process);


function process(sentence, index, array) {
    count++;
    if (!sentence) {

    } else {
        var words = sentence.split(' ');
        if (words[1] == 'is') {
            var type = "new:" + capitalizeFirstLetter(words[3]);
            var newNoun = false;
            var noun = getExistingNoun(capitalizeFirstLetter(words[0]));
            if (!noun) {
                newNoun = true;
                var noun = {
                    "@context": {
                        new: "http://example.org/",
                        xd: "http://schema.org/"
                    },
                    "@type": type,
                    "@id": words[0],
                    "xd:name": words[0]
                };
            } else {
                noun["@type"] = type;
            }

            var directObject = {
                "@context": {
                    new: "http://example.org/",
                    xd: "http://schema.org/"
                },
                "@type": "xd:Thing",
                "@id": capitalizeFirstLetter(words[3]),
                "xd:name": capitalizeFirstLetter(words[3])
            }

            if (newNoun) {
                knowledge.push(noun);
            }
            knowledge.push(directObject);
        } else {
            var relationship = "new:" + capitalizeFirstLetter(words[1]);
            var newNoun = false;
            var noun = getExistingNoun(capitalizeFirstLetter(words[0]));
            if (!noun) {
                newNoun = true;
                var noun = {
                    "@context": {
                        new: "http://example.org/",
                        xd: "http://schema.org/"
                    },
                    "@type": "xd:Thing",
                    "@id": words[0],
                    "xd:name": words[0]
                };
            }

            noun[relationship] = "xd:" + capitalizeFirstLetter(words[3]);

            var directObject = {
                "@context": {
                    new: "http://example.org/",
                    xd: "http://schema.org/"
                },
                "@type": "xd:Thing",
                "@id": capitalizeFirstLetter(words[3]),
                "xd:name": capitalizeFirstLetter(words[3])
            }

            if (newNoun) {
                knowledge.push(noun);
            }
            knowledge.push(directObject);
        }
    }
    if (count == array.length) {
        done();
    }
}

function done() {
    // knowledge.forEach(function(compacted) {
    //     jsonld.expand(compacted, function(err, expanded) {
    //         console.log(JSON.stringify(expanded, null, 2));
    //     })
    // })
    jsonld.expand(knowledge, function(err, expanded) {
            console.log(JSON.stringify(knowledge, null, 2));
    })
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getExistingNoun(noun) {
    for (var i = 0; i < knowledge.length; i++) {
        console.log(knowledge[i]["@id"]);
        if (knowledge[i]["@id"] == noun) {
            return knowledge[i];
        } else {
            console.log(knowledge[i]["@id"] + ' vs ' + noun);
        }
    }
}
