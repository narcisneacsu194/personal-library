# Personal Library

Microservice project for recording a list of books, and some comments for them.

**Examples:**

* *POST /api/books/* will create a new book. A request body like the following is needed: 

   ```
    {
      "title": "exampleBookTitle"
    }
   ```
  After this endpoint is executed, a response body like the following is returned: 

   ```
    {
      "_id": "5c6e893463fb6c5bde6c8c2c",
      "title": "exampleBookTitle"
    }
   ```
  The *title* field is mandatory.

  If the *title* field has an empty string, or is missing entirely,
   the message **The title property must be provided and it should not be an empty string.** will be the response.

* *GET /api/books/* returns a list of all the available books from the database.
 The response body of this request looks something like the following:

   ```
    {
      "_id": "5c6e893463fb6c5bde6c8c2c",
      "title": "exampleBookTitle",
      "commentcount": 0
    }
   ```
  The *commentcount* field will be set to the value of 0 by default, because when the book is just created, no comments are
  added for it. Each time a new comment is assigned to the book, the value of the *commentcount* field is incremented.

* *GET /api/books/:bookId* returns a specific book from the database.
 The response body of this request looks something like the following:

   ```
    {
      "_id": "5c6e893463fb6c5bde6c8c2c",
      "title": "exampleBookTitle",
      "comments": [
        {
          "_id": "5c6fd419f48f041eb4f64bcc",
          "description": "comment1"
        },
        {
          "_id": "5c6fd424f48f041eb4f64bcd",
          "description": "comment2"
        }
      ]
    }
   ```
  Instead of getting the *commentcount* field now, we get an array with all the comments assigned to the specific book. A comment object only displays the id that it has in the database, and the description field.
  We can't make requests to retrieve only comments. They can only be retrieved together with a particular book.
  If this request is made using an invalid id, or a non-existent id in the database, the message **no book exists** will be returned.

* *POST /api/books/:bookId* will create a new comment for a given book. A request body like the following is needed: 

   ```
    {
      "description": "exampleCommentDescription"
    }
   ```
  After this endpoint is executed, a response body like the following is returned: 

   ```
    {
      "_id": "5c6e893463fb6c5bde6c8c2c",
      "title": "exampleBookTitle",
      "comments": [
        {
          "_id": "5c6fd419f48f041eb4f64bcc",
          "description": "comment1"
        },
        {
          "_id": "5c6fd424f48f041eb4f64bcd",
          "description": "exampleCommentDescription"
        }
      ]
    }
   ```
  As you can see, the new comment is added to an existing one. It's the same response you get
  when you are trying to get the specifics of a particular book.

  The *description* field is mandatory.

  If the *description* has an empty string, or is missing entirely,
   the message **The description property must be provided and it should not be an empty string.** will be the response.
  If this request is made using an invalid id, or a non-existent id in the database, the message **no book exists** will be returned.

* *DELETE /api/books/* will delete all the books and all their associated comments
from the database. If the request is successful, the message
**complete delete successful** will be returned.

* *DELETE /api/books/:bookId* will delete a specific book and all its associated comments from the database. 
If the request is successful, the message **delete successful** will be returned.
If this request is made using an invalid id, or a non-existent id in the database, the message **no book exists** will be returned.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine.

### Prerequisites

You need to have ***git***, ***yarn***, ***nodejs*** and ***mongodb*** installed on your computer.

### Installation steps

```
> cd {your_local_path}/mongodb/bin
> ./mongod --dbpath {path_of_mongo_data_folder}
> git clone git@github.com:narcisneacsu194/personal-library.git
> cd {your_local_path}/personal-library
> yarn install
> node server.js
```

You can then access the application with any browser or with software like Postman, using the following URL:

```
localhost:3000
```
