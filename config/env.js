/*
 * @Author: www
 * @Date: 2018-05-13 18:30:40
 * @Last Modified by: www
 * @Last Modified time: 2018-12-25 10:47:11
 */

// 配置与环境有关的变量
const development = {
  env: "development",
  appkey: "9a9699d95c9787787c9e7bbd85f0c030", // zp key
  // appkey: '45c6af3c98409b18a84451215d0bdd6e', // demo h5 key
  url: "http://192.168.1.117:9999/zpparts-frontend",
  platform: "http://192.168.1.117:9999/zpparts-frontend",
  admin: "http://192.168.1.117:8484/zpparts-admin",
  // url: 'http://test.zpparts.com:8182',
  // platform: 'http://test.zpparts.com',
  // admin: 'http://test.zpparts.com/zpparts-admin',
};

const test = {
  env: "test",
  appkey: "9a9699d95c9787787c9e7bbd85f0c030",
  url: "http://test.zpparts.com:8182",
  platform: "http://test.zpparts.com",
  admin: "http://test.zpparts.com/zpparts-admin",
};

const launch = {
  env: "launch",
  appkey: "9a9699d95c9787787c9e7bbd85f0c030",
  url: "http://pre.zpparts.com:8182",
  platform: "http://pre.zpparts.com",
  admin: "http://pre.zpparts.com/zpparts-admin",
};

const production = {
  env: "production",
  appkey: "9a9699d95c9787787c9e7bbd85f0c030",
  url: "http://www.zpparts.com:8182",
  platform: "http://www.zpparts.com",
  admin: "http://www.zpparts.com/zpparts-admin",
};

module.exports = {
  development,
  test,
  launch,
  production,
};
