import Koa from "koa";

const app = new Koa();

app.listen(3000, () => {
  console.log("服务启动3000端口");
});
