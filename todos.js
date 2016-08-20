Todos = new Mongo.Collection('todos');

if (Meteor.isClient) {
    // Template Helpers
    Template.main.helpers({
        todos: function() {
            return Todos.find({}, {
                sort: {
                    createdAt: -1
                }
            });
        }
    });

    Template.main.events({
        'submit .new-todo': function(events) {
            var text = events.target.text.value;
            Todos.insert({
                text: text,
                createdAt: new Date()
            })

            events.target.text.value = '';
            return false;
        },

        'click .toggle-check': function(events) {
            Todos.update(this._id, {
                $set: {
                    checked: !this.checked
                }
            });
            return false;
        },
        'click .delete-todo': function(events) {
            if (confirm('Are you sure?')) {
                Todos.remove(this._id);
            }
        }

    });
}

if (Meteor.isServer) {

}
