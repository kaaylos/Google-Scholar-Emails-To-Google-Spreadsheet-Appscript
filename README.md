# Google-Scholar-Emails-To-Google-Spreadsheet-Appscript
Google Appscript designed to run on a daily trigger to parse Google Scholar alerts and append the links there-in to a spreadsheet...

# Pre-reqs
- Enough experience of Google Apps Script to understand these sparce instructions...
- A spreadsheet dedicated to recieving the new links, just create an empty one!
- A label 'parsed' on your gmail used by the script to mark which emails it's processed

# Installation
- Create a new apps script project and paste the contents of script.js into it
- Replace the spreadsheet id in appendToSpreadsheet() with your own
- Run the function dailyRun() once by hand to confirm it picks up the emails, extracts each of the listed papers, and appends them to the spreadsheet
- Add a daily timer to your taste...

# Limitations
- Written by me, for me, use at your own peril
- Very crude parser which WILL break when Google inevitably change the email format
