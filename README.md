

# 公式编辑器 (FormualEditor)

一个基于 React + TypeScript 的公式编辑器组件，支持数学公式的解析与编辑。

## 功能特性

- 📝 公式编辑：支持编辑数学公式
- 🔧 公式解析：内置公式解析器，支持词法分析
- 🎨 自定义样式：支持 SCSS 样式定制
- 📦 组件化设计：易于集成到现有项目中

## 技术栈

- React 17
- TypeScript
- SCSS
- Create React App

## 快速开始

### 安装依赖

```bash
npm install
# 或使用 yarn
yarn install
```

### 开发模式

```bash
npm start
```

启动后访问 [http://localhost:3000](http://localhost:3000)

### 构建生产版本

```bash
npm run build
```

构建产物将生成在 `build` 目录中。

## 公式解析器使用

项目内置了公式解析工具，支持将公式字符串解析为词法单元（Token）。

### 基本用法

```typescript
import { parseFormual } from './util/formualPaser';

// 解析公式字符串
const tokens = parseFormual('a + b * c', { /* options */ });

console.log(tokens);
```

### 解析选项

`parseFormual` 函数接受以下选项：

- `formual`: 要解析的公式字符串
- `option`: 可选的解析配置

### 支持的运算符

解析器支持常见的数学运算符，包括但不限于：

- `+` (加法)
- `-` (减法)
- `*` (乘法)
- `/` (除法)
- `^` (幂运算)
- `(` `)` (括号)

## 项目结构

```
src/
├── components/
│   └── FormualEditor/     # 公式编辑器组件
├── util/
│   └── formualPaser.ts   # 公式解析器
├── views/
│   └── index/            # 主页视图
├── App.js                # 应用入口
└── index.js              # 根组件
```

## 集成到现有项目

将 `FormualEditor` 组件导入您的项目：

```typescript
import FormualEditor from './components/FormualEditor';

function App() {
  return (
    <div>
      <FormualEditor onChange={(value) => console.log(value)} />
    </div>
  );
}
```

## 许可证

MIT License