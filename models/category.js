const { v4: uuidv4 } = require('uuid');

const categoryData = require('../data/category_data');

module.exports = class Category {
    constructor({uuid=null, name, description}){
        this.uuid = uuid ?? uuidv4();
        this.name = name;
        this.description = description;
    }

    save(){
        categoryData.categoryList.push(this);
    }

    update({name, description}){
        const index = categoryData.categoryList.findIndex(item => item.uuid === uuid);

        categoryData.categoryList[index].name = name;
        categoryData.categoryList[index].description = description;
    }

    static getAllCategories(){
        return categoryData.categoryList;
    }

    static getCategoryByUuid(uuid){
        return categoryData.categoryList.find(item => item.uuid === uuid);
    }

    static deleteCategoryByUuid(uuid){
        const index = categoryData.categoryList.findIndex(item => item.uuid === uuid);

        categoryData.categoryList.splice(index, 1);
    }

}