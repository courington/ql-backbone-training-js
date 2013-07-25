Stage 1: _, models, collections
===============================

Setup:

* `git checkout stage-1`
* `node server.js`
* open browser to `http://127.0.0.1:8125/`

Challenges:

1) Find the `comments` object that exists globally, and explore it

2) Make a new instance of the collection class we've provided

3) Using the [Backbone documentation](http://documentcloud.github.io/backbone/) find a way to add 10 new, unique models to the collection.

4) Using the underscore methods attached to each collection, work out how to find all the comments by one author

5) Get a summary of the collection using `toJSON`. Important method to take a look at.

####Extra Credit

6) Add a validation method to the model class that doesn't allow blank authors

7) Write a comparator function (see docs) on the collection to keep the comments sorted by author

8) Test out the `fetch` method on a collection, and the `save`, `fetch`, and `destroy` methods on a model. See what they do by default, think about REST.

