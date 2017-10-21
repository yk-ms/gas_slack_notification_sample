function doPost(e) {
  var url = 'slack_webhook_url';
  var channel = "gas"; //投稿先チャンネル名
  var username = "testbot"; //BOTの名前
  var json = e.postData.getDataAsString();
  var payload = JSON.parse(json);
  var action = payload.action;
  if (action === 'labeled') {
    var labelName = payload.label.name;
    var pullRequestUrl = payload.pull_request.html_url;
    var text = pullRequestUrl + ' に' + labelName + 'がつきました';
    var body = ' @here レビューお願いします！';
    UrlFetchApp.fetch(url, {
      method: 'post',
      payload: {
        payload: JSON.stringify({
          username   : username,
          channe    : channel,
          attachments: [
            {
              text: [ text, body ].join("\n"),
              mrkdwn_in: ["text"],
            }
          ],
          link_names: 1,
        }),
      }
    });
  }
}
