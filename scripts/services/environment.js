/**
 * Created by panma on 6/14/15.
 */
angular.module("dalockrAppV2App")
    //production
    //.constant("appConfig",{
    //    'API_SERVER_ADDRESS':'https://app.dalockr.com',
    //    'REDIRECT_URL_ADDRESS':'https://app.dalockr.com',
    //    'DASTORR_CLUSTER_ID':'ithink'
    //});

    //production local
    //.constant("appConfig",{
    //    'API_SERVER_ADDRESS':'https://app.dalockr.com',
    //    'REDIRECT_URL_ADDRESS':'http://localhost:9000',
    //    'DASTORR_CLUSTER_ID':'ithink'
    //});

    //development Local
    .constant("appConfig",{
        'API_SERVER_ADDRESS':'https://dev.dalockr.com',
        'REDIRECT_URL_ADDRESS':'http://localhost:9000',
        'DASTORR_CLUSTER_ID':'ithink'
    });

    //development Prod
    //.constant("appConfig",{
    //    'API_SERVER_ADDRESS':'https://dev.dalockr.com',
    //    'REDIRECT_URL_ADDRESS':'https://dev.dalockr.com',
    //    'DASTORR_CLUSTER_ID':'ithink'
    //});
