## Get started

clone the repo

```bash
  git clone https://github.com/Rajek88/fudge-test-page.git
```


## Installation

Install the necessary dependencies with yarn

```bash
  cd fudge-test-page
  yarn
```

## Start the client
```bash
  npm run dev
```

## Go to admin page
```bash
  http://localhost:3000/admin
```
### Admin page features:

You can invite anyone to a specific team.
You can see your invites and their status.

## Go to dashboard page
```javascript
  http://localhost:3000/dashboard
```
if you are not logged in, the app will redirect you to:
```javascript
  http://localhost:3000/login
```
You can also signup from
```javascript
  http://localhost:3000/signup
```
### Dashboard
On dashboard, you can see all of the teams that you are a member of and all of the teammates and their status i.e. Online/Offline.

### Team invites
You will also receive your team invite link on mail, on clicking the link, you will be added to the team.

Note: the invite link is valid for only 10 minutes. On expiry, you need to send the invite again from admin page.