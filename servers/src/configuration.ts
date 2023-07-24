import { readFileSync } from 'fs';
import { join } from 'path';
import * as yaml from 'js-yaml';
import * as _ from 'lodash';

// 通用配置
const filePath = join(__dirname, '../config', 'config.yml');
const commonConfig = yaml.load(readFileSync(filePath, 'utf8'));

// 环境配置
const envPath = join(
  __dirname,
  '../config',
  `config.${process.env.NODE_ENV || 'development'}.yml`,
);
const envConfig = yaml.load(readFileSync(envPath, 'utf8'));

export default () => {
  return _.merge(commonConfig, envConfig);
};
