import nhost from "nhost-js-sdk";
import {config} from './nhost-config'

/*
    Config boilerplate copied from: https://docs.nhost.io/quick-start/authentication
*/

const nhostConfig = {
    base_url: config.backendUrl
}

nhost.initializeApp(nhostConfig)

const auth = nhost.auth()
const storage = nhost.storage()

export {auth, storage}