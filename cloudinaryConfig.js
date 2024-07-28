import React from 'react';
import { SafeAreaView } from 'react-native';
import { AdvancedImage } from 'cloudinary-react-native';
import { Cloudinary } from "@cloudinary/url-gen";

// Create a Cloudinary instance and set your cloud name.
const cld = new Cloudinary({
    cloud: {
        cloudName: 'demo'
    }
});

export default function App() {

    // cld.image returns a CloudinaryImage with the configuration set.
    const myImage = cld.image('sample');

    // The URL of the image is: https://res.cloudinary.com/demo/image/upload/sample

    // Render the image in a React component.
    return (
        <SafeAreaView>
            <AdvancedImage cldImg={myImage} style={{ width: 300, height: 200 }} />
        </SafeAreaView>
    )
};