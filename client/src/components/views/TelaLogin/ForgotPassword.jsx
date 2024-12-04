import React, { useState } from "react";
import styles from "./ForgotPassword.module.css"; // Importa o arquivo CSS

function EsqueciSenha() {
    const [userEmail, setUserEmail] = useState("");
    const [errorFeedback, setErrorFeedback] = useState("");
    const [successFeedback, setSuccessFeedback] = useState("");

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const handleResetLink = () => {
        setErrorFeedback("");
        setSuccessFeedback("");

        if (userEmail === "") {
            setErrorFeedback("O campo de e-mail não pode estar vazio.");
            return;
        }

        if (!emailPattern.test(userEmail)) {
            setErrorFeedback("Por favor, insira um e-mail válido.");
            return;
        }

        setSuccessFeedback("Um link para redefinir sua senha foi enviado!");
    };

    return (
        <div className={styles["forgot-password-container"]}>
            <div className={styles["forgot-password-form"]}>
                <h1 className={styles["forgot-password-title"]}>Esqueceu a Senha?</h1>
                <p className={styles["forgot-password-text"]}>
                    Digite seu e-mail para redefinir sua senha:
                </p>
                <input
                    type="email"
                    placeholder="Seu e-mail"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className={styles["forgot-password-input"]}
                />
                {errorFeedback && <p className={styles["forgot-password-error"]}>{errorFeedback}</p>}
                <button onClick={handleResetLink} className={styles["forgot-password-button"]}>
                    Enviar
                </button>
                {successFeedback && (
                    <p className={styles["forgot-password-success"]}>{successFeedback}</p>
                )}
            </div>
        </div>
    );
}

export default EsqueciSenha;

