* Introduction to REST and MVC
* Introduction to Backbone
* Backbone Model
* Backbone View
* Backbone Collection

##Rest

REST stands for "representational state transfer." It is a way of architecting data and the traffic that needs to access and edit that data. REST
is based on a common set of conventions that communicate, through a URL, what resource you are trying to access and what you want to do with that resource. 
RESTful services know how to respond to requests by considering the request type (GET, POST, etc) as well as the requested resource (the URL). This request, for example:
GET /users
tells the server you are requesting data (not creating data) about the system's users. This more specific request:
GET /users/1
tells the server you are requesting data about the user with the ID of 1. The url /users/1 is specific to that user. It is his unique address on the server. To edit
 that user, you use the user's same address, but specify a different request type:
POST /users/1, data: { first_name: "Donald" }
Think of the request type as the verb, and the resource as the subject. Combining these two makes for a simple but powerful way to interact with the server's data.

##MVC

MVC stands for Model/View/Controller. It was a way of structuring your application code 