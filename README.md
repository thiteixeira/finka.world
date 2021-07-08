# Finka World

This is the main repository of Finka.World.

## Tech Stack

This project uses a Node backend with Bootstrap front-end. The code is deployed to Heroku and it uses a Mongo Atlas Db.

## Running the code locally

To install nodemon, run `npm i -g nodemon`. It will automatically reload the server on changes.

```bash
git clone https://github.com/finka-dev/finka.world.git
cd ~/finka.world
npm install
nodemon
```

On a browser, navigate to `http://localhost:3000/`

## Working with Mongo

On a new terminal window, run `mongo` to open the Mongo shell.

```bash
show dbs # will show a list of available projects

use finka # finka should appear on the list

show collections # to list available tables

db.users.find().pretty() # will show a list of registered users
```

The `User` model comprises of the following key/value pairs:

```
{
	"_id" : ObjectId("5fcc06030cafed690a781cf4"),
	"videos" : [{list of videos added to the account, if any}],
	"username" : "{username}",
	"email" : "{email}",
	"salt" : "{salt}",
	"hash" : "{long_hash}",
	"__v" : 0
}
```

The `Videos` model comprises of the following key/value pairs

```
{
	"_id" : ObjectId("5ff215f5b8581bd62363bd67"),
	"authors" : [
		"{author_1}"
	],
	"category" : "{category_name}",
	"title" : "{video_title}",
	"short_description" : "{video_short_description}",
	"long_description" : "{video_long_description}",
	"profession" : "{video_profession_field}",
	"price" : {video_price},
	"date" : {date},
	"__v" : 0
}
```

Updating entries in the database can be done with `findOneAndUpdate` command for instance.

## Deploying to code

Any merges to master will automatically trigger a deploy to production. Merges to master should be done via Pull Requests, approved (if multiple devs), and tested locally.

## Creating Issues

New issues should be submitted using the Issues tab, preferably using tags such as `bug`, `new feature request`, etc.
