/**
* @description       : 
* @author            : ChangeMeIn@UserSettingsUnder.SFDoc
* @group             : 
* @last modified on  : 01-16-2021
* @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
* Modifications Log 
* Ver   Date         Author                               Modification
* 1.0   01-09-2021   ChangeMeIn@UserSettingsUnder.SFDoc   Initial Version
**/
public with sharing class LudoService {
    
    
    @AuraEnabled
    public static string getSessionId(){
        String sessionId;
        try {
            sessionId =  getSessionFromApex();
            System.debug('session id from apex '+sessionId);
            // sessionId = getSessionFromVfPage();
        } catch (Exception e) {
            sessionId = '';
        }
        return sessionId;
    }
    
    private static String getSessionFromApex() {
        String sessionId = UserInfo.getOrganizationId().substring(0, 15) + 
        UserInfo.getSessionId().substring(15);
        return sessionId;
    }
}