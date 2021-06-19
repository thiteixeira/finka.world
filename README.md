# Finka World

This is the main repository of Finka.World.

## Tech Stack
This project uses a Node backend with Bootstrap front-end. The code is deployed to Heroku and it uses a Mongo Atlas Db.

## Running the code locally
To install nodemon, run `npm i -g nodemon`. It will automatically reload the server on changes.

```bash
git clone https://github.com/finka-dev/finka.world.git
cd ~/finka.world
nodemon
```
On a browser, navigate to `http://localhost:3000/`


## Deploying to code
Any merges to master will automatically trigger a deploy to production. Merges to master should be done via Pull Requests, approved (if multiple devs), and tested locally.


## Creating Issues
New issues should be submitted using the Issues tab, preferably using tags such as `bug`, `new feature request`, etc.


