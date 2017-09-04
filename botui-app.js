const botui = new BotUI('botui-app'); // give it the id of container

class Node {
  constructor(parent = null, text = null, choices = [], responses = {}, action = null, placeholder = "") {
    this.next = null;
    this.parent = parent;

    this.text = text;
    this.choices = choices;
    this.responses = responses;

    this.action = action;
    this.placeholder = placeholder;
  }

  setRepeating(repeating) {
    if (repeating && repeating == true) {
      this.next = this;
    } else {
      this.next = null;
    }
  }

  run() {
    return botui.message.bot({ // show first message
      loading: true,
      delay: 1000,
      content: this.text
    }).then(() => {
      if (this.choices.length > 0) {
        return botui.action.button({ // let user do something
          delay: 1000,
          action: this.choices.map((choice) => {
            return {
              text: choice,
              value: choice
            }
          })
        });
      }
    }).then((res) => {
      if (res) {
        let response = this.responses[res.value];

        return botui.message.add({ // show a message
          loading: true,
          delay: 1000, // wait 1 sec.
          content: response(this)
        });
      }
    }).then(() => {
      if (this.action) {
        return botui.action.text({ // show 'text' action
          action: {
            placeholder: this.placeholder
          }
        });
      }
    }).then((res) => {
      if (res) {
        let response = this.responses['ACTION'];

        return botui.message.add({ // show a message
          loading: true,
          delay: 1000, // wait 1 sec.
          content: response(res)
        });
      }
    }).then(() => {
      // go to next node
      if (this.next) {
        return this.next.run();
      } else {
        return botui.message.add({ // show a message
          loading: true,
          delay: 1000, // wait 1 sec.
          content: "cya, have a nice day!"
        });
      }
    })
  }
}

class Graph {
  constructor(root = null) {
    this.root = root;
  }

  addNode(newNode) {
    let current = this.root;

    while (current.next != null) {
      current = current.next
    }

    current.next = newNode;
  }

  run() {
    return this.root.run()
  }
}

const a = new Node(
  null, 
  "hello there! how are you?", 
  ["good", "fantastic"], 
  { 
    "good": () => { return "glad you're feeling good!"; }, 
    "fantastic": () => { return "wow! feeling fantastic? nice!"; }
  }
);

const b = new Node(
  null, 
  "what's your name?",
  [],
  { 
    "ACTION": (res) => { return `nice to meet you, ${res.value}!` } 
  },
  "TEXT",
  "Your Name"
);

const c = new Node(
  null,
  "what would you like to know about me?",
  ["recent work", "hobbies", "my age", "gtg"], 
  {
    "recent work": () => { return "i've just completed my [udacity nanodegree](https://www.udacity.com/course/deep-learning-nanodegree-foundation--nd101) and right now i'm learning golang!"; },     
    "hobbies": () => { return "i enjoy cycling, watching american dramas and eating delicious hawker food! i've also started to learn pottery..."; },
    "my age": () => { return "lol, this is a secret! ![make a guess?](http://newscult.com/wp-content/uploads/2015/04/varys.gif)"; },
    "gtg": (that) => { that.setRepeating(false); return "it was nice meeting you!"; }
  }
);

c.setRepeating(true);

g = new Graph(a);
g.addNode(b);
g.addNode(c);
g.run();