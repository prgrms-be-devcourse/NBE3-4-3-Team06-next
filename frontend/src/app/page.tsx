"use client";

import { useEffect, useState } from "react";
import styles from "@/styles/home.module.css";
import Header from "@/components/Header";
import Link from "next/link";

export default function Home() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:8090/api")  // ✅ Spring Boot API 호출
      .then((res) => res.text())  // ✅ 문자열 응답 처리
      .then((data) => setMessage(data))
      .catch((error) => console.error("Error fetching API:", error));
  }, []);

  return (
    <>
      <Header />
      <main className={styles.mainContainer}>
        <div className={styles.titleContainer}>
          <h1 className={styles.mainText}>“DO WHAT EVER YOU WANT”</h1>
          <h2 className={styles.subText}>WITH</h2>
          <h3 className={styles.brandName}>STARTREUM</h3>
        </div>

        {/* ✅ 백엔드 메시지 표시 */}
        <p style={{ color: "white", textAlign: "center" }}>{message}</p>

        <div className={styles.buttonContainer}>
          <Link href="/projects/search">
            <button className={styles.buttonBlue}>지금 둘러보기</button>
          </Link>
          <button className={styles.buttonGreen}>내 프로젝트 시작하기</button>
        </div>
      </main>
    </>
  );
}
