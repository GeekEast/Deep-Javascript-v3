for (var i=1; i<=3;i++){
  let j = i;
  setTimeout(function() {
    console.log(`j: ${j}`)
  }, j * 1000);
}