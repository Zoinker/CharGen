Webprogramming (TÖL306)
Final Project: Fantasy Character Generator

By:
	Einar Jóhannesson (eij1)
	Simon Johannes Zettler (sjz1)
	
## Description:
This is a webpage that allows the user to create a fantasy character, using an interface similar to several classic computer role-playing games (cRPG's) by specifying a name, race, gender and age as well as a system to generate stats and select skills for said character. The webpage allows the user to generate a description of their character in a text box to the right by hitting generate or preview. Hitting preview also allows the user to save their character on their machine and select a saved character from a list below the description box. The user can then delete a selected character using the delete button.

The Webpage has a login feature and a rudimentary comments section. The creator can be accessed whether the user is logged in or not, but the comments section only shows up when the user is logged in.

## Implementation:
The page was built using a generated Express page and built upon from there. The character info is saved as a JSON file that is stored locally. Initially we wanted to save the character data into the database alongside the login information so that users could access it from any machine, but unfortunately we couldn't figure out how in time and instead implemented a comments section instead to fulfill the backend part of the project. Since we used Express, we used Jade to build the HTML, while the aesthetics were done using Bootstrap.

## Installation

-Set up database in progress
 (two tables users and wall, like in schema.sql)
-Configure database in `.env`

Commandline:
* NPM install
* bower install
* Gulp inspect
* Node public/scripts/schema.js (this will erase * everything * and create charts again)
* NPM start
* open localhost:3000 in your browser (Chrome or Firefox) to view webpage

