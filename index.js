// I chose to make this just handle only the actual redaction of lines
// rather than also handling the data source, be it an actual file or a stream
export function redactTextFromLine(inputLine, redactions) {
    // format input
    const redactionsArray = formatRedactionsAsArray(redactions);

    const redactedLine = redactLine(inputLine, redactionsArray);

    return redactedLine;
}

// I deliberately chose to literally interpret the given examples
//  `Hello world "Boston Red Sox", 'Pepperoni Pizza', 'Cheese Pizza', beer`
// in the specification doc as actual expected input.
// In a real world scenario, I would obviously ask why we are mixing commas
// and spaces as delimiters suggest we not do that.
function formatRedactionsAsArray(redactions) {
    if (!redactions || redactions.length === 0) {
        return [];
    }
    const quotePhraseRegex = RegExp(/["'](\\.|[^"'\\])*["']/g);
    let formattedRedations = redactions.match(quotePhraseRegex) || [];
    if (formattedRedations.length > 0) {
        formattedRedations = formattedRedations.map(r => {
            return r.substr(1, r.length-2);
        });
    }
    redactions = redactions.replace(quotePhraseRegex, ``)
        .replace(/,\s/g, ` `)
        .replace(/\s\s+/g, ` `)
        .split(` `);
    formattedRedations = formattedRedations.concat(redactions);
    return formattedRedations;
}

function redactLine(inputLine, redactions) {
    const REDACT_FILL = "XXXX";

    if (!inputLine || inputLine.length === 0) {
        return inputLine;
    }

    let redactedText = inputLine;

    // Using for so we can break early in a total match
    for (let i = 0; i < redactions.length; i++) {
        const redaction = redactions[i];

        // Check for total match and break early
        if (inputLine === redaction) {
            redactedText = REDACT_FILL;
            break;
        }

        let redactionRegex = RegExp(redaction, `g`);
        redactedText = redactedText.replace(redactionRegex, REDACT_FILL);
    }

    return redactedText;
}
