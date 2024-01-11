//Start of posting tweets logic

import formidable from "formidable";
import { createTweet } from "../../../db/tweets.js";
import { tweetTransformer } from "../../../transformers/tweet.js";
import { createMediaFile } from "../../../db/mediaFiles.js";
import { uploadToCloudinary } from "../../../utils/cloudinary.js";


export default defineEventHandler(async(event) => {
    // form constructor 
    const form = formidable({ multiples: true });


    //get data from the form (text and media)
    const response = await new Promise((resolve, reject) => {
        form.parse(event.req, (err, fields, files) => {
            if (err) {
                reject(err);
            }
            resolve({ fields, files });
        });
    });

    const { fields, files } = response;

    //Extract the userId 
    const userId = event.context.auth.user.id;

    if (userId) {
        const tweetData = {
            text: fields.text[0],
            authorId: userId,
        };


        const replyTo = fields.replyTo
        console.log("replyTo = " + replyTo)

        if (replyTo && replyTo != null && replyTo !== 'undefined' && replyTo !== 'null') {
            tweetData.replyToId = replyTo
            console.log("tweetData.replyToId = " + tweetData.replyToId)


        }


        /*    if (fields.replyTo) {
               const replyTo = fields.replyTo[0].toString()
                   //  if (replyTo && replyTo !== null) {
               tweetData.replyToId = replyTo
               console.log("This is reply to  : " + replyTo)
                   // }

           } */


        const tweet = await createTweet(tweetData);

        //console.log(files)

        const filePromises = Object.keys(files).map(async(key) => {
            const file = files[key][0];


            const cloudinaryRessource = await uploadToCloudinary(file.filepath);
            //console.log(" Response is : " + JSON.stringify(cloudinaryRessource));
            //console.log(" cloudinaryRessource.secure_url is " + cloudinaryRessource.secure_url)
            return createMediaFile({
                url: cloudinaryRessource.secure_url,
                providerPublicId: cloudinaryRessource.public_id,
                userId: userId,
                tweetId: tweet.id,
            });
        });

        await Promise.all(filePromises);

        return {
            //  files,
            tweetData: tweetTransformer(tweet),
        };
    }

    return {
        tweetData: null,
    };
});