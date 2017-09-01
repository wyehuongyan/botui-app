var botui = new BotUI('botui-app'); // give it the id of container

botui.message.bot({ // show first message
  delay: 200,
  content: 'hello there!'
}).then(function () {
  return botui.message.bot({ // second one
    delay: 1000, // wait 1 sec.
    content: 'how are you?'
  });
}).then(function () {
  return botui.action.button({ // let user do something
    delay: 1000,
    action: [
      {
        text: 'Good',
        value: 'good'
      },
      {
        text: 'Really Good',
        value: 'really_good'
      }
    ]
  });
}).then(function (res) {
  return botui.message.bot({
    delay: 1000,
    content: 'glad you are feeling ' + res.text + '!'
  });
}).then(function() {
  return botui.message.add({ // show a message
    human: true,
    content: 'whats your name?'
  })
}).then(function () { // wait till its shown
  return botui.action.text({ // show 'text' action
    action: {
      placeholder: 'Your name'
    }
  });
}).then(function (res) {
  return botui.message.add({
    content: 'Your name is ' + res.value
  });
});