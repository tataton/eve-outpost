/* Contains all database models. All models go through this
one file so that all database methods only need to go through
one sequelize instance ("db"). */

const db = require('../modules/module-sequelize');

const userSchema = require('../schemas/schema-user');
const mapRegionSchema = require('../schemas/schema-mapRegion');
const mapSolarSystemSchema = require('../schemas/schema-mapSolarSystem');
const staStationSchema = require('../schemas/schema-staStation');
const publicStructureSchema = require('../schemas/schema-publicStructure');

const User = db.define('user', userSchema);
const Region = db.define('mapRegion', mapRegionSchema, {timestamps: false});
const SolarSystem = db.define('mapSolarSystem', mapSolarSystemSchema, {timestamps: false});
const Station = db.define('staStation', staStationSchema, {timestamps: false});
const PublicStructure = db.define('publicStructure', publicStructureSchema);

// Initialize table or column, if it doesn't exist.
db.sync();

// Export each database model as needed.
module.exports.User = User;
module.exports.PublicStructure = PublicStructure;
module.exports.SolarSystem = SolarSystem;