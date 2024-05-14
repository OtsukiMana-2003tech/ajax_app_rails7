// HTMLを生成する関数
const buildHTML = (XHR) => {
  const item = XHR.response.post;
  const html = `
    <div class="post">
      <div class="post-date">
        投稿日時：${item.created_at}
      </div>
      <div class="post-content">
        ${item.content}
      </div>
    </div>`;
  return html;
};

function post (){
  const form = document.getElementById("form");
  form.addEventListener("submit", (e) => {
    e.preventDefault(); // デフォルトで設定されている「ブラウザ側の"ボタンをクリックした"」という処理を無効化する
    const formData = new FormData(form);
    const XHR = new XMLHttpRequest();
    XHR.open("POST", "/posts", true); // リクエストをPOSTに指定し、非同期通信をONにする
    XHR.responseType = "json"; // レスポンスで返すデータ型をJSONに指定する
    XHR.send(formData); // フォームの内容をサーバに送信する
    XHR.onload = () => {
      if (XHR.status != 200) {
        //リクエストが失敗した場合の処理
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null; // JavaScriptの処理を抜ける
      };
      // リクエストが成功した場合の処理
      const list = document.getElementById("list");
      const formText = document.getElementById("content");
      list.insertAdjacentHTML("afterend", buildHTML(XHR)); // HTMLを生成する関数を呼び出す
      formText.value = "" // 入力処理完了後、入力フォームを空にする
    };
  });
};

// ページの読み込みをトリガーとして処理を実行する
window.addEventListener('turbo:load', post);