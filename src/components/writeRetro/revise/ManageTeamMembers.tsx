import { FC, useState } from 'react';
import { BsPersonCircle } from 'react-icons/bs';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Flex, Button } from '@chakra-ui/react';
import { formattedDate } from '../task/PersonalTask';
import { TeamMembersData } from '@/api/@types/TeamController';
import { MockTeamMembers } from '@/api/__mock__/teamMembers';
import InviteTeamModal from '@/components/inviteTeam/InviteTeamModal';
import * as S from '@/styles/writeRetroStyles/ReviseLayout.style';

interface Props {
  members: TeamMembersData[];
  teamId: number;
}

const ManageTeamMembers: FC<Props> = ({ members, teamId }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchList, setSearchList] = useState<TeamMembersData[]>();
  const [isInviteModalOpen, setInviteModalOpen] = useState<boolean>(false);

  const searchTeamMembers = (searchTerm: string) => {
    const filterData: TeamMembersData[] = [];

    MockTeamMembers.data.forEach(data => {
      if (data.username.includes(searchTerm)) {
        filterData.push(data);
        setSearchList(filterData);
      } else {
      }
    });
  };

  return (
    <S.ManageStyle>
      <Flex height="46px">
        <S.ManageTitleStyle>팀원 관리</S.ManageTitleStyle>
        <S.InvitationLinkButton onClick={() => setInviteModalOpen(true)}>팀원 초대 링크</S.InvitationLinkButton>
        <S.LinkExpirationText>링크는 2시간 후에 만료됩니다.</S.LinkExpirationText>
      </Flex>
      <Flex marginTop="20px">
        <S.ManageSearchInput
          placeholder="검색할 이름을 입력하세요."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value.toLowerCase())}
        />
        <S.ManageSearchButton
          onClick={() => {
            searchTeamMembers(searchTerm);
          }}
        >
          검색
        </S.ManageSearchButton>
      </Flex>
      <TableContainer marginTop="40px">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th fontSize={20} margin="0 auto">
                닉네임
              </Th>
              <Th fontSize={20} margin="0 auto">
                이메일
              </Th>
              <Th fontSize={20} margin="0 auto">
                회고 참여 일자
              </Th>
              <Th fontSize={20} margin="0 auto">
                작업
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {searchList
              ? searchList.map(item => {
                  return (
                    <Tr>
                      <Td>
                        <Flex>
                          <BsPersonCircle style={{ margin: 'auto 10px' }} size={30} />
                          <p style={{ margin: 'auto 0' }}>{item.username}</p>
                        </Flex>
                      </Td>
                      <Td>2115891@donga.ac.kr</Td>
                      <Td>2024-03-12 12:50</Td>
                      <Td>
                        <Button colorScheme="red" fontSize={15}>
                          제거
                        </Button>
                      </Td>
                    </Tr>
                  );
                })
              : members.map(name => (
                  <Tr>
                    <Td>
                      <Flex>
                        {name.profileImage ?? <BsPersonCircle style={{ margin: 'auto 10px' }} size={30} />}
                        {name.username ?? <S.NotMemberInfo> (닉네임 없음)</S.NotMemberInfo>}
                      </Flex>
                    </Td>
                    <Td>{name.email ?? <S.NotMemberInfo> (이메일 없음)</S.NotMemberInfo>}</Td>
                    <Td>{formattedDate(name.joinedAt)}</Td>
                    <Td>
                      <Button colorScheme="red" fontSize={15}>
                        제거
                      </Button>
                    </Td>
                  </Tr>
                ))}
          </Tbody>
        </Table>
      </TableContainer>

      <InviteTeamModal isOpen={isInviteModalOpen} onClose={() => setInviteModalOpen(false)} teamId={teamId} />
    </S.ManageStyle>
  );
};

export default ManageTeamMembers;