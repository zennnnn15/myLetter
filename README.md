# 💌 Confession Letter - GitHub Pages

This version is pure HTML/CSS/JavaScript, so it can be hosted free on GitHub Pages.

## Email notifications

The YES/NO response is sent through EmailJS to:

**kyzencamposwork@gmail.com**

Flow:

Visitor -> GitHub Pages -> YES/NO -> EmailJS -> Gmail

### Setup

1. Create a free account at https://www.emailjs.com/
2. Create an Email Service connected to the Gmail account that will send the notification.
3. Create an Email Template.
4. Put these variables in the template:

Subject:
`💌 New Confession Response: {{answer}}`

Body:
`Someone answered your confession!`

`Answer: {{answer}}`
`Date: {{date}}`
`Time: {{time}}`
`{{message}}`

5. Copy your EmailJS Public Key, Service ID and Template ID.
6. Open `config.js` and replace the three `YOUR_...` values.
7. Upload the files to a GitHub repository.
8. Go to Settings -> Pages -> Deploy from branch -> main -> /root -> Save.
9. GitHub will provide your public link.

### Important

Do NOT put your Gmail password or SMTP password in JavaScript.

The recipient email is already configured as:
`kyzencamposwork@gmail.com`

The EmailJS public key/service/template identifiers are intended for browser-side use. Configure your EmailJS service and limits appropriately.
