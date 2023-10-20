const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectId;

const { DATE } = require('sequelize');
const { v4 : uuidv4 } = require('uuid');

const getDatabase = require('../utilities/database').getDatabase;


class Category{
    static async create({creatorId, name, description}){
        const database = getDatabase();

        const data = {
            creator_id: new ObjectId(creatorId),
            name,
            description,
            is_deleted: 0,
            deleted_at: null,
            created_at: new Date(),
            updated_at: new Date(),
        };

        try {
            const result = await database.collection('categories').insertOne(data);

            console.log(result);
        } catch (error) {
            console.error(error);
        }
        
    }

    static async readAll(){
        const database = getDatabase();

        try {
            const categoryList = await database.collection('categories').find({is_deleted:0}).toArray();

            if(categoryList.length > 0){
                categoryList.forEach(element => {
                    element._id = element._id.toString();
                });
            }

            return categoryList;
        } catch (error) {
            console.error(error);
        }
    }

    static async readById(id){
        const database = getDatabase();

        try {
            const product = await database.collection('products').findOne({_id: ObjectId(id)});

            product._id = product._id.toString();

            return product;
        } catch (error) {
            console.error(error);
        }
    }

    static async update({id, name, description, price, image}){
        const database = getDatabase();

        try {
            const product = await this.readById(id);
            const updateData = {
                name: product.name,
                description: product.description,
                price: product.price,
                image: product.image,
                updated_at: new Date(),
            };
            
            if(name !== product.name){
                updateData.name = name;
            }
            if(description !== product.description){
                updateData.description = description;
            }
            if(price !== product.price){
                updateData.price = price;
            }
            if(image !== product.image){
                updateData.image = image;
            }
            
            await database.collection('products').updateOne({_id: ObjectId(id)}, {$set:updateData});

        } catch(error){
            console.error(error);
        }
    }

    static async deleteById(id){
        const database = getDatabase();

        const updateData = {
            is_deleted : 1,
            deleted_at: new Date(),
            updated_at: new Date(),
        };
        try {
            await database.collection('products').updateOne({_id: ObjectId(id)}, {$set:updateData});
        } catch(error){
            console.error(error);
        }
    }
}

module.exports = Category;