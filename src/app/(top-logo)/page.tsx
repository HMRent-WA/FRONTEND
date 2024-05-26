import MainMenuButton from '@/components/button/main-menu-button';

export default function Home() {
  return (
    <div className="px-4 w-full">
      <div className="flex flex-col w-full gap-6 h-[80vh] justify-center pt-[25%]">
        <div className="flex w-full gap-4 justify-between">
          <MainMenuButton
            className="max-w-1/2 bg-green-500 hover:bg-green-500/80"
            href={'/inqcn'}
          >
            신차 입고
          </MainMenuButton>
          <MainMenuButton
            className="max-w-1/2 bg-green-500 hover:bg-green-500/80"
            href={'/inqcr'}
          >
            재렌트 입고
          </MainMenuButton>
        </div>
        <MainMenuButton
          className="bg-orange-400 hover:bg-orange-400/80"
          href={'/compqc'}
        >
          상품화 완료 QC
        </MainMenuButton>
        <MainMenuButton className="" href={'/resvlist'}>
          회수 대상 리스트
        </MainMenuButton>
        <MainMenuButton
          className="bg-red-500 hover:bg-red-500/80"
          href={'/retvlist'}
        >
          차량 예약 리스트
        </MainMenuButton>
      </div>
    </div>
  );
}
