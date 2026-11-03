import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = email.includes("@") ? "" : "Geçerli bir e-posta girin.";
    setError(found);
    setSent(found === "");
  }

  return (
    <>
      <h2 className="bolum-baslik">Şifremi Unuttum</h2>
      <p>Kayıtlı e-posta adresinizi yazın, şifre yenileme bağlantısı gönderelim.</p>
      {sent && <p className="mesaj mesaj-basari" role="status">Bağlantı {email} adresine gönderildi (demo).</p>}
      <form className="form" noValidate onSubmit={handleSubmit}>
        <label htmlFor="email">E-posta</label>
        <input id="email" type="email" autoComplete="email" value={email}
          onChange={(e) => { setEmail(e.target.value); setSent(false); }}
          aria-invalid={error ? true : undefined} aria-describedby={error ? "email-error" : undefined} />
        {error && <span id="email-error" className="hata-metni">{error}</span>}
        <button className="btn-git" type="submit">Bağlantı gönder</button>
        <div className="auth-linkler"><Link to="/login">← Girişe dön</Link></div>
      </form>
    </>
  );
}
export default ForgotPasswordPage;