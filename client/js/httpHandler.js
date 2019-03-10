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


$.ajax({ 
  url: "http://127.0.0.1:3000/water-lg.jpg", 
  // timeout:5000,
  contentType: 'image/jpg',
  success: function(data) {
    $('.pool').append(`<img src="${data}"/>`);
  },
  error: function() {
    console.error('Sorry, image not found.');
  }
});
})();
