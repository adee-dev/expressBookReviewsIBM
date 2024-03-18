# # IBM Full-Stack Developer Certificate Course: Developing Back-End Apps with Node.js and Express - Final Project

General Endpoints - No login required
GET /
Retrieves a full list of my favorite book as JSON.

GET /author/:author
Example: /author/Frank%20Herbert will retrieve all books by Frank Herbert.

GET /title/:title
Example: /title/Dune retrieves all books titled Dune

GET /review/:isbn
Retrieve reviews of a book, by ISBN.

Example: /review/0441013597 retrieves reviews of the book with ISBN 0441013597 (Dune).

POST /register
Requires a POST with request body of the form {"username":"darthvader", "password":"1amyourFath3r"}. Follow this up with a POST to /login.

Authenticated Users Only
POST /login
To authenticate. Request body must be of the form {"username":"darthvader", "password":"1amyourFath3r"}.

PUT /auth/review/:isbn
Add a book review to ISBN. Will only allow one review per book, per authenticated user. PUT body must be of the form {"review": "This book blew my mind"}.

DELETE /auth/review/:isbn
Delete your review from the book with indicated ISBN.
