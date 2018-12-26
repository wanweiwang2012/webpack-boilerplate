## stylelint

> 一个强大的现代 css 检查器，可以让你在样式表中遵循一致的约定和避免错误

### Features 特征

1.  超过 150 条规则：捕获错误、最佳实践、控制可使用的语言特性、强制代码风格规范。
2.  支持最新的 css 语法：包括自定义属性，media 特性的范围上下文，calc() 和 嵌套。
3.  理解 css-like 语法：styelint 是基于 PostCSS 的，所以它能理解 PostCSS 可以解析的任何语法，包括 SCSS，SugarSS 和 Less 的实验特性。
4.  灵活可配置：只启用你想要的规则，在配置它们的选项，来满足你的需求。
5.  支持插件：很容易创建你自己的规则，并将它们添加到检测器。
6.  自动修复：通过使用支持 stylelint 配置文件的 stylefmt 可以进行自动修复。
7.  可分享的配置：如果你不想精雕细琢你自己的配置，你可以继承一个可分享的配置。
8.  选项验证器：你可以非常确信你的配置是有效的。
9.  充分的测试：将近 25000 个测试用例覆盖所有代码和规则。
10. 日益增长的社区：Facebook，Github，Wikimedia，GSA 和 WordPress 等等都在使用。

### Configuration 配置

> 检测器需要使用一个配置对象。你可以自定义或扩展一个已存在的配置

```
// .stylelintrc.js
module.exports = {
  extends: "stylelint-config-standard",
  plugins: [],
  processors: ["stylelint-html-processor"],
  ignoreFiles: [],
  defaultSeverity: "warning" | "error",
  rules: {

  }
}
```

#### 配置方式（顺序优先级）

1.  package.json 中的 stylelint 属性
2.  .stylelintrc 无扩展名时使用 JSON 或 YAML 格式书写，可指定的扩展名有: .json | .yaml | .yml | .js
3.  stylelint.config.js 输出 JS 对象

#### 配置属性

##### rules 规则

1.  规则

* 规则决定检测器要查找什么和要解决什么
* 规则默认是关闭的，必须手动开启
* rules 属性是一个对象，组成{"规则名 1": 规则配置 1, "规则名 2": 规则配置 2}
* 规则配置：单个值（主要选项）、包含二个值的数据[primary option, secondary options]、null(关闭规则)

2.  规则使用

* 指定一个主选项将开启规则
* 在配置文件中使用规则
* 在 css 文件中使用规则

```
//  配置文件中规则
{
  "rules": {
    "block-no-empty": null,
    "color-no-invalid-hex": true,
    "comment-empty-line-before": [ "always", {
      "ignore": ["stylelint-commands", "between-comments"]
    } ],
    "declaration-colon-space-after": "always",
    "indentation": ["tab", {
      "except": ["value"]
    }],
    "max-empty-lines": 2,
    "rule-nested-empty-line-before": [ "always", {
      "except": ["first-nested"],
      "ignore": ["after-comment"]
    } ],
    "unit-whitelist": ["em", "rem", "%", "s"]
  }
}
```

```
// *.css 文件中规则
// 临时关闭全部规则
/* stylelint disable */
a {}
/* stylelint enable */

// 临时关闭特定规则
/* stylelint disable selector-no-id, declaration-no-important */
#id {
  color: pink !important;
}
/* stylelint enable */

// 关闭当前行的规则, 在其之后不需要显式重新开启
#id { /* stylelint-disable-line */
  color: pint !import; /* stylelint-disable-line declaration-no-important */
}

// 在下一行上关闭规则，在其之后不需要显式重新开启
#id {
  /* stylelint-disable-next-line declaration-no-important */
  color: pink !important;
}
```

3.  默认情况下，规则有一个"error"级别的严重程度（可在配置文件中添加 defaultServerity 属性来修改）

```
// error-level severity examples
{ "indentation": 2 }
{ "indentation": [2] }

// warning-level severity examples
{ "indentation": [2, { "severity": "warning" } ] }
{ "indentation": [2, {
    "except": ["value"],
    "severity": "warning"
  }]
}
```

4.  规则触发时使用一个自定义消息

```
{
  "color-hex-case": [ "lower", {
    "message": "Lowercase letters are easier to distinguish from numbers"
  } ],
  "indentation": [ 2, {
    "ignore": ["block"],
    "message": "Please use 2 spaces for indentation. Tabs make The Architect grumpy.",
    "severity": "warning"
  } ]
}
```

##### extends 继承配置

1.  在配置中继承其它配置（第三方或自己的配置文件）

```
{
  "extends": [
    "stylelint-config-standard",
    "./myExtendableConfig"
  ],
  "rules": {
    "indentation": "tab"
  }
}
```

#### plugins 插件

1.  插件是由社区创建的规则或规则集，支持方法论、工具集，非标准 的 CSS 特性，或非常特定的用例。
2.  一个插件可以提供一个或一组规则
3.  一旦声明了插件，在你的 "rules" 对象中，你将需要为插件的规则添加选项，就像其他标准的规则一样。

```
{
  "plugins": [
    "../some-rule-set.js"
  ],
  "rules": {
    "some-rule-set/first-rule": "everything",
    "some-rule-set/second-rule": "nothing",
    "some-rule-set/third-rule": "everything"
  }
}
```

#### processors

1.  Processors 是 stylelint 的钩子函数，可以以它的方式修改代码，也可以在它们退出时修改结果。

```
// 检测非样式表文件中的 css, 如 html 内<style>、markdown 文件中代码块、JS 中的字符串
{
  "processors": ["stylelint-html-processor"],
  "rules": {..}
}
```

#### ignoreFiles

1.  提供一个 glob 或 globs 数组，忽略特定的文件
2.  使用.stylelintignore 文件忽略文件

#### defaultSeverity

1.  所有在第二个选项中没有指定严重级别的规则的默认严重级别
2.  可选值："warning" | "error"

### .stylelintignore 忽略文件

1.  使用.stylelintignore 文件来忽略指定的文件
2.  文件中的模式必须匹配.gitignore 语法（在幕后使用 node-ignore 来解析模式）
3.  路径相对于 process.cwd()

### 规则详解
