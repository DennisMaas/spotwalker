import michel from '../../images/michel.jpg'
import karoviertel from '../../images/Karoviertel.jpg'

export default function PlacesDb(){
    const placesDb = [
        {
            id:"michelsId",
            primaryPictureUrl:{michel},
            type: "architecture",
            title: "Der Michel",
            street: "Englische Planke 1",
            address: "Englische Planke 1, 20357 Hamburg",
            placeDescription: "Die ersten Häuser entstanden im Karoviertel wahrscheinlich zu Beginn des 17. Jahrhunderts.  ",
            pictureDescription: "Für diese schönen farbig gestrichenen Häuser sollte man eine möglichst weite Brennweite benutzen. ",
            aperture: "f8",
            focalLength: "20",
            shutterSpeed: "320",
            iso: "200",
            youTubeUrl: "https://youtu.be/xZuCQPrUFlc",
            extraOne: "Stitching-Software",
            extraTwo: "Ultraweitwinkel"
        },
        {
            id:"karosId",
            primaryPictureUrl:{karoviertel},
            type: "architecture",
            title: "Die Karolinenstraße",
            street: "Karolinenstraße 24",
            address: "Karolinenstraße 24, 20459 Hamburg",
            placeDescription: "Hamburgs bekannteste Kirche. Kann gerne betreten werden, aber bitte ohne Blitz fotografieren und die Hausregeln beachten. Der Eintritt zum Turm ist nicht gratis, aber dafür auch nicht umsonst, denn die Perspektive auf Hamburg ist einmalig und besonders zum Sonnenuntergang bietet sich ein einmaliges Panorama.",
            pictureDescription: "Bei diesem Bild heißt es Ausschau halten und in die Knie gehen. Der Durchgang vom Thielickestieg bietet einen natürlich Rahmen für den Michel. Geschossen wurden 9 Einzelaufnahmen, die danach zu einem Panorama zusammengesetzt worden sind. Zum einen vergrößert das den Blickwinkel, zum anderen natürlich die Pixelzahl und damit die maximal mögliche Druckgröße.",
            aperture: "f0",
            focalLength: "20",
            shutterSpeed: "160",
            iso: "200",
            youTubeUrl: "https://youtu.be/xZuCQPrUFlc",
            extraOne: "",
            extraTwo: ""
        },

    ];
}