# SpeakApp by LinkUp

A simple anonymous feedback website that can be hosted free with GitHub Pages and connected to a Google Sheet through Google Apps Script.

## Files

- `index.html` — page structure
- `styles.css` — design and LinkUp branding
- `script.js` — sends feedback to Google Sheets
- `google-apps-script.gs` — backend code to paste into Google Apps Script
- `assets/linkup-logo.png` — company logo

## 1. Connect your Google Sheet

1. Open the Google Sheet that should receive feedback.
2. Go to **Extensions → Apps Script**.
3. Delete the starter code.
4. Open `google-apps-script.gs`, copy all its contents, and paste them into Apps Script.
5. At the top of the code, keep `SHEET_NAME = "Feedback"` or change it to your preferred tab name.
6. Click **Deploy → New deployment**.
7. Select **Web app**.
8. Set **Execute as** to **Me**.
9. Set **Who has access** to **Anyone**.
10. Click **Deploy**, approve permissions, and copy the Web App URL.

## 2. Google Apps Script connection

The deployed Google Apps Script Web App URL is already configured in `script.js`:

```js
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyyRr82PxQkcqtZvzDE4rBpkuQNGwqou275kf05YdpRkAettD__J54H5SSRc3k5R-8/exec";
```

No further editing is required before uploading to GitHub.

## 3. Upload to GitHub

1. Create a new GitHub repository, for example `speakapp`.
2. Upload all files and the `assets` folder.
3. Open the repository **Settings**.
4. Go to **Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Select the `main` branch and `/root`, then click **Save**.
7. GitHub will show the live website address after deployment.

## Privacy notes

The form does not ask for a name or email. The supplied code stores only:

- submission timestamp
- feedback type
- feedback message

GitHub Pages and Google may still create normal technical server logs. Avoid promising absolute anonymity, and ask users not to include personal or sensitive information.

## Test before launch

Submit one test message and confirm that a new row appears in the `Feedback` sheet tab.
