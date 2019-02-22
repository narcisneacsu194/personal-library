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
  The *issue_title*, *issue_text*, *created_by* fields are mandatory. If you do not provide a value for the *assigned_to*
  and *status_text* fields, they will be returned as empty strings.
  You can provide either strings or numbers for the previously 
  mentioned fields. The strings can't be empty.
  By default, the *created_on* and *updated_on* fields will 
  have the current date and time as a value. The *open* field
  will have a value of *true* by default.

  If one of the mandatory fields has an empty string, or is missing entirely, the message **missing inputs** will be the response.
 

* *PUT /api/issues/{projectname}* will update an existing issue of a specific project. A request body like the following is needed: 
   ```
    {
      "issue_title": "issueTitle-edited",
      "issue_text": "issueText-edited",
      "created_on": "createdOn-edited",
      "created_by": "createdBy-edited",
      "assigned_to": "assignedTo-edited",
      "open": false,
      "status_text": "statusText-edited",
      "_id": "5c090dc1a0de0e006ef1422c"
    }
   ```
  The *_id* field is mandatory. It is also mandatory that at least one other field is included with the same or a different
  value. Otherwise, the message **no updated field sent** will be
  returned. If the request was successful, the message **successfully updated** will be returned.

  You can put either a string or a number for the request body fields.
  The exception is the *open* field, where you can only put boolean values.
  The *updated_on* field will always get updated with the current date and time, when you execute the *PUT* endpoint.
  If the *_id* field has an invalid format, or it doesn't belong
  to any issue from the database, then the message *could not update* will be shown. The same message will appear if the 
  *projectname* doesn't belong to any existing project.

* *DELETE /api/issues/{projectname}* will delete a specific 
project issue by its *_id* field, which must be specified in the request body. If the issue is deleted successfully, the message 
**'deleted ' + _id** is returned.
If no id is specified, or has an invalid format, the message **_id error** is returned.
If the *_id* field doesn't match with one from the database, the message **'could not delete' + _id** is returned. This same message will be displayed if a project with 
the given name as a request param doesn't exist.

* *GET /api/issues/{projectname}* returns an array of all the issues from a specific project. Each issue is displayed as it would be displayed in the POST response body.
This endpoint can also have query params, to filter the 
issues that are returned from a given project. Fields that 
can be used: *_id*, *issue_title*, *issue_text*, *created_on*, 
*updated_on*, *created_by*, *assigned_to*, *open*, *status_text*.
Users can pass as many fields as request params as they want.

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
