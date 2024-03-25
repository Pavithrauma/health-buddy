let Config = require('../Configs/Config');
let mongoose = require('mongoose').Mongoose;


let healthBuddy = new mongoose();
// let merchant = new mongoose();
// let properties = new mongoose();
// let transaction = new mongoose()

let {healthBuddy : healthBuddyDbUrl} = Config.dbUrl;


function DBConnection() {
    
    this.createConnection = function () {

        healthBuddy.connect(healthBuddyDbUrl, { useNewUrlParser: true, useUnifiedTopology: true }).
            then(() => console.log('showtime DB Connected')).
            catch(err => console.error('showtime Caught', err.message));
            healthBuddy.set('debug', true)
        // merchant.connect(merchantDbUrl, { useNewUrlParser: true, useUnifiedTopology: true }).
        //     then(() => console.log('merchant DB Connected')).
        //     catch(err => console.error('merchant Caught', err.message));
        // merchant.set('debug', true)
        //  properties.connect(propertiesDbUrl, { useNewUrlParser: true, useUnifiedTopology: true }).
        //     then(() => console.log('properties DB Connected')).
        //     catch(err => console.error('properties Caught', err.message));

        // transaction.connect(transactionDbUrl, { useNewUrlParser: true, useUnifiedTopology: true }).
        //     then(() => console.log('Transaction DB Connected')).
        //     catch(err => console.error('Transaction Caught', err.message))
    };


    this.gethealthBuddyDB = function () {
        return healthBuddy;
    };

    // this.getMerchantDB = function () {
    //     return merchant;
    // };

    // this.getpropertiesDB = function () {
    //     return properties;
    // };

    // this.getTransactionDB = function () {
    //     return transaction
    // }

}

module.exports = new DBConnection();

