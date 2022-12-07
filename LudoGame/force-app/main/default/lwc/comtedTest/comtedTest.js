import { LightningElement, wire, track } from "lwc";
import { loadScript } from "lightning/platformResourceLoader";
import cometdlwc from "@salesforce/resourceUrl/cometdlatest";
import getSessionId from '@salesforce/apex/LudoService.getSessionId';


export default class ComtedTest extends LightningElement {
 libInitialized = false;
 sessionId;
 error;


constructor() {
    super();
    loadScript(this, cometdlwc).then( () => {
        getSessionId().then((data) => {
            this.sessionId = data;
            this.error = undefined;
            this.initializecometd();
        });

    });

}

initializecometd() {

  if (this.libInitialized) {
    return;
  }

 this.libInitialized = true;

 //inintializing cometD object/class
 var cometdlib = new org.cometd.CometD();
        
//Calling configure method of cometD class, to setup authentication which will be used in handshaking
  cometdlib.configure({
    url: window.location.protocol + '//' + window.location.hostname + '/cometd/43.0/',
    requestHeaders: { Authorization: 'OAuth ' + this.sessionId},
    appendMessageTypeToURL : false
});

cometdlib.websocketEnabled = false;

cometdlib.handshake(function(status) {
            
    if (status.successful) {
        // Successfully connected to the server.
        // Now it is possible to subscribe or send messages
        console.log('Successfully connected to server');
        cometdlib.subscribe('/event/LudoPlatformEvent__e', function (message) {
                  console.log('subscribed to message!'+ message);
       });
    } else {
        /// Cannot handshake with the server, alert user.
        console.error('Error in handshaking: ' + JSON.stringify(status));
     }
   });
}
}
a