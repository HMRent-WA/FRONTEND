import MainMenuButton from '@/components/button/main-menu-button';

export default function Home() {
  return (
    <div className="px-4 w-full">
      <div className="flex flex-col w-full gap-6 h-[80vh] justify-center pt-[25%]">
        <div className="flex w-full gap-4">
          <MainMenuButton href={'/'}>신차 입고</MainMenuButton>
          <MainMenuButton href={'/'}>재렌트 입고</MainMenuButton>
        </div>
        <MainMenuButton href={'/compqc'}>상품화 완료 QC</MainMenuButton>
        <MainMenuButton href={'/'}>회수 대상 리스트</MainMenuButton>
        <MainMenuButton href={'/'}>차량 예약 리스트</MainMenuButton>
      </div>
    </div>
  );
}
