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
            Meteor.call('addTodo', text);

            events.target.text.value = '';
            return false;
        },

        'click .toggle-check': function(events) {
            Meteor.call('setChecked', this._id, !this.checked)
            return false;
        },
        'click .delete-todo': function(events) {
            if (confirm('Are you sure?')) {
                Meteor.call('deleteTodo', this._id);
            }
        }

    });

    Accounts.ui.config({
        passwordSignupFields: "USERNAME_ONLY"
    })
}

Meteor.methods({
    addTodo: function(text) {
        if (!Meteor.userId()) {
            throw new Meteor.Error('not authorized');
        }
        Todos.insert({
            text: text,
            createdAt: new Date(),
            userId: Meteor.userId(),
            userName: Meteor.user().userName
        })
    },
    deleteTodo: function(todoId) {
        Todos.remove(todoId);
    },
    setChecked: function(todoId, setChecked) {
        Todos.update(todoId, {
            $set: {
                checked: setChecked
            }
        });
    }
})


if (Meteor.isServer) {

}
