##Backbone Model

```javascript
var Song = Backbone.Model.extend({
  initialize: function() {
    console.log("You've initialized a Song model!");
  }
});

var song_model = new Song(); // "You've initialized a Song model!"
```

```javascript
var song_model = new Song({
  artist: "Death Cab for Cutie",
  title: "Codes & Keys"
});

song_model.get('artist'); // "Death Cab for Cutie"
```

```javascript
song_model.attributes.artist; // equivalent to song_model.get('artist');
```

```javascript
song_model.toJSON(); // {artist: "Death  Cab for Cutie", title: "Codes & Keys"}
```

```javascript
song_model.set({artist: "Ben Gibbard"});
```

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

```javascript
var song_model = new Song({
  artist: "Death Cab for Cutie",
  title: "Codes & Keys"
});

song_model.save(); // Push this data to the server
song_model.fetch(); // Overwrite this instance with newer data from the server
song_model.destroy(); // Destroy the model on the server (sends a DELETE request)
```

##Backbone View

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

```html
<script type="html/template" id="song_template">
  <li class="song">
    Title: <%= title %>
    Artist: <%= artist %>
  </li>
</script>
```

```javascript
var template = _.template($('#song_template').html());
```

```javascript
var song_object = {
  title: "Codes & Keys",
  artist: "Death Cab for Cutie"
}
var markup = template(song_object);
``` 

```javascript
// warning: anti-pattern
var li = "<li class='song'>";
li += "Title: Codes & Keys";
li += "Artist: Death Cab for Cutie";
li += "</li>"
```

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

```javascript
var songView = Backbone.View.extend({
  tagName: 'li',
  className: 'song',
  render: function() {}
});
```

```javascript
var songView = Backbone.View.extend({
  el: '#song_container',
  render: function() {}
});
```

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
  
##Backbone Collections

```javascript
var Library = Backbone.Collection.extend({
  model: Song
});
```

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

```javascript
song_collection.add({
  artist: "Noisettes",
  title: "Cheap Kicks"
});
```
