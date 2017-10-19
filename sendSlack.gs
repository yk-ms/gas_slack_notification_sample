function doPost(e) {
  var token = ""; //slackのトークン
  var channel = "gas"; //投稿先チャンネル名
  var username = "testbot"; //BOTの名前
  var json = e.postData.getDataAsString();
  var payload = JSON.parse(json);
  var action = payload.action;
  if (action === 'labeled') {
    var labelName = payload.label.name;
    var url = payload.pull_request.html_url;
    if (labelName === 'enhancement') {
      var text = url + ' に「' + labelName + '」がつけられました。レビューお願いします！';
      UrlFetchApp.fetch("https://slack.com/api/chat.postMessage?token=" + token + "&channel=%23" + channel + "&username=" + username + "&text=" + text);
    }
  }
}
