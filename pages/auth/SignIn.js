import { getCsrfToken } from 'next-auth/react';
import SignInForm from '@/components/SignInForm';

export default function SignIn({ csrfToken }) {
  return <SignInForm />;
}

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
