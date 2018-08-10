/* express configure */
const express = require('express');
const app = express();

const dbconn = require('./libs/dbconn');
const content = require('./libs/schema');

/* mongo db connect */
const mongoose = require('mongoose');
dbconn.init(mongoose);

const db = mongoose.connection;

app.get('/', function (req, res) {
  content.find(function (err, contents) {
    if (err) return console.error(err);
    console.log(contents);
    let page = `
      <style>
      table {
        border-collapse: collapse;
        text-align: left;
        line-height: 1.5;
      }
      table th {
          padding: 10px;
          font-weight: bold;
          vertical-align: top;
          color: #369;
          border-bottom: 3px solid #036;
      }
      table th {
          width: 150px;
          padding: 10px;
          font-weight: bold;
          vertical-align: top;
          border-bottom: 1px solid #ccc;
          background: #f3f6f7;
      }
      table td {
        width: 350px;
        padding: 10px;
        vertical-align: top;
        border-bottom: 1px solid #ccc;
      }
      </style>
      <table>
      <th>
        정렬 번호
      </th>
      <th>
        게시물 제목
      </th>
      <th>
        작성자
      </th>
      <th>
        작성일
      </th>
      <th>
        게시물 ID
      </th>`;
    let counter = 0;
    contents.forEach(function (item) {
      page =
        `${page}<br \> <tr> <td>
        ${counter} 
        </td> <td><a href="/page/${item.id}">
        ${item.title}
        </a></td> <td>
        ${item.writer}
        </td><td>
        ${item.date}</td><td>
        ${item.count}</td></tr>`;
      counter++;
    });
    page += `</table>`;
    res.send(page);
  });
});

app.get('/setup', (req, res) => {
  db.on('error', console.error.bind(console, 'connection error!'));
  db.once('open', function () {
    console.log('connection succesful');
  })
  res.send("conn done");
});

app.get('/createpage', (req, res) => {
  const page = new content(
    {
      writer: "Haryun",
      password: "1234",
      title: "TestPageTitle",
      contents: "TestPageContent",
      comments: [{
        name: "Haryun2",
        memo: "HAHAHAHAHA"
      }]
    }
  );

  page.save(function (err) {
    if (err) console.log(err);
  });

  content.find(function (err, contents) {
    if (err) return console.error(err);
    console.log(contents);
    res.send(contents);
  });

});

app.get('/readpage', (req, res) => {
  content.find(function (err, contents) {
    if (err) return console.error(err);
    console.log(contents);
    res.send(contents[0]);
  });
});

app.listen(3000, function () {
  console.log("localhost:3000 Listening!");
});