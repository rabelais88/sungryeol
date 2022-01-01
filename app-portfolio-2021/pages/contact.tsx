import { ReturnPromiseType } from '@/types';
import { GetStaticProps, NextPage } from 'next';
import { getContact } from '@/services/ContactService';

interface IProps {
  contact: ReturnPromiseType<typeof getContact>;
}

const Contact: NextPage<IProps> = ({ contact }) => {
  return <div>{JSON.stringify(contact)}</div>;
};

export const getStaticProps: GetStaticProps<IProps> = async (context) => {
  const contact = await getContact();
  return { props: { contact } };
};

export default Contact;
