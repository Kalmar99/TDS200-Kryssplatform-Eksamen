import nhost from "nhost-js-sdk";
import {config} from './nhost-config'
import {Plugins} from '@capacitor/core'
import { isPlatform } from "@ionic/react";

/*
    Config boilerplate copied from: https://docs.nhost.io/quick-start/authentication
*/

const {Storage} = Plugins

let nhostConfig;

if (isPlatform('capacitor')) {
    nhostConfig = {
        base_url: config.backendUrl,
        use_cookies: false,
        client_storage: Storage,
        client_storage_type: "capacitor"
    } 
} else {
    nhostConfig = {
        base_url: config.backendUrl,
        use_cookies: true,
        client_storage_type: "web"
    } 
}


nhost.initializeApp(nhostConfig)

const auth = nhost.auth()
const storage = nhost.storage()

export {auth, storage}