import EwhaianSymbol from '@/assets/svg/symbol/ic_ewhaian_symbol.svg?react';
import TextSymbol from '@/assets/svg/symbol/ic_ewhaian_symbol_text.svg?react';
import { Fragment } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  MainFooter,
  Symbol,
  InformationSection,
  Description,
  DonationInfoContainer,
  DonationLabel,
  DonationInfo,
  LinksContainer,
  Link,
  LinkDivider,
  TermsContainer,
  TermLink,
  TermDivider,
  Terms,
} from './style';
import { MAKERS_ROUTES } from '@/constants/routes';

export default function Footer() {
  return (
    <MainFooter>
      <Symbol>
        <EwhaianSymbol />
        <TextSymbol />
      </Symbol>

      <InformationSection>
        <Description>
          {`이화이언은 2001년 '이화를 사랑하는 사람들의 모임'이라는`}
          <br />
          {`모토 아래 시작된 이화여대 대표 온라인 커뮤니티입니다.`}
        </Description>

        <DonationInfoContainer>
          <DonationLabel>후원하기</DonationLabel>
          <DonationInfo>신한은행 100-026-784849</DonationInfo>
        </DonationInfoContainer>

        <LinksContainer>
          {links.map((link, index) => {
            const isInternal = link.href === MAKERS_ROUTES.LIST;
            return (
              <Fragment key={link.name}>
                {isInternal ? (
                  <Link as={RouterLink} to={link.href}>
                    {link.name}
                  </Link>
                ) : (
                  <Link
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.name}
                  </Link>
                )}
                {index < links.length - 1 && <LinkDivider />}
              </Fragment>
            );
          })}
        </LinksContainer>

        <TermsContainer>
          <span>© Ewhaian. All rights reserved.</span>
          <Terms>
            {terms.map((term, index) => (
              <Fragment key={term.name}>
                <TermLink
                  href={term.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {term.name}
                </TermLink>
                {index < terms.length - 1 && <TermDivider />}
              </Fragment>
            ))}
          </Terms>
        </TermsContainer>
      </InformationSection>
    </MainFooter>
  );
}

const links = [
  {
    name: '사이트 소개',
    href: 'https://ewhaian.com/ewhaian/introduction',
  },
  {
    name: '인스타그램',
    href: 'https://www.instagram.com/ewhaian_2001/',
  },
  {
    name: '고객센터',
    href: 'http://pf.kakao.com/_QCjvn/chat',
  },
  {
    name: '만든이들',
    href: MAKERS_ROUTES.LIST,
  },
];

const terms = [
  {
    name: '이용약관',
    href: 'https://ewhaian.com/terms/terms-of-use',
  },
  {
    name: '개인정보처리방침',
    href: 'https://ewhaian.com/terms/privacy-policy',
  },
];
