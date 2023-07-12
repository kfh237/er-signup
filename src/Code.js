const curRev = 0.2;
const lastRevDate = new Date(2023, 5, 29);
const ss = SpreadsheetApp.openById('1h2mZPw-CIv0ajfLYrGS0lpYUk8yAM-_OKBFK_YSTzEk');
// const doc = DocumentApp.openById('1Yc4xXrn-XKqq_lSb9uUCUtkpers52OyHNCNsYKtVgcE');

// render the template and serve it
function doGet() {
  return HtmlService.createTemplateFromFile('Index').evaluate().setTitle('NYU Game Center Equipment Rental Policy');
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

//find student's info in spreadsheet
function lookupStudent(netid) {
  try {
    students = ss.getSheetByName('Seed Data').getRange('A2:H286').getValues();

    for (let student of students) {
      if (student[4] == netid) return student;
    }

    return false;
  } catch (e) {
    Logger.log(e);
    return false;
  }
}

// function showPolicy() {
//   return doc.getBody();
// }

function submitAgreement(student) {
  try {
    let sheet = ss.getSheetByName('Registered Students');
    sheet.appendRow(student);
    return true;
  } catch(e) {
    Logger.log(e);
    return false;
  }
}