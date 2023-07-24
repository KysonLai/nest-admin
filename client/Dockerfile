# 使用一个基础镜像
FROM nginx:latest

# 删除默认 Nginx 配置文件
RUN rm /etc/nginx/conf.d/default.conf

# 将本地的 nginx.conf 文件复制到容器中
COPY nginx.conf /etc/nginx/conf.d

# 将前端构建产物复制到容器中
COPY dist/ /usr/share/nginx/html

# 暴露容器的端口
EXPOSE 80

# 启动 Nginx 服务
CMD ["nginx", "-g", "daemon off;"]

