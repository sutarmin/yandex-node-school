const fs = require("fs");
const path = require("path");

const Model = require("./model");

class FileModel extends Model {
    constructor(sourceFileName) {
        super();
        const filePath = path.join(__dirname, "../../data", sourceFileName);
        this._dataSourceFile = filePath;
        this._dataSource = null;
    }

    async loadFile() {
        if (!this._dataSource) {
            await new Promise((resolve, reject) => {
                fs.readFile(this._dataSourceFile, "utf8", (err, data) => {
                    if (err) {
                        return reject(err);
                    }
                    try {
                        this._dataSource = JSON.parse(data);
                        return resolve();                        
                    } catch (err) {
                        return reject(err);
                    }
                });
            });
        }
        return this._dataSource;
    }

    async getAll() {
        return await this.loadFile();
    }

    async _saveUpdates() {
        return await new Promise((resolve, reject) => {
            fs.writeFile(this._dataSourceFile, JSON.stringify(this._dataSource), (err) => {
                if (err) {
                    return reject(err);
                }
                return resolve();
            })
        });
    }
}

module.exports = FileModel;