import { useState } from 'react';

import Head from 'next/head';
import Image from 'next/image';

import Button from '@/components/Button';
import Container from '@/components/Container';

import ICON_PLUS from '@/public/icon-plus.svg';
import { IBoardValues } from '@/interface/interface';

export default function AddBoard() {
  const [values, setValues] = useState<IBoardValues>({
    title: '',
    content: '',
    imgFile: null,
  });

  function onChangeValues(key: keyof IBoardValues, value: string) {
    setValues((prevValues) => ({ ...prevValues, [key]: value }));
  }

  return (
    <>
      <Head>
        <title>판다마켓 - 게시글 쓰기</title>
      </Head>
      <div className="flex items-center justify-center">
        <Container>
          <div className="mb-[20px] flex justify-between items-center">
            <h1 className="font-bold text-[20px]">게시글 쓰기</h1>
            <div className="w-[88px] h-[42px] rounded-lg overflow-hidden">
              <Button>등록</Button>
            </div>
          </div>
          <form className="w-[100%]">
            <div className="flex flex-col mb-[20px]">
              <label
                className="mb-[10px] font-bold text-[18px] text-[#1f2937]"
                htmlFor="title"
              >
                *제목
              </label>
              <input
                className="h-[56px] py-[16px] px-[24px] bg-[#f3f4f6] rounded-xl"
                id="title"
                type="text"
                value={values.title}
                onChange={(e) => {
                  onChangeValues('title', e.target.value);
                }}
                placeholder="제목을 입력해주세요"
              />
            </div>
            <div className="flex flex-col mb-[20px]">
              <label
                className="mb-[10px] font-bold text-[18px] text-[#1f2937]"
                htmlFor="content"
              >
                *내용
              </label>
              <textarea
                className="h-[282px] py-[16px] px-[24px] bg-[#f3f4f6] rounded-xl resize-none"
                id="content"
                value={values.content}
                onChange={(e) => {
                  onChangeValues('content', e.target.value);
                }}
                placeholder="내용을 입력해주세요"
              />
            </div>
            <div className="mb-[50px]">
              <label className="block mb-[10px] font-bold text-[18px] text-[#1f2937]">
                이미지
              </label>
              <label className="w-[282px] h-[282px] bg-[#f3f4f6] rounded-xl flex flex-col items-center justify-center cursor-pointer">
                <Image src={ICON_PLUS} alt="이미지 추가" />
                <p className="text-[16px] text-[#9Ca3af]">이미지 등록</p>
                <input className="hidden" type="file" />
              </label>
            </div>
          </form>
        </Container>
      </div>
    </>
  );
}
