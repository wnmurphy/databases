var app = {
  // server: 'https://api.parse.com/1/classes/chatterbox',

  server: 'http://127.0.0.1:3000/classes/messages',

  username: undefined,

  rooms: {},

  roomname: 'lobby',

  friends: {},

  init: function() {

    // Initial page load.
    app.fetch();

    // Load page every 5 seconds, keep room names current.
    setInterval(function() {
      app.fetch();
      app.roomListRefresh();
    }, 3000);
    
    // Listen for username submissions.
    $('#username-submission').submit(function(event) {
      app.username = $('#username-field').val();
      $('.sign-in-status').text('You are signed in as ' + app.username + '.');
      $('#username-submission').empty();

      event.preventDefault();
    });
    
    // Listen for room name selections.
    $('#rooms-dropdown').change(function(event) {
      app.roomname = $(this).val();
      app.fetch();
      
      event.preventDefault();
    });
     
    // Listen for message entries. message-field
    $('#message-submission').submit(function(event) {
      if (app.username === undefined) {
        $('.sign-in-status').text('You must sign in to send messages.');
      } else {
        var messageText = $('#message-field').val();
        var message = { username: app.username,
                        text:     messageText,
                        roomname: app.roomname  }
        app.send(message);
        $('#room-entry-field').val('');
        $('#message-field').val('');
        app.fetch();
        
        event.preventDefault();
      }
    });
    
    // Listen for new chat room entries.
    $('#room-submission').submit(function(event) {
      app.roomname = $('#room-entry-field').val();
      $('.room-entry').append('<div>Send a message to your new room!');
      
      event.preventDefault();
    });
    // Listen for friend clicks
    $('#main').on('click', '.user', app.addFriend);
  },

  send: function(aMessage) {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: app.server,
      type: 'POST',
      data: JSON.stringify(aMessage),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent. Data: ', data);
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message. Error: ', data);
      }
    });
  },

  fetch: function() {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: app.server,
      type: 'GET',
      // data: { order: '-createdAt' },
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Successful fetch. Data: ', data);
        // messageList = data.results;
        app.processDataForMessages(data);
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed fetch. Error: ', data);
      }
    });
  },
  
  clearMessages: function() {
    $('#chats').empty();
  },

  processDataForMessages: function (data) {
    app.clearMessages();
    for (var i = 0; i < data.results.length; i++) {
      var messageData = data.results[i];
      if (messageData.roomname !== undefined) {
        app.rooms[messageData.roomname] = true;
      }
      var message = { username: _.escape(messageData.username),
                      text:     _.escape(messageData.text),
                      roomname: _.escape(messageData.roomname),
                      time:     messageData.createdAt         }
      app.addMessage(message);
    }
  },

  addMessage: function(message) {
    var timeStamp = new Date(message.time);
    var date = timeStamp.getDate() + ' ';
    var month = ' ' + (timeStamp.getMonth() + 1) + '/';
    var time = timeStamp.toLocaleTimeString();
    if (message.roomname === app.roomname) {
      var $singleMessage = $('<div class="message"><span class="user" data-username="' + message.username + '">' + message.username + '</span> ' + month + date + time + '<br>' + message.text + '</div>');
      if (app.friends[message.username] === true) {
        console.log('hi')
        $singleMessage.addClass('friend');
      }
      $('#chats').append($singleMessage);
    }

  },

  roomListRefresh: function() {
    $('select').empty().append('<option value="">lobby</option>');
    for (var key in app.rooms) {
      if (key === app.roomname) {
        $('#rooms-dropdown').append('<option selected="selected" value="' + key + '">'
                                    + key + '</option>');
      } else {
        $('#rooms-dropdown').append('<option value="' + key + '">'
                                    + key + '</option>');         
      }
    }
  },
  
  addFriend: function(event) {
    console.log(event);
    var friend = $(event.currentTarget).attr('data-username');
    if (friend !== undefined) {
      app.friends[friend] = true;
      var selector = '[data-username="' + friend.replace(/"/g, '\\\"') + '"]';
      var $friends = $(selector).addClass('friend');
    }
  },
  
  handleSubmit: function() {}
  
};
