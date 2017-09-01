var botui = new BotUI('botui-app'); // give it the id of container

function Node(key) {
  this.children = []
  this.parent = null

  this.question = null
  this.answers = []
  this.responses = []
}

botui.message.bot({ // show first message
  delay: 200,
  content: 'hello there!'
}).then(function () {
  return botui.message.add({ // second one
    delay: 1000, // wait 1 sec.
    content: 'how are you?'
  });
}).then(function () {
  return botui.action.button({ // let user do something
    delay: 1000,
    action: [
      {
        text: 'good',
        value: 'good'
      },
      {
        text: 'really good',
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
    delay: 1000, // wait 1 sec.
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
    delay: 1000, // wait 1 sec.
    content: 'nice to meet you, ' + res.value
  });
}).then(function() {
  return botui.message.add({ // show a message
    delay: 1000, // wait 1 sec.
    content: 'would you like to know whats i have done recently?'
  });
}).then(function () {
  return botui.action.button({ // let user do something
    delay: 1000,
    action: [
      {
        text: 'sure, why not?',
        value: 'yes'
      },
      {
        text: 'nope',
        value: 'no'
      }
    ]
  });
}).then(function (res) {
  let response = ""

  switch (res.value) {
    case 'yes':
      response = "i've just completed my [udacity nanodegree](https://www.udacity.com/course/deep-learning-nanodegree-foundation--nd101) and right now i'm learning golang!";
      break;
    case 'no':
      response = "it's alright, you can scroll down to know more about me!"
      break;
    default:
      response = "hmmm... what?"
      break;
  }

  return botui.message.add({ // show a message
    delay: 1000, // wait 1 sec.
    content: response
  });
});