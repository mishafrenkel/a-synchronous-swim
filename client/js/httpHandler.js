(function() {

  const serverUrl = 'http://127.0.0.1:3000';
  // fetch(serverUrl).then(data => {
  //   console.dir(JSON.stringify(data))
  //   if (response.ok) {
  //     SwimTeam.move(response.json());
  //   }
  // });
setInterval(function() {
  $.get(serverUrl, function(data) {
    console.dir(data);
    SwimTeam.move(data);
  }); 
}, 1000);

})();
