# Fluent Web

## Run the Stack

Run Database:

```
$ export NODE_ENV=production
$ export MONGODB_URI='mongodb+srv://<username>:<password>@<hostname>/<database>'
$ mongo "mongodb+srv://cluster0.e3g4l.mongodb.net/fluent" --username michael
```

Run Angular App:

```
$ cd app_public
$ ng serve
```

## Launch

Start app: $ DEBUG=fluent:* npm start

Start app with Nodemon: $ nodemon

Start Heroku app locally: $ heroku local

### Kill Nodemon

Get PID:
$ ps -ef | grep node

Kill node app:
sudo kill -9 <PID>

## MongoDB

Create a database directory:
	$ mkdir ~/data/db
	$ mongod --dbpath ~/data/db

Launch MongoDB: $ mongod

Launch locally:
$ mkdir -p ~/data/db
$ mongod -dbpath ~/data/db

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

### Use MongoDB

* Each entry in a database is called a **document**
* A group of documents is called **collection** (think table)
* In Mongoose, the definition of a document is called a **schema**
* Each individual data entity is defined in a schema is called a **path**.

Connect to database:
$ mongo "mongodb+srv://<HOST>/<DATABASE>" --username <USERNAME> --password <PASSWORD>

Show all databases:
$ show dbs

Show collections in database:
$ show collections

Select database:
$ use <DATABASE>

Create collection:
$ db.<COLLECTION>.save({
	  <DOCUMENT>
	})

Adding subdocuments:
$ db.<COLLECTION>.update({
	  name: <OBJECT>
	}, {
		$push: {
			<PATH>: {
				<SUBDOCUMENT>
			}
		}
  })

Query information:
$ db.<COLLECTION>.find()
$ db.<COLLECTION>.find().pretty()


#### Mongoose schema

`pathname: type`

Allowed types:
* String
* Number
* Date
* Boolean
* Buffer (binary information)
* Mixed (any data type)
* Array
* ObjectId

### heroku

Set environment variables on Heroku:
$ heroku config:set NODE_ENV=production
$ heroku config:set MONGODB_URI='mongodb+srv://<username>:<password>@<hostname>/<database>'

Push to Heroku:
$ git add -A
$ git commit -m "Commit comment"
$ git push heroku master
