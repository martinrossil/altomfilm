// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
export default class Test extends HTMLElement {
    public constructor() {
        super();
        console.log('test');
        /*const firebaseConfig = {
            apiKey: "AIzaSyB7JXn3Gus2_iXX1xZn1pbWVKDmQrjE5GM",
            authDomain: "altomfilm.firebaseapp.com",
            databaseURL: "https://altomfilm-default-rtdb.europe-west1.firebasedatabase.app",
            projectId: "altomfilm",
            storageBucket: "altomfilm.appspot.com",
            messagingSenderId: "559355809225",
            appId: "1:559355809225:web:3c21278e3f4993c921ac18",
            measurementId: "G-LK42E35PFH"
        };
        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        const analytics = getAnalytics(app);*/
    }
}
customElements.define('test-element', Test);
