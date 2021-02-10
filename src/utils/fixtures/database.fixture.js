import User from '../../database/model/user.model';
import Service from '../../database/model/service.model';

const cleanAllTables = async () => {
  await User.deleteMany({});
  await Service.deleteMany({});
};

export default cleanAllTables;
