const isValidZipCode = (code) => {
  if (code.length !== 5) return false;
  for (let i = 0; i < code.length; i++) {
    if (!(code[i] >= "0" && code[i] <= "9")) return false;
  }
  return true;
};
const getWeather = async () => {
  let zipCode = document.getElementById("zip").value;
  if (!isValidZipCode(zipCode)) {
    alert("wrong zip code");
    return;
  }
  const API_KEY = "1ac4855f5d3fbe8f12e7e27796cb5321";
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${API_KEY}&units=metric`
  );
  const data = await res.json();
  if (data.cod === "404") {
    alert("city not found");
    return;
  }
  return {
    temperature: Math.round(Number(data.main.temp)),
    date: new Date().toLocaleString(),
    userResponse: {
      content: document.getElementById("feelings").value,
      code: zipCode,
    },
  };
};
const sendWeather = async (path, data) => {
  if (data === undefined) {
    return;
  }
  console.log(data);
  const res = await fetch(path, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  const resData = await res.json();
  return resData;
};
const changeUI = (data) => {
  const date = document.getElementById("date");
  const temp = document.getElementById("temp");
  const content = document.getElementById("content");
  date.innerHTML = "";
  temp.innerHTML = "";
  content.innerHTML = "";
  date.append(data.date);
  temp.append(data.temperature + " C");
  const p1 = document.createElement("p");
  const p2 = document.createElement("p");
  p1.append(`Content: ${data.userResponse.content}`);
  p2.append(`Zip Code: ${data.userResponse.code}`);
  content.append(p2, p1);
};
const getData = async () => {
  const res = await fetch("/data");
  const data = await res.json();
  return data;
};
document.getElementById("generate").addEventListener("click", () => {
  getWeather().then((weatherData) => {
    sendWeather("/data", weatherData).then((res) => {
      if (res === undefined) {
        return;
      }
      if (res.status === "ok") {
        getData().then((data) => {
          changeUI(data);
        });
      }
    });
  });
});
