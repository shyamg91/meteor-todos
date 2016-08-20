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
                createdAt: new Date(),
                userId: Meteor.userId(),
                userName: Meteor.user().userName
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

    Accounts.ui.config({
        passwordSignupFields: "USERNAME_ONLY"
    })
}

if (Meteor.isServer) {

}
