export interface TimerProps {
  time: number;
}
function Timer({ time }: TimerProps) {
  const seconds = time % 60;
  return (
    <>
      <div className='font-varsity text-green text-5xl'>0:{seconds}</div>
      <div className='font-varsity text-green text-2xl'>seconds</div>
    </>
  );
}
export default Timer;
