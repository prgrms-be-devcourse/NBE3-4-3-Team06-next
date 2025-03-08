"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/styles/login.module.css"; // ✅ 스타일 적용

export default function LoginPage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/users/login", { // ✅ API 프록시 호출
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        alert(`로그인 실패: ${error.error}`);
        return;
      }

      const user = await response.json();

      // ✅ JWT 저장
      localStorage.setItem("accessToken", user.accessToken);
      localStorage.setItem("refreshToken", user.refreshToken);

      alert(`로그인 성공! 환영합니다, ${user.userName}님.`);
      router.push("/"); // 로그인 성공 후 메인 페이지로 이동
    } catch (err) {
      console.error("네트워크 오류:", err);
      alert("네트워크 오류가 발생했습니다.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h1 className={styles.logo}>STARTREUM</h1>

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label}>ID</label>
            <input
              type="text"
              className={styles.input}
              placeholder="ID를 입력하세요"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Password</label>
            <input
              type="password"
              className={styles.input}
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className={styles.loginButton}>
            로그인
          </button>
        </form>

        <div className={styles.links}>
          <a href="/signup" className={styles.link}>회원가입</a> |
          <a href="/" className={styles.link}>홈으로</a>
        </div>
      </div>
    </div>
  );
}
