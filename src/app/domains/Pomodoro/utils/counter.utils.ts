
export const splitMinutesAndSeconds = (count: string) => {
  const countTuple = count.split(':');
  let minutes = parseInt(countTuple[0]);
  let seconds = parseInt(countTuple[1]);

  return { minutes, seconds };
}

export const numberToTimeString = (num: number) => {
  return num.toString().padStart(2, '0');
};

export const formatTime = (minutes: number, seconds: number) => {
  const formattedMinutes = numberToTimeString(minutes);
  const formattedSeconds = numberToTimeString(seconds);

  return `${formattedMinutes}:${formattedSeconds}`;
};
