function processEmails() {

  data = [];
  threads = GmailApp.search('in:inbox from:scholar-alerts -label:parsed');
  const label = GmailApp.getUserLabelByName('parsed');
  if (label == null)
  {
    throw new EvalError("Create a label called 'parsed' in your gmail!!");
  }

  Logger.log("Got "+threads.length+" threads to process");
  for (thread of threads)
  {
    msgs = thread.getMessages()
    Logger.log("Got "+msgs.length+" messages to process");
    for (msg of msgs)
    {
      htmlstr = msg.getBody();
      dateSent = msg.getDate();
      subject = msg.getSubject();
      rows = htmlstr.split("<a href=\"");
      for (row of rows)
      {
        if (row.startsWith("https://scholar.google.com/scholar_url")) //Splits body into chunks starting with each link and then only keeps those that are scholar links
        {
          anchor = row.split("</a>")[0]; //Crappy way to throw away the text after the anchor
          anchortokens = anchor.split("\""); //Split it on a double quote
          url = anchortokens[0].replaceAll("&amp;","&"); //And the first chunk is the href, but need to reverse html encoding of amp
          title = anchortokens[anchortokens.length-1].replaceAll(/<\/?[^>]+(>|$)/g, ""); //Last chunk is the text of the link, which is the title, then strip out the html charactures
          data.push([dateSent, subject, url, title]);
        }
      }
      if (data.length == 0)
      {
        throw new Error("Got matching email but no links... The parser is probably broken...");
      }
    } //Loop over messages
    thread.addLabel(label);
  } //Loop over threads
  return data;
}

function appendToSpreadsheet(data)
{
  var sheet= SpreadsheetApp.openById('1gdQcfoKH9NH5zWK1STzZ5YDzQuHWqIF1UXC7M_JpO54').getSheetByName('Sheet1');
  for (row of data)
  {
    sheet.appendRow(row);
  }
}

function dailyRun()
{
  Logger.log("Fetching emails..");
  data = processEmails();
  Logger.log("Got "+data.length+" links, appending to spreadsheet...");
  appendToSpreadsheet(data);
  Logger.log("Done!");
}
