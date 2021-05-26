# 加载基础镜像
FROM node:alpine

# 创建工作目录
RUN rm -rf /server
RUN mkdir -p /server
WORKDIR /server

# 修改npm镜像源
RUN npm config set registry https://registry.npm.taobao.org

# 安装项目依赖
COPY . /server
RUN npm install
#RUN npm run build
#RUN mv ./dist/* ./

ENV HOST 0.0.0.0
ENV PORT 3000

# 对外暴露端口
EXPOSE 3000

CMD ["npm", "pro"]
#ENTRYPOINT ["npm", "run"]
#CMD ["serve"]
#
## 启动 Image 时执行命令
#CMD BUILD_ENV=docker node app.js
