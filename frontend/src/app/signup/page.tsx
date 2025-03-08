"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "@/styles/signup.module.css"; // ✅ CSS 모듈 import

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const [nameStatus, setNameStatus] = useState({ text: "", className: "" });
  const [emailStatus, setEmailStatus] = useState({ text: "", className: "" });

  const router = useRouter();

  // ✅ ID 중복 확인 (입력 후 포커스를 잃었을 때 실행)
  useEffect(() => {
    if (!name) {
      setNameStatus({ text: "", className: "" });
      return;
    }
    const checkName = async () => {
      try {
        const response = await fetch(`/api/users/check-name?name=${encodeURIComponent(name)}`);
        const isDuplicate = await response.json();
        setNameStatus({
          text: isDuplicate ? "이미 사용 중인 ID입니다." : "사용 가능한 ID입니다.",
          className: isDuplicate ? styles.textDanger : styles.textSuccess,
        });
      } catch (err) {
        setNameStatus({ text: "ID 중복 확인 중 오류가 발생했습니다.", className: styles.textDanger });
      }
    };
    checkName();
  }, [name]);

  // ✅ 이메일 중복 확인 (입력 후 포커스를 잃었을 때 실행)
  useEffect(() => {
    if (!email) {
      setEmailStatus({ text: "", className: "" });
      return;
    }
    const checkEmail = async () => {
      try {
        const response = await fetch(`/api/users/check-email?email=${encodeURIComponent(email)}`);
        const isDuplicate = await response.json();
        setEmailStatus({
          text: isDuplicate ? "이미 사용 중인 이메일입니다." : "사용 가능한 이메일입니다.",
          className: isDuplicate ? styles.textDanger : styles.textSuccess,
        });
      } catch (err) {
        setEmailStatus({ text: "이메일 중복 확인 중 오류가 발생했습니다.", className: styles.textDanger });
      }
    };
    checkEmail();
  }, [email]);

  // ✅ 회원가입 요청 처리
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const response = await fetch("/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });

      if (!response.ok) {
        throw new Error("회원가입 실패");
      }

      alert("회원가입 성공! 로그인 페이지로 이동합니다.");
      router.push("/login");
    } catch (error) {
      setMessage("회원가입 중 오류 발생");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.logo}>STARTREUM</div>
      <form className={styles.signupForm} onSubmit={handleSubmit}>
        {/* ✅ ID 입력 */}
        <div className={styles.formGroup}>
          <label>ID</label>
          <input
            type="text"
            placeholder="ID를 입력하세요"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <p className={nameStatus.className}>{nameStatus.text}</p>
        </div>

        {/* ✅ 이메일 입력 */}
        <div className={styles.formGroup}>
          <label>Email</label>
          <input
            type="email"
            placeholder="이메일을 입력하세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <p className={emailStatus.className}>{emailStatus.text}</p>
        </div>

        {/* ✅ 비밀번호 입력 */}
        <div className={styles.formGroup}>
          <label>Password</label>
          <input
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* ✅ 비밀번호 확인 입력 */}
        <div className={styles.formGroup}>
          <label>Password 확인</label>
          <input
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <p className={password !== confirmPassword ? styles.textDanger : ""}>
            {password !== confirmPassword ? "비밀번호가 일치하지 않습니다." : ""}
          </p>
        </div>

        {/* ✅ 역할 선택 */}
        <div className={styles.formGroup}>
          <label>역할</label>
          <select value={role} onChange={(e) => setRole(e.target.value)} required>
            <option value="" disabled selected>
              역할을 선택하세요
            </option>
            <option value="BENEFICIARY">수혜자</option>
            <option value="SPONSOR">후원자</option>
            <option value="ADMIN">관리자</option>
          </select>
        </div>

        {message && <p className={styles.errorMessage}>{message}</p>}

        {/* ✅ 회원가입 버튼 */}
        <button type="submit" className={styles.registerButton}>
          회원가입
        </button>
      </form>
    </div>
  );
}
