## 配置须知

环境依赖：

- `node`
- `ruby`

#### 镜像配置

```bash
#ruby 环境下
gem sources --remove https://rubygems.org/
gem sources -a https://gems.ruby-china.org/
```
#### 安装依赖包

```bash
#安装sass编译环境
gem install sass
gem install compass

#安装项目依赖
npm install
```

## 启动调试环境

```bash
gulp watch              // web开发环境构建
gulp watchM              // mobile开发环境构建
```

## 发布构建

```bash
gulp build              // web发布环境构建
gulp buildM              // mobile发布环境构建

```