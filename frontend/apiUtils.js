export async function login(dados) {
    console.log(dados)

    const url = "http://localhost:8080/login";

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
    };

    const response = await fetch(url, options);

    const data = await response.json();

    return {
        ok: response.ok,
        data
    };
}