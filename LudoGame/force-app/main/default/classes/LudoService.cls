/**
 * @description       : 
 * @author            : ChangeMeIn@UserSettingsUnder.SFDoc
 * @group             : 
 * @last modified on  : 01-09-2021
 * @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
 * Modifications Log 
 * Ver   Date         Author                               Modification
 * 1.0   01-09-2021   ChangeMeIn@UserSettingsUnder.SFDoc   Initial Version
**/
public with sharing class LudoService {
  

    @AuraEnabled
    public static string getSessionId(){
        String userId;
        try {
            userId = userinfo.getSessionId();
        } catch (Exception e) {
            userId = '';
        }
        return userId;
    }
}
