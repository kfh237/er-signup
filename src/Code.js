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
    let data = {
      'type': 0,
      'student': false
    };

    let registered = ss.getSheetByName('Registered Students').getRange('A:K').getValues();
    for (let r of registered) {
      if (r[4] == netid) {
        data = {
          'type': 2,
          'student': r
        };

        return JSON.stringify(data);
      }
    }

    let seeds = ss.getSheetByName('Seed Data').getRange('A2:H286').getValues();
    for (let seed of seeds) {
      if (seed[4] == netid) {
        data = {
          'type': 1,
          'student': seed
        };

        return JSON.stringify(data);
      }
    }

    return JSON.stringify(data);
  } catch (e) {
    Logger.error(e);
    return { 'type': 3, 'error': e };
  }
}

// function showPolicy() {
//   return doc.getBody();
// }

function submitAgreement(student) {
  try {
    student.push(new Date(), 0, 0);

    MailApp.sendEmail({
      to: student[3],
      replyTo: 'hohn.karl@nyu.edu',
      subject: 'Thanks for registering!',
      body: "Thank you for signing up with the NYU Game Center Equipment Room. You are now able to rent equipment. Contact Karl Hohn if you have any further questions."
    });

    ss.getSheetByName('Registered Students').appendRow(student);

    return true;
  } catch(e) {
    Logger.log(e);
    return false;
  }
}