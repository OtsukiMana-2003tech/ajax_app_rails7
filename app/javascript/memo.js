function post (){
  const form = document.getElementById("form");
  form.addEventListener("submit", (e) => {
    e.preventDefault(); // デフォルトで設定されている「ブラウザ側の"ボタンをクリックした"」という処理を無効化する
    const formData = new FormData(form);
    const XHR = new XMLHttpRequest();
    XHR.open("POST", "/posts", true); // リクエストをPOSTに指定し、非同期通信をONにする
    XHR.responseType = "json"; // レスポンスで返すデータ型をJSONに指定する
    XHR.send(formData); // フォームの内容をサーバに送信する
    XHR.onload = () => { // リクエストが成功した場合の処理
      if (XHR.status != 200) { // ステータスコードが正常でない場合はエラーを表示する
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
      } else {
        // メモの内容を再読み込みする
        location.reload();
      }
    };
  });
};

// ページの読み込みをトリガーとして処理を実行する
window.addEventListener('turbo:load', post);