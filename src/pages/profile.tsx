import { getSession } from 'next-auth/client';

import UserSection from '@/components/project-owner/user-section';
import CommunityCreationsSection from '@/components/project-owner/community-creations-section';
import SubscriptionsSection from '@/components/project-owner/subscriptions-section';

export default function ProfilePage() {
  return (
    <>
      <UserSection />
      <SubscriptionsSection />
      <CommunityCreationsSection />
    </>
  );
}

export async function getServerSideProps(context: { req: any }) {
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
