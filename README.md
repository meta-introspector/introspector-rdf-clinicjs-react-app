---
title: Introspector React App
emoji: 🌐
colorFrom: blue
colorTo: yellow
sdk: docker
pinned: false
models:
- Xenova/detr-resnet-50
short_description: Introspector react app
---

# Introspector browser

This project displays and allows a user to browse and interact with a set of data that is available 
via recursive git submodules, so all data that is allowed is built into the base code.
The code that is executed can decide if it allows for more data to be loaded from outside.
So basically we want to point this at some other repos and then call it via urls to load more code.

### Functions

#### Load Datasets

Browse performance result datasets from hugging face and other sources.

#### Filter datasets

Filter performance data and sum it up again under different features.

#### Produce semantic web statements

Produce rdf statements from various sources and allow them to be signed with zkp 
as to thier execution validity.

#### Create functions from urls

Turn urls in the rdf into lambda functions that take in the context and produce results.
We want to create functions that are attached to the urls in the rdf and are called for each 
item when they are used. We can combine the calls from multiple statements in a way that makes sense.

#### Embed code in rdf

embed ts code in rdf and execute it according to rules.
translate ts code into new rdf via expansion, introspection, parsers, 
clinic js, perf recordings.
capture traces of executions of the code in statistical profiles.

#### Read submodules

define urls mappings for submodules to repos

#### Generate new webpages

Generate new websites from the rdf using typescript or python.
We can use LLMS to help this process.

#### Produce deep graph knowledge embeddings

#### Iframe report

#### Run notebooks

Run reports via notebooks

#### Run apps

#### Models

Load different apps and other servlets like streamlit and gradio via safe containers
import other results from other huggingface datasets.

##### Views
create custom displays via iframes.
and display other results from huggingface datasets.

##### Controller
create directory to select results

#### Generate logos and code 

Use ai services to generate logos and html pages for the project, give them feedback,
use autogpt or other tools.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

# reporting

We added in the resulting dataset as submodules for processing 
```
git submodule add https://huggingface.co/datasets/introspector/o1js-clinic inputs/huggingface/datasets/mina/o1js/o1js-clinic
git submodule add https://huggingface.co/datasets/introspector/o1js-clinic inputs/huggingface/datasets/mina/o1js-clinic
git submodule add https://huggingface.co/datasets/introspector/mina-snarky-asts inputs/huggingface/datasets/mina/mina-ocaml-asts
```

But instead of pushing those results to our docker container, we reference them via urls on hugging face.

`bash ./report.sh  >> frontend/introspector.ttl `
`rdf2dot frontend/introspector.ttl >  frontend/introspector.dot `

The rdf generated is very simple, we take the clinic html files we found in our submodule
and create a link to the original file.

```
for x in `find inputs/huggingface/datasets/mina/o1js-clinic -name \*clinic\*.html`;
do
    y=`echo $x | sed -e's!inputs/huggingface/datasets/mina/o1js-clinic/!!g'`
    echo "<https://huggingface.co/datasets/introspector/o1js-clinic/resolve/main/${y}>" a "<isp:clinic_report>".;
done

```

The verb `tree` will display directly, `raw` will show larger data and `resolve` will load the lfs data.

