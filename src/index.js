import logoSvg from "@/images/logo.svg";

console.log("env", process.env);
console.log("NODE_ENV", process.env.NODE_ENV);
console.log("ENV_CONFIG", ENV_CONFIG);

function logo() {
  console.log(logoSvg);
  const logo = new Image();
  logo.src = logoSvg;
  return logo;
}

function component() {
  const ele = document.createElement("div");
  const env = `当前环境：${process.env.NODE_ENV}`;
  ele.innerHTML = env;
  return ele;
}

document.querySelector("#root").innerHTML = "";
document.querySelector("#root").appendChild(component());
document.querySelector("#root").appendChild(logo());

// hmr
if (module.hot) {
  module.hot.accept();
}
