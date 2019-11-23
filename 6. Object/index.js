
class Workshop {
  constructor(teacher){
    this.teacher = teacher;
  }

  ask(question){
    console.log(this);
    console.log(this.teacher, question);
  }
}

var deepJS = new Workshop("Kyle");
setTimeout(deepJS.ask, 100, "Still losing 'this'?");
setTimeout(deepJS.ask("hello world"),200);
