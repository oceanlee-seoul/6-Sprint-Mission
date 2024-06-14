import Image from 'next/image';
import { useForm, SubmitHandler } from 'react-hook-form';
import Button from '@/components/Button';
import Container from '@/components/Container';
import LOGO_TEXT from '@/public/title-pandamarket.svg';
import LOGO_IMG from '@/public/logo-pandamarket.svg';
import SOCIAL_BTN_GOOGLE from '@/public/icon-google.svg';
import SOCIAL_BTN_KAKAO from '@/public/icon-kakao.svg';
import ICON_VISIBILITY from '@/public/icon-visibility.svg';

type TInputs = {
  email: string;
  nickname: string;
  password: string;
  passwordCheck: string;
};

export default function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TInputs>();

  const onSubmit: SubmitHandler<TInputs> = (data) => console.log(data);

  return (
    <div className="flex items-center justify-center">
      <Container>
        <div className="flex items-center justify-center gap-[20px] my-[50px]">
          <Image src={LOGO_IMG} alt="판다마켓 로고" width={100} height={100} />
          <Image src={LOGO_TEXT} alt="판다마켓 로고" width={266} height={100} />
        </div>
        <form
          className="flex flex-col gap-[25px]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label className="block mb-[10px] font-bold text-[#1f2937]">
              이메일
            </label>
            <input
              className="w-[100%] bg-[#f3f4f6] h-[56px] px-[30px] rounded-xl text-[16px]"
              placeholder="이메일을 입력해주세요"
              {...register('email', { required: true })}
            />
          </div>
          <div>
            <label className="block mb-[10px] font-bold text-[#1f2937]">
              닉네임
            </label>
            <input
              className="w-[100%] bg-[#f3f4f6] h-[56px] px-[30px] rounded-xl text-[16px]"
              placeholder="닉네임을 입력해주세요"
              {...register('nickname', { required: true })}
            />
          </div>
          <div>
            <label className="block mb-[10px] font-bold text-[#1f2937]">
              비밀번호
            </label>
            <div className="relative">
              <input
                type="password"
                className="w-[100%] bg-[#f3f4f6] h-[56px] px-[30px] rounded-xl text-[16px] "
                placeholder="비밀번호를 입력해주세요"
                {...register('password', { required: true })}
              />

              <Image
                className="absolute top-[15px] right-[15px]"
                src={ICON_VISIBILITY}
                alt="비밀번호 보이기"
              />
            </div>
          </div>
          <div>
            <label className="block mb-[10px] font-bold text-[#1f2937]">
              비밀번호 확인
            </label>
            <div className="relative">
              <input
                type="password"
                className="w-[100%] bg-[#f3f4f6] h-[56px] px-[30px] rounded-xl text-[16px]"
                placeholder="비밀번호를 다시 한 번 입력해주세요"
                {...register('passwordCheck', {
                  required: true,
                })}
              />
              <Image
                className="absolute top-[15px] right-[15px]"
                src={ICON_VISIBILITY}
                alt="비밀번호 보이기"
              />
            </div>
          </div>
          <div className="h-[56px] rounded-[40px] overflow-hidden">
            <Button type="submit">회원가입</Button>
          </div>
          <div className="h-[74px] flex items-center justify-between rounded-lg bg-[#e6f2ff] p-[24px]">
            <p className="text-[#1f2937] font-medium">간편 로그인하기</p>
            <div className="flex gap-[15px]">
              <Image src={SOCIAL_BTN_GOOGLE} alt="구글 로그인" />
              <Image src={SOCIAL_BTN_KAKAO} alt="카카오 로그인" />
            </div>
          </div>
          <div className="flex justify-center">
            <p>이미 회원이신가요? 로그인</p>
          </div>
        </form>
      </Container>
    </div>
  );
}

Signup.hideHeader = true;
