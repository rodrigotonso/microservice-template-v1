/**
 * @packageDocumentation
 * @hidden
 * It contains a sample model with sequelize.
 */

import CONSTS from '~/constants/model';
import Sample from './Sample';
import OtherInfo from './OtherInfo';

Sample.hasMany(OtherInfo, {
  as: CONSTS.OTHER_INFO.NAME,
  foreignKey: {
    field: 'sample_id',
    name: 'sampleId',
    allowNull: true,
  },
  sourceKey: 'id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

OtherInfo.belongsTo(Sample, {
  as: CONSTS.SAMPLE.NAME,
  foreignKey: {
    field: 'sample_id',
    name: 'sampleId',
    allowNull: false,
  },
  targetKey: 'id',
  constraints: true,
});

export default { Sample, OtherInfo };
