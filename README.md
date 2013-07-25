Stage 1: _, models, collections
===============================

Setup:

* `git checkout stage-2`
* `node server.js`
* open browser to `http://127.0.0.1:8125/`

Challenges:

* Implement the class in `app/views/comment_form.js`.

####Requirements

* Change the collection's api_key to your own
* Render `templates/new_comment_form` onto the page
* Listen to events on the form to add a new model to the collection
* When the collection changes, update the HTML to show the new state of
the collection

#####Bonus

* Use the validation from the previous exercise to not allow blank
authors. Show an error message on the form indicating the error
* Hack Alex's comments

