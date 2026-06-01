import { login } from './apiUtils.js'

const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");
const eyeIcon = document.getElementById("eyeIcon");

togglePassword.addEventListener("click", () => {
    const isPassword = passwordInput.type === "password";

    passwordInput.type = isPassword ? "text" : "password";

    eyeIcon.classList.toggle("fa-eye");
    eyeIcon.classList.toggle("fa-eye-slash");
});

document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("password").value;

    const dados = {
        email,
        senha
    };

    try {

        const resultado = await login(dados);

        if (resultado.ok) {
            localStorage.setItem(
                "usuario",
                JSON.stringify(resultado.data)
            );

            window.location.href = "./pages/home/home.html";
        } else {
            alert("E-mail ou senha inválidos!");
        }

    } catch (error) {

        console.error(error);
        alert("Erro ao conectar com o servidor.");

    }
});