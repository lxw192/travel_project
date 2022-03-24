======

项目名：travel-server`。

## 安装 node, git

- [最新稳定node版本](https://nodejs.org/en/)
- 最好使用yarn 替代npm `npm install -g yarn`
- npm i -g @nestjs/cli 可以用命令生成module、controller、service等
  
### 开发环境配置

vscode

## 开发

`yarn start:dev`
`yarn start:debug`

## 生产

```sh
   # 启动线上服务
  pm2 start pm2.json --env production
```

## 常用生成命令

> 生成user模块

   ```sh
      nest generate mo module/config   # 生成模块
      nest generate s module/config    # 生成service
      nest generate co module/config   # 生成controller
      nest generate cl module/config/config.entity # 生成entity类，映射数据
      nest generate cl module/config/config.dto    # 生成dto类，接口入参类，可以加验证规则

   ```

## 联调

## 打包

`yarn build`

## 打 tag 生成 changelog

`yarn changelog`

## 打 tag

`git tag` 查看 tag
`git tag v0.1.1` 添加 tag
`git push origin tag v0.1.1` 推送 tag

### 发布

| 发布产品 | 发布模块 |
| -------- | -------- |
| `[xxx]`  | `[xxx]`  |

> 发布时的备注

### 错误告警及监控

使用 sentry 错误日志上报http://xxx.xxx.xxx.xxx:9000/sentry/xxx/

### 相关人员

| 角色     | 人员 |
| -------- | ---- |
| 产品经理 | xx   |
| 前端开发 | xx   |
| 后台开发 | xx   |
| 交互设计 | xx   |
| ui 设计  | xx   |

### 其他

- [ui](xx)
- [接口文档](xx)

### 相关文档

- [NestJs](https://docs.nestjs.com/)
- [Typescript](https://www.tslang.cn/)
- [TypeORM](https://github.com/typeorm/typeorm)

### 遇到的坑

#### 张三

1. xx bug
1. 描述
1. 解决方案
1. xx bug

=======

项目备注

=======
