import { getSession } from 'next-auth/client';
import StartingPageContent from '@/components/starting-page/';

export default function Home() {
	return (
		<>
			<StartingPageContent />
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
