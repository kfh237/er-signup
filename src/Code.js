const curRev = 0.2;
const lastRevDate = new Date(2023, 5, 29);
const ss = SpreadsheetApp.openById('1h2mZPw-CIv0ajfLYrGS0lpYUk8yAM-_OKBFK_YSTzEk');
// const doc = DocumentApp.openById('1Yc4xXrn-XKqq_lSb9uUCUtkpers52OyHNCNsYKtVgcE');

let students;
let curStudentNetId;

// render the template and serve it
function doGet() {
  return HtmlService.createTemplateFromFile('Index').evaluate().setTitle('NYU Game Center Equipment Rental Policy');
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

//find student's info in spreadsheet
function lookupStudent(netid) {
  students = ss.getSheetByName('Seed Data').getRange('A:H').getValues();

  for (let student of students) {
    Logger.log(student);
    if (student[4] == netid) {
      curStudentNetId = netid;
      return student;
    }
  }

  return false;
}

function updateStudent(data) {
  console.log(data);
}

// function showPolicy() {
//   return doc.getBody();
// }

function submitAgreement() {
  return true;
}