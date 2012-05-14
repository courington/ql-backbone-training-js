* Introduction to REST and MVC
* Introduction to Backbone
* Backbone Model
* Backbone View
  - Templating
* Backbone Collection
* Backbone Router

##Rest

REST stands for "representational state transfer." It is a way of architecting data and the traffic that needs to access and edit that data. REST
is based on a common set of conventions that communicate, through a URL, what resource you are trying to access and what you want to do with that resource. 
RESTful services know how to respond to requests by considering the request type (GET, POST, etc) as well as the requested resource (the URL). This request, for example:

```GET /users```

tells the server you are requesting data (not creating data) about the system's users. This more specific request:

```GET /users/1```

tells the server you are requesting data about the user with the ID of 1. The url ```/users/1``` is specific to that user. It is his unique address on the server. To edit
 that user, you use the user's same address, but specify a different request type:
 
```POST /users/1, data: { first_name: "Donald" }```

Think of the request type as the verb, and the resource as the subject. Combining these two makes for a simple but powerful way to interact with the server's data.

##MVC

MVC stands for Model/View/Controller. It was a way of structuring your application code so that the view rendering is completely separate from the app's business logic. Term definitions:

**view**: The user interface. It displays data to the user and captures interactions (clicks, gestures, etc).
**model**: Defines and manages the application's data structure. Has no knowledge of any user interface, but is responsible for maintaining data structure and integrity.
**controller**: Communicates between the view and model. Presents application logic and data to the view for rendering, and accepts user input to pass to the model layer for data updates. Or
put another way, "updates the view when the model changes and updates the model when the user manipulates the view."

Let's look at a Twitter feed and identify the MVC powering it:

(image of twitter feed)

The first model that jumps out is a Tweet. A model can have attributes, and in this case those could be tweet body, date posted, and number of retweets. None of these has a hard connection to a 
user interface, that's not the job of a model. The model simply manages the structure of the data and the data itself that it takes to make a tweet. 

The view is the actual HTML element that displays a display. It both shows us the tweet and captures our interactions with the tweet. If we were to click on the tweet for more information, that
click event would be handled by the view. Since the model just manages the internal data structure of the tweet, it is not concerned with clicks or gestures or any other user interaction.

The controller would communicate between the two. For example, if I click the retweet button, the view would respond to that event and tell the controller that the tweet was retweeted. The controller
would then inform the model, which would increment its retweet count by one. When that's done, the controller supplies the view with the new data, which updates the HTML to display the new retweet
number to the user.

Backbone doesn't strictly fit the definition of MVC. It's best not to get too caught up with terminology, and instead understand the basic separation of concerns that Backbone tackles with separate
Models, Views, Collections, and Routers.

##Introduction to Backbone

Backbone is not the first framework to apply MVC concepts to the front-end web stack. It has enjoyed the most popularity largely due to its great documentation, modularity, and sensible conventions. The purpose
of including Backbone in your project is to structure your front-end code in a way that reduces duplication and relies on tried-and-true MVC software patterns. Additional benefits of using the framework
are its automatic RESTful resource routing and easy integration with templating libraries. 

##Backbone Model

A Backbone Model organizes an object's attributes and provides a set of methods you'd commonly use on model objects. A Backbone Model is an object that you'll extend with your own functionality:

```javascript
var Song = Backbone.Model.extend({
  initialize: function() {
    console.log("You've initialized a Song model!");
  }
});

var song_model = new Song(); // "You've initialized a Song model!"
```

Here we've overwritten the initialize() method. Ours outputs a simple console message confirming that we've created the model. Typically you'd put other set up code here. Let's make a song model with some data:

```javascript
var song_model = new Song({
  artist: "Death Cab for Cutie",
  title: "Codes & Keys"
});

song_model.get('artist'); // "Death Cab for Cutie"
```

When you add a property to a model, it's storied in the model's "attributes" object. To access these attrs, simply call ```.get('attribute_name')```. Since attributes is just a normal object, you could also access 
the artist name like this:

```javascript
song_model.attributes.artist; // equivalent to song_model.get('artist');
```

Backbone models come with a built-in JSON encoder for their attributes, so to access all of a model's data call:

```javascript
song_model.toJSON(); // {artist: "Death  Cab for Cutie", title: "Codes & Keys"}
```



##Backbone Router

Backbone doesn't supply a traditional controller, but instead delegates that responsibility to the View and the Backbone Router. The Router is responsible for deciding what functions need to be called based on the URL.
If a user visits, /songs/32, for example, the router might run a method that creates that song model, its view, and fires off the render() call.