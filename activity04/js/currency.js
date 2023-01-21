export default async function run() {
  // Function to handle the API request.
  async function procesarFetch(to, from, amount) {
    const headers = new Headers();
    headers.append("apikey", "goUdTZuPVV91wTFi9fcJuaVllxDojdFs");
    const conf = {
      method: "GET",
      refirect: "follow",
      headers: headers,
    };
    try {
      const resp1 = await fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${to}&from=${from}&amount=${amount}`, conf);
      const data = await resp1.json();
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  // Add an event to the form
  const form = document.querySelector("form");
  form.addEventListener("submit", (ev) => {
    // Stop page from reloading on submission
    ev.preventDefault();

    // Make the request with the data from the form as arguments.
    procesarFetch(
      document.getElementById("moneda2").value,
      document.getElementById("moneda1").value,
      document.getElementById("cantidad").value
    ).then((data) => {
      // Print the 'result' attribute from the response.
      document.getElementById("resultado").textContent = data.result;
    });
  });
}
