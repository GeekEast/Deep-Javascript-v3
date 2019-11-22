var workshop = (function Module(teacher){
  var publicAPI = { ask, };
  return publicAPI;

  // *****************
  function ask(question){
    console.log(teacher, question);
  }
})("Kyle");
workshop.ask("It's a module, right?");