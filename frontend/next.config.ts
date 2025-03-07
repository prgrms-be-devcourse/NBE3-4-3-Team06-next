module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:8090/api/:path*", // 백엔드 주소
      },
    ];
  },
};
