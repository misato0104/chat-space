#メッセージ送信用のformタグに.js-formという名のクラスが適用されている前提
$('.js-form').on('submit', function(){
  console.log('hoge');
});