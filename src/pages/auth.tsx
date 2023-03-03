import { getSession } from 'next-auth/client';
import AuthForm from '@/components/auth/auth-form';

function AuthPage() {
	return <AuthForm />;
}

export async function getServerSideProps(context: { req: any; }) {
	const session = await getSession({ req: context.req });
	if (session) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
			props: {
				session,
			},
		};
	}
	return {
		props: {
			session,
		},
	};
}

export default AuthPage;
