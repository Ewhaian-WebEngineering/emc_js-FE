import { useGoBack } from '@/hooks/useGoBack';

import FillCenterHeader from '@/designsystem/components/header/FillCenterHeader';
import Divider from '@/designsystem/components/divider/Divider';

import { makers } from './constants/makers';

import {
  MakersContainer,
  OrganizationSection,
  OrganizationTitle,
  TeamWrapper,
  TeamSection,
  TeamTitleWrapper,
  TeamTitle,
  Dot,
  MemberList,
  MemberRow,
  Name,
  StudentId,
  Major,
} from './style';

export default function MakersScreen() {
  const handleBack = useGoBack();

  return (
    <MakersContainer>
      <FillCenterHeader title="만든이들" onBack={handleBack} />

      {makers.map((organization, organizationIndex) => (
        <div key={organization.organization}>
          <OrganizationSection>
            <OrganizationTitle>{organization.organization}</OrganizationTitle>

            <TeamWrapper>
              {organization.teams.map((team) => (
                <TeamSection key={team.title}>
                  <TeamTitleWrapper>
                    <Dot />
                    <TeamTitle>{team.title}</TeamTitle>
                  </TeamTitleWrapper>

                  <MemberList>
                    {team.members.map((member) => (
                      <MemberRow key={member.studentId + member.name}>
                        <Name>{member.name}</Name>

                        <StudentId>{member.studentId}</StudentId>

                        <Major>{member.major}</Major>
                      </MemberRow>
                    ))}
                  </MemberList>
                </TeamSection>
              ))}
            </TeamWrapper>
          </OrganizationSection>

          {organizationIndex !== makers.length - 1 && <Divider size="sm" />}
        </div>
      ))}
    </MakersContainer>
  );
}
