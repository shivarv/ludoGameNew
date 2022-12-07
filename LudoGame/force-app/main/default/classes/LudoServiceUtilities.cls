/**
 * @description       : 
 * @author            : ChangeMeIn@UserSettingsUnder.SFDoc
 * @group             : 
 * @last modified on  : 12-07-2022
 * @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
 * Modifications Log 
 * Ver   Date         Author                               Modification
 * 1.0   01-16-2021   ChangeMeIn@UserSettingsUnder.SFDoc   Initial Version
**/
public with sharing class LudoServiceUtilities {
    public static void publishPlatformEvent(String data, String eventType, String playerType,
    String ludoBoardId ) {
        List<LudoPlatformEvent__e> platformGameEvent = new List<LudoPlatformEvent__e>();
        System.debug('in publishPlatform event '+ data + ' '+eventType +' '+playerType + ' '+ ludoBoardId);
        platformGameEvent.add(new LudoPlatformEvent__e(eventData__c = data,
        eventType__c = eventType,
        playerType__c	= playerType,
        ludoBoardId__c = ludoBoardId
        
        ));
        // Call method to publish events
        List<Database.SaveResult> results = EventBus.publish(platformGameEvent);
        
        // Inspect publishing result for each event
        for (Database.SaveResult sr : results) {
            if (sr.isSuccess()) {
                System.debug('Successfully published event. LudoPlatformEvent__e, eventype '+eventType + ' ludoBoardId '+ludoBoardId);
            } else {
                for(Database.Error err : sr.getErrors()) {
                    System.debug('Error returned: ' +
                    err.getStatusCode() +
                    ' - ' +
                    err.getMessage());
                }
            }       
        }
        
    }
}
