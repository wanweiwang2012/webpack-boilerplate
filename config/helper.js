const fs = require("fs");
const path = require("path");

// 生成绝对路径：可传入相对路径参数
const getAbsolutePath = relativePath => {
  // 当前Node.js进程执行时的工作目录
  const root = fs.realpathSync(process.cwd());
  if (!relativePath) {
    return root;
  }
  return path.resolve(root, relativePath);
};

// 获取指定目录的子目录列表：可用于自动化生成路由
const getDirectory = base =>
  fs.readdirSync(base).filter(name => {
    try {
      return fs.statSync(path.resolve(base, name)).isDirectory();
    } catch (err) {
      return false;
    }
  });

module.exports = {
  getAbsolutePath,
  getDirectory,
};
