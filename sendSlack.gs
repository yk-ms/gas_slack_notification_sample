function doPost(e) {
  var url = 'slack_webhook_url';
  var channel = "gas"; //投稿先チャンネル名
  var userName = "testbot"; //BOTの名前
  var json = e.postData.getDataAsString();
  var payload = JSON.parse(json);
  if (isSendAction(payload)) {
    snedSlack(url, userName, channel, sendText(payload))
  }
}

function sendText(payload) {
  var labelName = payload.label.name;
  var pullRequestUrl = payload.pull_request.html_url;
  var text = pullRequestUrl + ' に「' + labelName + '」がつきました\n@here レビューお願いします！';
  return text;
}

function isSendAction(payload) {
  // ラベルをつける以外のアクションは通知しない
  if (payload.action !== 'labeled') {
    return false;
  }
  // 通知対象のラベルの名前
  if (payload.label.name === 'enhancement') {
    return true;
  }
  return false;
}

function snedSlack(url, userName, channel, text) {
  UrlFetchApp.fetch(url, {
    method: 'post',
    payload: {
      payload: JSON.stringify({
        username   : userName,
        channe    : channel,
        attachments: [
          {
            text: text,
            mrkdwn_in: ["text"],
          }
        ],
        link_names: 1,
      }),
    }
  });
}
