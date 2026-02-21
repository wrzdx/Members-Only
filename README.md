# DevLounge

**Members Only** is an anonymous posting platform for members only. Think of it like an exclusive speakeasy for your thoughts. Only members can see who said what, while outsiders just get the juicy gossip without the receipts.

## Features

- Users can sign up but must enter a secret passcode to become a member.
- Anonymous posting where non-members can read stories, but only members can see who posted them
- Members can create titled posts with timestamps and content
- Only admin users can delete posts because they are the _elites_ :)

## Tech Stack

- **JavaScript** - programming language
- **Node** - JavaScript server-side runtime
- **Express** - backend server framework
- **PostgreSQL** - SQL database engine
- **Passport** - auth strategy provider
- **bcrypt** - hash and compare passwords
- **Express Validator** - data validation library
- **Node-Postgres** - database connector library
- **EJS** - templating engine
- **CSS** - UI styling

## Repo Structure

```
.
├── package.json
├── package-lock.json
├── public
│   └── styles.css
├── README.md
└── src
    ├── app.js
    ├── auth
    │   ├── session-config.js
    │   ├── strategy.js
    │   └── transformers.js
    ├── controllers
    │   └── contoller.js
    ├── db
    │   ├── pool.js
    │   ├── populatedb.js
    │   └── queries.js
    ├── middlewares
    │   └── auth.js
    ├── routes
    │   └── router.js
    ├── validators
    │   └── validators.js
    └── views
        ├── index.ejs
        └── partials
            ├── footer.ejs
            ├── header.ejs
            ├── login.ejs
            ├── newPost.ejs
            ├── post.ejs
            ├── posts.ejs
            └── register.ejs
```

## Snapshots

![preview1.png](/public/image.png)
| ![preview2.png](/public/image2.png) | ![preview1.png](/public/image3.png) |
| --- | --- |
