"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation"; // ✅ usePathname 추가
import styles from "@/styles/header.module.css"; // ✅ 절대 경로 사용

export default function Header() {
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);
  const router = useRouter();
  const pathname = usePathname(); // ✅ 현재 경로 가져오기

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      try {
        const tokenPayload = JSON.parse(atob(accessToken.split(".")[1]));
        const userName = tokenPayload.sub || "알 수 없음";
        const userRole = tokenPayload.role || "역할 없음";

        setUser({ name: userName, role: userRole });
      } catch (error) {
        console.error("JWT 디코딩 오류:", error);
      }
    }
  }, []);

  const handleLogout = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
  
      const response = await fetch("/api/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("서버 로그아웃 실패");
      }

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
  
      router.push("/login");
    } catch (error) {
      console.error("❌ 로그아웃 오류:", error);
      alert("로그아웃 중 문제가 발생했습니다.");
    }
  };

  // ✅ 메인 페이지에서만 글자 색상을 흰색으로 설정
  const textColorClass = pathname === "/" ? styles.textWhite : styles.textBlack;

  return (
    <header className={styles.header}>
      {/* ✅ 로고 */}
      <div className={styles.logoContainer}>
        <Link href="/" className={styles.logoLink}>
          <div className={`${styles.logo} ${textColorClass}`}>STARTREUM</div>
        </Link>
      </div>

      {/* ✅ 인증 버튼 */}
      <div className={styles.authButtons}>
        {user ? (
          <>
            <span className={`${styles.userName} ${textColorClass}`}>
              {user.name} ({user.role})
            </span>
            <Link href={`/profile/${user.name}`} className={`${styles.customBtn}`}>
              내 정보
            </Link>
            {user.role === "ROLE_ADMIN" && (
              <Link href="/admin" className={`${styles.customBtn} ${styles.primary}`}>
                관리자
              </Link>
            )}
            <button onClick={handleLogout} className={styles.customBtn}>
              로그아웃
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className={`${styles.customBtn} ${textColorClass}`}>
              로그인
            </Link>
            <Link href="/signup" className={`${styles.customBtn} ${styles.primary} ${textColorClass}`}>
              회원가입
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
