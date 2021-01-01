import { LightningElement, track, api } from 'lwc';
import LUDO_RESOURCE from '@salesforce/resourceUrl/ludo';

//Game Rules
//Dice with number 1 can open the game
//Dice with number 6 or 1 can put again

export default class LudoBoard extends LightningElement {
   
    ludoIconImgUrl = LUDO_RESOURCE + '/ludo/images/ludoIcon.png';
    user1ImgUrl = LUDO_RESOURCE + '/ludo/images/user1.jpg';
    user2ImgUrl = LUDO_RESOURCE + '/ludo/images/user2.jpg';
    user3ImgUrl = LUDO_RESOURCE + '/ludo/images/user3.png';
    user4ImgUrl = LUDO_RESOURCE + '/ludo/images/user4.png';

}