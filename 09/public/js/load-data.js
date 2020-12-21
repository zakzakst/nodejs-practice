'use strict';

(() => {
  console.log('test');
  loadStaticData();
  loadXmlData('/xml-data');
  loadXmlData('/xml-data2');
  loadXmlJsonData();
})();

function loadStaticData() {
  fetch('/static-data')
    .then(res => {
      return res.json();
    })
    .then(data => {
      console.log('static-data', data);
    });
}

// XMLのパース：https://qiita.com/mfykmn/items/6534359a2ddf6c271802
function loadXmlData(url) {
  console.log(url);
  fetch(url)
    .then(res => {
      return res.text();
    })
    .then(data => {
      // テキストで取得してから「DOMParser」でパース
      const parser = new DOMParser();
      const xmlData = parser.parseFromString(data, 'text/xml');
      console.log('xml-data', xmlData);
    });
}

function loadXmlJsonData() {
  fetch('/xml-data3')
    .then(res => {
      return res.json();
    })
    .then(data => {
      console.log('xml-json-data', data);
    });
}
