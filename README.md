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

The opposite of ```.get()``` is ```.set()```:

```javascript
song_model.set({artist: "Ben Gibbard"});
```

It's better to use ```.set()``` than editing the model's attributes directly so that Backbone can properly broadcast the change to any views or collections that need it.

You can set default values for a model in two ways:

```javascript
var Song = Backbone.Model.extend({
  defaults: {
    title: "Codes & Keys",
    artist: "Death Cab for Cutie"
  }
});

// will do the same thing as:

var Song = Backbone.Model.extend({
  initialize: function() {
    this.set({
      title: "Codes & Keys",
      artist: "Death Cab for Cutie"
    })
  }
})
```

Listening for changes to any or all attributes is easy:

```javascript
var Song = Backbone.Model.extend({
  initialize: function() {
    this.on("change", function() {
      // call methods when any attribute changes
    });
    
    this.on("change:artist", function() {
      // call methods when the artist attribute changes
    });
  }
})
```

##Backbone View

In Backbone, a view is an object that manages the presentation of a model. It is not simply the HTML the gets rendered to the DOM, which is what the term "view" implies in a normal web stack. 
Instead, a Backbone view stores a reference to an HTML template, and is responsible for adding that HTML to the DOM, as well as capturing events within those elements. You define a Backbone view
by extending Backbone's own View object:

```javascript
var songView = Backbone.View.extend({
  render: function() {
    var template = _.template($('#song_template').html()),
        markup = template(this.model.toJSON());
    
    this.$el.html(markup).appendTo('#songs');
  }
});

var song = new Song({artist: "Death Cab for Cutie", song: "Codes & Keys"});
song.view = new songView({model: song});
song.view.render();
```

Let's take moment to discuss templating. There are several options for creating and rendering templates with JavaScript, but the one you get out of the box with Underscore is.. Underscore templating. 
A template is simply an HTML fragment that accepts a JavaScript object to fill in its missing data pieces. A sample Underscore template might look like this in your DOM:

```html
<script type="html/template" id="song_template">
  <li class="song">
    Title: <%= title %>
    Artist: <%= artist %>
  </li>
</script>
```

To turn this into real HTML you can use, first compile the template with the _.template() underscore method:

```javascript
var template = _.template($('#song_template').html());
```

Now fill in the missing pieces with your data:

```javascript
var song_object = {
  title: "Codes & Keys",
  artist: "Death Cab for Cutie"
}
var markup = template(song_object);
``` 

Now that markup variable has your filled-in HTML. The beauty of templating is that it removes the cumbersome step of building up markup with JavaScript. How many times have you written something like this:

```javascript
// warning: anti-pattern
var li = "<li class='song'>";
li += "Title: Codes & Keys";
li += "Artist: Death Cab for Cutie";
li += "</li>"
```

This is hard to maintain and it becomes impossible to construct complex HTML elements. Keeping your HTML separate from your JavaScript will allow each of those components to do its job better.

Now that we have templates in place, let's go back to our Backbone view:

```javascript
var songView = Backbone.View.extend({
  render: function() {
    var template = _.template($('#song_template').html()),
        markup = template(this.model.toJSON());
    
    this.$el.html(markup).appendTo('#songs');
  }
});

var song = new Song({artist: "Death Cab for Cutie", song: "Codes & Keys"});
song.view = new songView({model: song});
song.view.render();
```

When we call ```song.view.render()```, we are creating an HTML fragment from our template and our model data, then appending it to the #songs div.

A Backbone view has an associated HTML element at all times. We access and operate on this element by calling ```view.el```. If you add a dollar sign before ```el```, Backbone will return the element wrapped as a jQuery object. 
This is useful if you plan on calling jQuery methods, like we do in ```this.$el.html(markup);```. In the example above, we didn't specify what ```el``` is, so by default it's an empty ```<div>```. 
  
You can override this default by telling the view some information about your desired element. You can tell it what class, ID, and element type to use:

```javascript
var songView = Backbone.View.extend({
  tagName: 'li',
  className: 'song',
  render: function() {}
});
```
When we call ```.$el``` on an instance of songView, it will return an ```<li>``` with a class of "song". 

If we don't want to create a new element -- say we already have an element on the page we want to use for this view -- we would just declare that with a simple selector:
     
```javascript
var songView = Backbone.View.extend({
  el: '#song_container',
  render: function() {}
});
```

Let's next look at Backbone view events. Events is an attribute of a Backbone view that uses jQuery's .delegate() to respond to user interactions within our view.

```javascript
var songView = Backbone.View.extend({
  events: {
    'click li': 'playSong',
    'submit #myForm': 'handleSubmit'
  },
  render: function() {},
  playSong: function(e) {
    // handle the click event on an <li> inside our view
  },
  handleSubmit: function(e) {
    // handle the form submit event in an element with an ID of "myForm"
  }
});
```

You declare the event type and the selector where you're listening for that event with a string. ```click li``` means I'm listening for a click event in any of this view's ```<li>```s. After the colon comes the name of the method
  that will run when this event happens. You define and fill out that method anywhere in this view file. 
  
  
##Backbone Collections

Collections are objects that group many models together. If a user has a library of songs, Library might be the collection that contains many Song models. Like any other Backbone class, you create collections
by extending the Backbone defaults:

```javascript
var Library = Backbone.Collection.extend({
  model: Song
});
```
By specifying that the collection's model is Song (which we defined earlier), the collection will automatically create Song models when pass data into the collection:

```javascript
var song_collection = new Library([
  {
    artist: "Death Cab for Cutie",
    title: "Codes & Keys"
  },
  {
    artist: "Noisettes",
    title: "Atticus"
  }
]);

song_collection.models.length; // 2
song_collection.models[0].get('artist'); // "Death Cab for Cutie"
```

You've just seen the first way to add models to a collection: you pass in an array of objects at initialization. The second way is to call .add() on the collection:

```javascript
song_collection.add({
  artist: "Noisettes",
  title: "Cheap Kicks"
});
```

Note that we're passing in an object literal. There is no need to first wrap that data in a Song model; since we specified in our collection that its model is Song, it will do the work of creating those models from our raw data.

##Backbone Router

Backbone doesn't supply a traditional controller, but instead delegates that responsibility to the View and the Backbone Router. The Router is responsible for deciding what functions need to be called based on the URL.
If a user visits, /songs/32, for example, the router might run a method that creates that song model, its view, and fires off the render() call.