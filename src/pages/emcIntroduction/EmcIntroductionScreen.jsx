import { useNavigate } from 'react-router-dom';

import emcLogo from '../../assets/img/emcIntroduction/logo_emc.png';
import FillCenterHeader from '../../designsystem/components/header/FillCenterHeader';

import { EMC_INTRODUCTION, EMC_MEMBER_GROUPS } from './constants/introduction';

import * as S from './style';

export default function EmcIntroductionScreen() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <S.Page>
      <FillCenterHeader title="EMC 소개" onBack={handleBack} />

      <S.Main>
        <S.IntroSection>
          <S.LogoWatermark src={emcLogo} alt="" aria-hidden="true" />

          <S.IntroContent>
            <S.TitleBlock>
              <S.MainTitle>{EMC_INTRODUCTION.title}</S.MainTitle>

              <S.Subtitle>{EMC_INTRODUCTION.subtitle}</S.Subtitle>
            </S.TitleBlock>

            <S.Description>{EMC_INTRODUCTION.description}</S.Description>

            <S.ParagraphList>
              {EMC_INTRODUCTION.paragraphs.map((paragraph) => {
                const target = '제12회 종합손물세트';
                if (paragraph.includes(target)) {
                  const [before, after] = paragraph.split(target);
                  return (
                    <S.Paragraph key={paragraph}>
                      {before}
                      <S.ParagraphBold>{target}</S.ParagraphBold>
                      {after}
                    </S.Paragraph>
                  );
                }
                return <S.Paragraph key={paragraph}>{paragraph}</S.Paragraph>;
              })}
            </S.ParagraphList>
          </S.IntroContent>
        </S.IntroSection>

        <S.RecruitSection>
          <S.RecruitText>{EMC_INTRODUCTION.recruit}</S.RecruitText>
        </S.RecruitSection>

        <S.MemberSection>
          <S.MemberArea>
            <S.MemberTitle>{EMC_INTRODUCTION.memberTitle}</S.MemberTitle>

            <S.MemberGroups>
              {EMC_MEMBER_GROUPS.map((group) => (
                <S.MemberGroup key={group.title}>
                  <S.MemberGroupTitle>{group.title}</S.MemberGroupTitle>

                  <S.MemberList>
                    {group.members.map((member) => (
                      <S.Member key={member}>{member}</S.Member>
                    ))}
                  </S.MemberList>
                </S.MemberGroup>
              ))}
            </S.MemberGroups>
          </S.MemberArea>

          <S.ContactArea>
            <S.ContactGroup>
              <S.ContactTitle>{EMC_INTRODUCTION.instagramTitle}</S.ContactTitle>

              <S.ContactValue>{EMC_INTRODUCTION.instagram}</S.ContactValue>
            </S.ContactGroup>

            <S.ContactGroup>
              <S.ContactTitle>{EMC_INTRODUCTION.emailTitle}</S.ContactTitle>

              <S.ContactValue>{EMC_INTRODUCTION.email}</S.ContactValue>
            </S.ContactGroup>
          </S.ContactArea>
        </S.MemberSection>
      </S.Main>
    </S.Page>
  );
}
