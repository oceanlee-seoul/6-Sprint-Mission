//svg 파일의 타입을 any로 설정
declare module '*.svg' {
  const content: any;
  export default content;
}
