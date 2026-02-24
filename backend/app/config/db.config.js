module.exports = {
  url: `mongodb://${process.env.MONGO_USERNAME || 'admin'}:${process.env.MONGO_PASSWORD || 'password'}@${process.env.MONGO_HOST || 'localhost'}:${process.env.MONGO_PORT || 27017}/${process.env.MONGO_DATABASE || 'dd_db'}?authSource=admin`
};
