import { LightningElement,api, track } from 'lwc';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
import cometd from '@salesforce/resourceUrl/cometd';
import getSessionId from '@salesforce/apex/LudoService.getSessionId';
import {
    fireComponentEventHelper
} from 'c/ludoUtilityServices';

import {
    testMethod1
} from 'c/testUtils';
export default class TestParent extends LightningElement {

    @track
    testValues;
    cometdInitialised = false;
    _val;
    canSubscribe = true;

    cometdRef;

    constructor() {
        super();
        this.testValues = [];
        let coinList1 = [11, 12 , 13, 14];
        let coinList2 = [21, 22 , 23, 24];

        this.testValues.push({value: 1, coinList: coinList1});
        this.testValues.push({value: 2, coinList: coinList2});
        this.testValuesObj = this.testValues;
    }

    renderedCallback() {
        console.log('in rendered callback ');
        if (this.cometdInitialised) {
            return;
        }
        this.cometdInitialised = true;
        let that = this;
        Promise.all([
            loadScript(this, cometd)
        ]).then(() => {
                console.log(' cometd loaded ');
                this.handlePlatformInitSetup();
            })
            .catch(error => {
                console.log(' cometed error '+ error);
            });
    }

    handlePlatformInitSetup() {
        console.log(' handlePlatformInitSetup method');
        this.cometdRef = new org.cometd.CometD();
        getSessionId().then(sessionId => {
            console.log('sessionId' + sessionId);
            const cometdUrl = window.location.protocol+'//'+window.location.hostname+'/cometd/43.0/';
            
            this.cometdRef.configure({
                url: cometdUrl,
                requestHeaders: { Authorization: 'OAuth '+ sessionId},
                appendMessageTypeToURL : false
            });
            this.cometdRef.websocketEnabled = false;
            
            // Establish CometD connection
            console.log('Connecting to CometD: '+ cometdUrl);
            this.cometdRef.handshake((handshakeReply) => {
                try {
                    if (handshakeReply.successful) {
                    } else {
                        console.log('error in handshake ');
                    }
                    this.subscribePlatformEvent('LudoPlatformEvent__e');
                } catch(e) {
                    console.log('catch error '+e);
                }
            });
        }).catch(error => {
            console.log('error in calling apex ' + error);
        });
    }


    
    subscribePlatformEvent(eventName) {
        // Check if cometd is ready to subscribe to events
        if (!this.canSubscribe) {
            console.log('Deferring subscription to platform event', eventName);
            return;
        }
        // Prevent duplicate subscriptions
        const channel = '/event/'+ eventName;
        // Subscribe to event
        this.cometdRef.subscribe(channel, (platformEvent) => {
            console.log(JSON.stringify(platformEvent));
        }, (subscribeReply) => {
            console.log(subscribeReply.successful ? 'Subscribed to' : 'Failed to subscribe to', eventName);
        });
    }

    
























    handleTestComponentEvent(event) {
        console.log('in testEventHandler method ');
    }


    fireEvent(event) {
            console.log('in fireEvent');
            let inputData = {data: {val: 1},  eventType: 'testevent'};
            fireComponentEventHelper(JSON.stringify(inputData), this, true, true);
        
    }

    changeValue(event) {
        this.testValues[0].coinList[2] = this.testValues[0].coinList[2] + 1;
        console.log(JSON.stringify(this.testValues));
        this.testValuesObj = this.testValues;
        testMethod1();
    }

    get testValuesObj() {
        console.log('in getter of testValuesObj ' );
        return this._val;
    }

    set testValuesObj(val) {
        console.log('in setter of testValuesObj ' );

        this._val = val;
    }
}