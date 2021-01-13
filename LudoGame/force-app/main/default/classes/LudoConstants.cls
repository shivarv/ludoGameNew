/**
 * @description       : 
 * @author            : ChangeMeIn@UserSettingsUnder.SFDoc
 * @group             : 
 * @last modified on  : 01-13-2021
 * @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
 * Modifications Log 
 * Ver   Date         Author                               Modification
 * 1.0   01-13-2021   ChangeMeIn@UserSettingsUnder.SFDoc   Initial Version
**/
public with sharing class LudoConstants {
    public static final String PLAYERNAMETEXT = 'playerName';
    public static final String PLAYERTYPETEXT = 'playerType';
    public static final String PLAYERBOARDIDTEXT = 'playerBoardId';
    public static final String PLAYERJOINEDNOTEXT = 'playerJoinedNo';
    public static final String MAXPLAYERCOUNTTEXT = 'maxPlayerCount';
    public static final String ISLASTPLAYERTEXT = 'isLastPlayer';
    
    public enum PLAYERTYPE {
        PLAYER1,
        PLAYER2,
        PLAYER3,
        PLAYER4
    }
    // Sample EVENT  Values , string value for shivalwc__eventData__c
    /* RERUNEVENT, POSITIONCHANGEEVENT
    {
        'positionFrom':, // -1 is the startPoint Position
        'positionTo':,
        'coinId':, // the coin that is moved now
		'isHome':  // means if the coin is safe
    }
	*/
    /* NOCHANGEEVENT, GAMESTARTEVENT, GAMEOVEREVENT, GAMESYNCEVENT
    {
       // empty data
    }
    */
    
    /* PLAYERJOINEVENT
        {
            'playerName':
            'playerType' :,
            'playerBoardId':,
            'playerJoinedNo':,
            'playerMaxCount':
        }
    */
   
}