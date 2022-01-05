import { ReturnPromiseType } from '@/types';
import { GetStaticProps, NextPage } from 'next';
import { getContact } from '@/services/ContactService';
import LayoutDefault from '@/layout/LayoutDefault';

interface IProps {
  contact: ReturnPromiseType<typeof getContact>;
}

const Contact: NextPage<IProps> = ({ contact }) => {
  return <LayoutDefault>{JSON.stringify(contact)}</LayoutDefault>;
};

export const getStaticProps: GetStaticProps<IProps> = async (context) => {
  const contact = await getContact();
  return { props: { contact } };
};

export default Contact;
