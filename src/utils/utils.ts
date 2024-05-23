export function formatKorWon(value) {
  return Number(value).toLocaleString('ko-KR') + '원';
}

export function calculateTimeDifference(timestamp) {
  let now = new Date();
  let targetTime = new Date(timestamp);
  let timeDiff = now.getTime() - targetTime.getTime();
  let hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));
  if (hoursDiff >= 24) {
    let daysDiff = Math.floor(hoursDiff / 24);
    return daysDiff + '일 전';
  } else {
    return hoursDiff + '시간 전';
  }
}
