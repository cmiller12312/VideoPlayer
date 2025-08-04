A video program that lets users watch and upload mp4 files to a channel. As well as some other features such as downloading videos and such.

note the python must be compiled to be called by the javscript and located within a dist folder. This can be changed in main.js.

This program relies on the VideoPlayerBackend to work. Without it, it can run but will not get videos or users.

setup:

1: initialize js
2: download electron for js
3: download python packages
4: compile python into onefile
5: ensure python exe is in dist/ directory or change to custom directory

project info:

This project was made for learning reasons to help me better understand what goes into making a software and it did just that.
This program taught me what works and what doesnt. 

What was learned:
through out this project I learned quite a few things. for starters I learned that making a python subprocess is not the best idea for software designs. While it works its not as fast and ultimately unneeded. Especially since react with its tools can acomplish pretty much the same thing that I used the subprocess for. During the design process it didnt occur to me that I could not only expose the routes on the server but could also expose static files like images. My program shows this as I send over the pfps via http and then write them to the strout from the python subprocess so the main program could use it. I couldve avoided this entirely by exposing all of the images in the Django server. I learned this about half way through the project so it can be seen being utilized for videos and such to avoid making it slower than needed. On that note I exposed the videos via Django but in production I would not do this and instead use a reverse proxy to handle images and videos. This is because doing it the way I did can work but it clogs the Django server in a real world use. This was my first time using electron in a project and I learned how powerful of a tool it can be for making desktop apps. For future projects I intend to combine react with Electron to make powerful frontend programs. This project taught me how to utilize Djangos features better as well. I got a better understanding of not only how REST frameworks work but also a better understanding of how to implement user authenication. Overall this program helped me get a better grasp on the design process for softwares and helped me better understand what is good practice and bad practice. This project gets me excited to make new projects to one up myself with what ive learned.

