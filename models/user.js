const mongodb = require('mongodb');

const getDatabase = require('../utilities/database').getDatabase;


class User{
    static async create({emailAddress, password}){
        const database = getDatabase();

        const data = {
            email_address: emailAddress,
            password: password,
            is_deleted: 0,
            deleted_at: null,
            created_at: Date.now,
            updated_at: Date.now,
        };

        try {
            const result = await database.collection('users').insertOne(data);

            console.log(result);
        } catch (error) {
            console.error(error);
        }
        
    }

    static async readAll(){
        const database = getDatabase();

        try {
            const userList = await database.collection('users').find({is_deleted:0}).toArray();

            userList.forEach(element => {
                element._id = element._id.toString();
            });

            return userList;
        } catch (error) {
            console.error(error);
        }
    }

    static async readById(id){
        const database = getDatabase();

        try {
            const user = await database.collection('users').findOne({_id: new mongodb.ObjectId(id)});

            user._id = user._id.toString();

            return user;
        } catch (error) {
            console.error(error);
        }
    }

    static async readByEmailAddress(emailAddress){
        const database = getDatabase();

        try {
            const user = await database.collection('users').findOne({email_address: emailAddress});

            if(user){
                user._id = user._id.toString();
            }

            return user;
        } catch (error) {
            console.error(error);
        }
    }

    static async update({id, emailAddress, password}){
        const database = getDatabase();

        try {
            const user = await this.readById(id);
            const updateData = {
                email_address: user.email_address,
                password: user.password,
                updated_at: Date.now,
            };
            
            if(emailAddress !== user.email_address){
                updateData.email_address = emailAddress;
            }
            if(password !== user.password){
                updateData.password = password;
            }
            
            await database.collection('users').updateOne({_id: new mongodb.ObjectId(id)}, {$set:updateData});

        } catch(error){
            console.error(error);
        }
    }

    static async deleteById(id){
        const database = getDatabase();

        const updateData = {
            is_deleted : 1,
            deleted_at: Date.now,
            updated_at: Date.now,
        };
        try {
            await database.collection('users').updateOne({_id: new mongodb.ObjectId(id)}, {$set:updateData});
        } catch(error){
            console.error(error);
        }
    }
}

module.exports = User;