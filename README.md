# Instagram top hastags associated 

Exam 1 using node + express + react + Mongo app generate for the [WebDev class at uniandes](johnguerra.co/classes/webDevelopment_spring_2018/)

This app lets you search for a hashtag on Instagram. It displays the top 10 associated hastags with it and also the images. The images come with a progress bar that tells you how many of these top 10 hashtags they have. You can also navigate trough hastags by clicking on the results. All the search history is saved and you can also navigate trough it. 


Started from the tamplate at the following [github repository](https://github.com/john-guerra/node_express_react).

Where the Express app was generate using express generator and the react app on the frontend folder with create-react-app.
# Creative addition
You can click on the top hashtags or on the hashtags attached to each image to search for that tag. This way you can explore related hastags easily.
You can also search for any historically searched hashtags by clicking on them.
I also added a fill-bar to express how many of the top hashtags are attached to each featured image. 

# Running the demo
  * Set-up and environment variable *MONGODB_URI* to the url of your mongo database it can be local or remote (with credentials included) or change the constant *url* at /routes/index.js
  * Follow these steps

```
npm install
cd frontend
yarn install
yarn build
cd ..
npm start
```
Then open your browser on http://localhost:3001

You can see the result [here](https://hastaginsta.herokuapp.com/)

License: MIT


