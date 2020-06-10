# 构建发布

## 构建

```bash
$ npm run build
```

结合各类 CI/CD 工具可以进行自动构建。

### Docker

可以根据 `Dockerfile` 快速构建 Docker 镜像：

```bash
docker build -f Dockerfile -t your-docker-image:1.0.0 .
```

## 部署

各平台部署方案完善中……
