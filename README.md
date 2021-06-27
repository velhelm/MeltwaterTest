Hi, thanks for taking the time to interview me.

ASSIGNMENT 1
The entry point for Assignment one is index.js, and I've written a test suite
in Ava which can be executed with `npm test`

ASSIGNMENT 2
To make the documents keyword searchable, first I'd create a relational database
(I personally like postgres) and create a table with three colums:
    `id` type increments,
    `title` type string,
    `keywords` type text[],
    `clean_url` type text
    `redacted_url` type text
I see the actual input of the redaction function as taking in a url of the file
and keywords/phrases to redact Each time a document runs through the redaction
system, it would create or update a database entry and create and upload the
redacted version to our sFTP server (or similar file hosting).

Using that alone keywords and phrases are "searchable" by exact match with a SELECT
query which could be initiated over a simple authenticated HTTPS GET request on 
our web server. However if we want to allow for fuzzy matching, date and numeric
ranges and other nice features we could use a tool like Elastic Search.
