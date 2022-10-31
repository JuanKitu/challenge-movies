// eslint-disable-next-line import/no-import-module-exports
import sequelize from '../database/database';
import { accountService } from '../services/Account.service';

async function global() {
  await sequelize.sync({ force: true });
  const control = await accountService.findAll();
  if (control.length !== 0) {
    await accountService.delete({}, true);
  }
}

export default global;
