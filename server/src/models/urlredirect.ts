function urlredirectmodel(sequelize: any, type: any) {
  return sequelize.define('urlredirect', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    originalURl: {
      type: type.STRING,
      allowNull: false,
    },
    urlAlias: {
      type: type.STRING,
      allowNull: false,
    },
    createdOn: {
      type: type.DATE,
      allowNull: false,
    },
  });
}

export default urlredirectmodel;
