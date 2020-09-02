# Fluent Web

## Launch

Start app: $ DEBUG=fluent:* npm start

Start app with Nodemon: $ nodemon

Start Heroku app locally: $ heroku local

## MongoDB

Create a database directory:
	$ mkdir ~/data/db
	$ mongod --dbpath ~/data/db

Launch MongoDB: $ mongod

### MDlab

Connect fom shell:
$ mongo "mongodb+srv://<HOSTNAME>/<DATABASE>" --username <USERNAME>

Connect with Heroku:
heroku config:set MDLAB_URI=mongodb+srv:<URI>/<DATABASE>

Dump local database:
$ mongodump -h localhost:27017 -d <database>

Dump to Heroku (uses dump/ folder):
mongorestore --uri mongodb+srv://<USER>:<PASSWORD>@mongodb+srv://<URI>

Set database URI by environment variable:
$ export NODE_ENV=production
$ export MONGODB_URI='mongodb+srv://<username>:<password>@<hostname>/<database>'
$ nodemon

### Schemes

## Schemes

```javascript
db.locations.save({
  name: 'Starcups',
  address: '125 High Street, Reading, RG6 1PS',
  rating: 3,
  facilities: ['Hot drinks', 'Food', 'Premium wifi'],
  coords: [-0.9690884, 51.455041],
  openingTimes: [{
    days: 'Monday - Friday',
    opening: '7:00am',
    closing: '7:00pm',
    closed: false
  }, {
    days: 'Saturday',
    opening: '8:00am',
    closing: '5:00pm',
    closed: false
  }, {
    days: 'Sunday',
    closed: true
  }]
})
```

```javascript
db.locations.update({
  name: 'Starcups'
}, {
  $push: {
    reviews: {
      author: 'Simon Holmes',
      _id: ObjectId(),
      rating: 5,
      timestamp: new Date("Mar 12, 2017"),
      reviewText: "What a great place."
    }
  }
})
```

```javascript
db.locations.update({
  name: 'Starcups'
}, {
  $push: {
    reviews: {
      author: 'Charlie Chaplin',
      _id: ObjectId(),
      rating: 3,
      timestamp: new Date("June 16, 2013"),
      reviewText: "It was okay. Coffee wan\'t great, but the wifi was fast."
    }
  }
})
```
