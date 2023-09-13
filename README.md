## Developer Guide

1. **Install Yarn**
   The project are base on yarn, you need to install yarn in order to run and develop the project, here is the link with the step to install yarn https://classic.yarnpkg.com/en/docs/install/#windows-stable
2. **Install the package to run the project**
   After succeful install yarn, by running `yarn` command in terminal, in will start installing the package and create `yarn.lock` and `node_module`
3. **Running the project**
   There are ready written script in `package.json` file, if you wish to running the project in staging mode, copy the staging env to file name `.env-staging` and run the command `npm run develop-stg`, if wanna running the project with production setup, copy the production env to file name `.env-production` and run the command `npm run develop-prod`
4. **Start developing**
   The apps will running in localhost:8000, note that if there is others program running in port 8000, the apps will not run, the apps included hot reload, if any changes in code it will auto rebuild and reflect in browser.

## Components

All the components are base on materail-ui libery, if found any isuese please read the doc in [Material-UI](https://material-ui.com/components)

### QrcodePage

QrcodePage are the main component use in apps, in QrcodePage component it connecting web socket by using `awsIot.device` provided by aws sdk.

Noted that the device need and only can be connect in once, that way the connection code are placed outside of component function.

#### State

-   **tempQueueTopic** - use to store the topic `tempQueueList`
-   **qrcodeImg** - use to store image binary code
-   **loading** - use to store the loading state of calling api
-   **counter** - use to store the count down value for refresh the qrcode
-   **queueNumber** - use to store the queue number if user using form to get queue
-   **serverErrorMsg** - use to store and display the error message come back from api

### QueueDialog

QueueDialog is a form component for user manually key in information and get the queue number.

#### State

-   **open** - use for open and close the dialog
-   **newQueue** - use to store the object for submitting api to get the queue
-   **phoneErrorMsg** - use to display error message for phone number validation

#### function

-   **handleClickOpen** - use for open the dialog
-   **handleClose** - use for close the dialog and reset the **newQueue** state
-   **handleChange** - use for controlling the input with **newQueue** state base on input id to differentia the data
-   **handleSubmit** - use for validation and submitting the form

### QueueInfoDialog

QueueInfoDialog is a infomation dialog for showing the queue number if the api call was successfull, else if will show the error message from api.

QueueInfoDialog will auto close after 5 sec and reset state **queueNumber** and **serverErrorMsg** in QrcodePage

#### State

-   **open** - use for open and close the dialog

#### function

-   **handleClickOpen** - use for open the dialog
-   **handleClose** - use for close the dialog

## Deployment

Deployment script was written in `package.json` file, before running the command make sure the `.env.production` file included variable `S3_BUCKET_NAME`.

The deployment is deploy to AWS S3 bucket, make sure the bucket policy setup correctly and have cloudflare CDN mapping.

Once everything setup, just simply run command `npm run deploy-prod` for production, or `npm run deploy-stg` for staging.
